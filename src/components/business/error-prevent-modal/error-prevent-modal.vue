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
          <p style="margin-bottom: 3px">规则名称(ID): {{ item.name }}({{ item.id }})</p>
          <Table
            border
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

import { columnsMap } from './data'

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
      columns: [],
      modalVisible: false,
      errorTableList: []
    }
  },
  methods: {
    async onErrorPrevent({ paramsData, callback }) {
      // 防出错debug模式：不执行
      if (window.adsDebug && window.adsDebug.hasErrorPrevent === false) {
        return Promise.resolve()
      }
      let validateData = paramsData
      validateData.data = this.transformValidateDataList(paramsData.data)
      validateData.keys = Object.keys(validateData.data[0])
      // 请求接口
      let result = await this.validateDataFn(validateData)
      // 表头配置
      let tHead = result.tHead
      let tBody = result.result
      let firstValidate = validateData.data[0]

      return new Promise((resolve, reject) => {
        let isError = tBody.length
        if (isError) {
          reject(new Error('测试错误'))
          this.columns = this.getTableColumns(tHead, firstValidate)
          this.errorTableList = tBody
          this.modalVisible = true
        } else {
          this.modalVisible = false
          callback && callback()
          resolve()
        }
      })
    },

    // 根据要校验的数据，获取表头范围
    getTableColumns(columns, firstValidate) {
      let validateKeys = Object.keys(firstValidate)
      let keys = ['objectLabel', 'accountLabel', ...validateKeys]
      if (validateKeys.includes('cpxBid')) {
        keys.push('bid')
      }
      if (validateKeys.includes('roiBid')) {
        keys.push('deepBid')
      }
      if (firstValidate.roiSource === 'goal') {
        keys.push('bid')
      }
      if (firstValidate.roiSource === 'deepGoal') {
        keys.push('deepBid')
      }
      let hasKeys = [...new Set(keys)]
      let hasColumns = columns.filter(e => hasKeys.includes(e.key))
      return hasColumns.map(e => {
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
        'roiBidGoal',
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
      this.$emit('on-ok')
    }
  }
}
</script>