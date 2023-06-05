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
      @query-change="queryChange"
      @on-visible-change="handleVisibleChange">
      <rd-virtual-list
        ref="list"
        :class="[prefixCls + '-virtual-list', 'small-scroll-y']"
        :style="mainStyles"
        data-key="uid"
        :data-sources="getLine"
        :extra-props="{ filterData, groupNameList, current, multiple, inputHeight }"
        :data-component="virtualComponent"
        v-on="$listeners"
        @on-click="handleClick" />
      <templat slot="search-operate">
        <slot name="search-operate"></slot>
      </templat>
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

const checkValuesNotEqual = (value, values) => {
  const strValue = JSON.stringify(value)
  const strValues = JSON.stringify(values)
  return strValue !== strValues
}
export default {
  name: prefixCls,
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
      default: 320
    },
    minHeight: [Number, String],
    inputWidth: [String, Number],
    inputHeight: [String, Number],
    optionWidth: [String, Number],
    filterMethod: {
      type: Function,
      default(data, query) {
        const type = 'label' in data ? 'label' : 'value'
        return data[type].indexOf(query) > -1
      }
    }
  },
  data() {
    return {
      prefixCls,
      current: [],
      query: '',
      virtualComponent
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
    pullCurrentWatch() {
      // 其实程序做到这一步就可以监听到数据的变化了，再用JSON.parse做数据还原方便后边数据处理。
      return JSON.parse(JSON.stringify(this.current))
    },
    getLine() {
      return this.filterData.map((item, idx) => ({
        uid: `key_${idx}`,
        ...item
      }))
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
        // if (!this.multiple) {
        //   this.dispatch('FormItem', 'on-form-change', this.publicValue)
        // }
      }
    },
    pullCurrentWatch(now, before) {
      if (this.saveType === 'always-save' || !this.multiple) {
        const newValue = JSON.stringify(now)
        const oldValue = JSON.stringify(before)
        const shouldEmitInput = newValue === oldValue
        if (!shouldEmitInput) {
          // console.log('时时触发-emitChange')
          this.emitChange()
        }
      }
    }
  },
  mounted() {
    const data = this.getInitialValue()
    this.current = data
  },
  methods: {
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
    emitChange() {
      let emitValue = this.multiple ? _cloneDeep(this.current) : this.current[0]
      // Form 重置时，如果初始值是 null，也置为 null，而不是 []
      if (Array.isArray(emitValue) && !emitValue.length && this.value === null) {
        emitValue = null
      } else if (emitValue === undefined && this.value === null) {
        emitValue = null
      }
      // console.log('更新数据-emitChange')
      this.$emit('input', emitValue)
      this.$emit('on-change', emitValue)
      this.dispatch('FormItem', 'on-form-change', emitValue)
    },
    queryChange(val) {
      this.query = val
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
        this.$refs['filter-list'].closeDropdown()
      }
    },
    handleVisibleChange(val) {
      if (!val && this.saveType === 'leave-save' && this.multiple) {
        // console.log('离开触发-emitChange')
        this.emitChange()
      }
      this.$emit('on-visible-change', val)
    }
  }
}
</script>