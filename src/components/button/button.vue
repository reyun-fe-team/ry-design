<template>
  <component :is="tagName" :class="classes">
    <Icon></Icon>
    <Icon></Icon>
    <span><slot></slot></span>
  </component>
</template>

<script>
const prefixCls = "ry-btn";
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
      return [`${prefixCls}`, `${prefixCls}-${this.type}`];
    },
    // 要渲染什么标签
    tagName() {
      return "button";
    }
  }
};
</script>

<style>
</style>