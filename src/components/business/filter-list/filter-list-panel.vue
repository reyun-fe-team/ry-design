<template>
  <div :class="prefixCls">
    <!-- visible -->
    <Dropdown
      :placement="placement"
      :trigger="trigger"
      @on-visible-change="handleVisibleChange">
      <slot></slot>
      <DropdownMenu slot="list">
        <slot name="list"></slot>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-panel'
export default {
  props: {
    name: prefixCls,
    placement: {
      type: String,
      default: 'bottom-start'
    },
    trigger: {
      type: String,
      default: 'click'
    }
  },
  data() {
    return {
      visible: false,
      prefixCls
    }
  },
  methods: {
    handleVisibleChange(val) {
      this.visible = val
      this.$emit('on-visible-change', val)
    }
  }
}
</script>
