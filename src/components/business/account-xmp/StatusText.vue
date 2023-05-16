<template>
  <span :class="['status-text']">
    <span :class="['dot', type]"></span>
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(val) {
        return ['primary', 'success', 'warning', 'error', 'info'].includes(val)
      },
      default: 'primary'
    }
  }
}
</script>
