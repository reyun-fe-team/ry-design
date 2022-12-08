<!--
 * @Date: 2022-12-07 18:30:20
 * @LastEditTime: 2022-12-08 17:20:59
 * @Description: 纯图标按钮
-->
<template>
  <div
    :class="[prefixCls, { [prefixCls + '-selected']: isSelected }]"
    :style="btnSizeStyle">
    <rd-icon
      size="20"
      :type="icon"
      class="icon"></rd-icon>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'button-icon'

export default {
  name: 'IconButton',
  props: {
    // 图标
    icon: {
      type: String,
      default: ''
    },
    // 图标按钮大小
    // large、small
    iconSize: {
      type: String,
      default: 'large'
    },
    // 是否选择中
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    btnSizeStyle() {
      let data = {}
      const options = {
        large: { width: '32px', height: '32px' },
        small: { width: '24px', height: '24px' }
      }
      data = options[this.iconSize] || {}
      return data
    }
  }
}
</script>