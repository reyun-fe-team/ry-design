


<template>
  <div>
    <!-- querySelections:{{ querySelections }} -->
    <hr />
    <!-- storeValue:{{ storeValue }} -->
    <hr />
    optionData:{{ optionData }}
    <hr />
    selectData:{{ selectData.length }}--
    <br />
    {{ selectData }}

    <rd-filter-list
      ref="filter-list"
      :value="realData"
      :real-data="realData"
      :data="optionData"
      :show-select-option="showSelectOption"
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
      :clearable="clearable"
      :input-placeholder="inputPlaceholder"
      :filter-placeholder="filterPlaceholder"
      :transfer="transfer"
      :placement="placement"
      :option-label-method="optionLabelMethod"
      @query-change="queryChange"
      @on-visible-change="handleVisibleChange"
      @on-input-click="handleInputClick"
      @on-input-clear="handleInputClear"
      @on-change="handleFilterListChange">
      <div
        :style="panelStyle"
        :class="prefixCls + '-body'">
        <!-- <Tree
          ref="tree"
          :data="querySelections"
          check-directly
          :multiple="multiple"
          :show-checkbox="multiple && showCheckbox"
          :load-data="loadData"
          @on-select-change="handleSelectNode"
          @on-check-change="handleSelectNode"></Tree> -->
        <!-- check-strictly       highlight-current check-on-click-node-->
        <rd-tree
          ref="tree"
          :data="data"
          :show-checkbox="showCheckbox"
          default-expand-all
          :node-key="nodeKey"
          :props="defaultProps"
          :highlight-current="!multiple"
          :filter-node-method="filterNodeMethod"
          :check-on-click-node="false"
          :deep-up-check="deepUpCheck"
          :check-strictly="checkStrictly"
          @check="handleSelectNode"
          @current-change="currentChange"></rd-tree>
      </div>
    </rd-filter-list>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'tree-select'
import _isEqual from 'lodash/isEqual'
// import _cloneDeep from 'lodash/cloneDeep'
import Emitter from '@src/mixins/emitter'

