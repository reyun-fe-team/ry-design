<template>
  <div
    :class="prefixCls"
    :style="styles">
    <div
      v-if="extra || $slots.extra"
      :class="prefixCls + '-left'">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div :style="bodyStyle"><slot></slot></div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'footer-toolbar'
export default {
  name: prefixCls,
  props: {
    // 额外信息，向左对齐
    extra: {
      type: String
    },
    textAlign: {
      type: String,
      default: 'center'
    },
    minHeight: {
      type: [String, Number],
      default: '56px'
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    bodyStyle() {
      return {
        textAlign: this.textAlign
      }
    },
    styles() {
      return {
        height: typeof this.minHeight === 'number' ? `${this.minHeight}px` : this.minHeight,
        lineHeight: typeof this.minHeight === 'number' ? `${this.minHeight}px` : this.minHeight
      }
    }
  }
}
</script>
