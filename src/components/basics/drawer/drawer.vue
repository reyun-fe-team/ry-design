<template>
  <Drawer
    v-lock-body-scroll
    transfer
    :value="value"
    :class-name="wrapperClass"
    :class="classes"
    :draggable="draggable"
    :width="width"
    :title="title"
    :lock-scroll="lockScroll"
    :closable="closable"
    :mask-closable="maskClosable"
    @on-close="handleCancel"
    @on-visible-change="handleVisibleChange">
    <!-- 默认头部 -->
    <DefaultHead
      v-if="isSlotDefaultHeader"
      slot="header"
      :prefix-cls="prefixCls"
      :header-obj="headerObj"
      :subtitle="subtitle"></DefaultHead>

    <!-- 自定义头部 -->
    <slot
      v-if="isSlotHeader"
      slot="header"
      name="header"></slot>

    <!-- 内容 -->
    <div :class="`${prefixCls}-body`">
      <slot name="content"></slot>
    </div>

    <!-- 底部 -->
    <div :class="`${prefixCls}-footer`">
      <slot
        v-if="diySlotFooter"
        name="footer"></slot>

      <template v-if="!diySlotFooter">
        <!-- 重置 -->
        <ResetButton
          v-if="isReset"
          :reset-text="resetText"
          @on-click="handleReset"></ResetButton>
        <!-- 新建 -->
        <CreateButton
          v-if="isCreate"
          :create-text="createText"
          @on-click="handleCreate"></CreateButton>
        <!-- 链接 -->
        <slot
          name="link"
          style="margin-right: 5px"></slot>
        <!-- 确认取消 -->
        <ConfirmCancelButton
          :loading="modalLoading"
          @on-confirm="handleOk"
          @on-cancel="handleCancel"></ConfirmCancelButton>
      </template>
    </div>
  </Drawer>
</template>

<script>
import { prefix } from '@src/config.js'
import CreateButton from './components/footer/create-button'
import ResetButton from './components/footer/reset-button'
import ConfirmCancelButton from './components/footer/confirm-cancel-button'
import DefaultHead from './components/header/default-head'
const prefixCls = prefix + 'drawer'

export default {
  name: prefixCls,
  components: {
    CreateButton,
    ResetButton,
    ConfirmCancelButton,
    DefaultHead
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 1200
    },
    placement: {
      type: String,
      default: 'right'
    },
    title: {
      type: String,
      default: '标题'
    },
    // 是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭
    closable: {
      type: Boolean,
      default: true
    },
    // 是否允许点击遮罩层关闭
    maskClosable: {
      type: Boolean,
      default: false
    },
    modalLoading: {
      type: Boolean,
      default: false
    },
    isReset: {
      type: Boolean,
      default: false
    },
    footerBorderNone: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    closeScroll: {
      type: Boolean,
      default: false
    },
    // 配合 isSlotDefaultHeader 使用
    headerObj: {
      type: Object,
      default: () => {}
    },
    isSlotDefaultHeader: {
      type: Boolean,
      default: false
    },
    isSlotHeader: {
      type: Boolean,
      default: false
    },
    diySlotFooter: {
      type: Boolean,
      default: false
    },
    // 重置文字
    resetText: {
      type: String,
      default: '重置'
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    // 新建文字
    createText: {
      type: String,
      default: '新建'
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    classes({ footerBorderNone }) {
      return [footerBorderNone ? prefixCls + '-footer-border-none' : '']
    },
    subtitle({ headerObj }) {
      const { subNum, subTitle } = headerObj
      return '已选' + subNum + subTitle
    },
    wrapperClass() {
      return `${prefixCls}-wrapper ${this.className}`
    }
  },
  mounted() {
    this.handleVisibleChange(true)
  },
  beforeDestroy() {
    this.handleVisibleChange(false)
  },
  methods: {
    handleReset() {
      this.$emit('on-reset')
    },
    handleCreate() {
      this.$emit('on-create')
    },
    handleCancel() {
      this.$emit('on-cancel')
    },
    handleOk() {
      this.$emit('on-ok')
    },
    // 兼容写法 - 如果不清除overflow:hidden 手动清除
    handleVisibleChange(val) {
      const value = val || this.closeScroll
      this.setBodyOverflow({ val: value, scrollable: !val })
    },
    // 设置body的overflow
    setBodyOverflow({ val, scrollable = false }) {
      const style = 'overflow: hidden;'
      if (this.closeScroll) {
        document.body.style.overflow = style
      } else {
        document.body.style.cssText = !val ? '' : scrollable ? '' : style
      }
    }
  }
}
</script>
