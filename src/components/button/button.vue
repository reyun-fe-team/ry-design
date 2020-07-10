<template>
  <component :is="tagName"
             :disabled="disabled"
             :class="classes">
    <!-- <Icon></Icon> -->
    <!-- <Icon></Icon> -->
    <span>
      <slot></slot>
    </span>
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    long: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    size: {
      validator(value) {
        return ["large", "small", "default"].indexOf(value) !== -1;
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
        {
          [`${prefixCls}-ghost`]: this.ghost,
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.size}`]: this.size !== "default"
        }
      ];
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