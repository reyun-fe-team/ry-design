<template>
  <div
    v-click-outside="onClickEditorOutSide"
    :class="prefixCls">
    <!-- 行号 -->
    <div
      v-for="index in maxLine"
      :key="index"
      :class="prefixCls + '-line'">
      <div
        :class="[
          prefixCls + '-left-list',
          { 'middle-style-li-active': middle.activeClass === index },
          isHaveError(index) ? prefixCls + '-is-error' : ''
        ]">
        <span :class="[isHaveError(index) ? prefixCls + '-error-left' : '']">
          {{ index }}
        </span>
      </div>

      <div
        v-click-outside="() => onClickEditorLineOutSide(index)"
        :class="prefixCls + '-right-list'">
        <rd-text-emoj-input
          :ref="`emojInput-${index}`"
          :value="value[index] || ''"
          :is-edit="middle.activeClass === index"
          :class="[
            { 'middle-style-li-active': middle.activeClass === index },
            errors.includes(index) && prefixCls + '-is-error'
          ]"
          :transform-html2-text="transformHtml2Text"
          :transform-text2-html="transformText2Html"
          :calc-text-fn="calcTextFn"
          :valid-fn="validFn"
          :max-length="maxLength"
          :min-length="minLength"
          @on-keydown="handlerKeydown($event, index)"
          @on-blur="(e, value) => handlerBlur(e, value, index)"
          @input="val => handleEmitInput(val, index)"
          @click.native="onClickEditorLine(index)"
          @error="status => onError(status, index)" />
        <div
          v-if="(useEmoj || useEnter) && middle.activeClass === index"
          :class="prefixCls + '-btn-wrap'">
          <Poptip
            v-if="useEmoj"
            v-model="showEmojPan"
            transfer
            :transfer-class-name="prefixCls + '-poptip'"
            placement="bottom-end">
            <img src="../../../images/text-input-list/add-emoji.png" />
            <div
              slot="content"
              :class="prefixCls + '-panel-wrap'">
              <img
                v-for="(item, index) in emojiList"
                :key="index"
                :class="prefixCls + '-item-common'"
                :src="item.url"
                @click="insertFace(item)" />
            </div>
          </Poptip>

          <img
            v-if="useEnter"
            src="../../../images/text-input-list/add-line-feed.png"
            @click="enter(index)" />
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
    // 最大换行数
    maxEnter: {
      type: Number,
      default: 3
    },
    // 可以使用表情
    useEmoj: {
      type: Boolean,
      default: true
    },
    // 可以使用换行
    useEnter: {
      type: Boolean,
      default: true
    },
    // emoji表情列表
    emojiList: {
      type: Array,
      default: () => []
    },
    // 文本计算方法
    calcTextFn: {
      type: Function,
      default: text => {
        // 默认每个文字算2个字符
        const copyText = text.replaceAll(/[^\x00-\xff]/g, '**')
        return copyText.length
      }
    }
  },
  data() {
    return {
      prefixCls,
      middle: {
        defaultInput: '',
        preActiveClass: null,
        activeClass: null,
        faceIcon: '',
        addLineFeedIcon: require('../../../images/text-input-list/line-feed.png'),
        middleData: [
          {
            id: 1,
            value: ''
          }
        ]
      },
      showEmojPan: false,
      isError: false,
      errors: []
    }
  },
  computed: {
    curEmojInput() {
      return this.$refs[`emojInput-${this.middle.activeClass}`][0]
    },
    isHaveError() {
      return function (index) {
        return this.errors.includes(index)
      }
    }
  },
  watch: {
    'middle.activeClass'(cur, pre) {
      this.middle.preActiveClass = pre
    }
  },
  methods: {
    handlerKeydown({ keyDownEvent, disableInputFn }, index) {
      if (keyDownEvent.keyCode === 13) {
        disableInputFn()

        const curIndex = index + 1

        if (curIndex >= this.maxLine) {
          return
        }
        // 回车换行 & 记录数据变化
        const value = this.curEmojInput.getValue()
        this.handleEmitInput(value, index)

        this.middle.activeClass = curIndex
        this.$nextTick(() => {
          this.$refs[`emojInput-${index + 1}`][0].blur()
          setTimeout(() => {
            this.$refs[`emojInput-${curIndex}`][0].focus()
          }, 0)
        })
      }
    },
    handlerBlur(e, value, index) {
      if (value === undefined) {
        return
      }
      this.handleEmitInput(value, index)
    },
    transformHtml2Text(html) {
      return html
    },
    transformText2Html(text) {
      return text
    },
    getFaceHtml(icon, type) {
      const str = `<img style="pointer-events: none; margin-left: 4px; " src="${icon}" draggable="false" width="16" height="16" data-type="${type}">`
      return str
    },
    enter() {
      // 如果输入框内不存在内容，不允许点击换行符
      if (!this.curEmojInput.getValue()) {
        this.$Message.error('请先输入文本内容')
        return
      }
      if (this.curEmojInput.getEnters() >= this.maxEnter) {
        this.$Message.error(`最多能插入${this.maxEnter}换行`)
        return
      }
      let html = `${this.getFaceHtml(this.middle.addLineFeedIcon, 'enter')}<br>&nbsp;`
      this.curEmojInput.insertHtmlMark(html)
    },
    insertFace(val) {
      this.faceIcon = val.url
      let html = this.getFaceHtml(this.faceIcon, 'emoj')
      this.curEmojInput.insertHtmlMark(html)
    },
    // 向外抛出 input 事件，改变绑定数据
    handleEmitInput(value, index) {
      if (this.value[index] === value) {
        return
      }
      const copyValue = JSON.parse(JSON.stringify(this.value))
      copyValue[index] = value || ''
      this.$emit('input', copyValue)
    },
    // 点击编辑行
    onClickEditorLine(index) {
      if (!this.$refs[`emojInput-${index}`][0].richEditRef.innerHTML) {
        const el = this.$refs[`emojInput-${index}`][0]
        this.middle.activeClass = index
        this.$nextTick(() => {
          el.focus()
        })
      }
      if (this.middle.activeClass === index) {
        return
      }
      const el = this.$refs[`emojInput-${index}`][0]
      this.middle.activeClass = index
      this.$nextTick(() => {
        el.focus()
      })
    },
    // 点击编辑行区域外
    onClickEditorLineOutSide(index) {
      if (index !== this.middle.preActiveClass) {
        return
      }

      const el = this.$refs[`emojInput-${index}`][0]
      const value = el.getValue()
      this.handleEmitInput(value, index)
    },
    // 点击整体编辑区域外
    onClickEditorOutSide() {
      if (this.showEmojPan) {
        return
      }

      const index = this.middle.activeClass
      const el = this.$refs[`emojInput-${index}`][0]
      const value = el.getValue()
      this.handleEmitInput(value, index)

      this.$nextTick(() => {
        this.middle.activeClass = null
      })
    },
    validFn(ln) {
      if (ln && (ln > this.maxLength || ln < this.minLength)) {
        return true
      }

      return false
    },
    onError(status, index) {
      setTimeout(() => {
        const isHaveError = this.errors.indexOf(index)
        if (isHaveError > -1) {
          if (!status) {
            this.errors.splice(isHaveError, 1)
          }
          return
        }
        status && this.errors.push(index)
      }, 600)
    }
  }
}
</script>
