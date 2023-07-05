<template>
  <div :class="prefixCls">
    <Dropdown
      ref="Dropdown"
      :placement="placement"
      :trigger="currentTrigger"
      :transfer="transfer"
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      prefixCls
    }
  },
  computed: {
    currentTrigger() {
      return this.disabled ? 'custom' : this.trigger
    }
  },
  methods: {
    handleVisibleChange(val) {
      if (this.disabled) {
        return
      }
      this.visible = val
      this.$emit('on-visible-change', val)
    },
    closeDropdown() {
      this.$refs.Dropdown.handleClick()
    }
  }
}
</script>
