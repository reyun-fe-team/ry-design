<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-25 14:53:12
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-30 14:35:00
 * @FilePath: /ry-design/src/components/business/layout-module-config/module-view/index.vue
 * @Description: 单个模块的渲染组件
-->
<!-- 极速创建 - 模块视口 -->
<template>
  <div :class="[prefixCls]">
    <!-- 头部 -->
    <div :class="prefixCls + '-header'">
      <div class="title">{{ title }}</div>
      <template v-if="renderSlots['header']">
        <render
          v-if="renderSlots['header'].t === 'render'"
          :render="renderSlots['header'].h"></render>
        <slot
          v-if="renderSlots['header'].t === 'slot'"
          name="header"></slot>
      </template>
    </div>
    <!-- 显示内容区域 -->
    <div :class="prefixCls + '-main'">
      <template v-if="renderSlots['main']">
        <render
          v-if="renderSlots['main'].t === 'render'"
          :render="renderSlots['main'].h"></render>
        <slot
          v-if="renderSlots['main'].t === 'slot'"
          name="main"></slot>
      </template>
    </div>
    <!-- 尾部 -->
    <div
      v-if="showFooter"
      :class="prefixCls + '-footer'">
      <template v-if="renderSlots['footer']">
        <render
          v-if="renderSlots['footer'].t === 'render'"
          :render="renderSlots['footer'].h"></render>
        <slot
          v-if="renderSlots['footer'].t === 'slot'"
          name="footer"></slot>
      </template>
    </div>
  </div>
</template>
<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'layout-module-view'

import { typeOf } from '../../../util/assist'
import render from './../../base/render'

export default {
  name: prefixCls,
  components: {
    render
  },
  props: {
    // 名称
    title: {
      type: String,
      default: ''
    },
    // 显示尾部
    showFooter: {
      type: Boolean,
      default: false
    },
    // 头部渲染函数
    headerRender: {
      type: Function
    },
    // 尾部渲染函数
    footerRender: {
      type: Function
    },
    // 中间内容渲染函数
    mainRender: {
      type: Function
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    // 配置的可以渲染的插槽的熏染行数(插槽和渲染函数混合用，渲染函数覆盖插槽)
    renderSlots() {
      const slots = ['header', 'main']
      // 显示尾部才需要加载尾部的渲染函数
      if (this.showFooter) {
        slots.push('footer')
      }
      const obj = {}
      for (let index = 0; index < slots.length; index++) {
        const slotName = slots[index]
        // 是否有渲染函数
        const renderFunc = this.$props[slotName + 'Render']
        if (renderFunc && typeOf(renderFunc) === 'function') {
          obj[slotName] = {
            t: 'render',
            h: renderFunc
          }
        }
        // 插槽
        const slotFunc = this.$scopedSlots[slotName]
        if (slotFunc && typeOf(slotFunc) === 'function') {
          obj[slotName] = {
            t: 'slot',
            h: slotFunc
          }
        }
      }
      return obj
    }
  }
}
</script>