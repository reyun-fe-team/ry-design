<template>
  <Modal
    v-model="hookValue"
    :class="prefixCls"
    :class-name="prefixCls + '-center-modal'"
    :closable="false"
    :mask-closable="maskClosble"
    :width="width"
    @on-ok="handleOk"
    @on-cancel="handleCancel"
    @on-visible-change="handleVisibleChange">
    <div :class="prefixCls + '-modal-content'">
      <div
        v-if="hasClose"
        :class="prefixCls + '-modal-content-close'"
        @click="handleClose">
        <img :src="require('@src/images/delete-modals/close.svg')" />
      </div>
      <div :class="prefixCls + '-modal-content-icon'">
        <slot name="delete-modal-img">
          <img :src="iconData[iconName]" />
        </slot>
      </div>
      <div :class="prefixCls + '-modal-content-content'">
        <slot name="delete-modal-content">{{ content }}</slot>
      </div>
    </div>
  </Modal>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = `${prefix}delete-modals`
// 组件
export default {
  name: prefixCls,
  props: {
    width: {
      type: [Number, String],
      default: 440
    },
    content: {
      type: String,
      default: '',
      required: true
    },
    iconName: {
      type: String,
      default: 'warning'
    },
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    hasClose: {
      type: Boolean,
      default: true
    },
    maskClosble: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls,
      hookValue: this.value,
      iconData: {
        warning: require('@src/images/delete-modals/warn-img.png')
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(visible) {
        this.hookValue = visible
      }
    }
  },
  methods: {
    handleOk() {
      this.$emit('on-ok')
    },
    handleCancel() {
      this.$emit('on-cancel')
    },
    handleVisibleChange(visible) {
      if (!visible) {
        this.$emit('input', visible)
      }
      this.$emit('on-visible-change')
    },
    handleClose() {
      this.$emit('input', false)
      this.$Modal.remove()
    }
  }
}
</script>