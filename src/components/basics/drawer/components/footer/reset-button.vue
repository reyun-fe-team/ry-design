<template>
  <Button
    type="default"
    style="float: left"
    @click="handleReset">
    {{ resetText }}
  </Button>
</template>
<script>
export default {
  props: {
    resetText: {
      type: String,
      default: '重置'
    }
  },
  methods: {
    handleReset() {
      this.$emit('on-click')
    }
  }
}
</script>
