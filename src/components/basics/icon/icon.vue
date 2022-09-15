<template>
  <Icon
    :custom="custom"
    :type="type"
    :size="size"
    :color="color"></Icon>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'icon'
export default {
  name: prefixCls,
  props: {
    type: { type: String, default: '' },
    size: { type: [Number, String], default: 16 },
    color: String
  },
  computed: {
    custom() {
      return this.type.startsWith('ry-icon') ? `iconfont ${this.type}` : ''
    }
  }
}
</script>