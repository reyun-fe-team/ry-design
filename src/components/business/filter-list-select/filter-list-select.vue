<template>
  <div>
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
        v-if="$scopedSlots['input-slot']"
        slot="input-slot">
        <slot name="input-slot"></slot>
      </template>
      <rd-virtual-list
        ref="list"
        :class="[prefixCls + '-virtual-list', 'small-scroll-y']"
        :style="mainStyles"
        data-key="uid"
        :data-sources="getLine"
        :extra-props="{
          groupNameList,
          current,
          multiple,
          renderItem
        }"
        :data-component="virtualComponent"
        v-on="$listeners"
        @on-click="handleClick"></rd-virtual-list>
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
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-select'

import _cloneDeep from 'lodash/cloneDeep'
import { oneOf } from '@src/util/assist.js'
import Emitter from '@src/mixins/emitter'
import virtualComponent from './filter-list-select-virtual.vue'
import rdFilterListDescribe from '../filter-list/filter-list-describe'
import rdFilterListSelectAction from './filter-list-select-action'

const checkValuesNotEqual = (value, values) => {
  const strValue = JSON.stringify(value)
  const strValues = JSON.stringify(values)
  return strValue !== strValues
}
export default {
  name: prefixCls,
  components: { rdFilterListSelectAction },
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
    label: String,
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
    filterMethod: {
      type: Function,
      default(data, query) {
        const type = 'label' in data ? 'label' : 'value'
        return data[type].indexOf(query) > -1
      }
    },
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
    filterPlaceholder: String,
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
    filterData() {
      return this.data.filter(item => this.filterMethod(item, this.query))
    },
    realData() {
      let current = Array.isArray(this.value) ? this.value : [this.value]
      return _cloneDeep(current)
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
    getLine() {
      return this.filterData.map((item, idx) => ({
        uid: `key_${idx}_${item.value}`,
        ...item
      }))
    },
    showFooter() {
      return this.$scopedSlots.footer
    },
    currentShowAction() {
      return this.showAction && !this.showFooter && this.planeVisible
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
    handleVisibleChange(val) {
      this.planeVisible = val
      if (!val && this.saveType === 'leave-save' && this.multiple) {
        // console.log('离开触发-emitChange')
        this.emitChange()
      }
      this.$emit('on-visible-change', val)
    },
    movementChange() {
      const value = this.geteEmitValue()
      this.$emit('before-change', value)
      if (this.saveType === 'always-save' || !this.multiple) {
        // console.log('时时触发-emitChange')
        this.emitChange()
      }
    },
    geteEmitValue() {
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
      const value = this.geteEmitValue()
      this.$emit('input', value)
      this.$emit('on-change', value)
      this.dispatch('FormItem', 'on-form-change', value)
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
    }
  }
}
</script>
