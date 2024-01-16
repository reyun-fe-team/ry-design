


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
    @on-change="handleChange"
    @on-open-change="handleOpenChange">
   
  </Select> -->
    {{ currentValue }}
    <rd-filter-list
      ref="filter-list"
      v-model="currentValue"
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
      :show-select-option="showSelectOption"
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
      <Tree
        :data="data"
        :multiple="multiple"
        check-strictly
        :show-checkbox="multiple && showCheckbox"
        check-directly
        :load-data="loadData"
        @on-select-change="handleSelectNode"
        @on-check-change="handleSelectNode"></Tree>
    </rd-filter-list>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'tree-select'
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: prefixCls,
  components: {},
  mixins: [],
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
    placement: String
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
      isValueChangeByTree: false, // 多选时，用于判定是否是从 Select 的 Tag 关闭的标签
      isValueNull: false, // hack：解决 value 置为 null 时，$emit:input 不是 null
      // filer-list
      query: ''
    }
  },
  computed: {
    valueToArray() {
      return typeof this.currentValue === 'object' ? this.currentValue : [this.currentValue]
    },
    isCheckboxUsable() {
      return this.multiple && this.showCheckbox
    },
    transferClassName() {
      return this.transfer ? 'ivu-tree-select-transfer' : ''
    },
    classes() {
      return {
        'ivu-tree-select-with-checkbox': this.showCheckbox
      }
    },
    realData() {
      let value = this.value
      if (value === null) {
        if (this.multiple) {
          value = []
        } else {
          value = ''
        }
      }
      return _cloneDeep(value)
    },
    optionData() {
      return []
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
        this.currentValue = value
        // TODO
        // this.$refs.select.reset()
        this.handleUpdateTreeNodes(this.data, true)
      }
    },
    data() {
      if (this.isChangeValueInTree) {
        this.isChangeValueInTree = false
      } else {
        // TODO
        // this.$refs.select.reset()
        this.handleUpdateTreeNodes(this.data, true)
      }
    }
  },
  mounted() {
    this.handleUpdateTreeNodes(this.data, true)
  },
  methods: {
    handleSelectNode(selectedNodes, currentNode) {
      if (this.multiple) {
        if (selectedNodes.length) {
          this.currentValue = selectedNodes.map(item => item.value)

          this.handleUpdateSelectValue(currentNode.value, currentNode.title)
        } else {
          this.currentValue = []
          this.handleUpdateSelectValue('', '')
        }
      } else {
        if (selectedNodes.length) {
          const node = selectedNodes[0]
          this.currentValue = node.value

          this.handleUpdateSelectValue(node.value, node.title)
        } else {
          this.currentValue = ''
          this.handleUpdateSelectValue('', '')
        }
      }

      this.isChangeValueInTree = true
      this.$emit('input:value', this.currentValue)
      this.$emit('on-change', this.currentValue)
      // TODO form
      // this.handleFormItemChange('change', this.currentValue)
    },
    handleUpdateTreeNodes(data, isInit = false) {
      /**
       * 当开启 showCheckbox 时，不能选择，只能勾选，且只有在多选时支持 showCheckbox 属性
       * */
      data.forEach(item => {
        if (this.valueToArray.indexOf(item.value) >= 0) {
          if (this.isCheckboxUsable) {
            item.checked = true
          } else {
            item.selected = true
          }
          this.handleUpdateSelectValue(item.value, item.title)
        } else {
          if (this.isCheckboxUsable) {
            item.checked = false
          } else {
            item.selected = false
          }
        }

        if (item.children && item.children.length) {
          this.handleUpdateTreeNodes(item.children)
        }
      })

      // Select 在 onOptionClick 方法中，如果是多选，会强制将 isFocused 设置为 true，初始时会有一个蓝框
      if (isInit) {
        // TODO
        // this.$refs.select.isFocused = false
      }
    },
    handleUpdateSelectValue(value, label) {
      if (value === '') {
        // TODO
        // this.$refs.select.reset()
      } else {
        this.isValueChangeByTree = true
        // TODO
        // this.$refs.select.onOptionClick({
        //   value,
        //   label
        // })
      }
    },
    handleChange(value) {
      if (this.isValueChangeByTree) {
        this.isValueChangeByTree = false
      } else {
        this.currentValue = value

        if (this.isValueNull) {
          this.isValueNull = false
          this.$emit('input:value', null)
        } else {
          this.$emit('input:value', value)
        }

        this.$emit('on-change', value)
        this.handleFormItemChange('change', value)
        // TODO
        // this.$refs.select.reset()
        this.handleUpdateTreeNodes(this.data, true)
        this.$nextTick(() => {
          this.isValueChangeByTree = false
        })
      }
    },
    handleOpenChange(status) {
      this.$emit('on-open-change', status)
    },
    // filter
    queryChange(val) {
      this.query = val
    },
    handleInputClick(val) {
      this.$emit('on-click', val)
    },
    handleInputClear(val) {
      debugger
      // this.handleChange()
      this.$emit('on-input-clear', val)
    },
    handleFilterListChange() {
      debugger
    },
    handleVisibleChange(val) {
      // if (
      //   !val &&
      //   this.saveType === 'leave-save' &&
      //   this.multiple &&
      //   !_isEqual(this.current, this.value)
      // ) {
      //   // console.log('离开触发-emitChange')
      //   this.emitChange()
      // }
      this.$emit('on-visible-change', val)
    }
  }
}
</script>
