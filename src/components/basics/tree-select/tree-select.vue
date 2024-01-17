


<template>
  <div>
    <!-- <Select
    ref="select"
    v-bind="$attrs"
    :multiple="multiple"
    class="ivu-tree-select"
    :class="classes"
    :transfer-class-name="transferClassName"
    hide-not-found
    :transfer="transfer"
    @on-change="emitChange"
    @on-open-change="handleOpenChange">
   
  </Select> -->
    currentValue:{{ currentValue }}
    <hr />
    storeValue:{{ storeValue }}
    <hr />
    optionData:{{ optionData }}
    <hr />
    selectData:{{ selectData.length }}--{{ selectData }}
    <rd-filter-list
      ref="filter-list"
      :value="realData"
      :real-data="realData"
      :data="optionData"
      :label="label"
      :trigger="trigger"
      :query="query"
      :not-found-text="notFoundText"
      :not-found="false"
      :input-width="inputWidth"
      :input-height="inputHeight"
      :option-width="optionWidth"
      :width="width"
      :height="height"
      :max-height="maxHeight"
      :min-height="minHeight"
      :filterable="filterable"
      :show-select-option="showSelectOption && multiple"
      :clearable="clearable"
      :input-placeholder="inputPlaceholder"
      :filter-placeholder="filterPlaceholder"
      :transfer="transfer"
      :placement="placement"
      @query-change="queryChange"
      @on-visible-change="handleVisibleChange"
      @on-input-click="handleInputClick"
      @on-input-clear="handleInputClear"
      @on-change="handleFilterListChange">
      <div
        :style="panelStyle"
        :class="prefixCls + '-body'">
        <Tree
          :data="data"
          check-directly
          :multiple="multiple"
          :show-checkbox="multiple && showCheckbox"
          :load-data="loadData"
          @on-select-change="handleSelectNode"
          @on-check-change="handleSelectNode"></Tree>
      </div>
    </rd-filter-list>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'tree-select'
