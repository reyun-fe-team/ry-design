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
        <row-input
          ref="Input"
          :key="index"
          :show-limit="showLimit"
          :value="value[index]"
          :class="lineInputClasses"
          :placeholder="placeholder"
          :calc-text-fn="calcTextFn"
          :valid-fn="calcValidResult"
          :max-length="maxLength"
          :min-length="minLength"
          @input="val => handleEmitInput(val, index)"
          @on-foucs="val => handlerFocus(val, index)"
          @on-keydown="val => handlerKeydown(val, index)"
          @on-clear="handlerClear(index)"
          @on-paste="val => handlerPaste(val, index)"
          @on-error="val => handleError(val, index)"></row-input>

        <!-- 每一行的最尾端 slot -->
        <div
          v-if="endSlotProps.renderFunction"
          :class="[prefixCls + '-btn-wrap']">
          <end-slot v-bind="endSlotProps"></end-slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
import rowInput from './input'
import endSlot from './slots/end'

const prefixCls = prefix + 'batch-inputs'

export default {
  name: prefixCls + '-row',
  components: {
    rowInput,
    endSlot
  },
  inject: ['root'],
  props: {
    // 显示文字长度
    showLimit: {
      type: Boolean,
      default: true
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
    emits: {
      type: Object,
      default: () => {}
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
      let { index, errorList } = this
      return errorList[index] && errorList[index].length > 0
    },
    isCurrentLine() {
      let { middle, index } = this
      return middle.activeClass === index
    },
    endSlotProps() {
      const renderFunction = this.root.$scopedSlots['end']
      const { source, index, value, insertText } = this
      return { source, index, value, renderFunction, insertText }
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
    handlerKeydown({ keyDownEvent, disableInputFn }, index) {
      // 回车换行
      if (keyDownEvent.keyCode === 13) {
        disableInputFn()
        const currentIndex = index + 1

        if (currentIndex >= this.maxLine) {
          // 回车后超出可编辑的长度
          this.dispatch('on-enter-over-length', currentIndex)
          return
        }

        this.dispatch('on-middle-change', {
          preActiveClass: this.middle.activeClass,
          activeClass: currentIndex
        })
      }
    },
    // 清空
    handlerClear(index) {
      const newValue = [...this.value]
      newValue.splice(index, 1)
      this.dispatch('on-input', newValue)
      this.dispatch('on-change', newValue)
    },
    // 输入事件
    handleEmitInput(value, index) {
      if (this.value[index] === value) {
        return
      }

      const newValue = [...this.value]
      newValue[index] = value || ''
      this.dispatch('on-input', newValue)
      this.dispatch('on-change', newValue)
    },
    // 粘贴
    handlerPaste(event, index) {
      // 超出可编辑的列表长度
      let overLength = []
      this.getClipboardData(event, arr => {
        let newValue = JSON.parse(JSON.stringify(this.value))
        arr.forEach((o, i) => {
          // 首行 叠加
          if (i === 0) {
            // 再光标位置插入复制的文案
            newValue[index] = !newValue[index] ? o : newValue[index] + o
          }

          // 插入新行
          if (i > 0) {
            newValue.splice(index + i, 0, o)
          }

          // 校验 && 超出最大行数
          if (newValue.length > this.maxLine) {
            overLength.push(o)
            this.dispatch('on-paste-over-length', overLength)
          }
          // 校验 && 文案
          else {
            if (o) {
              const count = this.calcWordCount(o)
              const error = this.calcValidResult(count, o)
              this.dispatch('on-error', index + i, error)
            }
          }
        })
        // 截取
        newValue = newValue.slice(0, this.maxLine)
        this.dispatch('on-input', newValue)
        this.dispatch('on-change', newValue)
      })
    },
    // 获取剪切板内容
    getClipboardData(event, cb) {
      let itemList = event.clipboardData.items

      function getSplitReg(str) {
        if (str.indexOf('\\r\\n') > -1) {
          return /\\r\\n/
        } else if (str.indexOf('\\r') > -1) {
          return /\\r/
        } else if (str.indexOf('\\n') > -1) {
          return /\\n/
        }
        return /\\r\\n/
      }

      for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i]
        if (item.kind === 'string' && item.type.match('text/plain')) {
          item.getAsString(str => {
            let splitReg = getSplitReg(JSON.stringify(str).replace(/"/g, ''))
            let arr = JSON.stringify(str)
              .replace(/"/g, '')
              .split(splitReg)
              .filter(o => o)

            cb && cb(arr)
          })
        }
      }
    },
    // 错误
    handleError(errors, index) {
      this.dispatch('on-error', index, [...this.currentErrors, ...errors])
    },
    // 计算字数
    calcWordCount(text) {
      if (!text) {
        return 0
      }
      let copyDom = document.createElement('div')
      // 需要匹配换行符替换为空
      copyDom.innerHTML = text.replaceAll('&nbsp;', '')
      // 计算文本长度
      let textLn = 0
      const textStr = copyDom.innerText.replace(/[\r\n]/g, '')
      if (this.calcTextFn) {
        textLn = this.calcTextFn(textStr)
      } else {
        textLn = textStr.length
      }
      const imgs = copyDom.getElementsByTagName('img')
      const emojLn = [...imgs].reduce(
        (pre, cur) => (cur.getAttribute('data-type') === 'emoj' ? pre + 1 : pre),
        0
      )
      return textLn + emojLn
    },
    // 计算验证
    calcValidResult(ln, value) {
      let errors = []
      // 长度
      if (!isNaN(ln) && (ln > this.maxLength || ln < this.minLength)) {
        errors.push('lengthError')
      }

      // 其他
      if (typeof this.validFn === 'function') {
        const allErrors = this.validFn(value, this.index)
        errors = [...errors, ...allErrors]
      }
      return errors
    },
    // 插入文本
    insertText(text) {
      this.$refs.Input.insertTextAtCursor(text)
    }
  }
}
</script>
