<template>
  <div v-if="modalVisible">
    <rd-modals
      v-model="modalVisible"
      diy-slot-footer
      title="防出错提示"
      :width="950"
      :closable="false">
      <div
        slot="content"
        :class="prefixCls + '-content'">
        <div style="margin-bottom: 20px">
          <p>
            <Icon
              type="md-alert"
              color="#FA9404"
              :class="prefixCls + '-icon-alert'" />
            <span>配置内容与防出错设置不一致，请修改广告设置</span>
          </p>
          <p>
            <Icon
              type="md-alert"
              color="#FA9404"
              :class="prefixCls + '-icon-alert'" />
            <span>若需修改防出错内容，请联系管理员或优化经理修改</span>
          </p>
        </div>

        <div
          v-for="item in errorTableList"
          :key="item.id"
          style="margin-bottom: 15px">
          >
          <p>{{ item.name }}({{ item.id }})</p>
          <Table
            :columns="columns"
            :data="item.tBody">
            <template #position></template>
          </Table>
        </div>
      </div>
      <div slot="footer">
        <Button
          type="primary"
          @click="handleOk">
          去修改
        </Button>
      </div>
    </rd-modals>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'error-prevent-modal'
import {
  map as _map,
  pickBy as _pickBy,
  mapValues as _mapValues,
  isArray as _isArray,
  filter as _filter,
  includes as _includes
} from 'lodash'

import { columnsMap, mockColumns } from './data'

export default {
  name: prefixCls,
  props: {
    // 请求接口：校验函数
    validateDataFn: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      prefixCls,
      mediaCode: '',
      columns: [],
      modalVisible: false,
      errorTableList: []
    }
  },
  methods: {
    async onErrorPrevent({ paramsData, callback }) {
      // return Promise.reject(new Error('测试：返回promise.reject，应该阻断流程'))
      this.mediaCode = paramsData.mediaCodes[0]

      let validateData = paramsData
      validateData.data = this.transformValidateDataList(paramsData.data)
      // TODO: 接口未联调，需要处理数据
      // 请求接口
      let result = await this.validateDataFn(validateData)
      // 表头配置
      let tHead = mockColumns

      console.log('后端校验结果', result)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let isError = result.length
          if (isError) {
            reject(new Error('测试错误'))
            this.columns = this.getTableColumns(tHead)
            this.errorTableList = result
            this.modalVisible = true
          } else {
            this.modalVisible = false
            callback && callback()
            resolve()
          }
        }, 1000)
      })
    },

    // 根据要校验的数据，获取表头范围
    getTableColumns(columns) {
      return columns.map(e => {
        let item = columnsMap.get(e.key)
        item.title = e.title
        return item
      })
    },
    // 转换标准数据
    transformValidateDataList(dataList) {
      console.log('转换标准数据--之前', dataList)

      // 1. 过滤标准数据的value为undefined
      // 2. 过滤标准数据的value值为array的空、undefined、null
      // 3. 过滤标准数据的value在strictKeys(更严格)范围字段不可以为[]
      let strictKeys = [
        'bid',
        'bidGoal',
        'deepBid',
        'deepBidGoal',
        'roiBid',
        'roiGoal',
        'goal',
        'deepGoal'
      ]
      const filteredArr = _map(dataList, obj => _pickBy(obj, value => value !== undefined))
      const modifiedArr = _map(filteredArr, obj =>
        _mapValues(obj, value => {
          if (_isArray(value)) {
            return _filter(value, v => !_includes([undefined, '', null, 0], v))
          }
          return value
        })
      )
      let result = modifiedArr.map(obj => {
        return Object.fromEntries(
          Object.entries(obj).filter(
            ([key, value]) =>
              !(strictKeys.includes(key) && Array.isArray(value) && value.length === 0)
          )
        )
      })
      console.log('转换标准数据--之后', result)

      return result
    },

    handleOk() {
      this.modalVisible = false
    },
    handelCancel() {
      this.modalVisible = false
    }
  }
}
</script>