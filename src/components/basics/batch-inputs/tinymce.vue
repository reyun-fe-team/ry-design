<template>
  <div :class="[prefixCls]">
    <div
      ref="Input"
      contenteditable
      style="width: 100%"
      :placeholder="placeholder"
      :class="prefixCls + '-rich'"
      @mouseup="handlerMouseup"
      @focus="handlerFocus"
      @blur="handlerBlur"
      @keyup="handlerKeyup"
      @keydown="handlerKeydown"
      @input="handlerInput"
      @paste="handlerPaste"></div>

    <div
      v-if="showLimit && value.length > 0"
      :class="[prefixCls + '-ln-wrap']">
      <!-- 字数 -->
      <div :class="[prefixCls + '-ln-wrap-l']">{{ totalln }}/{{ maxLength }}</div>
      <!-- 清空 -->
      <Icon
        :class="[prefixCls + '-ln-wrap-r']"
        type="md-close"
        @click="handleClear"></Icon>
    </div>
  </div>
</template>

<script>
import { typeOf, saveSelection, restoreSelection } from '@src/util/assist'
import { prefix } from '@src/config.js'
import _throttle from 'lodash/throttle'
const prefixCls = prefix + 'batch-inputs-tinymce'

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
      currentValue: '',
      // 已输入的字符长度
      totalln: 0,
      // 光标范围
      selection: null
    }
  },
  computed: {
    tooltipOptions() {
      const show = this.currentValue.length > 0
      const option = {
        compUpdatedVisible: show && this.isFounded,
        content: this.currentValue,
        'max-width': 350,
        placement: 'bottom-start'
      }
      return show ? option : null
    },
    // 更新选区
    getSelection() {
      const func = this.getSelectionImmediate
      return _throttle(func, 16.7)
    }
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.setInputValue(this.value)
      })
    },
    currentValue() {
      // 计算字数
      this.calcWordCount()
      // 计算验证
      this.calcValidResult()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setInputValue(this.value)
    })
  },
  methods: {
    // 鼠标抬起事件
    handlerMouseup(event) {
      event.stopPropagation()
      // 更新选区
      this.getSelection()
    },
    // 输入事件
    handlerInput(event) {
      event.stopPropagation()
      event.preventDefault()
      this.currentValue = this.$refs.Input.innerHTML
      // 更新选区
      this.getSelection()
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    },
    // 粘贴(禁止粘贴文件和图片)
    // 粘贴触发输入，自动更新选区
    handlerPaste(event) {
      event.stopPropagation()
      event.preventDefault()
      const clipboardData = event.clipboardData || event.originalEvent.clipboardData

      if (!clipboardData) {
        return
      }

      const plainTextList = this.getClipboardData(clipboardData)
      if (plainTextList.length > 0) {
        // 立刻获取选区
        this.getSelectionImmediate()
        // 粘贴事件当前行，直接插入文本
        this.insertTextAtCursor(plainTextList[0])
        // 触发
        this.$emit('on-paste', plainTextList)
      }
    },
    // 键盘按下事件
    handlerKeydown(event) {
      event.stopPropagation()

      this.$emit('on-keydown', {
        // 按键事件对象
        keyDownEvent: event,
        // 输入框的html 内容
        stringHtml: event.target.value,
        // 禁用输入。一些场景去禁用。
        disableInputFn: () => event.preventDefault()
      })
    },
    // 键盘抬起事件
    handlerKeyup(keyUpEvent) {
      keyUpEvent.stopPropagation()
      // 更新选区
      this.getSelection()
    },
    // 聚焦事件
    handlerFocus(event) {
      // 更新选区
      this.getSelection()
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
      this.setInputValue()
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
      this.$emit('on-clear')
    },

    // ----------公共方法---------
    // 获取剪切板内容
    getClipboardData(clipboardData) {
      const getReg = str => {
        const regs = {
          '\\r\\n': /\\r\\n/,
          '\\r': /\\r/,
          '\\n': /\\n/
        }
        for (const s in regs) {
          if (str.indexOf(s) > -1) {
            return regs[s]
          }
        }

        return /\\r\\n/
      }
      let plainText = clipboardData.getData('text/plain')
      plainText = JSON.stringify(plainText)
      plainText = plainText.replace(/"/g, '')
      const reg = getReg(plainText)
      const plainTextList = plainText.split(reg).filter(s => s.length > 0)

      return plainTextList
    },
    // 设置inputValue
    setInputValue(value = '') {
      if (value !== this.currentValue) {
        this.currentValue = value
        // 光标丢失，无法保存
        this.$refs.Input.innerHTML = this.currentValue
        // 删除选区
        restoreSelection(this.selection)
        // 在重新获取一次
        this.getSelection()
      }
    },
    // 将光标设置在最后
    setPlaceCaretAtEnd() {
      if (document.getSelection) {
        const range = document.createRange()
        range.selectNodeContents(this.$refs.Input)
        range.collapse(false)
        const selection = document.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        this.focus()
      }
    },
    // 主动插入内容
    insertTextAtCursor(textToInsert) {
      function createNode(htmlStr) {
        const div = document.createElement('div')
        div.innerHTML = htmlStr
        return div.childNodes[0]
      }

      // 不存在选区，主动设置一个
      if (!this.selection) {
        // 将光标设置在最后
        this.setPlaceCaretAtEnd()
        // 更新选区
        this.getSelection()
      }

      // 依赖没有取到选区，提示报错，需要主动设置
      if (!this.selection) {
        console.warn('Warn: 输入选区不存在。设置内容前需要主动点击设置光标。')
        return
      }

      // 只保留当前的选区
      restoreSelection(this.selection)

      // 创建节点
      const node = createNode(textToInsert)
      // 插入节点
      this.selection.deleteContents()
      this.selection.insertNode(node)

      // 重新设置光标位置
      this.selection.setStartAfter(node)
      this.selection.setEndAfter(node)

      // 使用 requestAnimationFrame 确保在下一帧渲染前执行
      window.requestAnimationFrame(() => {
        this.currentValue = this.$refs.Input.innerHTML
        // 重新保存当前的选区(自动更新选区位置，不用手动更新)
        // this.getSelection()
        this.$emit('input', this.currentValue)
        this.$emit('on-change', this.currentValue)
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
    // 立刻获取选区
    getSelectionImmediate() {
      const activeElement = this.$refs.Input
      this.selection = saveSelection(activeElement)
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
