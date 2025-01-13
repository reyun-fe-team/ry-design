<template>
  <rd-filter-list
    ref="filter-list"
    v-model="current"
    :real-data="realData"
    :data="data"
    :label="label"
    :trigger="trigger"
    :query="query"
    :not-found-text="notFoundText"
    :not-found="!filterData.length"
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
    :show-image="showImage"
    :show-description="showDescription"
    :show-subtitle="showSubtitle"
    :input-placeholder="inputPlaceholder"
    :filter-placeholder="filterPlaceholder"
    :disabled="disabled"
    :transfer="transfer"
    :placement="placement"
    @query-change="queryChange"
    @on-visible-change="handleVisibleChange"
    @on-input-click="handleInputClick"
    @on-input-clear="handleInputClear"
    @on-change="handleFilterListChange">
    <template
      v-if="$scopedSlots['input-label']"
      slot="input-label">
      <slot name="input-label"></slot>
    </template>
    <!-- 全选 -->
    <rd-filter-list-select-all
      v-if="selectAll && multiple && isSelectEntity"
      :checked-all="checkedAll"
      :checked-all-indeterminate="checkedAllIndeterminate"
      @on-checked-all="toggleSelectAll"></rd-filter-list-select-all>
    <rd-virtual-list
      ref="list"
      :class="[prefixCls + '-virtual-list', 'small-scroll-y']"
      :style="mainStyles"
      data-key="uid"
      :data-sources="filterData"
      :extra-props="{
        current,
        multiple,
        renderItem,
        groupCheckObj,
        groupCheckbox
      }"
      :data-component="virtualComponent"
      v-on="$listeners"
      @on-click="handleClick"
      @on-group-click="handleGroupClick"></rd-virtual-list>
    <template slot="search-operate">
      <slot name="search-operate"></slot>
    </template>
    <div
      slot="footer"
      @click.stop>
      <slot
        name="footer"
        @click.stop>
        <rd-filter-list-select-action
          v-if="currentShowAction"
          :before-action-ok="beforeActionOk"
          :action-rule-validate="actionRuleValidate"
          :update-dropdown="updateDropdown"
          :placeholder="actionPlaceholder"
          :action-text="actionText"
          :action-button-text="actionButtonText"
          :action-count="actionCount"
          :action-total="actionTotal"
          :action-hide-total="actionHideTotal"
          @on-ok="handleActionOk"></rd-filter-list-select-action>
      </slot>
    </div>
  </rd-filter-list>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-select'

import _cloneDeep from 'lodash/cloneDeep'
import _isEqual from 'lodash/isEqual'
import _uniq from 'lodash/uniq'
import { oneOf } from '@src/util/assist.js'
import Emitter from '@src/mixins/emitter'
import virtualComponent from './filter-list-select-virtual.vue'
import rdFilterListDescribe from '../filter-list/filter-list-describe'
import rdFilterListSelectAction from './filter-list-select-action'
import rdFilterListSelectAll from './filter-list-select-all'