export default {
  name: prefixCls,
  mixins: [Emitter],
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
    filterNodeMethod: {
      type: Function,
      default(value, data) {
        return data.label.includes(value)
      }
    },
    filterable: Boolean,
    showSelectOption: Boolean,
    clearable: Boolean,
    inputPlaceholder: String,
    filterPlaceholder: String,
    placement: String,
    maxWidth: {
      type: [String, Number],
      default: ''
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    nodeKey: {
      type: String,
      default: 'value'
    },
    selectType: {
      // 'click-down' 1默认向下 2向上 'click-down' 3 不处理 'click-no'
      type: String,
      default: 'click-down'
    },
    deepUpCheck: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    optionLabelMethod: Function
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
      if (!this.selectData.length) {
        return []
      }
      let list = []
      // type[node leaf]
      let filter = []
      if (this.multiple) {
        if (this.checkStrictly) {
          this.selectData.forEach(val => {
            list.push(val)
          })
        } else if (!this.deepUpCheck) {
          this.selectData
            .filter(val => val.type !== 'node')
            .forEach(val => {
              if (!filter.includes(val.parentValue)) {
                filter.push(val.parentValue)
                list.push(val)
              }
            })
        } else {
          this.selectData.forEach(val => {
            filter.push(val.value)
            list.push(val)
          })
        }
      } else {
        list = this.selectData
      }
      return list
    },
    selectData() {
      if (!this.storeValue.length) {
        return []
      }
      let list = []
      let exclude = []
      this.data.forEach(item => {
        this.getOptionData(item, list, null, null, exclude)
      })
      list = list.filter(val => !exclude.includes(val.value))
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
    },
    querySelections() {
      const { query } = this
      function filterTitleWithOne(node) {
        if (Array.isArray(node.children)) {
          node.children = node.children.filter(filterTitleWithOne)
        }
        return (
          node.label.includes(query) || (Array.isArray(node.children) && node.children.length > 0)
        )
      }
      const intermediateList = this.data.filter(filterTitleWithOne)
      return intermediateList
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
          isInit: true
        })
        console.log(list, 'watch-value')
        this.storeValue = list
        this.$refs.tree.setCheckedKeys(this.storeValue)
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
            isInit: true
          })
          console.log(list, 'watch-data', _isEqual(newVal, oldVal))
          this.storeValue = list
          this.$refs.tree.setCheckedKeys(this.storeValue)
        }
      }
    }
  },
  mounted() {
    let list = []
    this.handleUpdateTreeNodes({
      data: this.data,
      list,
      isInit: true
    })
    this.storeValue = list
    this.$refs.tree.setCheckedKeys(this.storeValue)
  },
  methods: {
    getOptionData(item, list, info, parent, exclude) {
      const checked = this.storeValue.includes(item.value)
      if (
        !this.checkStrictly &&
        !this.deepUpCheck &&
        parent &&
        checked &&
        !exclude.includes(parent.value)
      ) {
        exclude.push(parent.value)
      }
      if (info) {
        info.LabelStr = info.LabelStr + '/' + item.label
        info.valueStr = info.valueStr + '/' + item.value
      }
      // 选中
      if (checked) {
        if (item.children && item.children.length) {
          // 添加空的占位
          list.push({
            // 自己的
            label: item.label,
            // 自己的
            value: item.value,
            // 优选父节点
            parentValue: info ? info.parentValue : '',
            parentLabel: info ? info.parentLabel : '',
            type: 'node',
            LabelStr: info ? info.LabelStr : item.label,
            valueStr: info ? info.valueStr : item.value
          })
          item.children.forEach(val => {
            let _info = {}

            if (info) {
              _info = {
                parentLabel: info.parentLabel,
                parentValue: info.parentValue,
                LabelStr: info.LabelStr,
                valueStr: info.valueStr
              }
            } else {
              _info = {
                parentLabel: item.label,
                parentValue: item.value,
                LabelStr: item.label,
                valueStr: item.value
              }
            }
            this.getOptionData(val, list, _info, item, exclude)
          })
        } else {
          list.push({
            // 优选父节点
            label: item.label,
            // 自己的
            value: item.value,
            // 自己的
            myLabel: item.label,
            parentLabel: info ? info.parentLabel : item.label,
            // 优选父节点
            parentValue: info ? info.parentValue : item.value,
            type: 'leaf',
            LabelStr: info ? info.LabelStr : item.label,
            valueStr: info ? info.valueStr : item.value
          })
        }
      } else {
        // 未选中
        if (item.children && item.children.length) {
          item.children.forEach(val => {
            // 循环子集
            this.getOptionData(val, list, info, item, exclude)
          })
        }
      }
    },
    // 删除
    handleFilterListChange(values, oldValues) {
      const list = this.optionData.filter(val => values.includes(val.value))
      let newValues = []
      if (this.checkStrictly) {
        this.storeValue = values
        this.$refs.tree.setCheckedKeys(this.storeValue)
      } else if (!this.deepUpCheck) {
        list.forEach(item => {
          if (item.type === 'leaf') {
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
        this.$refs.tree.setCheckedKeys(this.storeValue)
      } else {
        // 底层选中
        // newValues = list.map(val => val.value)
        // this.storeValue = this.storeValue.filter(val => newValues.includes(val))
        // 获取所有事选中状态的节点value
        this.$refs.tree.deleteCheckedKeys(oldValues)
        this.storeValue = this.$refs.tree.getCheckedKeys()
      }

      this.isChangeValueInTree = true
      this.emitChange()
    },
    // tree click
    handleSelectNode() {
      if (this.multiple) {
        const selectedNodes = this.$refs.tree.getCheckedKeys()
        console.log('selectedNodes:selectedNodes', selectedNodes)
        if (selectedNodes.length) {
          this.storeValue = selectedNodes
        } else {
          this.storeValue = []
        }

        this.isChangeValueInTree = true
        this.emitChange()
      }
    },
    // 单选
    currentChange(currentData) {
      if (!this.multiple) {
        this.storeValue = [currentData.value]
        this.emitChange()
      }
    },
    // 更新tree
    handleUpdateTreeNodes({ data, list, state = false, isInit = false }) {
      /**
       * 当开启 showCheckbox 时，不能选择，只能勾选，且只有在多选时支持 showCheckbox 属性
       * */
      const valueToArray = isInit ? this.valueToArray : this.storeValueToArray
      data.forEach(item => {
        if (valueToArray.indexOf(item.value) >= 0 || state) {
          if (list) {
            list.push(item.value)
          }
          if (item.children && item.children.length) {
            this.handleUpdateTreeNodes({
              data: item.children,
              list,
              state: true,
              isInit
            })
          }
        } else {
          if (item.children && item.children.length) {
            this.handleUpdateTreeNodes({ data: item.children, list, isInit })
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
      let values = null

      if (this.multiple) {
        if (this.checkStrictly) {
          values = this.storeValue
        } else if (!this.deepUpCheck) {
          values = this.optionData
            .filter(val => val.type === 'leaf')
            .map(val => {
              return val.parentValue
            })
        } else {
          values = this.storeValue
        }
      } else {
        values = this.storeValue[0]
      }
      this.$emit('input', values)
      this.$emit('on-change', values)
      this.dispatch('FormItem', 'on-form-change', values)
    },
    // filter
    queryChange(val) {
      this.query = val
      this.$refs['tree'].filter(val)
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
