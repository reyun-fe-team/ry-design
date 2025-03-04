<template>
  <div :class="prefixCls + '-content'">
    <div :class="prefixCls + '-line'">
      <!-- 行号 -->
      <div :class="lineNumberClasses">
        <span :class="{ [prefixCls + '-error-left']: isHaveError }">
          {{ index + 1 }}
        </span>
      </div>
      <!-- 输入 -->
      <div :class="prefixCls + '-right-list'">
        <Tinymce
          ref="Input"
          :key="index"
          :disabled="disabled"
          :type="type"
          :show-limit="showLimit"
          :value="value[index]"
          :class="lineInputClasses"
          :placeholder="placeholder"
          :calc-text-fn="calcWordCount"
          :valid-fn="calcValidResult"
          :max-length="maxLength"
          :min-length="minLength"
          @input="val => handleEmitInput(val, index)"
          @on-foucs="val => handlerFocus(val, index)"
          @on-keydown="val => handlerKeydown(val, index)"
          @on-clear="handlerClear(index)"
          @on-paste="val => handlerPaste(val, index)"
          @on-error="val => handleError(val, index)"></Tinymce>

        <!-- 每一行的最尾端 slot -->
        <div
          v-if="endSlotProps.renderFunction"
          :class="[prefixCls + '-btn-wrap']">
          <RowEnd v-bind="endSlotProps"></RowEnd>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
import Tinymce from './tinymce'
import RowEnd from './row-end'
import { deepCopy, waitOut } from '@src/util/assist'

const prefixCls = prefix + 'batch-inputs'
const EnterIconValue = '\\'

