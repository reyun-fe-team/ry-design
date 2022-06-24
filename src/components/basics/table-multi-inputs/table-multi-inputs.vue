<template>
  <main :class="prefixCls">
    <Table
      :class="prefixCls + '-table'"
      border
      :max-height="400"
      :columns="columns"
      :data="data"
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
          @on-enter="enter(row, index, column)"
          @on-change="changeValue(row, index)" />
        <Icon
          v-if="data.length > 1 && item.slot === 'del'"
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
  </main>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'table-multi-inputs'
export default {
  name: prefixCls,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableList: {
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
    }
  },
  data() {
    return {
      prefixCls,
      data: _cloneDeep(this.tableList),
      errorInfo: {
        errorTip: '',
        errorRow: null
      }
    }
  },
  methods: {
    enter(row, index, column) {
      // 表格一行有几个input框
      const inputColumn = this.columns.filter(item => item.type === 'input')
      // 当前光标处于 一行中第几个input
      let inputColIndex = inputColumn.findIndex(item => item.key === column.key) || 0
      const inputColumnLength = inputColumn.length
      // 光标聚焦到最后一个，如果当前表格数量 >= 最大表格数，则return
      if (inputColIndex + 1 >= inputColumnLength  && this.data.length >= this.max) {
        return
      }
      // 下一个要聚焦的input，在所有input的数量中属于第几个
      const nextLen = index * inputColumnLength + (inputColIndex + 1)
      // 所有input的数量
      const allInputLen = document.getElementsByClassName(`${this.prefixCls}-input-item`).length
      // 光标聚焦到最后一个，如果当前表格数量 < 最大表格数, 并且下一个要聚焦的input <= 所有input的数量（即只有光标处于最后的input框且可以继续增加的时候才会push）  则给表格的data，push一条新数据
      if (inputColIndex + 1 >= inputColumnLength && allInputLen <= nextLen) {
        this.data.push(this.addNewData)
      }
      // 光标移到下一个input
      this.$nextTick(() => {
        const focusInput = document
          .getElementsByClassName(`${this.prefixCls}-input-item`)
          // eslint-disable-next-line no-unexpected-multiline
          [nextLen].getElementsByClassName('ivu-input')[0]
        focusInput.focus()
      })
    },
    changeValue(row, index) {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        this.data[index] = row
        // 对this.columns含有校验方法（validate）的数据进行校验
        const validateKey = []
        this.columns.forEach(item => {
          if (item.validate) {
            validateKey.push(item.key)
          }
        })
        this.errorInfo.errorTip = ''
        this.errorInfo.errorRow = null
        // 循环this.data里面的数据，校验不正确的立即终止循环，并且返回第一个校验不正确的提示信息
        for (let i = 0; i < this.data.length; i++) {
          const keys = Object.keys(this.data[i])
          for (let j = 0; j < keys.length; j++) {
            if (validateKey.includes(keys[j])) {
              const validateObj = this.columns.find(ele => ele.key === keys[j])
              try {
                await validateObj.validate(this.data[i][keys[j]])
              } catch (error) {
                this.errorInfo.errorTip = error.message
                this.errorInfo.errorRow = i
                this.$emit('updateData', this.data, this.errorInfo.errorTip)
                return
              }
            }
          }
        }
        this.$emit('updateData', this.data, this.errorInfo.errorTip)
      }, 500)
    },
    del(index) {
      this.data.splice(index, 1)
      this.$emit('updateData', this.data)
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
