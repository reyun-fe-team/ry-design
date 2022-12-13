<template>
  <span class="explain-wrapper">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'Explain',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
.explain-wrapper {
  margin-right: -2px;
  color: rgb(153, 153, 153);
  height: 32px;
  padding: 0 10px;
  display: inline-flex;
  border: 1px solid #dcdee2;
  border-radius: 3px 0 0 3px;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  vertical-align: bottom;
}
</style>
