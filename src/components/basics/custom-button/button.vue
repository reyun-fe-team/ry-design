<!--
 * @Date: 2022-12-07 16:13:28
 * @LastEditTime: 2022-12-08 15:37:20
 * @Description: 按钮组件
-->
<template>
  <div
    :class="classes"
    @click="handleClick">
    <!-- 角标 -->
    <div
      v-if="cornerMarker"
      class="recommend"
      :style="cornerMarker"></div>
    <!--普通按钮 -->
    <normalized-button
      v-if="isNormalized"
      :type="type"
      :loading="loading"
      :disabled="disabled"
      :icon="icon">
      <slot></slot>
    </normalized-button>
    <!-- 插画按钮 -->
    <illustration-button
      v-if="type === 'illustration'"
      :disabled="disabled"
      :illustration-url="illustrationUrl"
      :is-drop-down="isDropDown"
      :drop-down-items="dropDownItems"
      :drop-down-props="dropDownProps">
      <slot></slot>
    </illustration-button>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'button'

import normalizedButton from './normalized-button'
import illustrationButton from './illustration-button'

export default {
  name: prefixCls,
  components: {
    normalizedButton,
    illustrationButton
  },
  props: {
    // 下拉属性（插画按钮支持）
    dropDownItems: {
      type: Array,
      default: () => []
    },
    // 开启下拉（插画按钮支持）
    isDropDown: {
      type: Boolean,
      default: false
    },
    // 插画图片地址（插画按钮支持）
    illustrationUrl: {
      type: String,
      default: ''
    },
    // Dropdown Props,下拉参数选项
    dropDownProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // ------------------通用----------------
    // 组件类型
    // 普通按钮 text 文字按钮 primary 主要按钮  dashed 灰色框按钮 default 默认纯白色按钮
    // 特殊按钮 icon 图标按钮 illustration 插画按钮
    type: {
      type: String,
      default: 'default'
    },
    // icon字体类型
    icon: {
      type: String,
      default: ''
    },
    // 按钮角标（右上角）
    // eslint-disable-next-line vue/require-default-prop
    cornerMarker: {
      type: Object
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
    }
  },
  computed: {
    // 类名class集合
    classes() {
      const classList = [`${prefixCls}`]
      return classList
    },
    // 普通的按钮
    isNormalized() {
      // 普通按钮 text 文字按钮 primary 主要按钮  dashed 灰色框按钮 default 默认纯白色按钮
      let list = ['text', 'primary', 'dashed', 'default']
      return list.includes(this.type)
    }
  },
  methods: {
    handleClick($event) {
      this.$emit('click', $event)
    }
  }
}
</script>