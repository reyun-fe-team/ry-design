<template>
  <div :class="prefixCls + '-operation'">
    <Button type="primary" size="small" :disabled="!leftActive" @click.native="moveToLeft">
      <Icon type="ios-arrow-back"></Icon>
      <span>{{ operations[0] }}</span>
    </Button>
    <Button type="primary" size="small" :disabled="!rightActive" @click.native="moveToRight">
      <span>{{ operations[1] }}</span>
      <Icon type="ios-arrow-forward"></Icon>
    </Button>
  </div>
</template>
<script>
export default {
  name: 'Operation',
  props: {
    prefixCls: String,
    operations: Array,
    leftActive: Boolean,
    rightActive: Boolean
  },
  methods: {
    moveToLeft() {
      this.$parent.moveTo('left')
    },
    moveToRight() {
      this.$parent.moveTo('right')
    }
  }
}
</script>
