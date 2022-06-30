<template>
  <div>
    <div :class="prefixCls">
      <!-- 行号 -->
      <div :class="prefixCls + '-left-list'">
        <ul>
          <li
            v-for="index in lastMax"
            :key="index">
            <span>{{ index }}</span>
          </li>
        </ul>
      </div>
      <div :class="prefixCls + '-right-list'">
        <div
          v-for="(item, index) in middle.middleData"
          :key="index">
          <rd-text-emoj-input
            :ref="`emojInput-${index}`"
            v-model="item.value"
            :transform-html2-text="transformHtml2Text"
            :transform-text2-html="transformText2Html"
            style="width: calc(100% - 88px)"
            @on-change="handlerChange"
            @on-keydown="handlerKeydown" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'text-input-list'

import rdTextEmojInput from '../text-emoj-input/text-emoj-input'

export default {
  name: prefixCls,
  components: {
    rdTextEmojInput
  },
  props: {
    lastMax: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      prefixCls,
      middle: {
        defaultInput: '',
        activeClass: 0,
        middleData: [
          {
            id: 1,
            value: ''
          }
        ]
      }
    }
  },
  methods: {
    handlerChange(obj) {},
    handlerKeydown({ keyDownEvent, disableInputFn }) {
      if (keyDownEvent.keyCode === 13) {
        disableInputFn()
      }
    },
    transformHtml2Text(html) {
      // 过滤 😭 符号
      // let emoji1 = /[^\x00-\xff]/g;
      const face = this.getFaceHtml(this.faceIcon)
      let enter = this.getFaceHtml(this.enterIcon)
      enter += '<br>'
      const text1 = '[苦]'
      const text2 = '⇨'
      html = html.replaceAll(face, text1)
      html = html.replaceAll(enter, text2)
      return html
    },
    transformText2Html(text) {
      const face = this.getFaceHtml(this.faceIcon)
      let enter = this.getFaceHtml(this.enterIcon)
      enter += '<br>'
      const text1 = '[苦]'
      const text2 = '⇨'
      text = text.replaceAll(text1, face)
      text = text.replaceAll(text2, enter)

      return text
    },
    getFaceHtml(icon) {
      const str = `<img src="${icon}" draggable="false" width="20" height="20">`
      return str
    },
    enter() {
      let html = this.getFaceHtml(this.enterIcon)
      html += '<div><br></div>'
      this.$refs.emojInput.insertHtmlMark(html)
    },
    insertFace() {
      let html = this.getFaceHtml(this.faceIcon)
      this.$refs.emojInput.insertHtmlMark(html)
    }
  }
}
</script>
