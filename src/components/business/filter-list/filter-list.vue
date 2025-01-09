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
        :label-method="inputLabelMethod"
        @on-clear="filterListInputChange"
        @click.native="handleInputClick">
        <template
          v-if="$scopedSlots['input-label']"
          slot="input-label">
          <slot name="input-label"></slot>
        </template>
      </filter-list-input>
      <div slot="list">
        <div :class="prefixCls + '-body'">
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
            :option-label-method="optionLabelMethod"
            @on-change="optionChange"></filter-list-option>
        </div>
        <!-- :style="styleFooter" -->
        <div
          v-if="showFooter"
          :class="prefixCls + '-footer-border'">
          <slot name="footer"></slot>
        </div>
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
import _throttle from 'lodash/throttle'
import _isEqual from 'lodash/isEqual'

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

    // ----尺寸设置----
    // 输入框宽度 有值就是按照值来设置宽度 没有值就是自适应
    inputWidth: [String, Number],
    // 输入框高度
    inputHeight: [String, Number],
    // 下拉面板宽度
    width: [String, Number],
    // 下拉面板高度
    height: [Number, String],
    // 下拉面板最大高度
    maxHeight: { type: [Number, String], default: 320 },
    // 下拉面板最小高度
    minHeight: [Number, String],
    // 选项宽度
    optionWidth: { type: [String, Number], default: 200 },
    // ----尺寸设置----

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
    placement: String,
    optionLabelMethod: Function,
    inputLabelMethod: Function
  },
  data() {
    return {
      prefixCls,
      current: this.value,
      iconState: false,
      queryValue: this.query,
      refHeight: null,
      // 下拉面板位置监测
      showDropdownPanel: false,
      observeTarget: null,
      intersectionObserver: null,
      animationFrameId: null,
      lastTargetProps: { top: 0, left: 0, width: 0, height: 0 },
      // 下拉面板宽度与input panel 等宽
      sameWidthAsPanelStyle: { minWidth: null }
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    // 是否需要自动计算下拉面板的宽度与input panel 等宽
    // 没有值就是自适应
    dropDownSameWidthAsPanel() {
      return [undefined, null, '', 0].includes(this.inputWidth)
    },
    panelStyle() {
      // 是否需要自动计算下拉面板的宽度与input panel 等宽
      if (this.dropDownSameWidthAsPanel) {
        return this.sameWidthAsPanelStyle
      }

      let style = {}
      if (this.width) {
        const width = parseInt(this.width)
        style.width = `${width}px`
      } else if (this.inputWidth) {
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
          height = 78
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
    },
    showFooter() {
      return this.$scopedSlots.footer
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
  mounted() {
    this.initElementObserver()
  },
  beforeDestroy() {
    this.closeElementObserver()
  },
  methods: {
    // 下拉面板宽度与input panel 等宽
    getDropDownSameWidthAsPanelStyle() {
      if (!this.dropDownSameWidthAsPanel) {
        this.sameWidthAsPanelStyle = { minWidth: null }
        return
      }
      // 自动获取
      const inputPanel = this.$refs['list-panel']
      if (inputPanel) {
        const inputPanelElement = inputPanel.$el
        const inputPanelRect = inputPanelElement.getBoundingClientRect()
        this.sameWidthAsPanelStyle = { minWidth: parseInt(inputPanelRect.width) + 'px' }
      }
    },
    // 关闭监测
    closeElementObserver() {
      if (this.observeTarget) {
        // 视口监测
        // 停止监听特定目标元素
        this.intersectionObserver.unobserve(this.observeTarget)
        // 位置监测
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId)
          this.animationFrameId = null
        }
      }
    },
    // 开启监测
    openElementObserver() {
      if (this.observeTarget) {
        // 视口监测
        // 开始监听一个目标元素
        this.intersectionObserver.observe(this.observeTarget)
        // 位置监测
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId)
        }
        this.animationFrameId = requestAnimationFrame(this.throttledCheckPosition)
      }
    },
    // 销毁监测
    destroyElementObserver() {
      this.closeElementObserver()
      if (this.animationFrameId) {
        this.animationFrameId = null
      }
      if (this.intersectionObserver) {
        // 当你不再需要观察时，调用 disconnect 方法
        this.intersectionObserver.disconnect()
        this.intersectionObserver = null
      }
    },
    // 初始化元素监测器
    initElementObserver() {
      // 被监测元素
      this.observeTarget = this.$refs['list-panel'].$el
      // 初始化监测
      if (this.observeTarget) {
        // 视口监测
        this.intersectionObserver = new IntersectionObserver(entries => {
          for (const entry of entries) {
            // 离开视口 => 关闭下拉面板
            if (!entry.isIntersecting) {
              this.closeDropdown()
              break
            }
          }
        })
        // 位置监测
        this.throttledCheckPosition = _throttle(this.checkElementPosition, 600)
      }
    },
    // 检测元素尺寸、位置
    checkElementPosition() {
      if (this.observeTarget && this.showDropdownPanel) {
        const rect = this.observeTarget.getBoundingClientRect()
        const { top, left, width, height } = rect
        const props = { top, left, width, height }
        // 元素信息变更
        if (!_isEqual(props, this.lastTargetProps)) {
          this.lastTargetProps = props
          this.updateDropdown()
        }
      }
      // 重复监测
      this.animationFrameId = requestAnimationFrame(this.throttledCheckPosition)
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

      // 在打开下拉面板之前更新下拉面板宽度
      // 当前下拉面板未打开，下一步需要打开下拉面板，更新下拉面板宽度
      if (!this.showDropdownPanel && val) {
        this.getDropDownSameWidthAsPanelStyle()
      }

      this.$emit('on-visible-change', val)
      this.showDropdownPanel = val

      this.$nextTick(() => {
        // 打开 ？ 开启监测 ： 关闭监测
        this.showDropdownPanel ? this.openElementObserver() : this.closeElementObserver()
      })
    },
    onClearSearch() {
      this.queryValue = ''
    },
    filterListInputChange(val, oldValues) {
      this.current = val
      this.$emit('input', val)
      this.$emit('on-change', val, oldValues)
      this.$emit('on-input-clear', val, oldValues)
    },
    optionChange(_value, oldValues) {
      this.$emit('input', this.current)
      this.$emit('on-change', this.current, oldValues)
    },
    handleInputClick() {
      this.$emit('on-input-click', this.current)
    },
    // 关闭下拉面板
    closeDropdown() {
      this.$refs['list-panel'].closeDropdown()
      // 关闭监测
      this.closeElementObserver()
    },
    // 更新下拉面板
    updateDropdown() {
      const ref = this.$refs['list-panel']
      ref && ref.updateDropdown()

      // 下拉面板宽度与input panel 等宽
      if (this.showDropdownPanel) {
        this.getDropDownSameWidthAsPanelStyle()
      }
    }
  }
}
</script>
