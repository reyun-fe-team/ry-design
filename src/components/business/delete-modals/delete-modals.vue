<template>
  <div :class="[prefixCls, prefixCls + '-center-modal']">
    <div :class="prefixCls + '-modal-content'">
      <div
        v-if="deleteHasClose"
        :class="prefixCls + '-modal-content-close'"
        @click="handleClose">
        <img :src="require('@src/images/delete-modals/close.svg')" />
      </div>
      <div :class="prefixCls + '-modal-content-icon'">
        <slot name="delete-modal-img">
          <img :src="iconData[deleteIconName]" />
        </slot>
      </div>
      <div :class="prefixCls + '-modal-content-content'">
        <slot name="delete-modal-content">{{ deleteContent }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = `${prefix}delete-modals`
// 组件
export default {
  name: prefixCls,
  props: {
    deleteContent: {
      type: String,
      default: ''
    },
    deleteIconName: {
      type: String,
      default: 'warning'
    },
    deleteHasClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls,
      iconData: {
        warning: require('@src/images/delete-modals/warn-img.png')
      }
    }
  },
  methods: {
    // handleOk() {
    //   this.$emit('on-ok')
    // },
    // handleCancel() {
    //   this.$emit('on-cancel')
    // },
    // handleVisibleChange(visible) {
    //   if (!visible) {
    //     this.$emit('input', visible)
    //   }
    //   this.$emit('on-visible-change')
    // },
    handleClose() {
      this.$emit('deleteInput', false)
      // this.$Modal.remove()
    }
  }
}
</script>