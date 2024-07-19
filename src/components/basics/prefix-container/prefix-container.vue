<template>
  <div :class="classes">
    <div
      v-if="prepend"
      :style="labelStyles"
      :class="classPrepend">
      <slot name="prepend"></slot>
    </div>
    <div :class="classBody"><slot></slot></div>
    <div
      v-if="append"
      :class="classAppend">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'prefix-container'
export default {
  name: prefixCls,
  props: {
    labelWidth: [Number, String],
    labelMinWidth: [Number, String]
  },
  data() {
    return {
      prefixCls: prefixCls,
      prepend: true,
      append: true
    }
  },
  computed: {
    classes() {
      return `${prefixCls}-wrapper`
    },
    classPrepend() {
      return { [this.prefixCls + '-group-prepend']: this.prepend }
    },
    classAppend() {
      return { [prefixCls + '-group-append']: this.append }
    },
    classBody() {
      return [
        { [this.prefixCls + '-body-prepend']: this.prepend },
        { [prefixCls + '-body-append']: this.append }
      ]
    },
    labelStyles() {
      let params = {}
      if (this.labelWidth) {
        const width = parseInt(this.labelWidth)
        params['width'] = `${width}px`
      }
      if (this.labelMinWidth) {
        const width = parseInt(this.labelMinWidth)
        params['min-width'] = `${width}px`
      }
      return params
    }
  },
  mounted() {
    this.prepend = this.$slots.prepend !== undefined
    this.append = this.$slots.append !== undefined
  }
}
</script>
