<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:27:55
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-27 17:18:15
 * @FilePath: /ry-design/src/components/basics/text-emoj-input/text-emoj-input.vue
 * @Description: 文本表情输入
-->
<template>
  <div :class="[prefixCls, { [prefixCls + '-single-line']: isSingleLine }]">
    <div
      ref="rich-edit"
      :class="prefixCls + '-rich'"
      :value="value"
      :contenteditable="contenteditable"
      @focus="handlerFocus"
      @blur="handlerBlur"
      @keyup="handlerKeyup"
      @keydown="handlerKeydown"
      @mouseup="handlerMouseup"
      @input="handlerInput"
      @paste="handlerPaste"></div>
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
    validHtmlMarkFn: {
      type: Function
    },
    /**
     * @description 将html标记 转换为 通用文本内容
     * @param {string} value html标记内容
     * @returns {string} 通用文本内容
     */
    // eslint-disable-next-line vue/require-default-prop
    transformHtml2Text: {
      require: true,
      type: Function
    },
    /**
     * @description 将通用文本内容  转换为 html标记
     * @param {string} value 通用文本内容
     * @returns {string} html标记内容
     */
    // eslint-disable-next-line vue/require-default-prop
    transformText2Html: {
      require: true,
      type: Function
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
    }
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
      rangeParentElement: null
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      this.echoValue2Ttml()
    }
  },
  mounted() {
    this.supportRange = typeOf(document.createRange) === 'function'
    this.richEditRef = this.$refs['rich-edit']
    this.$nextTick(() => {
      this.echoValue2Ttml()
    })
  },
  methods: {
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
        console.log('回显value: ', html)
        this.insertHtmlMark(html)
      }
    },
    // 输入事件（使用操作都会触发）
    handlerInput(e) {
      e.stopPropagation()
      /**
       * @property {event} keyInputEvent 输入事件
       * @property {string} stringHtml 输入框的html 内容
       * @property {function} disableInputFn 禁用输入。一些场景去禁用。
       */
      // 本次输入的值
      const currentData = e.data
      const stringHtml = e.target.innerHTML
      // const reg = /<img[^>]*>/gi
      // const v = stringHtml.match(reg)
      const disableInputFn = () => e.preventDefault()
      // 使用默认的获取纯文本的方法
      let oiginalText = getPlainText(stringHtml)
      if (this.transformHtml2Text) {
        oiginalText = this.transformHtml2Text(stringHtml)
      }
      // this.$emit('input', oiginalText)
      this.$emit('on-change', {
        currentData,
        keyInputEvent: e,
        stringHtml,
        oiginalText,
        disableInputFn
      })
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
      // 纯文本就粘贴
      const newText = getPlainText(text)
      this.insertText(newText)
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
      this.$emit('on-foucs', e)
    },
    // 失焦事件
    handlerBlur(e) {
      this.$emit('on-blur', e)
      const stringHtml = e.target.innerHTML
      // 使用默认的获取纯文本的方法
      let oiginalText = getPlainText(stringHtml)
      if (this.transformHtml2Text) {
        oiginalText = this.transformHtml2Text(stringHtml)
      }
      console.log('回填value: ', oiginalText)
      this.$emit('input', oiginalText)
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
      } else {
        // 默认只能加图片
        // const reg = /<img[^>]*>/gi
        // const images = html.match(reg)
        // if (isEmpty(images)) {
        //   return
        // }
        // 只能加一个图片
        // html = images[0]
      }
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
    },
    //  插入纯文本
    insertText(string) {
      // string = getPlainText(string)
      if (!string) {
        return
      }
      this.restoreSelection()
      this.richEditRef.focus()
      if (document.selection) {
        this.currentRange.pasteHTML(string)
      } else {
        document.execCommand('insertText', false, string)
        this.currentRange.collapse(false)
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
    keepLastIndex() {
      if (window.getSelection) {
        //ie11 10 9 ff safari
        // 解决ff不获取焦点无法定位问题
        this.richEditRef.focus()
        // 创建range
        let range = window.getSelection()
        // range 选择obj下所有子内容
        range.selectAllChildren(this.richEditRef)
        // 光标移至最后
        range.collapseToEnd()
      }
      if (document.selection) {
        // ie10 9 8 7 6 5
        // 创建选择对象
        let range = document.selection.createRange()
        // let range = document.body.createTextRange();
        // range定位到richEditRef
        range.moveToElementText(this.richEditRef)
        // 光标移至最后
        range.collapse(false)
        range.select()
      }
    }
    // ------------光标相关-----------
  }
}
</script>