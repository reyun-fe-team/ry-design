<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-25 14:53:12
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-09-19 16:16:02
 * @FilePath: /ry-design/src/components/business/layout-module-config/module-view/index.vue
 * @Description: 单个模块的渲染组件
-->
<!-- 极速创建 - 模块视口 -->
<template>
  <div :class="[prefixCls]">
    <!-- 头部 -->
    <div :class="prefixCls + '-header'">
      <div class="title">{{ title }}</div>
      <template v-if="hasSlot('header')">
        <slot name="header">
          <Render
            v-if="rFns['header']"
            :render="rFns['header']"></Render>
        </slot>
      </template>
    </div>
    <!-- 显示内容区域 -->
    <div :class="[prefixCls + '-main', 'small-scroll-y']">
      <template v-if="hasSlot('main')">
        <slot name="main">
          <Render
            v-if="rFns['main']"
            :render="rFns['main']"></Render>
        </slot>
      </template>
    </div>
    <!-- 尾部 -->
    <div
      v-if="showFooter"
      :class="prefixCls + '-footer'">
      <template v-if="hasSlot('footer')">
        <slot name="footer">
          <Render
            v-if="rFns['footer']"
            :render="rFns['footer']"></Render>
        </slot>
      </template>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'layout-module-view'

import { typeOf } from '../../../util/assist'
import Render from './../../base/render'

export default {
  name: prefixCls,
  components: {
    Render
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
    // eslint-disable-next-line vue/require-default-prop
    headerRender: {
      type: Function
    },
    // 尾部渲染函数
    // eslint-disable-next-line vue/require-default-prop
    footerRender: {
      type: Function
    },
    // 中间内容渲染函数
    // eslint-disable-next-line vue/require-default-prop
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
    // 渲染组件
    rList() {
      const slots = ['header', 'main']
      // 显示尾部才需要加载尾部的渲染函数
      if (this.showFooter) {
        slots.push('footer')
      }
      return slots
    },
    // 配置的可以渲染的插槽的熏染行数(插槽和渲染函数混合用，渲染函数覆盖插槽)
    rFns() {
      let obj = {}
      const renderFuncs = {
        header: this.headerRender,
        main: this.mainRender,
        footer: this.footerRender
      }
      for (let index = 0; index < this.rList.length; index++) {
        const name = this.rList[index]
        // 是否有渲染函数
        const fn = renderFuncs[name] || ''
        if (typeOf(fn) === 'function') {
          obj[name] = fn
        }
      }
      return obj
    }
  },
  methods: {
    // 有没有对应的渲染行数
    hasSlot(slotName) {
      return this.rList.includes(slotName)
    }
  }
}
</script>
