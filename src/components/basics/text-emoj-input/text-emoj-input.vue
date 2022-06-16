<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:27:55
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-16 14:48:38
 * @FilePath: /ry-design/src/components/basics/text-emoj-input/text-emoj-input.vue
 * @Description: 文本表情输入
-->
<template>
  <div class="text-emoj-input">
    <div class="rich-text-area">
      <div class="menu">
        <div class="emoji">
          <img
            src=""
            @click="ishowFaceArea" />
          <div
            v-if="showFace"
            class="faceNav">
            <img
              v-for="item in emojiArr"
              :key="item.icon"
              :src="item.icon"
              @click="clickFace(item)" />
          </div>
        </div>
        <div
          class="emp-name wel-text"
          @click="insertName('员工姓名')">
          【员工姓名】
        </div>
        <div
          class="emp-no wel-text"
          @click="insertName('员工工号')">
          【员工工号】
        </div>
      </div>
      <div
        id="box"
        ref="box"
        :contenteditable="contenteditable"
        @keyup="keyupFn"
        @keydown="keydownFn"
        @mouseup="mouseupFn"
        @input="inputFn"
        @paste="handlerPaste"></div>
      <!-- limit 字数 -->
      <div class="menu-bottom">{{ totalStrLength }}/400</div>
    </div>
  </div>
</template>

<script>
import { getPlainText } from './../../../util/text-emoj-input'
import { cloneDeep } from 'lodash'

const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'text-emoj-input'

export default {
  name: prefixCls,
  data() {
    return {
      showFace: false,
      emojiArr: [
        { icon: 'https://fc1tn.baidu.com/it/u=374192452,302848637&fm=202&mola=new&crop=v1' }
      ],
      contenteditable: true,
      currentRange: null,
      // eslint-disable-next-line vue/no-reserved-keys
      _parentElem: null,
      supportRange: typeof document.createRange === 'function',
      box: null,
      totalStrLength: 0
    }
  },

  mounted() {
    this.box = document.querySelector('#box')
    this.box.focus()
  },
  methods: {
    ishowFaceArea() {
      this.showFace = true
    },
    inputFn(e) {
      this.calcTextAreaLength()
    },
    //  选中表情
    clickFace(face) {
      this.insertImage(face.icon)
      this.showFace = false
    },
    // 计算输入框的字数
    calcTextAreaLength() {
      let reg = /<img[^>]*>/gi
      let stringHtml = this.box.innerHTML
      let stringText = this.box.innerText //  拿到输入框中字符长度
      //  匹配出输入框中的图片表情包个数
      let emojiArr = stringHtml.match(reg) || []
      //  输入框注入的字符等于表情包个数 加上字符串长度
      console.log(stringText.length + emojiArr.length)
      this.totalStrLength = stringText.length + emojiArr.length
      return stringText.length + emojiArr.length
    },
    handlerPaste(event, index) {
      let oldVal = event.target.value
      let items = event.clipboardData.items
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (item.kind === 'string' && item.type.match('text/plain')) {
          item.getAsString(str => {
            console.log('str: ', str)
          })
        }
      }
    },
    keydownFn(e) {
      // 因为先执行keydownup事件 当到达长度后重新计算字符数 避免到达字符限制输入框无法输入
      // 换行 空格  以及字符超出最大限制  禁止输入    超出最大限制后除了退格其他都不可以输入
      if (
        e.keyCode == '13' ||
        e.keyCode == '32' ||
        (this.totalStrLength >= 400 && e.keyCode != '8')
      ) {
        this.contenteditable = false
      } else {
        this.contenteditable = true
      }
      setTimeout(() => {
        this.contenteditable = true
        this.$nextTick(() => {
          this.box.focus()
        })
      })
    },
    disabledFiled() {},
    keyupFn(e) {
      // debugger;
      this.saveSelection()
    },
    mouseupFn() {
      this.saveSelection()
    },
    // 插入图片
    insertImage(html) {
      this.restoreSelection()
      // debugger;
      if (document.selection) {
        this.currentRange.pasteHTML(html)
      } else {
        this.box.focus()
        document.execCommand('insertImage', false, html)
        this.currentRange && this.currentRange.collapse(false)
      }
      this.saveSelection()
    },

    //  插入文本
    insertName(string) {
      this.restoreSelection()
      if (document.selection) {
        this.currentRange.pasteHTML(string)
      } else {
        this.box.focus()
        document.execCommand('insertText', false, string)
        this.currentRange.collapse(false)
      }
      this.saveSelection()
    },
    getCurrentRange() {
      var selection,
        range,
        txt = this.box
      if (this.supportRange) {
        selection = document.getSelection()
        if (selection.getRangeAt && selection.rangeCount) {
          range = document.getSelection().getRangeAt(0)
          this._parentElem = range.commonAncestorContainer
        }
      } else {
        range = document.selection.createRange()
        this._parentElem = range.parentElement()
      }
      // && (avalon.contains(txt, _parentElem)
      if (this._parentElem || txt === this._parentElem) {
        this._parentElem = txt
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
      var selection, range
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
    keepLastIndex(obj) {
      if (window.getSelection) {
        //ie11 10 9 ff safari
        obj.focus() //解决ff不获取焦点无法定位问题
        var range = window.getSelection() //创建range
        range.selectAllChildren(obj) //range 选择obj下所有子内容
        range.collapseToEnd() //光标移至最后
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        var range = document.selection.createRange() //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj) //range定位到obj
        range.collapse(false) //光标移至最后
        range.select()
      }
    }
  }
}
</script>

<style >
.text-emoj-input {
  margin-left: 20px;
}

#box {
  width: 400px;
  min-height: 230px;
  outline: none;
  padding: 5px;
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  word-break: break-all;
}
.menu {
  display: flex;
  align-items: center;
  height: 44px;
  width: 386px;
  padding: 0 12px;
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}
.menu .wel-text {
  margin-right: 8px;
  font-size: 14px;
  color: #277cf0;
  cursor: pointer;
}
.menu .emoji {
  position: relative;
}
.menu .emoji img {
  vertical-align: bottom;
  width: 20px;
  height: 20px;
  padding: 0.3px;
}
.menu-bottom {
  height: 44px;
  width: 386px;
  padding: 0 12px;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  text-align: right;
  color: #e0e0e0;
}
#box .insertspan {
  display: inline-block;
  width: 28px;
  height: 28px;
  position: relative;
}

.faceNav {
  width: 345px;
  height: 230px;
  padding: 5px;
  /* border: 1px solid #333; */
  position: absolute;
  top: 35px;
  left: -6px;
  background-color: rgb(250, 249, 249);
  /*display: none;*/
}
.faceNav > .qqface {
  float: left;
  cursor: pointer;
}
#box img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  /* display: inline-block; */
  background-size: 20px auto;
}
</style>
