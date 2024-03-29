


<template>
  <div>
    <!-- storeValue:{{ storeValue }}
    <hr />
    右侧面板展示的数据optionData:{{ optionData.length }}
    <br />
    {{ optionData }}
    <hr />
    全量的数据selectData:{{ selectData.length }}
    <br />
    {{ selectData }} -->
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
        <!-- check-strictly highlight-current check-on-click-node-->
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
          :deep-up-checked="deepUpChecked"
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
import Emitter from '@src/mixins/emitter'
import { oneOf } from '@src/util/assist.js'
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
    deepUpChecked: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    optionLabelMethod: Function,
    saveType: {
      type: String,
      default: 'always-save',
      //default: 'leave-save',
      // 时时保存 always-save 离开保存leave-save
      validator(value) {
        return oneOf(value, ['always-save', 'leave-save'])
      }
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
      isChangeValueInTree: false, // 如果是点击 Tree 里改变的数据，临时置为 true，避免在 watch 的 value 中重复修改 Select 数据
      isValueNull: false, // hack：解决 value 置为 null 时，$emit:input 不是 null
      query: '',
      storeValue: [],
      prefixCls
    }
  },
  computed: {
    childrenKey() {
      return this.defaultProps && this.defaultProps.children
        ? this.defaultProps.children
        : 'children'
    },
    labelKey() {
      return this.defaultProps && this.defaultProps.label ? this.defaultProps.label : 'label'
    },
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
      // 这里的value不需要换成valueKey
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
        } else if (!this.deepUpChecked) {
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
            filter.push(val[this.nodeKey])
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
      list = list.filter(val => !exclude.includes(val[this.nodeKey]))
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
        // 手动计算哪些该选中
        this.handleUpdateTreeNodes({
          data: this.data,
          list,
          isInit: true
        })
        // console.log(list, 'watch-value')
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
          // console.log(list, 'watch-data', _isEqual(newVal, oldVal))
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
      const checked = this.storeValue.includes(item[this.nodeKey])
      if (
        !this.checkStrictly &&
        !this.deepUpChecked &&
        parent &&
        checked &&
        !exclude.includes(parent[this.nodeKey])
      ) {
        exclude.push(parent[this.nodeKey])
      }
      if (info) {
        info.labelStr = info.labelStr + '/' + item[this.labelKey]
        info.valueStr = info.valueStr + '/' + item[this.nodeKey]
      }
      // 选中
      if (checked) {
        if (item[this.childrenKey] && item[this.childrenKey].length) {
          // 添加空的占位
          list.push({
            // 自己的
            label: item[this.labelKey],
            // 自己的
            value: item[this.nodeKey],
            // 优选父节点
            parentValue: info ? info.parentValue : '',
            parentLabel: info ? info.parentLabel : '',
            type: 'node',
            labelStr: info ? info.labelStr : item[this.labelKey],
            valueStr: info ? info.valueStr : item[this.nodeKey]
          })
          item[this.childrenKey].forEach(val => {
            let _info = {}

            if (info) {
              _info = {
                parentLabel: info.parentLabel,
                parentValue: info.parentValue,
                labelStr: info.labelStr,
                valueStr: info.valueStr
              }
            } else {
              _info = {
                parentLabel: item[this.labelKey],
                parentValue: item[this.nodeKey],
                labelStr: item[this.labelKey],
                valueStr: item[this.nodeKey]
              }
            }
            this.getOptionData(val, list, _info, item, exclude)
          })
        } else {
          list.push({
            // 优选父节点
            label: item[this.labelKey],
            // 自己的
            value: item[this.nodeKey],
            // 自己的
            myLabel: item[this.labelKey],
            parentLabel: info ? info.parentLabel : item[this.labelKey],
            // 优选父节点
            parentValue: info ? info.parentValue : item[this.nodeKey],
            type: 'leaf',
            labelStr: info ? info.labelStr : item[this.labelKey],
            valueStr: info ? info.valueStr : item[this.nodeKey]
          })
        }
      } else {
        // 未选中
        if (item[this.childrenKey] && item[this.childrenKey].length) {
          item[this.childrenKey].forEach(val => {
            // 循环子集
            this.getOptionData(val, list, info, item, exclude)
          })
        }
      }
    },
    // 删除
    handleFilterListChange(values, oldValues) {
      const list = this.optionData.filter(val => values.includes(val[this.nodeKey]))
      let newValues = []
      if (this.checkStrictly) {
        this.storeValue = values
        this.$refs.tree.setCheckedKeys(this.storeValue)
      } else if (!this.deepUpChecked) {
        list.forEach(item => {
          if (item.type === 'leaf') {
            let find = this.selectData.find(val => val[this.nodeKey] === item[this.nodeKey])
            newValues.push(find[this.nodeKey])
          } else {
            let complete = this.selectData.filter(val => val.parentValue === item.parentValue)
            // 找父节点
            if (complete.length) {
              let findParent = this.selectData.find(
                val => val[this.nodeKey] === complete[0].parentValue
              )
              if (findParent) {
                complete.push(findParent)
              }
            }
            const completeValues = complete.map(val => val[this.nodeKey])
            newValues = [...newValues, ...completeValues]
          }
        })
        this.storeValue = this.storeValue.filter(val => newValues.includes(val))
        this.$refs.tree.setCheckedKeys(this.storeValue)
      } else {
        // 底层选中
        // newValues = list.map(val => val[this.nodeKey])
        // this.storeValue = this.storeValue.filter(val => newValues.includes(val))
        // 获取所有事选中状态的节点value
        this.$refs.tree.deleteCheckedKeys(oldValues)
        this.storeValue = this.$refs.tree.getCheckedKeys()
      }

      this.isChangeValueInTree = true
      this.movementChange()
    },
    // tree click
    handleSelectNode() {
      if (this.multiple) {
        const selectedNodes = this.$refs.tree.getCheckedKeys()
        // console.log('selectedNodes:selectedNodes', selectedNodes)
        if (selectedNodes.length) {
          this.storeValue = selectedNodes
        } else {
          this.storeValue = []
        }

        this.isChangeValueInTree = true
        this.movementChange()
      }
    },
    // 单选
    currentChange(currentData) {
      if (!this.multiple) {
        this.storeValue = [currentData[this.nodeKey]]
        // this.emitChange()
        this.movementChange()
      }
    },
    // 更新tree
    handleUpdateTreeNodes({ data, list, state = false, isInit = false }) {
      /**
       * 当开启 showCheckbox 时，不能选择，只能勾选，且只有在多选时支持 showCheckbox 属性
       * */
      const valueToArray = isInit ? this.valueToArray : this.storeValueToArray
      data.forEach(item => {
        if (valueToArray.indexOf(item[this.nodeKey]) >= 0 || state) {
          if (list) {
            list.push(item[this.nodeKey])
          }
          if (item[this.childrenKey] && item[this.childrenKey].length) {
            this.handleUpdateTreeNodes({
              data: item[this.childrenKey],
              list,
              state: this.deepUpChecked ? false : true,
              isInit
            })
          }
        } else {
          if (item[this.childrenKey] && item[this.childrenKey].length) {
            this.handleUpdateTreeNodes({ data: item[this.childrenKey], list, isInit })
          }
        }
      })
    },
    movementChange() {
      if (this.saveType === 'always-save' || !this.multiple) {
        // console.log('时时触发-emitChange')
        this.emitChange()
      }
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
        } else if (!this.deepUpChecked) {
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
      const halfCheckedKeys = this.getHalfCheckedKeys()
      const halfAndCheckedKeys = [...values, ...halfCheckedKeys]
      this.$emit('input', values)
      this.$emit('on-change', values, {
        halfCheckedKeys,
        halfAndCheckedKeys
      })
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
      this.storeValue = []
      this.$refs.tree.setCheckedKeys(this.storeValue)
      if (this.saveType === 'leave-save' && this.multiple) {
        this.emitChange()
      }
      this.$emit('on-input-clear', val)
    },
    handleVisibleChange(val) {
      if (
        !val &&
        this.saveType === 'leave-save' &&
        this.multiple &&
        !_isEqual(this.current, this.value)
      ) {
        // console.log('离开触发-emitChange')
        this.emitChange()
      }
      this.$emit('on-visible-change', val)
    },
    closeDropdown() {
      this.$refs['filter-list'].closeDropdown()
    },
    filterNodeMethod(value, data) {
      return data[this.labelKey].includes(value)
    },
    getHalfCheckedKeys() {
      return this.$refs.tree.getHalfCheckedKeys()
    }
  }
}
</script>
