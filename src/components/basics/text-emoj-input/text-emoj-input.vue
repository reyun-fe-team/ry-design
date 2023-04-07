<template>
  <div :class="[prefixCls, { [prefixCls + '-single-line']: isSingleLine }]">
    <div
      ref="rich-edit"
      :class="prefixCls + '-rich'"
      :contenteditable="isEdit && contenteditable"
      @focus="handlerFocus"
      @blur="handlerBlur"
      @keyup="handlerKeyup"
      @keydown="handlerKeydown"
      @mouseup="handlerMouseup"
      @input="handlerInput"
      @paste="handlerPaste"></div>
    <div
      v-show="!totalln && !value"
      :class="prefixCls + '-placeholder'">
      {{ placeholder }}
    </div>
    <div
      v-show="isEdit"
      :class="prefixCls + '-ln-wrap'">
      <div :class="prefixCls + '-ln-wrap-l'">{{ totalln }}/{{ maxLength }}</div>
      <div :class="prefixCls + '-ln-wrap-r'">
        <Icon
          type="md-close"
          @click="onClear"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlainText } from './../../../util/text-emoj-input'
import { typeOf } from './../../../util/assist'

import { prefix } from '@src/config.js'
const prefixCls = prefix + 'text-emoj-input'

export default {
  name: prefixCls,
  props: {
    /**
     * @description 验证插入文档标记的校验规则
     * @param {string} value html标记内容
     * @returns {boolean} true 可以插入 false 不能插入
     */
    // eslint-disable-next-line vue/require-default-prop
    validHtmlMarkFn: Function,
    /**
     * @description 将html标记 转换为 通用文本内容
     * @param {string} value html标记内容
     * @returns {string} 通用文本内容
     */
    // eslint-disable-next-line vue/require-default-prop
    transformHtml2Text: Function,
    /**
     * @description 将通用文本内容  转换为 html标记
     * @param {string} value 通用文本内容
     * @returns {string} html标记内容
     */
    // eslint-disable-next-line vue/require-default-prop
    transformText2Html: Function,
    // 是否支持转译 例如< > 转译成&lt; &gt;
    isTransform: {
      type: Boolean,
      default: true
    },
    // 传入的默认文本（通用文本内容）
    value: {
      require: true,
      type: String,
      default: ''
    },
    // 是否能使用html标记
    canUseHtml: {
      type: Boolean,
      default: true
    },
    // 是否单行显示
    isSingleLine: {
      type: Boolean,
      default: false
    },
    // 光标所在的编辑行
    isEdit: {
      type: Boolean,
      default: false
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
    calcTextFn: Function,
    // 验证方法
    validFn: Function
  },
  data() {
    return {
      prefixCls,
      // 能不能编辑
      contenteditable: true,
      // 当前选择的文本范围
      currentRange: null,
      // 编辑框dom
      richEditRef: null,
      // 是否支持文本范围
      supportRange: '',
      // eslint-disable-next-line vue/no-reserved-keys
      rangeParentElement: null,
      // 已输入的字符长度
      totalln: 0
    }
  },
  watch: {
    value() {
      if (!this.isEdit) {
        this.$nextTick(() => {
          this.echoValue2Ttml()
          this.calcInputLength()
          this.valid()
        })
      }
    },
    isEdit() {
      if (!this.value && !this.isEdit) {
        return
      }
      if (!this.isEdit) {
        this.$emit('on-blur', null, this.getValue())

        this.$nextTick(() => {
          this.echoValue2Ttml()
        })
        return
      }

      if (!this.value) {
        return
      }

      this.formatValue()
    }
  },
  mounted() {
    this.supportRange = typeOf(document.createRange) === 'function'
    this.richEditRef = this.$refs['rich-edit']
    this.$nextTick(() => {
      this.value && this.echoValue2Ttml()
    })
  },
  methods: {
    formatValue() {
      this.$nextTick(() => {
        const copyDom = document.createElement('div')
        copyDom.innerHTML = this.value
        const imgs = copyDom.getElementsByTagName('img')
        const enterFlag = [...imgs].find(img => img.getAttribute('data-type') === 'enter')
        if (enterFlag && this.isEdit) {
          const tmp = document.createElement('div')
          tmp.appendChild(enterFlag)
          const tmpStr = tmp.innerHTML

          this.replaceContent(this.value.replaceAll(tmpStr, `${tmpStr}<br>&nbsp;`))
        } else {
          this.replaceContent(this.value)
        }

        this.calcInputLength()
        this.valid()
      })
    },
    // 回显value
    echoValue2Ttml() {
      this.richEditRef.innerHTML = ''
      if (!this.canUseHtml) {
        this.insertText(this.value)
      } else {
        let html = this.value
        if (this.transformText2Html) {
          html = this.transformText2Html(this.value)
        }
        // this.insertHtmlMark(html)
        this.richEditRef.innerHTML = html
      }
    },
    // 输入事件（使用操作都会触发）
    handlerInput(e) {
      /**
       * @property {event} keyInputEvent 输入事件
       * @property {string} stringHtml 输入框的html 内容
       * @property {function} disableInputFn 禁用输入。一些场景去禁用。
       */
      // 本次输入的值
      const currentData = e.data
      const stringHtml = this.isTransform ? e.target.innerHTML : e.target.innerText
      // const reg = /<img[^>]*>/gi
      // const v = stringHtml.match(reg)
      const disableInputFn = () => e.preventDefault()
      e.stopPropagation()
      // 使用默认的获取纯文本的方法
      let oiginalText = stringHtml
      if (this.isTransform) {
        oiginalText = this.transformHtml2Text
          ? this.transformHtml2Text(stringHtml)
          : getPlainText(stringHtml)
      }
      this.$emit('input', oiginalText)
      this.$emit('on-change', {
        currentData,
        keyInputEvent: e,
        stringHtml,
        oiginalText,
        disableInputFn
      })
      // 计算长度
      this.calcInputLength()
      // 错误校验
      this.valid()
      // this.saveSelection()
    },
    // 粘贴(禁止粘贴文件和图片)
    handlerPaste(e) {
      e.stopPropagation()
      e.preventDefault()
      const { clipboardData } = e
      if (!clipboardData) {
        return
      }
      const { items } = clipboardData
      if (!items) {
        return
      }
      // 获取纯文本
      const text = e.clipboardData.getData('text/plain')
      // 不是纯文本就阻止粘贴
      if (!text) {
        return
      }

      this.$emit('on-paste', e)

      // 纯文本就粘贴
      // const newText = getPlainText(text)
      // this.insertText(newText)
    },
    // 键盘按下事件
    handlerKeydown(e) {
      e.stopPropagation()
      const stringHtml = e.target.innerHTML
      const disableInputFn = () => e.preventDefault()
      /**
       * @property {event} keyDownEvent 按键事件对象
       * @property {string} stringHtml 输入框的html 内容
       * @property {function} disableInputFn 禁用输入。一些场景去禁用。
       */
      this.$emit('on-keydown', { keyDownEvent: e, stringHtml, disableInputFn })
    },
    // 键盘抬起事件
    handlerKeyup(e) {
      e.stopPropagation()
      this.saveSelection()
    },
    // 鼠标抬起事件
    handlerMouseup(e) {
      e.stopPropagation()
      this.saveSelection()
    },
    // 聚焦事件
    handlerFocus(e) {
      if (this.isEdit) {
        return
      }
      this.$emit('on-foucs', e)
    },
    // 失焦事件
    handlerBlur(e) {
      if (!this.isEdit) {
        return
      }
      this.$emit('on-blur', e)
      const stringHtml = this.isTransform ? e.target.innerHTML : e.target.innerText
      // 使用默认的获取纯文本的方法
      let oiginalText = stringHtml
      if (this.isTransform) {
        oiginalText = this.transformHtml2Text
          ? this.transformHtml2Text(stringHtml)
          : getPlainText(stringHtml)
      }
      oiginalText = oiginalText.replaceAll('<br>&nbsp;', '')
      this.$nextTick(() => {
        this.$emit('input', oiginalText)
      })
    },
    // 替换editer内容
    replaceContent(html) {
      this.richEditRef.innerHTML = ''
      this.insertHtmlMark(html)
    },
    // 插入html标记
    insertHtmlMark(html) {
      if (!this.canUseHtml) {
        return
      }
      let pass = true
      if (this.validHtmlMarkFn) {
        pass = this.validHtmlMarkFn(html)
      }
      //  else {
      //   默认只能加图片
      //   const reg = /<img[^>]*>/gi
      //   const images = html.match(reg)
      //   if (isEmpty(images)) {
      //     return
      //   }
      //   只能加一个图片
      //   html = images[0]
      // }
      // 不通过
      if (!pass) {
        return
      }
      // 传入到文本框
      this.restoreSelection()
      this.richEditRef.focus()
      if (document.selection) {
        this.currentRange.pasteHTML(html)
      } else {
        document.execCommand('insertHTML', false, html)
        this.currentRange && this.currentRange.collapse(false)
      }
      this.saveSelection()
      // isEnter && this.insertHtmlMark('<br/>&nbsp;', false)
    },
    //  插入纯文本
    insertText(string) {
      // string = getPlainText(string)
      if (!string) {
        return
      }
      // 传入到文本框
      this.restoreSelection()
      this.richEditRef.focus()

      if (document.selection) {
        this.currentRange.pasteHTML(string)
      } else {
        document.execCommand('insertText', false, string)
        this.currentRange && this.currentRange.collapse(false)
      }
      this.saveSelection()
    },
    // ------------光标相关-----------
    getCurrentRange() {
      let selection
      let range
      let txt = this.richEditRef
      if (this.supportRange) {
        selection = document.getSelection()
        if (selection.getRangeAt && selection.rangeCount) {
          range = document.getSelection().getRangeAt(0)
          this.rangeParentElement = range.commonAncestorContainer
        }
      } else {
        range = document.selection.createRange()
        this.rangeParentElement = range.parentElement()
      }
      if (this.rangeParentElement || txt === this.rangeParentElement) {
        this.rangeParentElement = txt
        return range
      }
      return range
    },
    saveSelection() {
      this.currentRange = this.getCurrentRange()
    },
    restoreSelection() {
      if (!this.currentRange) {
        return
      }
      let selection
      let range
      if (this.supportRange) {
        selection = document.getSelection()
        selection.removeAllRanges()
        selection.addRange(this.currentRange)
      } else {
        range = document.selection.createRange()
        range.setEndPoint('EndToEnd', this.currentRange)
        if (this.currentRange.text.length === 0) {
          range.collapse(false)
        } else {
          range.setEndPoint('StartToStart', this.currentRange)
        }
        range.select()
      }
    },
    // 计算输入框的输入长度
    calcInputLength() {
      if (!this.richEditRef) {
        this.totalln = 0
        return
      }
      let copyDom = document.createElement('div')
      // 需要匹配换行符替换为空
      copyDom.innerHTML = this.richEditRef.innerHTML.replaceAll('&nbsp;', '')
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
      this.totalln = textLn + emojLn
      copyDom = null
    },
    // 校验
    valid() {
      let errors = []
      if (this.validFn) {
        errors = this.validFn(this.totalln, this.getValue())
      }
      this.$emit('error', errors)
    },
    // 自定义聚焦
    focus(position) {
      this.richEditRef.focus()
      // 移动光标到最后位置
      if (position === 'end') {
        const range = document.createRange()
        range.selectNodeContents(this.richEditRef)
        range.collapse(false)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
    },
    // 自定义失焦
    blur() {
      this.richEditRef.blur()
    },
    // 获取输入值
    getValue() {
      const stringHtml = this.isTransform ? this.richEditRef.innerHTML : this.richEditRef.innerText
      // 使用默认的获取纯文本的方法
      let oiginalText = stringHtml
      if (this.isTransform) {
        oiginalText = this.transformHtml2Text
          ? this.transformHtml2Text(stringHtml)
          : getPlainText(stringHtml)
      }
      oiginalText = oiginalText.replaceAll('<br>&nbsp;', '').replaceAll('<br>', '')
      return oiginalText
    },
    // 获取已插入表情图片的个数
    getEmojiNum() {
      let copyDom = document.createElement('div')
      copyDom.innerHTML = this.richEditRef.innerHTML.replaceAll('&nbsp;', '')
      const imgs = copyDom.getElementsByTagName('img')
      const emojLn = [...imgs].reduce(
        (pre, cur) => (cur.getAttribute('data-type') === 'emoj' ? pre + 1 : pre),
        0
      )
      return emojLn
    },
    // 获取已插入换行符个数
    getEnters() {
      if (!this.richEditRef) {
        return 0
      }
      const brs = this.richEditRef.innerHTML.match(/<br>&nbsp;/g)
      return brs ? brs.length : 0
    },
    //清除
    onClear() {
      this.richEditRef.innerHTML = ''
      this.$emit('on-clear')
    }
  }
}
</script>
