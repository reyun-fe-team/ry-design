<template>
  <div :class="[prefixCls]">
    <div :class="[prefixCls + '-list', 'small-scroll-y']">
      <div
        v-for="(item, index) in indicatorRule"
        :key="index"
        :class="[prefixCls + '-list-item', { active: symbol === item.value }]"
        @click="onChange(item)">
        <span>{{ item.label }}</span>
      </div>
    </div>

    <div :class="[prefixCls + '-right']">
      <div :class="[prefixCls + '-right-body']">
        <Form
          ref="form"
          inline
          :model="formData"
          :rules="rules"
          @submit.prevent>
          <div
            v-if="ruleType === 'number-input-between'"
            class="input-between">
            <FormItem>
              <InputNumber
                v-model="formData.startValue"
                :class="[prefixCls + '-input-number-width']"
                :precision="precision"
                :active-change="false"
                placeholder="请输入"
                :step="step"
                :min="min"
                :max="max"></InputNumber>
            </FormItem>
            <span :class="[prefixCls + '-right-body-line']">-</span>
            <FormItem>
              <InputNumber
                v-model="formData.endValue"
                :class="[prefixCls + '-input-number-width']"
                :precision="precision"
                :active-change="false"
                placeholder="请输入"
                :step="step"
                :min="min"
                :max="max"></InputNumber>
              <span class="unit">{{ unit }}</span>
            </FormItem>
            <div
              v-if="errorTips"
              class="error-tips">
              {{ errorTips }}
            </div>
          </div>
          <template v-else>
            <FormItem prop="value">
              <InputNumber
                v-model="formData.value"
                style="width: 152px"
                :precision="precision"
                :active-change="false"
                placeholder="请输入"
                :step="step"
                :min="min"
                :max="max"></InputNumber>
              <span class="unit">{{ unit }}</span>
            </FormItem>
          </template>
        </Form>
      </div>
      <div :class="[prefixCls + '-right-footer']">
        <Button
          :disabled="disabled"
          :class="[prefixCls + '-right-footer-btn']"
          type="primary"
          size="default"
          @click.stop="onOk">
          确定
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'indicator-group'

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 指标规则
    indicatorRule: {
      type: Array,
      require: true
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
      default: -Infinity
    },
    // 输入框最大值
    max: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      prefixCls,
      formData: {
        value: this.data.value || 0,
        startValue: this.data.startValue || 0,
        endValue: this.data.endValue || 100
      },
      rules: {
        value: [
          {
            validator: (rule, value, callback) => {
              this.$nextTick(() => {
                if (value === null) {
                  const { min, max } = this
                  if (max !== Infinity) {
                    callback(new Error(`需大于等于${this.min},不大于${this.max}`))
                  } else if (min !== -Infinity) {
                    callback(new Error(`需大于等于${this.min}`))
                  }
                } else {
                  callback()
                }
              })
            },
            trigger: 'blur'
          }
        ]
      },
      symbol: this.data.symbol || (this.indicatorRule.length ? this.indicatorRule[0].value : '')
    }
  },
  computed: {
    disabled() {
      if (this.ruleType === 'number-input-between') {
        const { startValue, endValue } = this.formData
        return !(startValue >= 0 && endValue > 0 && endValue > startValue)
      } else {
        const { value } = this.formData
        const { min } = this
        if (min !== -Infinity) {
          return !(value !== null && value >= min)
        }
        return !(value !== null && value >= 0)
      }
    },
    errorTips() {
      if (this.ruleType === 'number-input-between') {
        const { startValue, endValue } = this.formData
        if (startValue === null || endValue === null) {
          return `需大于等于${this.min},不大于${this.max}`
        } else if (startValue >= endValue) {
          return '第一个值必须小于第二个值'
        }
      }
      return ''
    },
    ruleType() {
      if (!this.symbol) {
        return ''
      }
      const matchingRule = this.indicatorRule.find(item => item.value === this.symbol)
      if (matchingRule) {
        return matchingRule.ruleType
      }
      return ''
    }
  },
  methods: {
    onChange({ value: symbol }) {
      this.formData.value = 0
      this.formData.startValue = 0
      this.formData.endValue = 0
      this.symbol = symbol
      this.$refs['form'].validate()
    },
    onOk() {
      let { symbol, ruleType } = this
      let { value, startValue, endValue } = this.formData
      let find = this.indicatorRule.find(val => {
        return val.value === symbol
      })
      this.$emit('on-ok', {
        symbol,
        symbolLabel: find ? find.label : '',
        value,
        startValue,
        endValue,
        ruleType
      })
    }
  }
}
</script>
