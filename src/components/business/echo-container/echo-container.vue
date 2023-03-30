<template>
  <main :class="prefixCls">
    <slot
      name="label"
      :class="prefixCls + '-label'">
      {{ label }}
      <Icon
        :class="prefixCls + '-icon'"
        v-if="isLabelTooltip"
        v-tooltip="labelTooltipOption"
        custom="iconfont ry-icon-help"
        color="#555666"></Icon>
      :
    </slot>
    <slot name="content">
      <!-- type === select 选择框-->
      <rd-account-select
        v-if="type === 'select'"
        v-model="current"
        v-bind="$apis"
        :style="`width: ${contentWidth}px`"></rd-account-select>
      <!-- type === input 输入框-->
      <div
        v-if="type === 'input'"
        :class="prefixCls + '-content-box'"
        :style="`width: ${contentWidth}px`">
        <Input
          v-model="current"
          :class="prefixCls + '-content-box-input'"
          v-bind="$apis" />
        <Icon
          :class="prefixCls + '-content-box-input-icon'"
          custom="iconfont ry-icon-text-delete"
          color="#767A82"
          :size="12"
          @click="clearValue"></Icon>
        <Divider
          type="vertical"
          :class="prefixCls + '-content-box-vertical-line'" />
      </div>
      <!-- type === text 文本框-->
      <div
        v-if="type === 'text'"
        :class="[prefixCls + '-content-text', 'text-overflow']"
        :style="`width: ${contentWidth}px`">
        {{ current }}
      </div>
      <!-- type === multi-cascader 下拉多级复选框-->
      <rd-multi-cascader
        v-if="type === 'multi-cascader'"
        v-model="current"
        v-bind="$apis"
        :style="`width: ${contentWidth}px`"></rd-multi-cascader>
      <!-- type === indicator 数据指标-->
      <rd-indicator
        v-if="type === 'indicator'"
        v-model="current"
        v-bind="$apis"
        :style="`width: ${contentWidth}px`" />
    </slot>
    <Icon
      v-if="isClear"
      custom="iconfont ry-icon-guanbi"
      color="#767A82"
      @click="clear"></Icon>
  </main>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'echo-container'
export default {
  name: prefixCls,
  props: {
    value: {
      type: [String, Array, Object],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    isLabelTooltip: {
      type: Boolean,
      default: false
    },
    labelTooltipOption: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'select'
    },
    isClear: {
      type: Boolean,
      default: true
    },
    contentWidth: {
      type: Number,
      default: 160
    },
    maxTagCount: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      prefixCls,
      current: this.value
    }
  },
  computed: {
    resetApi({ type, maxTagCount }) {
      let params = {}
      switch (type) {
        case 'select':
          params = {
            clearable: false,
            maxTagCount
          }
          break
        case 'input':
          params = {
            clearable: false
          }
          break
        case 'text':
          params = {}
          break
        case 'multi-cascader':
          params = {
            clearable: false,
            maxTagCount
          }
          break
        case 'indicator':
          params = {
            showClearIcon: false
          }
          break
      }
      return params
    },
    $apis({ resetApi }) {
      return Object.assign({}, this.$attrs, resetApi)
    }
  },
  watch: {
    value(value) {
      this.current = value
    },
    current(value) {
      this.$emit('input', value)
      this.$emit('on-change', value)
    }
  },
  mounted() {},
  methods: {
    // 清空当前value
    clearValue() {
      if (Object.prototype.toString.call(this.value) === '[object String]') {
        this.current = ''
      } else if (Object.prototype.toString.call(this.value) === '[object Array]') {
        this.current = []
      } else if (Object.prototype.toString.call(this.value) === '[object Object]') {
        this.current = {}
      }
    },
    // 清空
    clear() {
      this.clearValue()
      this.$emit('on-clear')
    }
  }
}
</script>
