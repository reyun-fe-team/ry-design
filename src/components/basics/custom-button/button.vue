<!--
 * @Date: 2022-12-07 16:13:28
 * @LastEditTime: 2022-12-08 17:22:18
 * @Description: 按钮组件
-->
<template>
  <div
    :class="[prefixCls]"
    @click="handleClick">
    <!-- 角标 -->
    <img
      v-if="showCornerMarker"
      :class="[prefixCls + '-recommend']"
      :src="cornerMarker.src"
      :style="cornerMarkerStyle" />
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
      :illustration-grade="illustrationGrade"
      :is-drop-down="isDropDown"
      :drop-down-items="dropDownItems"
      :drop-down-props="dropDownProps"
      :drop-down-fns="dropDownFns"
      :drop-down-menu-style="dropDownMenuStyle">
      <slot></slot>
    </illustration-button>
    <!-- 纯图标按钮 -->
    <icon-button
      v-if="type === 'icon'"
      :icon-size="iconSize"
      :is-selected="isSelected"
      :icon="icon"></icon-button>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'button'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import normalizedButton from './normalized-button'
import illustrationButton from './illustration-button'
import iconButton from './icon-button'

export default {
  name: prefixCls,
  components: {
    normalizedButton,
    illustrationButton,
    iconButton
  },
  props: {
    // -----------------插画按钮-----------
    // 下拉菜单面板样式
    dropDownMenuStyle: {
      type: Object,
      default: () => ({})
    },
    // 下拉的事件集合（插画按钮支持）
    // 下拉子项点击事件 onDropdownItemClick: (e) => {}
    dropDownFns: {
      type: Object,
      default: () => ({})
    },
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
    // 插画按钮等级（插画按钮支持）
    illustrationGrade: {
      default: 'primary',
      validator(value) {
        // veryImportant 非常重要 primary 主要 secondary 次要
        return ['veryImportant', 'primary', 'secondary'].includes(value)
      }
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
    // icon字体类型 (插画按钮不支持)
    icon: {
      type: String,
      default: ''
    },
    // 按钮角标（右上角）
    // style property
    // eslint-disable-next-line vue/require-default-prop
    cornerMarker: {
      type: Object,
      default: () => {
        return {
          offset: [],
          // right-top  let-top
          placement: 'right-top',
          width: '',
          height: '',
          src: ''
        }
      }
    },
    // 加载中状态(插画按钮、图标按钮不支持)
    loading: {
      type: Boolean,
      default: false
    },
    // 是否禁用按钮(图标按钮不支持)
    disabled: {
      type: Boolean,
      default: false
    },
    // ————————————————————————图标按钮——————————————————
    // 图标按钮大小
    // large、small
    iconSize: {
      type: String,
      default: 'large'
    },
    // 按钮是否选择中
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
    // 普通的按钮
    isNormalized() {
      // 普通按钮 text 文字按钮 primary 主要按钮  dashed 灰色框按钮 default 默认纯白色按钮
      let list = ['text', 'primary', 'dashed', 'default']
      return list.includes(this.type)
    },
    // 显示角标
    showCornerMarker() {
      if (!this.cornerMarker) {
        return false
      }
      if (!this.cornerMarker.src) {
        return false
      }
      return true
    },
    cornerMarkerStyle() {
      if (!this.showCornerMarker) {
        return {}
      }
      let style = {}
      let { width, height, placement, offset = [] } = this.cornerMarker
      if (!placement) {
        placement = 'right-top'
      }
      let placementOptions = {
        'right-top': { right: 0 },
        'let-top': { left: 0 }
      }
      if (placementOptions[placement]) {
        _assign(style, placementOptions[placement])
      }
      if (width) {
        _assign(style, { width: width + 'px' })
      }
      if (height) {
        _assign(style, { height: height + 'px' })
      }
      if (!_isEmpty(offset) && _isArray(offset)) {
        _assign(style, { transform: `translate(${offset[0]}px, ${offset[1]}px)` })
      }

      return style
    }
  },
  methods: {
    handleClick($event) {
      this.$emit('click', $event)
    }
  }
}
</script>