<template>
  <Modal
    v-model="hookValue"
    :class-name="[prefixCls]"
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
        <Icon
          type="md-close"
          size="16"></Icon>
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
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'layout-module-config'
// 组件
export default {
  name: prefixCls,
  components: {},
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
      hookValue: this.value,
      iconData: {
        warning: require('@/src/images/delete-modals/warn.png')
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
  created() {},
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