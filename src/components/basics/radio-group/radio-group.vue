<template>
  <div :class="[prefixCls]">
    <RadioGroup
      v-model="newValue"
      :type="type"
      @on-change="onChange">
      <Radio
        v-for="e in defaultList"
        :key="e.value"
        :disabled="isDisabledAll || e.disabled || isDisabledItemFun(e)"
        :label="e.value">
        <template
          v-if="
            !(isDisabledAll || e.disabled || isDisabledItemFun(e)) ||
            ((isDisabledAll || e.disabled || isDisabledItemFun(e)) && !e.disabledTooltip)
          ">
          <span>{{ e.label }}</span>
          <Tooltip
            v-if="e.tooltip"
            :transfer="true"
            :delay="delay"
            :max-width="maxWidth"
            :placement="placement"
            theme="light">
            <div
              slot="content"
              class="display-flex flex-direction-column">
              <template v-if="isArray(e.tooltip)">
                <p
                  v-for="(item, index) in e.tooltip"
                  :key="index"
                  v-text="item"></p>
              </template>
              <template v-if="isString(e.tooltip)">
                <p v-text="e.tooltip"></p>
              </template>
            </div>
            <Icon
              :type="iconIview"
              class="cursor-pointer icon-question tip-icon"
              size="16"></Icon>
          </Tooltip>
        </template>
        <template v-else>
          <Tooltip
            v-if="e.disabledTooltip"
            :transfer="true"
            :delay="delay"
            :max-width="maxWidth"
            :placement="placement"
            theme="light">
            <span>{{ e.label }}</span>
            <div
              slot="content"
              class="display-flex flex-direction-column">
              <template v-if="isArray(e.disabledTooltip)">
                <p
                  v-for="(item, index) in e.disabledTooltip"
                  :key="index"
                  v-text="item"></p>
              </template>
              <template v-if="isString(e.disabledTooltip)">
                <p v-text="e.disabledTooltip"></p>
              </template>
            </div>
          </Tooltip>
          <template v-else>
            <span>{{ e.label }}</span>
          </template>
        </template>
      </Radio>
    </RadioGroup>
  </div>
</template>

<script>
import _isEqual from 'lodash/isEqual'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'radio-group'
export default {
  name: prefixCls,
  props: {
    value: {
      type: [String, Number, Boolean]
    },
    defaultList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'button'
    },
    isDisabledAll: {
      type: Boolean,
      default: false
    },
    isDisabledItemFun: {
      type: Function,
      default: () => {
        return false
      }
    },
    iconIview: {
      type: String,
      default: 'ios-help-circle-outline'
    },
    maxWidth: {
      type: [String, Number],
      default: '300'
    },
    placement: {
      type: String,
      default: 'top'
    },
    delay: {
      type: Number,
      default: 1000
    },
    isCustom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      newValue: null
    }
  },
  watch: {
    value: {
      handler(n, o) {
        if (!_isEqual(n, o)) {
          let { defaultList } = this
          if (defaultList.map(e => e.value).includes(n)) {
            this.newValue = n
          } else {
            if (!this.isCustom) {
              if (defaultList && defaultList.length) {
                let f = defaultList.find(e => !e.disabled)
                if (f) {
                  this.newValue = f.value || null
                } else {
                  this.newValue = null
                }
              } else {
                this.newValue = null
              }
            } else {
              this.newValue = null
            }
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    isString(e) {
      return Object.prototype.toString.call(e) === '[object String]'
    },
    isArray(e) {
      return Object.prototype.toString.call(e) === '[object Array]'
    },
    onChange(val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  }
}
</script>
