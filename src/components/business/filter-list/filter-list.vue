<template>
  <div :class="classes">
    <filter-list-panel
      ref="list-panel"
      :trigger="trigger"
      :disabled="disabled"
      :transfer="transfer"
      :placement="placement"
      @on-visible-change="handleVisibleChange">
      <filter-list-input
        :value="inputData"
        :label="label"
        :styles="inputStyles"
        :placeholder="inputPlaceholder"
        :icon-state="iconState"
        :clearable="clearable"
        :show-image="showImage"
        :disabled="disabled"
        :show-description="showDescription"
        :show-subtitle="showSubtitle"
        @on-clear="filterListInputChange"
        @click.native="handlerInputClick"></filter-list-input>
      <div
        slot="list"
        :class="prefixCls + '-body'">
        <div
          :class="prefixCls + '-body-panel'"
          :style="panelStyle">
          <div
            v-if="filterable"
            :class="prefixCls + '-body-panel-search'">
            <Input
              v-model="queryValue"
              :placeholder="filterPlaceholder">
              <Icon
                slot="prefix"
                type="ios-search" />
              <Icon
                v-show="!!query"
                slot="suffix"
                type="ios-close"
                :class="prefixCls + '-body-panel-search-clear'"
                size="20"
                @click="onClearSearch" />
            </Input>
            <slot name="search-operate"></slot>
          </div>
          <div :class="prefixCls + '-body-content'">
            <slot v-if="!notFound"></slot>
            <div
              v-if="notFound"
              :class="prefixCls + '-body-not-found'">
              {{ notFoundText }}
            </div>
          </div>
        </div>
        <filter-list-option
          v-if="showSelectOption"
          ref="filter-list-option"
          v-model="current"
          :filterable="filterable"
          :width="optionWidth"
          :height="heightOption"
          :max-height="maxHeightOption"
          :min-height="minHeightOption"
          :data="optionData"
          @on-change="optionChange"></filter-list-option>
      </div>
    </filter-list-panel>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list'
import filterListPanel from './filter-list-panel'
import filterListOption from './filter-list-option'
import filterListInput from './filter-list-input'
import { oneOf } from '@src/util/assist.js'

export default {
  name: prefixCls,
  components: { filterListPanel, filterListOption, filterListInput },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    realData: Array,
    data: {
      type: Array,
      default() {
        return []
      }
    },
    trigger: String,
    label: String,
    inputPlaceholder: String,
    filterPlaceholder: {
      type: String,
      default: '请输入要搜索的内容'
    },
    query: {
      type: String,
      default: ''
    },
    notFound: {
      type: Boolean,
      default: false
    },
    notFoundText: {
      type: String,
      default: '无匹配数据'
    },
    inputWidth: {
      type: [String, Number],
      default: 200
    },
    inputHeight: [String, Number],
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
    optionWidth: [String, Number],
    filterable: {
      type: Boolean,
      default: false
    },
    showSelectOption: {
      type: Boolean,
      default: false
    },
    clearable: Boolean,
    saveType: {
      type: String,
      default: 'leave-save',
      // 时时保存 always-save 离开保存leave-save
      validator(value) {
        return oneOf(value, ['always-save', 'leave-save'])
      }
    },
    showImage: Boolean,
    showDescription: Boolean,
    showSubtitle: Boolean,
    disabled: Boolean,
    transfer: Boolean,
    placement: String
  },
  data() {
    return {
      prefixCls,
      current: this.value,
      iconState: false,
      queryValue: this.query,
      refHeight: null
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    panelStyle() {
      let style = {}
      if (this.width) {
        const width = parseInt(this.width)
        style.width = `${width}px`
      }
      if (this.inputWidth) {
        const width = parseInt(this.inputWidth)
        style.minWidth = `${width}px`
      }
      return style
    },
    inputData() {
      const data = this.realData ? this.realData : this.value
      return data
        .map(item => {
          return this.data.find(val => val.value === item)
        })
        .filter(val => val)
    },
    optionData() {
      return this.current
        .map(item => {
          return this.data.find(val => val.value === item)
        })
        .filter(val => val)
    },
    inputStyles() {
      let style = {}
      if (this.inputWidth) {
        const width = parseInt(this.inputWidth)
        style.width = `${width}px`
      }
      let height = 32
      if (this.inputHeight) {
        height = parseInt(this.inputHeight)
      } else {
        if (
          ((this.showDescription || this.showImage) && !this.showSubtitle) ||
          ((this.showSubtitle || this.showImage) && !this.showDescription)
        ) {
          height = 48
        } else if (this.showDescription && this.showSubtitle) {
          height = 62
        }
      }
      style.height = `${height}px`
      return style
    },
    heightOption() {
      return this.filterable ? this.height : this.height - (this.refHeight || 0)
    },
    maxHeightOption() {
      return this.filterable ? this.maxHeight : this.maxHeight - (this.refHeight || 0)
    },
    minHeightOption() {
      return this.filterable ? this.minHeight : this.minHeight - (this.refHeight || 0)
    }
  },
  watch: {
    value: {
      handler(val) {
        this.current = val
      },
      deep: true
    },
    queryValue(val) {
      this.$emit('query-change', val)
    }
  },
  methods: {
    closeDropdown() {
      this.$refs['list-panel'].closeDropdown()
    },
    handleVisibleChange(val) {
      this.iconState = val
      if (!val) {
        this.queryValue = ''
      }
      if (val && this.showSelectOption) {
        this.$nextTick(() => {
          this.refHeight = this.$refs['filter-list-option'].getHeaderHeight()
        })
      }
      this.$emit('on-visible-change', val)
    },
    onClearSearch() {
      this.queryValue = ''
    },
    filterListInputChange(val) {
      this.current = val
      this.$emit('input', val)
      this.$emit('on-change', val)
      this.$emit('on-input-clear', val)
    },
    optionChange() {
      this.$emit('input', this.current)
      this.$emit('on-change', this.current)
    },
    handlerInputClick() {
      this.$emit('on-click', this.current)
    }
  }
}
</script>
