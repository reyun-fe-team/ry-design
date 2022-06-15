<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:43:38
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-15 19:51:17
 * @FilePath: /ry-design/src/components/business/text-item-show/text-item-show.vue
 * @Description: 极速创建基础信息，单项显示控件
-->
<template>
  <main></main>
</template>
<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'text-item-show'
export default {
  name: prefixCls,
  props: {
    // 显示的类型 basic 基础 title 带标题 classify 分类
    type: {
      type: String,
      default: 'basic'
    },
    // 双行显示
    twoLineDisplay: {
      type: Boolean,
      default: false
    },
    // 显示的数据
    data: {
      type: Object,
      default: () => ({})
    }
    // 按钮组 slot
    // btnGroup
  },
  data() {
    return {
      prefixCls
    }
  }
}
</script>