const checkValuesNotEqual = (value, values) => {
  const strValue = JSON.stringify(value)
  const strValues = JSON.stringify(values)
  return strValue !== strValues
}
export default {
  name: prefixCls,
  components: { rdFilterListSelectAction, rdFilterListSelectAll },
  mixins: [Emitter],
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [Array, String, Number],
      default: () => {
        return []
      }
    },
    label: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    groupNameList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    notFoundText: String,
    filterable: Boolean,
    showSelectOption: Boolean,
    clearable: Boolean,
    trigger: String,
    saveType: {
      type: String,
      default: 'always-save',
      //default: 'leave-save',
      // 时时保存 always-save 离开保存leave-save
      validator(value) {
        return oneOf(value, ['always-save', 'leave-save'])
      }
    },
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
    filterMethod: Function,
    // filterMethod: {
    //   type: Function,
    //   default(data, query) {
    //     const type = 'label' in data ? 'label' : 'value'
    //     return data[type].indexOf(query) > -1
    //   }
    // },
    labelMethod: {
      type: Function,
      default(data) {
        return 'label' in data ? data.label : ''
      }
    },
    showImage: Boolean,
    showDescription: Boolean,
    showSubtitle: Boolean,
    inputPlaceholder: String,
    filterPlaceholder: {
      type: String,
      default: '英文,分隔多个'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    transfer: Boolean,
    beforeChange: Function,
    placement: String,
    showAction: {
      type: Boolean,
      default: false
    },
    beforeActionOk: Function,
    actionRuleValidate: Object,
    actionPlaceholder: String,
    actionText: String,
    actionButtonText: String,
    actionCount: Function,
    actionTotal: Number,
    actionHideTotal: Boolean,
    showItemDelete: {
      type: Boolean,
      default: false
    },
    selectAll: {
      type: Boolean,
      default: true
    },
    // 是否能添加其他组/主体
    isSelectEntity: {
      type: Boolean,
      default: true
    },
    groupCheckbox: {
      type: Boolean,
      default: true
    },
    filterBySplit: {
      type: String,
      default: ','
    },
    filterByCustom: {
      type: Array,
      default: () => ['label']
    },
    max: {
      type: Number,
      default: 0
    },
    // 开启远端搜索
    remote: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      current: [],
      query: '',
      virtualComponent,
      planeVisible: false,
      renderItem: (h, { row, index }) => {
        let node = null
        const itemSlot = this.$scopedSlots['select-item']
        const describeSlot = this.$scopedSlots['describe-operate']
        if (itemSlot) {
          node = h('div', [itemSlot({ row, index })])
        } else {
          node = h(
            rdFilterListDescribe,
            {
              style: {
                width: '100%'
              },
              props: {
                height: this.getHeight(row),
                src: row.src,
                text: this.getLabel(row),
                showImage: true,
                showDescription: true,
                description: row.description,
                showSubtitle: true,
                subtitle: row.subtitle,
                showTitle: true,
                showDelete: this.showItemDelete && !row.disabled
              },
              on: {
                'on-delete': () => {
                  if (!row.disabled) {
                    this.$emit('on-item-delete', { row, index })
                  }
                }
              }
            },
            describeSlot ? describeSlot({ row, index }) : null
          )
        }

        return node
      }
    }
  },
  computed: {
    currentData() {
      const size = this.current.length
      const exceedValid = this.isCountMax && size >= this.max
      let _groupValue = ''
      let list = this.data.map((item, idx) => {
        if (this.groupNameList[item.value]) {
          _groupValue = item.value
        }
        const checked = this.current.includes(item.value)
        return {
          ...item,
          uid: `key_${idx}_${item.value}`,
          _groupValue,
          disabled: item.disabled || (checked ? false : exceedValid)
        }
      })
      if (
        !this.isSelectEntity &&
        this.groupNameList &&
        Object.keys(this.groupNameList).length &&
        size
      ) {
        const findItem = list.find(val => this.current.includes(val.value))
        if (findItem) {
          list.forEach(val => {
            val.disabled = val._groupValue !== findItem._groupValue ? true : val.disabled
          })
        } else {
          console.log(new Error(`[rd-filter-Select] 存在异常value请检查 , ${this.current}`))
        }
      }
      return list
    },
    filterData() {
      if (this.remote) {
        return this.currentData
      }

      const query = this.query.trim()
      if (this.filterMethod) {
        return this.currentData.filter(item => this.filterMethod(item, query))
      }
      // 兼容中英文逗号
      const filterBySplit = [',', '，'].includes(this.filterBySplit) ? /[,，]/ : this.filterBySplit

      let searchTerms = filterBySplit
        ? query.split(filterBySplit).filter(Boolean)
        : [query].filter(Boolean)

      if (!searchTerms.length) {
        return this.currentData
      }
      return this.currentData.filter(data => {
        // filterByCustom : 可以通过label、value、description等多种方式查询
        const labels = this.filterByCustom.map(val => data[val]).filter(Boolean)
        return labels.some(val => {
          return searchTerms.some(ele => val.toUpperCase().includes(ele.trim().toUpperCase()))
        })
      })
    },
    realData() {
      const current = Array.isArray(this.value) ? this.value : [this.value]
      return _cloneDeep(current)
    },
    isCountMax() {
      return this.max !== 0
    },
    mainStyles() {
      let style = {}
      if (this.height) {
        const height = parseInt(this.height)
        style.height = `${height}px`
      }
      if (this.maxHeight) {
        const maxHeight = parseInt(this.maxHeight)
        style.maxHeight = `${maxHeight}px`
      }
      if (this.minHeight) {
        const minHeight = parseInt(this.minHeight)
        style.minHeight = `${minHeight}px`
      }
      return style
    },
    showFooter() {
      return this.$scopedSlots.footer
    },
    currentShowAction() {
      return this.showAction && !this.showFooter && this.planeVisible
    },
    validKeysCount() {
      return this.filterData
        .filter(data => !data.disabled && this.current.indexOf(data.value) > -1)
        .map(data => data.value).length
    },
    checkedAll() {
      return (
        this.filterData.filter(data => !data.disabled).length === this.validKeysCount &&
        this.validKeysCount !== 0
      )
    },
    checkedAllIndeterminate() {
      return !this.checkedAll && this.validKeysCount !== 0
    },
    groupCheckObj() {
      let params = {}
      if (this.groupNameList && Object.keys(this.groupNameList).length) {
        Object.keys(this.groupNameList).forEach(key => {
          const groups = this.filterData.filter(val => val._groupValue === key && !val.disabled)
          let check = !!groups.length && groups.every(val => this.current.includes(val.value))
          if (!check && this.isCountMax) {
            const tol = groups.reduce((total, val) => {
              if (this.current.includes(val.value)) {
                total = total + 1
              }
              return total
            }, 0)
            if (tol >= this.max) {
              check = true
            }
          }
          const indeterminate = !check && groups.some(val => this.current.includes(val.value))
          const disabled = groups.length ? groups.every(val => val.disabled) : true
          const groupFirstKey = groups.length ? groups[0].value : key
          if (groupFirstKey) {
            params[groupFirstKey] = {
              check,
              disabled,
              indeterminate,
              groupName: this.groupNameList[key]
            }
          }
        })
      }
      return params
    }
  },
  watch: {
    value(value) {
      if (value === '') {
        this.current = []
      } else if (checkValuesNotEqual(value, this.current)) {
        this.$nextTick(() => {
          const data = this.getInitialValue()
          this.current = data
        })
      }
    }
  },
  mounted() {
    const data = this.getInitialValue()
    this.current = data
  },
  methods: {
    getLabel(val) {
      return this.labelMethod(val)
    },
    getHeight({ description, src, subtitle }) {
      if (this.selectItemHeight) {
        return parseInt(this.selectItemHeight)
      }
      let count = 32
      if (((description || src) && !subtitle) || ((subtitle || src) && !description)) {
        count = 48
      }
      if (description && subtitle) {
        count = 78
      }
      return count
    },
    getInitialValue() {
      const { multiple, value } = this
      let initialValue = Array.isArray(value) ? _cloneDeep(value) : [value]
      if (
        !multiple &&
        (typeof initialValue[0] === 'undefined' ||
          (String(initialValue[0]).trim() === '' && !Number.isFinite(initialValue[0])))
      ) {
        initialValue = []
      }
      return initialValue
    },
    queryChange(val) {
      this.query = val
      this.$refs['list'] && this.$refs['list'].scrollToIndex(0)
      this.$emit('query-change', val)
    },
    handleClick({ value }) {
      if (this.multiple) {
        if (this.current.includes(value)) {
          this.current = this.current.filter(item => item !== value)
        } else {
          this.current.push(value)
        }
      } else {
        this.current = [value]
        // 单选选中后当saveType时时关闭时候要关闭Dropdown
        if (this.saveType === 'always-save') {
          this.$refs['filter-list'].closeDropdown()
        }
      }
      this.movementChange()
    },
    handleGroupClick(data) {
      if (!this.multiple) {
        return
      }
      const groups = this.filterData.filter(
        val => val._groupValue === data._groupValue && !val.disabled
      )
      const values = groups.map(val => val.value)

      const check = !this.groupCheckObj[data.value].check
      values.forEach(value => {
        if (
          check &&
          !this.current.includes(value) &&
          (this.isCountMax ? this.current.length < this.max : true)
        ) {
          this.current.push(value)
        } else if (!check) {
          this.current = this.current.filter(item => item !== value)
        }
      })
      this.movementChange()
    },
    handleVisibleChange(val) {
      this.planeVisible = val
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
    movementChange() {
      const value = this.getEmitValue()
      this.$emit('before-change', value)
      if (this.saveType === 'always-save' || !this.multiple) {
        // console.log('时时触发-emitChange')
        this.emitChange()
      }
    },
    getEmitValue() {
      let emitValue = this.multiple ? _cloneDeep(this.current) : this.current[0]
      // Form 重置时，如果初始值是 null，也置为 null，而不是 []
      if (
        (Array.isArray(emitValue) && !emitValue.length && this.value === null) ||
        (emitValue === undefined && this.value === null)
      ) {
        emitValue = null
      }
      return emitValue
    },
    emitChange() {
      // console.log('更新-emitChange')
      const value = this.getEmitValue()
      this.$emit('input', value)
      this.dispatch('FormItem', 'on-form-change', value)
      this.$nextTick(() => {
        const optionData = this.$refs['filter-list'] ? this.$refs['filter-list'].optionData : []
        this.$emit('on-change', value, { optionData })
      })
    },
    handleInputClick(val) {
      this.$emit('on-click', val)
    },
    handleInputClear(val) {
      if (this.saveType === 'leave-save' && this.multiple) {
        this.emitChange()
      }
      this.$emit('on-input-clear', val)
    },
    handleFilterListChange() {
      this.movementChange()
    },
    handleActionOk(val) {
      this.$emit('on-action-ok', val)
    },
    updateDropdown() {
      this.$refs['filter-list'].updateDropdown()
    },
    toggleSelectAll(status) {
      let values = this.filterData.filter(data => !data.disabled).map(data => data.value)
      let current = status
        ? _uniq([...this.current, ...values])
        : this.current.filter(val => !values.includes(val))
      if (this.isCountMax) {
        current = current.slice(0, this.max)
      }
      this.current = current
      this.movementChange()
    }
  }
}
</script>
