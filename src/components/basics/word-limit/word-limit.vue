<template>
  <div :class="prefixCls">
    <slot
      v-if="isInputSlot"
      name="input">
      <Input
        v-model="inputValue"
        clearable
        :type="inputType"
        :placeholder="inputPlaceholder"
        :style="`width: ${inputWidth}px; margin-right: 10px;`"
        :disabled="inputDisabled"
        :border="inputBorder"
        @on-change="onChange"></Input>
    </slot>
    <span style="display: inline-block">
      <span :class="lengthRule ? 'error' : ''">
        {{ len }}
      </span>
      <span>/ {{ maxLen }}</span>
    </span>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'word-limit'
import { count } from '@src/util/assist.js'
export default {
  name: prefixCls,
  props: {
    // slot中Input值
    value: {
      type: String,
      default: ''
    },
    // slot是否展示，默认展示
    isInputSlot: {
      type: Boolean,
      default: true
    },
    inputPlaceholder: {
      type: String,
      default: '请输入'
    },
    inputWidth: {
      type: Number,
      default: 480
    },
    inputType: {
      type: String,
      default: 'text'
    },
    inputDisabled: {
      type: Boolean,
      default: false
    },
    inputBorder: {
      type: Boolean,
      default: true
    },
    // 是否区分中英文
    isDifferWord: {
      type: Boolean,
      default: true
    },
    // 按英文展示输入数量
    countType: {
      type: String,
      default: 'en'
    },
    maxLen: {
      type: Number,
      default: 10
    },
    // 当isInputSlot = false,len = currentLen
    currentLen: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      prefixCls,
      inputValue: this.value
    }
  },
  computed: {
    len() {
      let res = 0
      const { isInputSlot, currentLen, inputValue, countType, isDifferWord } = this
      if (!isInputSlot) {
        res = currentLen
      } else {
        res = currentLen ? currentLen : count({ value: inputValue, type: countType, isDifferWord })
      }
      return res
    },
    lengthRule() {
      return this.len > this.maxLen
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.inputValue) {
          this.inputValue = val
        }
      }
    }
  },
  methods: {
    onChange() {
      this.$emit('input', this.inputValue)
      this.$emit('on-change', this.inputValue)
    },
    countFn(params) {
      return count(params)
    }
  }
}
</script>
