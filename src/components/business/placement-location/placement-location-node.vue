<template>
  <div :class="prefixCls">
    <div
      :class="classesItem"
      @click.stop="handleClick">
      <template v-if="showCheckbox">
        <Checkbox
          v-if="multiple"
          :disabled="disabled"
          :value="currentChecked"></Checkbox>
        <Radio
          v-if="!multiple"
          v-model="currentChecked"
          :disabled="disabled"></Radio>
      </template>
      <div
        :class="prefixCls + '-item-text'"
        :title="label">
        {{ label }}
      </div>
    </div>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'placement-location-node'
export default {
  name: prefixCls,
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '朋友圈'
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      currentChecked: this.value
    }
  },
  computed: {
    classesItem() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-select`]: this.showCheckbox && !this.disabled,
          [`${prefixCls}-item-disabled`]: this.showCheckbox && this.disabled
        }
      ]
    }
  },
  watch: {
    value(value) {
      this.currentChecked = value
    }
  },
  methods: {
    handleClick() {
      if (!this.showCheckbox || this.disabled) {
        return
      }
      if (this.multiple) {
        this.currentChecked = !this.currentChecked
      } else {
        if (this.currentChecked) {
          return
        }
        this.currentChecked = true
      }
      this.$emit('input', this.currentChecked)
      this.$emit('on-change', this.currentChecked)
    }
  }
}
</script>