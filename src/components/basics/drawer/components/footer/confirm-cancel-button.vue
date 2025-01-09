<template>
  <div style="display: inline-block">
    <Button
      style="width: 104px"
      @click="handleCancel">
      {{ cancelText }}
    </Button>
    <Button
      type="primary"
      style="width: 104px"
      :loading="loading"
      @click="handleOk">
      {{ confirmText }}
    </Button>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    handleOk() {
      this.$emit('on-confirm')
    },
    handleCancel() {
      this.$emit('on-cancel')
    }
  }
}
</script>
