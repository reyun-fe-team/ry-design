<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:27:55
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-17 13:59:53
 * @FilePath: /ry-design/src/components/basics/text-emoj-input/text-emoj-input.vue
 * @Description: 文本表情输入
-->
<template>
  <div :class="[prefixCls]">
    <div
      ref="rich-edit"
      :class="prefixCls + '-rich'"
      :value="richText"
      :contenteditable="contenteditable"
      @keyup="handlerKeyup"
      @keydown="handlerKeydown"
      @mouseup="handlerMouseup"
      @input="handlerInput"
      @paste="handlerPaste"></div>
    <div :class="prefixCls + '-count'">{{ totalStrLength }}/400</div>
  </div>
</template>

<script>
import { getPlainText } from './../../../util/text-emoj-input'
import { typeOf } from './../../../util/assist'
import { cloneDeep } from 'lodash'

const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'text-emoj-input'

export default {
  name: prefixCls,
  props: {
    // 获取文本长度的方法
    getCountFn: {
      type: Function
    },
    // shiftEnter事件
    // shift+13
    shiftEnterFn: {
      type: Array,
      default: () => {}
    },
    // 传入的默认文本
    value: {
      type: String,
      default: ''
    },
    // 是否显示表情
    showFace: {
      type: Boolean,
      default: false
    },
    //  能不能编辑
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      // 文本
      richText: this.value,
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
  computed: {
    // 文本的长度
    totalStrLength() {
      let len = 0
      if (this.getCountFn && typeOf(this.getCountFn) === 'function') {
        len = this.getCountFn(this.richText)
      }
      return len
    }
  },
  mounted() {
    this.supportRange = typeOf(document.createRange) === 'function'
    this.richEditRef = this.$refs['rich-edit']
  },
  methods: {
    // 输入
    handlerInput(evnet) {
      const stringHtml = evnet.target.innerHTML
      const reg = /<img[^>]*>/gi
      const v = stringHtml.match(reg)
    },
    // 粘贴(禁止粘贴文件和图片)
    handlerPaste(e) {
      if (!(e.clipboardData && e.clipboardData.items)) {
        return
      }
      const text = e.clipboardData.getData('text/plain')
      console.log('粘贴文本: ', text)
    },
    // 键盘事件
    handlerKeydown(e) {
      const cmdCode = e.shiftKey
      const keyCode = e.keyCode || e.which || e.charCode
      if (cmdCode && `${keyCode}` === '13') {
        this.shiftEnterFn && this.shiftEnterFn()
      }
      e.preventDefault()
    },
    handlerKeyup() {
      this.saveSelection()
    },
    handlerMouseup() {
      this.saveSelection()
    },
    // 插入图片
    insertFace(html) {
      this.restoreSelection()
      if (document.selection) {
        this.currentRange.pasteHTML(html)
      } else {
        this.richEditRef.focus()
        document.execCommand('insertImage', false, html)
        this.currentRange && this.currentRange.collapse(false)
      }
      this.saveSelection()
    },
    //  插入文本
    insertText(string) {
      this.restoreSelection()
      if (document.selection) {
        this.currentRange.pasteHTML(string)
      } else {
        this.richEditRef.focus()
        document.execCommand('insertText', false, string)
        this.currentRange.collapse(false)
      }
      this.saveSelection()
    },
    // 光标相关
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
  }
}
</script>