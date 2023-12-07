<template>
  <div>
    <Button @click="openModal">openModal</Button>
    <rd-error-prevent-modal ref="refErrorPreventModal"></rd-error-prevent-modal>
  </div>
</template>
<script>
export default {
  methods: {
    openModal() {
      this.$refs.refErrorPreventModal.modalVisible = true
    }
  }
}
</script>