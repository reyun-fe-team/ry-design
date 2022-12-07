<!--
 * @Date: 2022-12-07 18:30:20
 * @LastEditTime: 2022-12-07 20:07:31
 * @Description: 插画按钮
-->
<template>
  <div :class="classes">
    <button
      class="illustration-button"
      :disabled="disabled"></button>
    <div class="illustration-background">
      <div
        class="head"
        :style="headIcon"></div>
      <div class="text">
        <slot></slot>
      </div>
      <div
        v-if="cornerMarkerIcon"
        class="recommend"
        :style="cornerMarkerIcon"></div>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'button-illustration'

export default {
  name: 'ButtonIllustration',
  props: {
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
    // 插画图片地址
    illustrationUrl: {
      type: String,
      default: ''
    },
    // 按钮角标（右上角）
    // eslint-disable-next-line vue/require-default-prop
    // styles property
    cornerMarker: {
      type: Object
    }
  },
  computed: {
    // 类名class集合
    classes() {
      const classList = [`${prefixCls}`, 'illustration']
      return classList
    },
    headIcon() {
      return {
        'background-position': 'left center',
        'background-repeat': 'no-repeat',
        'background-image': `url(${this.illustrationUrl})`,
        'background-size': 'contain'
      }
    },
    cornerMarkerIcon() {
      return this.cornerMarker
    }
  }
}
</script>