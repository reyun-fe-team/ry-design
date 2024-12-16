<template>
  <div :class="`${prefixCls}-default-header`">
    <span :class="`${prefixCls}-title`">
      <div>{{ headerObj.title }}</div>
      <div v-if="headerObj.total">({{ headerObj.titleNum }}/{{ headerObj.total }})</div>
    </span>
    <span
      v-if="headerObj.subTitle"
      :class="`${prefixCls}-subtitle`">
      {{ subtitle }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    prefixCls: {
      type: String,
      default: ''
    },
    headerObj: {
      type: Object,
      default: () => ({})
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>
