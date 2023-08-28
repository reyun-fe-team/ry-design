<template>
  <div :class="prefixCls">
    <Dropdown
      ref="Dropdown"
      :visible="visible"
      :placement="placement"
      :trigger="currentTrigger"
      :transfer="transfer"
      @on-visible-change="handleVisibleChange"
      @on-clickoutside="onClickoutside">
      <div @click="handleClick">
        <slot></slot>
      </div>
      <DropdownMenu
        slot="list"
        :class="classId">
        <slot name="list"></slot>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-panel'
import { getKey } from '@src/util/assist'

export default {
  props: {
    name: prefixCls,
    placement: {
      type: String,
      default: 'bottom-start'
    },
    trigger: {
      type: String,
      default: 'custom'
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
      prefixCls,
      classId: 'rd-filter-list-panel' + getKey()
    }
  },
  computed: {
    currentTrigger() {
      return this.trigger === 'hover' ? 'hover' : 'custom'
    }
  },
  mounted() {
    this.initStyle()
  },
  methods: {
    initStyle() {
      if (this.transfer) {
        const targetDiv = document.querySelector(`.${this.classId}`)
        if (targetDiv && targetDiv.parentNode) {
          const parentContainer = targetDiv.parentNode
          // 可以进一步修改父容器的样式
          parentContainer.style.maxHeight = 'inherit'
          parentContainer.style.padding = '0'
        }
      }
    },
    handleClick() {
      // trigger 是 'hover'的场景，不执行visible开启，会有冲突
      if (this.disabled || this.trigger === 'hover') {
        return
      }
      this.visible = !this.visible
    },
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
      this.visible = false
    },
    onClickoutside(event) {
      const { $el } = this.$refs.Dropdown.$refs.drop
      if ($el === event.target || $el.contains(event.target)) {
        return
      }
      this.visible = false
    }
  }
}
</script>
