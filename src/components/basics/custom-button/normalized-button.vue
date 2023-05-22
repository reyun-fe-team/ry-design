<!--
 * @Date: 2022-12-07 16:56:34
 * @LastEditTime: 2022-12-08 16:56:57
 * @Description: 普通类型的按钮
-->
<template>
  <Button
    :class="classes"
    :type="type"
    :loading="loading"
    :disabled="disabled"
    :icon="icon">
    <slot></slot>
  </Button>
</template>
<script>
import { prefix } from '@src/config'
const prefixCls = prefix + 'button-normalized'
export default {
  name: 'NormalizedButton',
  props: {
    // 组件类型 text 文字按钮 primary 主要按钮  dashed 灰色框按钮 default 默认纯白色按钮
    type: {
      type: String,
      default: 'default'
    },
    // 加载中状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否禁用按钮
    disabled: {
      type: Boolean,
      default: false
    },
    // icon字体类型
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 类名class集合
    classes() {
      const classList = [`${prefixCls}`, this.type]
      return classList
    }
  }
}
</script>