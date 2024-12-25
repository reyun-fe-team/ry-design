<!--
 * @Date: 2022-12-07 18:30:20
 * @LastEditTime: 2022-12-08 16:56:47
 * @Description: 插画按钮
-->
<template>
  <Dropdown
    v-bind="newDropDownProps"
    :class="[prefixCls]">
    <div :class="prefixCls + '-wrap'">
      <!-- 按钮 -->
      <Button
        :disabled="disabled"
        :class="contentClass"
        @click="handlePrimaryClick">
        <div :class="prefixCls + '-l-c'">
          <!-- 插画图 -->
          <img
            :src="illustrationUrl"
            :class="prefixCls + '-l-i'" />
          <!-- 文本 -->
          <span :class="prefixCls + '-l-t'">
            <slot></slot>
          </span>
        </div>
      </Button>
      <!-- 箭头 -->
      <Button
        v-if="showDropdownMenu"
        v-click-outside="onClickoutside"
        :class="[prefixCls + '-r', gradeClassList[illustrationGrade]]"
        :disabled="disabled"
        @click="handleClick"
        @mouseenter.native="handleMouseenter"
        @mouseleave.native="handleMouseleave">
        <i :class="prefixCls + '-r-line'"></i>
        <rd-icon
          type="ios-arrow-down"
          :class="prefixCls + '-r-icon'"></rd-icon>
      </Button>
    </div>
    <!-- 下拉面板 -->
    <DropdownMenu
      v-if="showDropdownMenu"
      slot="list"
      :style="dropDownMenuStyle"
      @mouseenter.native="handleMouseenter"
      @mouseleave.native="handleMouseleave">
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
  </Dropdown>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'button-illustra-dropdown'
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
    // onDropdownPrimaryClick 主按钮点击事件
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
    // 插画按钮等级
    illustrationGrade: {
      default: 'primary',
      validator(value) {
        // veryImportant 非常重要 primary 主要 secondary 次要
        return ['veryImportant', 'primary', 'secondary'].includes(value)
      }
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
  data() {
    return {
      // 下拉面板展示控制
      currentVisible: false,
      prefixCls
    }
  },
  computed: {
    // 插画按钮等级
    gradeClassList() {
      return {
        veryImportant: `${prefixCls}-veryImportant`,
        primary: 'ivu-btn-primary',
        secondary: `${prefixCls}-secondary`
      }
    },
    // 内容按钮class
    contentClass() {
      return [
        this.prefixCls + '-l',
        this.gradeClassList[this.illustrationGrade],
        this.showDropdownMenu ? this.prefixCls + '-l-b' : ''
      ]
    },
    // 下拉参数选项（插画按钮支持）
    newDropDownProps() {
      return {
        placement: 'bottom-start',
        ...this.dropDownProps,
        // 只能true
        transfer: true,
        // 只能custom
        trigger: 'custom',
        visible: this.currentVisible
      }
    },
    // 是否有下拉项
    showDropdownMenu() {
      if (!this.isDropDown || this.disabled) {
        return false
      }
      if (_isArray(this.dropDownItems) && this.dropDownItems.length > 0) {
        return true
      }
      return false
    },
    // dropDown触发方式
    trigger() {
      return this.dropDownProps.trigger || 'hover'
    }
  },
  methods: {
    // 菜单子级点击事件
    handleDropdownItemClick(item) {
      const { onDropdownItemClick } = this.dropDownFns
      onDropdownItemClick && onDropdownItemClick(item)
    },
    // 菜单子级属性
    getDropdownItemProps(item) {
      // name	用来标识这一项	String	-
      // disabled	禁用该项	Boolean	false
      // divided	显示分割线	Boolean	false
      // selected	标记该项为选中状态	Boolean	false
      const list = ['name', 'disabled', 'divided', 'selected']
      let data = {}
      list.forEach(k => (data[k] = item[k]))
      return data
    },
    // 主按钮点击
    handlePrimaryClick() {
      const { onDropdownPrimaryClick: primaryClick } = this.dropDownFns || {}
      primaryClick && primaryClick()
    },
    // 下拉选项按钮点击
    handleClick() {
      if (this.trigger !== 'click') {
        return false
      }
      this.currentVisible = !this.currentVisible
    },
    // ————————————————触发hover——————————————————
    handleMouseenter() {
      if (this.trigger !== 'hover') {
        return false
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.currentVisible = true
      }, 250)
    },
    handleMouseleave() {
      if (this.trigger !== 'hover') {
        return false
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.currentVisible = false
        }, 150)
      }
    },
    // ————————————————触发hover——————————————————
    // 点击菜单按钮元素外部
    onClickoutside() {
      this.currentVisible = false
    }
  }
}
</script>