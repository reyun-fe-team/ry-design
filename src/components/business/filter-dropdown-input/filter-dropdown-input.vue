<template>
  <div :class="[prefixCls]">
    <filter-list-panel
      ref="list-panel"
      transfer
      @on-visible-change="handleVisibleChange">
      <filter-list-input
        placeholder="请选择"
        :value="showValueData"
        :label="label"
        :styles="inputStyles"
        :icon-state="iconState">
        <slot
          v-if="$scopedSlots['input-label']"
          slot="input-label"
          name="input-label"></slot>
      </filter-list-input>
      <div
        slot="list"
        :class="[prefixCls + '-wrapper']">
        <rd-radio-group
          v-model="matchingMethod"
          :class="[prefixCls + '-type']"
          :default-list="matchingMethodList"></rd-radio-group>
        <Input
          v-model="inputValue"
          :placeholder="placeholder"
          prefix="ios-search"
          :class="[prefixCls + '-input']"
          :clearable="clearable"></Input>
      </div>
    </filter-list-panel>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-dropdown-input'
import filterListPanel from '@src/components/business/filter-list/filter-list-panel'
import filterListInput from '@src/components/business/filter-list/filter-list-input'
import _isEqual from 'lodash/isEqual'
export default {
  name: prefixCls,
  components: { filterListPanel, filterListInput },
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    inputWidth: {
      type: [String, Number],
      default: 260
    },
    inputHeight: {
      type: [String, Number],
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls,
      iconState: false,
      inputValue: this.value || '',
      matchingMethod: 'LIKE',
      matchingMethodList: [
        { label: '模糊匹配', value: 'LIKE' },
        { label: '精确匹配', value: 'IN' }
      ],
      showValueData: [],
      oldMatchingMethod: 'LIKE'
    }
  },
  computed: {
    inputStyles() {
      let style = {}
      if (this.inputWidth) {
        const width = parseInt(this.inputWidth)
        style.width = `${width}px`
      }
      let height = 32
      if (this.inputHeight) {
        height = parseInt(this.inputHeight)
      }
      style.height = `${height}px`
      return style
    },
    oldInputValue() {
      let value = ''
      if (this.showValueData && this.showValueData.length > 0) {
        value = this.showValueData[0].value
      }
      return value
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.inputValue = this.value || ''
        if (!this.inputValue) {
          this.matchingMethod = 'LIKE'
        }
        this.getShowValueData()
      }
    }
  },
  methods: {
    getShowValueData() {
      let value = []
      if (this.inputValue) {
        value = [{ label: this.inputValue, value: this.inputValue }]
      }
      this.showValueData = value
    },
    handleVisibleChange(val) {
      this.iconState = val
      // 关闭了
      if (!val) {
        const { matchingMethod, inputValue, oldInputValue } = this
        if (
          !_isEqual(inputValue, oldInputValue) ||
          !_isEqual(matchingMethod, this.oldMatchingMethod)
        ) {
          this.oldMatchingMethod = matchingMethod
          this.getShowValueData()
          this.$emit('input', inputValue)
          this.$emit('on-change', { matchingMethod, value: inputValue })
        }
      }
    },
    closeDropdown() {
      this.$refs['list-panel'].closeDropdown()
    },
    updateDropdown() {
      this.$refs['list-panel'].updateDropdown()
    }
  }
}
</script>
