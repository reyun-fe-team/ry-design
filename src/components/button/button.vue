<template>
    <div :class="classes">button</div>
</template>

<script>
const prefixCls = "ry-btn"
export default {
  name: "ryButton",
  props: {
    type: {
      validator(value) {
        return ["default", "primary", "dashed", "text"].indexOf(value) !== -1;
      },
      default: "default"
    }
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
      ]
    }
  }
};
</script>

<style>
</style>