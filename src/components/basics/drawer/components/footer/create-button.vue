<template>
  <Button
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
</template>
<script>
export default {
  // 新建文字
  props: {
    createText: {
      type: String,
      default: '创建'
    }
  },
  methods: {
    handleCreate() {
      this.$emit('on-click')
    }
  }
}
</script>
