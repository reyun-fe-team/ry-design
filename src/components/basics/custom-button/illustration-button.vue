<!--
 * @Date: 2022-12-07 18:30:20
 * @LastEditTime: 2022-12-08 16:56:47
 * @Description: 插画按钮
-->
<template>
  <Dropdown
    trigger="hover"
    v-bind="dropDownProps">
    <Button
      type="primary"
      :class="[btnClass]"
      :disabled="disabled">
      <div class="illustration-content">
        <!-- 插画图 -->
        <div
          class="illustration-image"
          :style="headIcon"></div>
        <!-- 文本 -->
        <div class="illustration-text">
          <slot></slot>
        </div>
        <!-- 下拉箭头 -->
        <div
          v-if="showDropdownMenu"
          class="illustration-arrow">
          <rd-icon type="ios-arrow-down"></rd-icon>
        </div>
        <div
          v-else
          class="illustration-arrow-empty"></div>
      </div>
    </Button>
    <template
      v-if="showDropdownMenu"
      #list>
      <DropdownMenu :style="dropDownMenuStyle">
        <DropdownItem
          v-for="item in dropDownItems"
          :key="item.name"
          v-bind="getDropdownItemProps(item)"
          @click.native="handleDropdownItemClick(item)">
          <Render
            v-if="item.render"
            :render="item.render"></Render>
          <span v-else>{{ item.label }}</span>
        </DropdownItem>
      </DropdownMenu>
    </template>
  </Dropdown>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'button-illustration'
import Render from './../../base/render'
import _isArray from 'lodash/isArray'

export default {
  name: 'IllustrationButton',
  components: {
    Render
  },
  props: {
    // 下拉菜单面板样式
    dropDownMenuStyle: {
      type: Object,
      default: () => ({})
    },
    // 下拉的事件集合（插画按钮支持）
    // onDropdownItemClick 菜单子级点击事件
    dropDownFns: {
      type: Object,
      default: () => ({})
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
    // 下拉属性（插画按钮支持）
    // DropdownItem Props
    // 额外参数： label 文本， render 自定义渲染内容
    dropDownItems: {
      type: Array,
      default: () => []
    },
    // 下拉参数选项（插画按钮支持）
    // Dropdown Props
    dropDownProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 开启下拉（插画按钮支持）
    isDropDown: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 类名class集合
    btnClass() {
      return `${prefixCls}`
    },
    headIcon() {
      return {
        'background-image': `url(${this.illustrationUrl})`
      }
    },
    showDropdownMenu() {
      if (!this.isDropDown || this.disabled) {
        return false
      }
      if (_isArray(this.dropDownItems) && this.dropDownItems.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    // 菜单子级点击事件
    handleDropdownItemClick(item) {
      const { onDropdownItemClick } = this.dropDownFns
      onDropdownItemClick && onDropdownItemClick(item)
    },
    getDropdownItemProps(item) {
      // name	用来标识这一项	String	-
      // disabled	禁用该项	Boolean	false
      // divided	显示分割线	Boolean	false
      // selected	标记该项为选中状态	Boolean	false
      const list = ['name', 'disabled', 'divided', 'selected']
      let data = {}
      list.forEach(k => (data[k] = item[k]))
      return data
    }
  }
}
</script>