import _isEqual from 'lodash/isEqual'
export default {
  name: prefixCls,
  props: {
    value: {
      type: [String, Number, Array]
    },
    // Tree 的数据
    data: {
      type: Array,
      default: () => []
    },
    // multiple 模式下，value 为 Array
    multiple: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    loadData: {
      type: Function
    },
    transfer: {
      type: Boolean,
      default() {
        return false
      }
    },
    // filter-list
    label: {
      type: String,
      default: ''
    },
    trigger: String,
    notFoundText: String,
    width: {
      type: [String, Number],
      default: ''
    },
    height: [Number, String],
    maxHeight: {
      type: [Number, String],
      default: 290
    },
    minHeight: [Number, String],
    inputWidth: [String, Number],
    inputHeight: {
      type: [String, Number],
      default: ''
    },
    selectItemHeight: [String, Number],
    optionWidth: [String, Number],
    filterMethod: {
      type: Function,
      default(data, query) {
        const type = 'label' in data ? 'label' : 'value'
        return data[type].indexOf(query) > -1
      }
    },
    filterable: Boolean,
    showSelectOption: Boolean,
    clearable: Boolean,
    inputPlaceholder: String,
    filterPlaceholder: String,
    placement: String,
    checkStrictly: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    let value = this.value
    if (value === null) {
      if (this.multiple) {
        value = []
      } else {
        value = ''
      }
    }

    return {
      currentValue: value,
      isChangeValueInTree: false, // 如果是点击 Tree 里改变的数据，临时置为 true，避免在 watch 的 value 中重复修改 Select 数据
      isValueNull: false, // hack：解决 value 置为 null 时，$emit:input 不是 null
      query: '',
      storeValue: [],
      prefixCls
    }
  },
  computed: {
    valueToArray() {
      return typeof this.value === 'object' ? this.value : [this.value]
    },
    storeValueToArray() {
      return typeof this.storeValue === 'object' ? this.storeValue : [this.storeValue]
    },
    isCheckboxUsable() {
      return this.multiple && this.showCheckbox
    },
    realData() {
      return this.optionData.map(val => val.value)
    },
    optionData() {
      let filter = []
      let list = []
      // parentValue[node leaf 父亲label]
      this.selectData
        .filter(val => val.parentValue !== 'node')
        .forEach(val => {
          const { parentValue } = val

          if (parentValue !== 'leaf' && !filter.includes(parentValue)) {
            filter.push(parentValue)
            list.push(val)
          } else if (parentValue === 'leaf') {
            filter.push(val.value)
            list.push(val)
          }
        })
      return list
    },
    selectData() {
      if (!this.storeValue.length) {
        return []
      }
      let list = []
      this.data.forEach(item => {
        this.getOptionData(item, list)
      })
      return list
    },
    panelStyle() {
      let style = {}
      if (this.maxWidth) {
        const maxWidth = parseInt(this.maxWidth)
        style.maxWidth = `${maxWidth}px`
      }
      if (this.maxHeight) {
        const maxHeight = parseInt(this.maxHeight)
        style.maxHeight = `${maxHeight}px`
      }
      return style
    }
  },
  watch: {
    value(val) {
      if (this.isChangeValueInTree) {
        this.isChangeValueInTree = false
      } else {
        let value = val
        if (value === null) {
          this.isValueNull = true
          if (this.multiple) {
            value = []
          } else {
            value = ''
          }
        }

        let list = []
        this.handleUpdateTreeNodes({
          data: this.data,
          list,
          checkStrictly: this.checkStrictly,
          isInit: true
        })
        console.log(list, 'watch-value')
        this.storeValue = list
      }
    },
    data: {
      handler(newVal, oldVal) {
        if (this.isChangeValueInTree) {
          this.isChangeValueInTree = false
        } else if (!_isEqual(newVal, oldVal)) {
          let list = []
          this.handleUpdateTreeNodes({
            data: this.data,
            list,
            checkStrictly: this.checkStrictly,
            isInit: true
          })
          console.log(list, 'watch-data', _isEqual(newVal, oldVal))
          this.storeValue = list
        }
      }
    }
  },
  mounted() {
    let list = []
    this.handleUpdateTreeNodes({
      data: this.data,
      list,
      checkStrictly: this.checkStrictly,
      isInit: true
    })
    console.log(list, 'mounted')
    this.storeValue = list
  },
  methods: {
    getOptionData(item, list, info) {
      const checked = this.storeValue.includes(item.value)
      // 选中
      if (checked) {
        if (item.children && item.children.length) {
          // 添加空的占位
          list.push({
            // 自己的
            label: item.title,
            // 自己的
            value: item.value,
            // 自己的
            myLabel: item.title,
            // 优选父节点
            parentValue: 'node'
          })
          item.children.forEach(val => {
            const _info = info || {
              parentLabel: item.title,
              parentValue: item.value
            }

            this.getOptionData(val, list, _info)
          })
        } else {
          list.push({
            // 优选父节点
            label: info ? info.parentLabel : item.title,
            // 自己的
            value: item.value,
            // 自己的
            myLabel: item.title,
            // 优选父节点
            parentValue: info ? info.parentValue : 'leaf'
          })
        }
      } else {
        // 未选中
        if (item.children && item.children.length) {
          item.children.forEach(val => {
            // 循环子集
            this.getOptionData(val, list, info)
          })
        }
      }
    },
    // 删除
    handleFilterListChange(values) {
      const list = this.optionData.filter(val => values.includes(val.value))

      let newValues = []
      list.forEach(item => {
        if (item.parentValue === 'leaf') {
          let find = this.selectData.find(val => val.value === item.value)
          newValues.push(find.value)
        } else {
          let complete = this.selectData.filter(val => val.parentValue === item.parentValue)
          // 找父节点
          if (complete.length) {
            let findParent = this.selectData.find(val => val.value === complete[0].parentValue)
            if (findParent) {
              complete.push(findParent)
            }
          }
          const completeValues = complete.map(val => val.value)
          newValues = [...newValues, ...completeValues]
        }
      })
      this.storeValue = this.storeValue.filter(val => newValues.includes(val))
      this.handleUpdateTreeNodes({ data: this.data })
      this.isChangeValueInTree = true
      this.emitChange()
      console.log(newValues, 'leafData')
    },
    // tree click
    handleSelectNode(selectedNodes, currentNode) {
      if (this.multiple) {
        if (selectedNodes.length) {
          this.storeValue = selectedNodes.map(item => item.value)
        } else {
          this.storeValue = []
        }
      } else {
        if (selectedNodes.length) {
          const node = selectedNodes[0]
          this.storeValue = node.value
        } else {
          this.storeValue = ''
        }
      }
      this.isChangeValueInTree = true
      this.emitChange()
      if (!this.multiple && (!currentNode.children || !currentNode.children.length)) {
        this.closeDropdown()
      }
    },
    // 更新tree
    handleUpdateTreeNodes({ data, list, state = false, isInit = false, checkStrictly = false }) {
      /**
       * 当开启 showCheckbox 时，不能选择，只能勾选，且只有在多选时支持 showCheckbox 属性
       * */
      const valueToArray = isInit ? this.valueToArray : this.storeValueToArray
      data.forEach(item => {
        if (valueToArray.indexOf(item.value) >= 0 || (checkStrictly && state)) {
          if (this.isCheckboxUsable) {
            item.checked = true
          } else {
            item.selected = true
          }
          if (list) {
            list.push(item.value)
          }
          if (item.children && item.children.length) {
            this.handleUpdateTreeNodes({
              data: item.children,
              list,
              state: true,
              checkStrictly,
              isInit
            })
          }
        } else {
          if (this.isCheckboxUsable) {
            item.checked = false
          } else {
            item.selected = false
          }
          if (item.children && item.children.length) {
            this.handleUpdateTreeNodes({ data: item.children, list, checkStrictly, isInit })
          }
        }
      })
    },
    emitChange() {
      if (this.isValueNull) {
        this.isValueNull = false
        this.$emit('input', null)
        return
      }

      const values = this.optionData.map(val => {
        if (val.parentValue === 'leaf') {
          return val.value
        } else if (val.parentValue !== 'node') {
          return val.parentValue
        }
      })
      console.log('emit', values)
      this.$emit('input', values)
      this.$emit('on-change', values)
      // TODO form
      // this.handleFormItemChange('change', this.currentValue)
    },
    // filter
    queryChange(val) {
      this.query = val
    },
    handleInputClick(val) {
      this.$emit('on-click', val)
    },
    handleInputClear(val) {
      this.$emit('on-input-clear', val)
    },
    handleVisibleChange(val) {
      this.$emit('on-visible-change', val)
    },
    closeDropdown() {
      this.$refs['filter-list'].closeDropdown()
    }
  }
}
</script>
