<template>
  <main>
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
    <span
      :class="[prefixCls]"
      style="display: inline-block">
      <span :class="lengthRule ? 'error' : ''">
        {{ len }}
      </span>
      <span>/ {{ maxLen }}</span>
    </span>
  </main>
</template>

<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'word-limit'
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
      inputValue: ''
    }
  },
  computed: {
    len() {
      let res = 0
      const { isInputSlot, currentLen, inputValue, countType, isDifferWord } = this
      if (!isInputSlot) {
        res = currentLen
      } else {
        res = this.count({ value: inputValue, type: countType, isDifferWord })
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
          this.onChange()
        }
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    onChange() {
      this.$emit('input', this.inputValue)
      this.$emit('on-change', this.inputValue)
      this.$emit('on-validate', this.lengthRule)
    },
    count({ value, type, isDifferWord }) {
      let len = 0
      // 输入内容不区分中英文，直接返回value的长度
      if (!isDifferWord) {
        len = value.length
        return len
      }
      // 区分中英文
      // type === 'en', 返回当前输入的字节数 （按英文展示输入数量）
      // type === 'cn', 如果字节数为奇数，则字节数加1（按中文展示输入数量）
      value &&
        value.split('').forEach(item => {
          const charCode = item.charCodeAt()
          if (charCode >= 0 && charCode <= 128) {
            len++
          } else {
            len += 2
          }
        })
      // 按英文展示输入数量
      if (type === 'en') {
        return len
      }
      // 按中文展示输入数量时
      if (type === 'cn') {
        // 如果字节数为奇数，则字节数加1
        if (len % 2 > 0) {
          len++
        }
        len = len / 2
      }
      return len
    }
  }
}
</script>
