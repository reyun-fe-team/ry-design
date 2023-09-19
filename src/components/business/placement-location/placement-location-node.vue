<template>
  <div :class="prefixCls">
    <div
      :class="classesItem"
      @click.stop="handleClick">
      <template v-if="showCheckbox">
        <Checkbox
          v-if="multiple"
          :disabled="disabled"
          :value="currentCheck"></Checkbox>
        <Radio
          v-if="!multiple"
          v-model="currentCheck"></Radio>
      </template>
      <div :class="prefixCls + '-item-text'">
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
      currentCheck: this.value
    }
  },
  computed: {
    classesItem() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-hover`]: this.showCheckbox
        }
      ]
    }
  },
  watch: {
    value(value) {
      this.currentCheck = value
    }
  },
  methods: {
    handleClick() {
      if (!this.showCheckbox) {
        return
      }
      if (this.multiple) {
        this.currentCheck = !this.currentCheck
      } else {
        if (this.currentCheck) {
          return
        }
        this.currentCheck = true
      }
      console.log(this.currentCheck)
      this.$emit('input', this.currentCheck)
      this.$emit('on-change', this.currentCheck)
    }
  }
}
</script>