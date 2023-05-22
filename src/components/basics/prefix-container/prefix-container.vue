<template>
  <div :class="classes">
    <div
      v-if="prepend"
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
import { prefix } from '@src/config'
const prefixCls = prefix + 'prefix-container'
export default {
  name: prefixCls,
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
    }
  },
  mounted() {
    this.prepend = this.$slots.prepend !== undefined
    this.append = this.$slots.append !== undefined
  }
}
</script>
