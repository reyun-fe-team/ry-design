<template>
  <Tooltip
    :transfer="transfer"
    :placement="placement"
    :max-width="maxWidth"
    :offset="offset"
    :theme="theme"
    :disabled="disabledTip || (!tooltip && !$slots.tooltip)">
    <template #content>
      <slot name="tooltip">{{ tooltip }}</slot>
    </template>
    <Icon
      :type="iconType"
      :custom="customIconType"
      :class="iconClasses"
      :style="{ 'vertical-align': verticalAlign }" />
  </Tooltip>
</template>

<script>
export default {
  props: {
    tooltip: {
      type: String
    },
    transfer: {
      type: Boolean,
      default: false
    },
    iconType: {
      type: String,
      default: 'ios-help-circle-outline'
    },
    customIconType: {
      type: String
    },
    placement: {
      type: String,
      default: 'top'
    },
    disabledTip: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: 200
    },
    iconClass: {
      type: [Array, String],
      default: () => []
    },
    verticalAlign: {
      type: String,
      default: 'middle'
    },
    offset: {
      type: Number
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  computed: {
    // TODO
    iconClasses() {
      return [].concat(this.iconClass)
    }
  }
}
</script>
