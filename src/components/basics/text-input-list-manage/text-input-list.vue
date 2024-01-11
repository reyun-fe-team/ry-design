<template>
  <div :class="prefixCls">
    <rd-virtual-list
      ref="list"
      :class="prefixCls + '-virtual-list'"
      :data-key="'uid'"
      :data-sources="getLine"
      :extra-props="extraProps"
      :data-component="ItemComponent"
      v-on="$listeners" />
  </div>
</template>
<script>
import ItemComponent from './title-list'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'text-input-list'
export default {
  name: prefixCls + '-manage',
  props: {
    // 最大行数
    maxLine: {
      type: Number,
      default: 30
    },
    value: {
      type: Array,
      default: () => []
    },
    // 文本字符最小长度
    minLength: {
      type: Number,
      default: 6
    },
    // 文本字符最大长度
    maxLength: {
      type: Number,
      default: 30
    },
    placeholder: {
      type: String,
      default: '请输入或粘贴创意标题，每行一标题，敲击回车换行'
    },
    // 文本计算方法.默认每个文字算2个字符
    calcTextFn: {
      type: Function,
      default: text => text.replaceAll(/[^\x00-\xff]/g, '**').length
    },
    validFn: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      prefixCls,
      ItemComponent,
      // 当前数据计数器
      middle: {
        preActiveClass: null,
        activeClass: null
      },
      // 错误信息
      errorList: [],
      // 事件
      emits: {
        'on-enter-over-length': this.handleEnterOverLength,
        'on-paste-over-length': this.handlePasteOverLength,
        'on-middle-change': this.handleMiddleChange,
        'on-error': this.handleError,
        'on-change': this.handleChange
      },
      currentInput: null
    }
  },
  computed: {
    extraProps() {
      let { $props, middle, emits } = this
      return { ...$props, middle, emits }
    },
    getLine() {
      let arr = []
      for (let index = 0; index < this.maxLine; index++) {
        arr.push({
          uid: `key_${index}`,
          index,
          item: index + 1,
          maxLine: this.maxLine
        })
      }
      return arr
    }
  },
  watch: {
    value: {
      deep: true,
      handler(cur) {
        if (cur.length === 0 && this.middle.activeClass !== null) {
          this.errorList = []
        }
      }
    }
  },
  methods: {
    handleMiddleChange(middle) {
      this.middle = middle
      let { activeClass } = this.middle
      this.$emit('on-middle-change', this.middle)

      let currentVirtualItem = this.$refs.list.$children.find(item => item.index === activeClass)
      if (currentVirtualItem) {
        this.currentInput = currentVirtualItem.$children[0]
      }

      if (this.currentInput) {
        this.currentInput.$refs.Input.focus()
      }
    },
    handleError(index, error) {
      this.errorList.splice(index, 0, error)
      this.$emit('on-error', index, error)
    },
    // 回车超出可编辑的列表长度
    handleEnterOverLength(index) {
      this.$emit('on-enter-over-length', index)
    },
    // 复制粘贴超出可编辑的列表返回超出的内容
    handlePasteOverLength(data) {
      this.$emit('on-paste-over-length', data)
    },
    handleChange(val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
    },
    insertText(val) {
      this.currentInput.insertTextAtCursor(val)
    }
  }
}
</script>
