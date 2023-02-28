<template>
  <!--  class-name="rd-center-modal mini-scroll-y"-->
  <Modal
    :value="value"
    :class-name="className"
    :class="classes"
    :draggable="draggable"
    :width="width"
    :title="title"
    :lock-scroll="lockScroll"
    :closable="closable"
    :mask-closable="maskClosable"
    @on-cancel="handleCancel"
    @on-visible-change="handleVisibleChange">
    <div
      v-if="isSlotDefaultHeader"
      slot="header"
      :class="`${prefixCls}-default-header`">
      <span :class="`${prefixCls}-title`">
        <div>{{ headerObj.title }}</div>
        <div v-if="headerObj.total">({{ headerObj.titleNum }}/{{ headerObj.total }})</div>
      </span>
      <span
        v-if="headerObj.subTitle"
        :class="`${prefixCls}-subtitle`">
        {{ subtitle }}
      </span>
    </div>
    <div
      v-if="isSlotHeader"
      slot="header">
      <slot name="header"></slot>
    </div>
    <slot name="content"></slot>
    <div
      v-if="diySlotFooter"
      slot="footer">
      <slot name="footer"></slot>
    </div>
    <div
      v-else
      slot="footer">
      <Button
        v-if="isReset"
        type="default"
        style="float: left"
        @click="handleReset">
        {{ resetText }}
      </Button>
      <Button
        v-if="isCreate"
        type="primary"
        ghost
        style="float: left"
        @click="handleCreate">
        <Icon
          custom="iconfont ry-icon-xinjian"
          style="vertical-align: inherit"
          size="12"></Icon>
        {{ createText }}
      </Button>
      <slot name="link"></slot>
      <Button
        style="width: 104px"
        @click="handleCancel">
        取消
      </Button>
      <Button
        type="primary"
        style="width: 104px"
        :loading="modalLoading"
        @click="handleOk">
        确定
      </Button>
    </div>
  </Modal>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'modals'
export default {
  name: prefixCls,
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
      return [
        `${prefixCls}-wrapper`,
        {
          'footer-border-none': footerBorderNone
        }
      ]
    },
    subtitle({ headerObj }) {
      const { subNum, subTitle } = headerObj
      return '已选' + subNum + subTitle
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
      this.iViewModalVisibleEventRewrite({ val: value, scrollable: !val })
    },
    iViewModalVisibleEventRewrite({ val, scrollable = false }) {
      const style = 'overflow: hidden;'
      // this.closeScroll 为true 则 overflow: hidden;
      if (this.closeScroll) {
        document.body.style.cssText = style
      } else {
        document.body.style.cssText = !val ? '' : scrollable ? '' : style
      }
    }
  }
}
</script>
