<template>
  <div>
    <rd-reverse-button
      :text="text"
      :prefix-edit-text="prefixEditText"
      :suffix-edit-text="suffixEditText"
      :status="status"
      @on-click="handleClick"></rd-reverse-button>
  </div>
</template>
<script>
export default {
  name: 'ReverseButton',
  data() {
    return {
      text: '请选择应用',
      prefixEditText: '已选择应用10个',
      suffixEditText: '编辑',
      status: 'select'
    }
  },
  methods: {
    handleClick() {
      this.status = this.status === 'select' ? 'edit' : 'select'
    }
  }
}
</script>