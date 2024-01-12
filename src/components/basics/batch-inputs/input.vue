<template>
  <div :class="[prefixCls]">
    <input
      ref="Input"
      v-model="currentValue"
      type="text"
      style="width: 100%"
      :placeholder="placeholder"
      :class="prefixCls + '-rich'"
      @mouseup="handlerMouseup"
      @focus="handlerFocus"
      @blur="handlerBlur"
      @keyup="handlerKeyup"
      @keydown="handlerKeydown"
      @input="handlerInput"
      @paste="handlerPaste" />

    <div
      v-if="showLimit"
      v-show="isFounded"
      :class="[prefixCls + '-ln-wrap']">
      <!-- 字数 -->
      <div :class="[prefixCls + '-ln-wrap-l']">{{ totalln }}/{{ maxLength }}</div>
      <!-- 清空 -->
      <div :class="[prefixCls + '-ln-wrap-r']">
        <Icon
          type="md-close"
          @click="handleClear"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
import { typeOf } from '../../../util/assist'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'batch-inputs-row-input'

export default {
  name: prefixCls,
  props: {
    value: {
      require: true,
      type: String,
      default: ''
    },
    // 显示文字长度
    showLimit: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入或粘贴创意标题，每行一标题，敲击回车换行'
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
    // 文本计算方法
    calcTextFn: {
      type: Function,
      default: null
    },
    // 验证方法
    validFn: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      prefixCls,
      // 聚焦状态
      isFounded: false,
      // 当前的输入的值
      currentValue: this.value || '',
      // 已输入的字符长度
      totalln: 0
    }
  },
  watch: {
    value() {
      if (this.value !== this.currentValue) {
        this.currentValue = this.value
      }
    },
    currentValue() {
      // 计算字数
      this.calcWordCount()
      // 计算验证
      this.calcValidResult()
    }
  },
  methods: {
    // 鼠标抬起事件
    handlerMouseup(event) {
      event.stopPropagation()
    },
    // 输入事件
    handlerInput(keyInputEvent) {
      keyInputEvent.stopPropagation()
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    },
    // 粘贴(禁止粘贴文件和图片)
    handlerPaste(event) {
      event.stopPropagation()
      event.preventDefault()
      const { clipboardData } = event
      if (!clipboardData) {
        return
      }
      const { items } = clipboardData
      if (!items) {
        return
      }
      // 获取纯文本
      const text = event.clipboardData.getData('text/plain')
      // 不是纯文本就阻止粘贴
      if (!text) {
        return
      }

      this.$emit('on-paste', event)
    },
    // 键盘按下事件
    handlerKeydown(keyDownEvent) {
      keyDownEvent.stopPropagation()

      this.$emit('on-keydown', {
        // 按键事件对象
        keyDownEvent,
        // 输入框的html 内容
        stringHtml: keyDownEvent.target.value,
        // 禁用输入。一些场景去禁用。
        disableInputFn: () => keyDownEvent.preventDefault()
      })
    },
    // 键盘抬起事件
    handlerKeyup(keyUpEvent) {
      keyUpEvent.stopPropagation()
    },
    // 聚焦事件
    handlerFocus(event) {
      this.isFounded = true
      this.$emit('on-foucs', event)
    },
    // 失焦事件
    handlerBlur(event) {
      this.isFounded = false
      this.$emit('on-blur', event)
    },
    // 清除
    handleClear() {
      this.currentValue = ''
      this.$emit('on-clear')
    },

    // ----------公共方法---------
    insertTextAtCursor(textToInsert) {
      const insertedTextLength = textToInsert.length
      if (insertedTextLength < 1) {
        return
      }

      const input = this.$refs.Input
      const selectionStart = input.selectionStart
      const selectionEnd = input.selectionEnd
      const inputValue = input.value
      const before = inputValue.substring(0, selectionStart)
      const after = inputValue.substring(selectionEnd)

      input.value = before + textToInsert + after
      this.currentValue = input.value
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)

      // 使用 requestAnimationFrame 确保在下一帧渲染前执行
      window.requestAnimationFrame(() => {
        // 重新设置光标位置（将光标移动到插入文字的末尾）
        const position = selectionStart + insertedTextLength
        input.setSelectionRange(position, position)
      })
    },
    // 计算字数
    calcWordCount() {
      this.totalln = this.currentValue.length
      if (this.calcTextFn && typeOf(this.calcTextFn) === 'function') {
        this.totalln = this.calcTextFn(this.currentValue)
      }
    },
    // 计算校验
    calcValidResult() {
      let errors = []
      if (this.validFn && typeOf(this.validFn) === 'function') {
        errors = this.validFn(this.totalln, this.currentValue)
      }
      this.$emit('on-error', errors)
    },
    // ----------公共方法---------

    // ---------主动事件------
    // 自定义聚焦
    focus() {
      const _ref = this.$refs.Input
      _ref && _ref.focus()
    },
    // 自定义失焦
    blur() {
      const _ref = this.$refs.Input
      _ref && _ref.blur()
    }
    // ---------主动事件------
  }
}
</script>
