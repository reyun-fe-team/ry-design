<template>
  <div
    :class="classes"
    :style="styles">
    <div
      v-if="label && label.trim() && !$slots.label"
      ref="prefixRef"
      :class="prefixCls + '-label'">
      <span>{{ `${label}` }}</span>
    </div>
    <slot
      v-if="$slots.label"
      name="label"
      :class="prefixCls + '-label'"></slot>
    <div :class="prefixCls + '-body'">
      <rd-date-picker
        v-model="time"
        :type="type"
        :transfer="transfer"
        :clearable="clearable"
        :confirm="confirm"
        :shortcuts="shortcuts"
        :disabled-date="disabledDate"
        :format="format"
        :placement="placement"
        :placeholder="placeholder"
        :size="size"
        :start="start"
        :end="end"
        :limit="limit"
        :show-shortcuts="showShortcuts"
        :options="options"
        :start-range="startRange"
        :end-range="endRange"
        :width="width"
        v-on="$listeners"></rd-date-picker>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
import date from '@src/util/date'
const prefixCls = prefix + 'form-date-picker'
export default {
  name: prefixCls,
  components: {},
  props: {
    // ------------------ 以下为rd-date-picker 的属性 ------------------
    type: {
      // daterange datetimerange
      default: 'daterange',
      validator(value) {
        return ['daterange', 'datetimerange'].includes(value)
      }
    },
    transfer: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: true
    },
    // 左侧快捷方式
    shortcuts: {
      type: Array,
      default: () => []
    },
    // 禁止选择日期
    disabledDate: {
      type: Function,
      default: () => {}
    },
    // 格式化日期展现形式
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    // 弹窗出现位置
    placement: {
      type: String,
      default: 'bottom-end'
    },
    // 提示文案
    placeholder: {
      type: String,
      default: '选择日期'
    },
    size: {
      type: String,
      default: null
    },
    start: {
      type: String,
      default: () => {
        return date.getYearStr(-1)
      }
    },
    end: {
      type: String,
      require: true,
      default: () => {
        return date.getMoment(new Date())
      }
    },
    limit: {
      type: String,
      default: null
    },
    // 是否显示快捷操作项
    showShortcuts: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => {}
    },
    // 前置范围
    startRange: {
      type: Number,
      default: null
    },
    endRange: {
      type: Number,
      default: null
    },
    width: {
      type: [String, Number],
      default: null
    },

    // ------------------ 以下为rd-form-date-picker 的属性 ------------------
    value: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      prefixCls,
      time: this.value
    }
  },
  computed: {
    classes() {
      return [`${this.prefixCls}`]
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.time = val
      }
    }
  }
}
</script>
