<template>
  <div :class="prefixCls">
    <Table
      :class="`${prefixCls}-table`"
      border
      :max-height="400"
      :columns="columns"
      :data="tableData"
      :show-header="showHeader"
      :row-class-name="rowClassName">
      <template
        v-for="item in columns"
        :slot="item.slot"
        slot-scope="{ row, column, index }">
        <Input
          v-if="item.type === 'input'"
          :key="item.key"
          v-model.trim="row[item.slot]"
          :class="prefixCls + '-input-item'"
          :placeholder="item.placeholder"
          :border="false"
          style="width: 100%"
          clearable
          @[pasteEventName].native="event => handlePaste(row, index, event, item.key)"
          @on-enter="enter(row, index, column)"
          @on-change="event => changeValue(row, index, event, item.key)" />
        <Icon
          v-if="tableData.length > 1 && item.slot === 'del'"
          :key="item.key + 'icon'"
          :class="prefixCls + '-del-btn'"
          type="md-close"
          @click="del(index)"></Icon>
      </template>
    </Table>
    <p
      v-if="errorInfo.errorTip"
      :class="prefixCls + '-error-tip'">
      * {{ errorInfo.errorTip }}
    </p>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'table-multi-inputs'
export default {
  name: prefixCls,
  props: {
    // 是否能使用粘贴事件
    isCanPaste: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    // 最大条数
    max: {
      type: Number,
      default: 500
    },
    // 增加一行的时候，push到data里的对象
    addNewData: {
      type: Object,
      default: () => {}
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls,
      tableData: _cloneDeep(this.data),
      errorInfo: {
        errorTip: '',
        errorRow: null
      }
    }
  },
  computed: {
    // 是否需要粘贴事件
    pasteEventName() {
      return this.isCanPaste ? 'paste' : ''
    }
  },
  watch: {
    // 数据变化需要更新到组件内部
    data: {
      deep: true,
      handler() {
        this.tableData = _cloneDeep(this.data)
      }
    }
  },
  methods: {
    // 粘贴事件回调
    handlePaste(row, index, event, key) {
      let pastedText = ''
      if (event.clipboardData && event.clipboardData.getData) {
        pastedText = event.clipboardData.getData('Text')
      } else {
        pastedText = event.originalEvent.clipboardData.getData('Text')
      }
      this.$emit('on-paste', { pastedText, key, index, row, event })
    },
    // 回车事件
    enter(row, index, column) {
      // 表格一行有几个input框
      const inputColumn = this.columns.filter(item => item.type === 'input')
      // 当前光标处于 一行中第几个input
      let inputColIndex = inputColumn.findIndex(item => item.key === column.key) || 0
      const inputColumnLength = inputColumn.length
      // 光标聚焦到最后一个，如果当前表格数量 >= 最大表格数，则return
      if (inputColIndex + 1 >= inputColumnLength && this.tableData.length >= this.max) {
        return
      }
      // 下一个要聚焦的input，在所有input的数量中属于第几个
      const nextLen = index * inputColumnLength + (inputColIndex + 1)
      // 所有input的数量
      const inputSelector = `.${this.prefixCls}-input-item`
      const allInputEls = this.$el.querySelectorAll(inputSelector)
      const allInputLen = allInputEls.length
      // 光标聚焦到最后一个，如果当前表格数量 < 最大表格数, 并且下一个要聚焦的input <= 所有input的数量（即只有光标处于最后的input框且可以继续增加的时候才会push）  则给表格的data，push一条新数据
      if (inputColIndex + 1 >= inputColumnLength && allInputLen <= nextLen) {
        this.tableData.push(this.addNewData)
      }
      // 光标移到下一个input
      this.$nextTick(() => {
        const nextFocusInput = this.$el.querySelectorAll(inputSelector)[nextLen]
        nextFocusInput.querySelector('.ivu-input').focus()
      })
    },
    // 输入事件
    changeValue(row, index, event, key) {
      // 需要先赋值，不然在外部组件更改了tableData会导致当前数据项不一致
      this.tableData[index] = row

      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 对this.columns含有校验方法（validate）的数据进行校验
        const validateKey = []
        this.columns.forEach(item => {
          if (item.validate) {
            validateKey.push(item.key)
          }
        })
        this.errorInfo.errorTip = ''
        this.errorInfo.errorRow = null

        // 单个在变化
        this.$emit('on-row-change', { row, index, value: event.target.value, key })
        // 循环this.data里面的数据，校验不正确的立即终止循环，并且返回第一个校验不正确的提示信息
        for (let i = 0; i < this.tableData.length; i++) {
          let item = this.tableData[i]
          let keys = validateKey
          for (let j = 0; j < keys.length; j++) {
            let nowKey = keys[j]
            let validateObj = this.columns.find(ele => ele.key === nowKey)
            if (!validateObj) {
              continue
            }
            try {
              await validateObj.validate(item[nowKey], i, item, nowKey)
            } catch (error) {
              this.errorInfo.errorTip = error.message
              this.errorInfo.errorRow = i
              // 验证失败
              this.$emit('on-validate-error', this.errorInfo)
              // 更新全部数据
              this.$emit('on-change', this.tableData, this.errorInfo.errorTip)
              return
            }
          }
        }
        // 更新全部数据
        this.$emit('on-change', this.tableData, this.errorInfo.errorTip)
      }, 500)
    },
    // 删除
    del(index) {
      this.$emit('on-delete', this.tableData[index], index)
      this.tableData.splice(index, 1)
      // 删除时如果错误信息与当前一致，则清空
      if (index === this.errorInfo.errorRow) {
        this.errorInfo = { errorTip: '', errorRow: null }
      }
      this.$emit('on-change', this.tableData)
    },
    rowClassName(row, index) {
      if (index === this.errorInfo.errorRow) {
        return 'table-error-row'
      }
      return ''
    }
  }
}
</script>
