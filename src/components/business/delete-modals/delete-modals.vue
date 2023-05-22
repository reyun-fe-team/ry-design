<template>
  <div :class="[prefixCls]">
    <div :class="prefixCls + '-modal-content'">
      <div
        v-if="deleteHasClose"
        :class="prefixCls + '-modal-content-close'"
        @click="handleClose">
        <span
          style="font-size: 12px"
          class="icon iconfont ry-icon-modal-close"></span>
      </div>
      <div :class="prefixCls + '-modal-content-icon'">
        <slot name="delete-modal-img">
          <img :src="iconData[deleteIconName]" />
        </slot>
      </div>
      <div
        :class="prefixCls + '-modal-content-content'"
        :style="styles"
        v-html="deleteContent">
        <slot name="delete-modal-content">
          {{ deleteContent }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config'
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
    },
    styles: {
      type: Object,
      default: () => {}
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
    handleClose() {
      this.$emit('deleteInput')
    }
  }
}
</script>