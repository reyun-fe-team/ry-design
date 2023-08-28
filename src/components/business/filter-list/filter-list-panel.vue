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
      // 打开后需要更新位置，防止出现展示区域不够时被遮挡的问题
      // 只有在开启transfer时有效
      if (this.visible && this.transfer) {
        const drop = this.$refs.Dropdown.$refs.drop
        if (drop) {
          // 更新位置 - popper.update
          drop.update()
        }
      }
      this.$emit('on-visible-change', val)
    },
    closeDropdown() {
      this.$refs.Dropdown.handleClick()
    }
  }
}
</script>
