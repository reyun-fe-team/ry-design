<template>
  <div v-if="modalVisible">
    <!-- 1950 -->
    <rd-modals
      v-model="modalVisible"
      diy-slot-footer
      title="防出错提示"
      :width="1920"
      :closable="false">
      <div
        slot="content"
        :class="prefixCls + '-content'">
        <div class="m-b-20">
          <p>
            <Icon
              type="md-alert"
              color="#FA9404"
              class="m-r-5" />
            <span>配置内容与防出错设置不一致，请修改广告设置</span>
          </p>
          <p>
            <Icon
              type="md-alert"
              color="#FA9404"
              class="m-r-5" />
            <span>若需修改防出错内容，请联系管理员或优化经理修改</span>
          </p>
        </div>

        <div
          v-for="item in errorTableList"
          :key="item.id"
          class="m-b-15">
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

import { columns } from './data'
import { mockRuleList } from './mock'
import { errorPreventValidate } from './utils'
export default {
  name: prefixCls,
  props: {
    // 获取规则列表
    getRuleList1: {
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
    async onErrorPrevent({ paramsRuleList, validateDataList, callback }) {
      // 测试：返回promise.reject，应该阻断流程
      // return Promise.reject(new Error('测试：返回promise.reject，应该阻断流程'))

      this.mediaCode = paramsRuleList.mediaCodes[0]
      // 请求接口
      let ruleList = await this.getRuleList(paramsRuleList)
      let result = errorPreventValidate({ ruleList, validateDataList })

      console.log('------------------------')
      console.log('最终的校验结果', result)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // let isError = Math.floor(Math.random() * 10) % 2 === 0
          let isError = result.message
          if (isError) {
            reject(new Error('测试错误'))
            this.columns = this.getTableColumns(validateDataList)
            this.errorTableList = result.table
            this.modalVisible = true
          } else {
            this.modalVisible = false
            callback && callback()
            resolve()
            this.$Message.success('测试成功')
          }
        }, 1000)
      })
    },

    // 获取规则列表
    getRuleList(data) {
      console.log('获取规则列表-参数', data)
      console.log('---------------------------------')

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockRuleList)
        }, 1000)
      })
    },
    // 根据要校验的数据，获取表头范围
    getTableColumns(data) {
      let keys = Object.keys(data[0])
      return columns.filter(f => f.isFixed || keys.includes(f.key))
    },
    //
    handleOk() {
      this.modalVisible = false
    },
    handelCancel() {
      this.modalVisible = false
    }
  }
}
</script>