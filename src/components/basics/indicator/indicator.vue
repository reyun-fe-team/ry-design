<template>
  <div
    :class="prefixCls"
    style="display: inline-block; position: relative">
    <div
      ref="indicator-select"
      class="indicator-select"
      :class="[prefixCls + '-select', { active: visible }]"
      :style="{ width: width + 'px' }"
      @mouseenter="hasMouseHoverHead = true"
      @mouseleave="hasMouseHoverHead = false">
      <span
        v-if="selectName"
        class="ivu-select-selected-value">
        {{ selectName }}
      </span>
      <span
        v-else
        class="ivu-select-placeholder">
        {{ placeholder }}
      </span>

      <Icon
        v-if="isShowClear"
        type="ios-close-circle"
        class="ivu-select-arrow"
        :class="{ visble: visible }"
        @click.native.stop="onClear"></Icon>
      <Icon
        v-if="!isShowClear"
        type="ios-arrow-down"
        class="ivu-select-arrow"
        :class="{ visble: visible }"></Icon>
    </div>
    <div
      v-show="visible"
      ref="indicator-select-group"
      :class="[prefixCls + '-select-group']">
      <indicator-group
        v-if="visible"
        :data="formData"
        :min="min"
        :max="max"
        :step="step"
        :unit="unit"
        :precision="precision"
        :indicator-rule="indicatorRule"
        @on-ok="onOk"></indicator-group>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'indicator'

import indicatorGroup from './indicator-group'
export default {
  name: prefixCls,
  components: {
    indicatorGroup
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number],
      default: '184'
    },
    // 步长
    step: {
      type: Number,
      default: 1
    },
    // 单位
    unit: {
      type: String,
      default: ''
    },
    // 数值精度
    precision: {
      type: Number,
      default: 2
    },
    // 输入框最小值
    min: {
      type: Number,
      default: 0
    },
    // 输入框最大值
    max: {
      type: Number,
      default: 100
    },
    // 指标规则
    indicatorRule: {
      type: Array,
      default: () => {
        return [
          {
            value: '=',
            label: '等于'
          },
          {
            value: '!=',
            label: '不等于'
          },
          {
            value: '<',
            label: '小于'
          },
          {
            value: '>',
            label: '大于'
          },
          {
            value: '>=',
            label: '大于等于'
          },
          {
            value: '<=',
            label: '小于等于'
          },
          {
            value: 'BETWEEN',
            label: '介于',
            ruleType: 'number-input-between'
          }
        ]
      },
      require: true
    }
  },
  data() {
    return {
      prefixCls,
      visible: false,
      hasMouseHoverHead: false,
      formData: this.value
    }
  },
  computed: {
    selectName() {
      return this.getIndicatorName(this.formData)
    },
    isShowClear() {
      return this.selectName.length && this.clearable && this.hasMouseHoverHead
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = val
      },
      deep: true
    }
  },
  mounted() {
    document.addEventListener('click', this.isVisible)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.isVisible)
  },
  methods: {
    // 判断是否点击了其他区域
    isVisible(e) {
      if (this.$refs['indicator-select-group'] || this.$refs['indicator-select']) {
        if (this.$refs['indicator-select-group'].contains(e.target)) {
          this.visible = true
        } else if (this.$refs['indicator-select'].contains(e.target)) {
          this.visible = !this.visible
        } else {
          this.visible = false
        }
      }
    },
    onClear() {
      this.formData.value = this.min || 0
      this.formData.startValue = this.min || 0
      this.formData.endValue = this.max || 0
      this.formData.symbol = ''
      this.$emit('input', this.formData)
      this.$emit('on-change', this.formData)
    },
    onOk(val) {
      let params = Object.assign({}, this.formData, val)
      params['selectName'] = this.getIndicatorName(params)
      this.formData = params
      this.$emit('input', this.formData)
      this.$emit('on-change', this.formData)
      this.visible = false
    },
    getIndicatorName({ symbol, value, startValue, endValue, ruleType, symbolLabel }) {
      if (!symbol) {
        return ''
      }
      const filterValue = cur => {
        return `${cur}${this.unit}`
      }
      if (ruleType === 'number-input-between') {
        return symbolLabel + filterValue(startValue) + '-' + filterValue(endValue)
      } else {
        return symbolLabel + filterValue(value)
      }
    }
  }
}
</script>
