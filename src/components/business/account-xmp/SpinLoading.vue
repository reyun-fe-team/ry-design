<template>
  <Spin v-bind="$attrs">
    <Icon
      type="ios-loading"
      :size="iconSize"
      :class="style.icon"></Icon>
    <slot></slot>
  </Spin>
</template>

<script>
const stylePrefix = 'spin-loading'
export default {
  components: {},
  props: {
    iconSize: {
      default: '18',
      type: String
    }
  },
  computed: {
    style() {
      return {
        // TODO
        icon: `${stylePrefix}-icon`
      }
    }
  }
}
</script>