export default {
  name: prefixCls + '-line',
  components: {
    Tinymce,
    RowEnd
  },
  inject: ['root'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    source: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    },
    item: {
      type: Number,
      default: null
    },
    middle: {
      type: Object,
      default: () => {}
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
    // 最大行数
    maxLine: {
      type: Number,
      default: 10
    },
    // 错误列表
    errorList: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    // 文本计算方法.默认每个文字算2个字符
    calcTextFn: {
      type: Function,
      default: null
    },
    // 错误校验方法
    validFn: {
      type: Function,
      default: null
    },
    // 事件
    emits: {
      type: Object,
      default: () => {}
    },
    // 类型 只能是文本 PlainText 支持的html内容 Html
    type: {
      type: String,
      default: 'PlainText'
    },
    // 显示文字长度
    showLimit: {
      type: Boolean,
      default: true
    },
    // 一个图标几个字符
    iconWordCount: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    lineInputClasses() {
      let { isHaveError, isCurrentLine } = this
      return {
        [prefixCls + '-right-list-active']: isCurrentLine,
        [prefixCls + '-is-error']: isHaveError
      }
    },
    lineNumberClasses() {
      let { isCurrentLine, isHaveError } = this
      return [
        prefixCls + '-left-list',
        {
          [prefixCls + '-left-list-active']: isCurrentLine,
          [prefixCls + '-is-error']: isHaveError
        }
      ]
    },
    isHaveError() {
      let { currentErrors } = this
      if (currentErrors) {
        return currentErrors.length > 0
      }
      return false
    },
    isCurrentLine() {
      let { middle, index } = this
      return middle.activeClass === index
    },
    endSlotProps() {
      const renderFunction = this.root.$scopedSlots['end']
      const { source, index, value, insertNode } = this
      return { source, index, value, renderFunction, insertNode }
    },
    // 当前的错误
    currentErrors() {
      return this.errorList[this.index] || []
    }
  },
  methods: {
    // 事件派发
    dispatch(eventName, ...argv) {
      let fn = this.emits[eventName]
      fn && fn(...argv)
    },
    // 聚焦
    handlerFocus(e, activeClass) {
      if (activeClass !== this.middle.activeClass) {
        this.dispatch('on-middle-change', {
          preActiveClass: this.middle.activeClass,
          activeClass
        })
      }
    },
    // 按键
    async handlerKeydown({ keyDownEvent, disableInputFn }, index) {
      // 回车换行
      if (keyDownEvent.keyCode === 13) {
        disableInputFn()
        const currentIndex = index + 1

        // 回车后超出可编辑的长度
        if (currentIndex >= this.maxLine) {
          this.dispatch('on-enter-over-length', currentIndex)
          return
        }

        // 更新,聚焦
        await this.$nextTick()
        waitOut(() => {
          this.dispatch('on-middle-change', {
            preActiveClass: this.middle.activeClass,
            activeClass: currentIndex
          })
        })

        // 回车
        this.dispatch('on-enter', index)
      }
    },
    // 清空
    handlerClear(index) {
      const newValue = [...this.value]
      // 直接删除当前行
      newValue.splice(index, 1)
      this.dispatch('on-input', newValue)
      this.dispatch('on-change', newValue)
    },
    // 输入事件
    handleEmitInput(value, index) {
      if (this.value[index] === value) {
        return
      }

      const newValue = [...this.value].map(v => v || '')
      newValue[index] = value || ''
      this.dispatch('on-input', newValue)
      this.dispatch('on-change', newValue)
    },
    // 粘贴
    handlerPaste(plainTextList, index) {
      // 超出可编辑的列表长度
      let overLength = []
      let newValue = deepCopy(this.value)
      plainTextList.forEach((plainText, plainTextIndex) => {
        // 首行自动更新了

        const activeIndex = index + plainTextIndex
        // 第二行开始，插入新行
        if (plainTextIndex >= 1) {
          newValue.splice(activeIndex, 0, plainText)
        }

        // 校验 && 超出最大行数
        if (newValue.length > this.maxLine) {
          overLength.push(plainText)
          this.dispatch('on-paste-over-length', overLength)
        }

        // 校验 && 文案
        else {
          if (plainText.length > 0) {
            const count = this.calcWordCount(plainText)
            const error = this.calcValidResult(count, plainText)
            error.length > 0 && this.dispatch('on-error', activeIndex, error)
          }
        }
      })
      // 截取
      newValue = newValue.slice(0, this.maxLine)
      this.dispatch('on-input', newValue)
      this.dispatch('on-change', newValue)
    },
    // 错误
    handleError(errors, index) {
      // 计算错误结果
      let newErrors = [...new Set(errors)]
      this.dispatch('on-error', index, newErrors)
    },
    // 计算字数
    calcWordCount(htmlString) {
      let totalln = 0

      if (!htmlString) {
        return totalln
      }

      htmlString = htmlString.replaceAll(/<br>|&nbsp;/g, '')
      if (this.calcTextFn) {
        return this.calcTextFn(htmlString)
      }

      const div = document.createElement('div')
      div.innerHTML = htmlString
      const childNodes = div.childNodes
      for (let index = 0; index < childNodes.length; index++) {
        const ele = childNodes[index]
        const isTextNode = ele.nodeType === Node.TEXT_NODE
        const isEleNode = ele.nodeType === Node.ELEMENT_NODE
        if (isTextNode) {
          totalln += ele.nodeValue.length
        }
        if (isEleNode && ele.nodeName === 'IMG') {
          const imgValue = ele.getAttribute('value')
          // 不计算回车符号
          if (imgValue !== EnterIconValue) {
            totalln += this.iconWordCount || 1
          }
        }
      }

      return totalln
    },
    // 计算验证
    calcValidResult(ln, value) {
      const isValid = typeof value === 'string' && value.length > 0
      if (!isValid) {
        return []
      }

      // 长度(有长度才能校验)
      let lengthError = []
      if (!isNaN(ln) && (ln > this.maxLength || ln < this.minLength)) {
        lengthError.push('lengthError')
      }

      // 其他
      let otherError = []
      if (typeof this.validFn === 'function') {
        otherError = this.validFn(value, this.index)
      }

      return [...lengthError, ...otherError]
    },
    // 插入节点
    // text 文本 image 图片 enterIcon br标签
    insertNode(type, data = {}) {
      const _input = this.$refs.Input
      if (!_input) {
        throw '[WARN] invalid input'
      }

      if (data) {
        const { value = '', url = '' } = data

        let strings = []
        if (type === 'text') {
          strings = [value]
        }
        if (this.type === 'Html' && type === 'image') {
          strings = [`<img src="${url}" value="${value}"/>`]
        }
        if (this.type === 'Html' && type === 'enterIcon') {
          strings = [`<img src="${url}" value="${EnterIconValue}"/>`, '<br/>', '&nbsp;']
        }

        strings.forEach(text => _input.insertTextAtCursor(text))
      }
    }
  }
}
</script>
