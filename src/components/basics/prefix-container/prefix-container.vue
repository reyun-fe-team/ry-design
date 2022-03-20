<template>
  <main :class="classes">
    <div :class="[prefixCls + '-group-prepend']" v-if="prepend">
      <slot name="prepend"></slot>
    </div>
    <slot></slot>
    <div :class="[prefixCls + '-group-append']" v-if="append">
      <slot name="append"></slot>
    </div>
  </main>
</template>
<script>
const { prefix } = require('../../../config.js');
const prefixCls = prefix + 'prefix-container';
export default {
  name: prefixCls,
  data() {
    return {
      prefixCls: prefixCls,
      prepend: true,
      append: true
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-group`]: this.prepend || this.append
        }
      ];
    }
  },
  mounted() {
    this.prepend = this.$slots.prepend !== undefined;
    this.append = this.$slots.append !== undefined;
  }
};
</script>
