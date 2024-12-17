<template>
  <Button
    type="default"
    style="margin-right: 5px"
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
