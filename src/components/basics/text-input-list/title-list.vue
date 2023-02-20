<template>
  <div
    :class="prefixCls + '-content'"
    @click="listItemClick">
    <!-- 行号 -->
    <div :class="prefixCls + '-line'">
      <div
        :class="[
          prefixCls + '-left-list',
          middle.activeClass === index ? prefixCls + '-left-list-active' : '',
          isHaveError(index) ? prefixCls + '-is-error' : ''
        ]">
        <span :class="[isHaveError(index) ? prefixCls + '-error-left' : '']">
          {{ index + 1 }}
        </span>
      </div>

      <div :class="prefixCls + '-right-list'">
        <rd-text-emoj-input
          ref="emojInput"
          :key="`emoj-${index}`"
          :value="value[index] || ''"
          :is-edit="middle.activeClass === index"
          :class="[
            middle.activeClass === index ? prefixCls + '-right-list-active' : '',
            isHaveError(index) ? prefixCls + '-is-error' : ''
          ]"
          :placeholder="placeholder"
          :transform-html2-text="transformHtml2Text"
          :transform-text2-html="transformText2Html"
          :calc-text-fn="calcTextFn"
          :valid-fn="validFn"
          :max-length="maxLength"
          :min-length="minLength"
          @on-keydown="handlerKeydown($event, index)"
          @on-clear="handlerClear(index)"
          @on-paste="handlerPaste($event, index)"
          @input="val => handleEmitInput(val, index)"
          @click.native="onClickEditorLine(index)"
          @error="status => onError(status, index)" />
        <div
          v-if="(useEmoj || useEnter) && middle.activeClass === index"
          :class="prefixCls + '-btn-wrap'"
          @click.stop>
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
            @click="insertEnter(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'text-input-list'

import rdTextEmojInput from '../text-emoj-input/text-emoj-input'
import { getSplitReg } from '../../../util/text-emoj-input'

export default {
  components: {
    rdTextEmojInput
  },
  props: {
    source: {
      type: Object,
      default: () => {}
    },
    index: Number,
    item: Number,
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
    // 最大换行数
    maxEnter: {
      type: Number,
      default: 3
    },
    // 最大表情添加数
    maxEmoji: {
      type: Number,
      default: 4
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
    // 错误列表
    errorList: {
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
    },
    placeholder: {
      type: String,
      default: '请输入或粘贴创意标题，每行一标题，敲击回车换行'
    },
    // 错误校验方法
    propsValidFn: {
      type: Function
    }
  },
  data() {
    return {
      prefixCls,
      addLineFeedIcon: require('../../../images/text-input-list/line-feed.png'),
      faceIcon: '',
      showEmojPan: false,
      isError: false
    }
  },
  computed: {
    errors() {
      return this.errorList[this.index] || []
    },
    curEmojInput() {
      return this.$refs.emojInput
    },
    isHaveError() {
      return function (index) {
        if (this.errorList[index]) {
          return !!this.errorList[index].length
        }
        return false
      }
    }
  },
  watch: {
    value(cur) {
      if (cur.length === 0) {
        this.curEmojInput.formatValue()
      }
    }
  },
  methods: {
    handlerKeydown({ keyDownEvent, disableInputFn }, index) {
      // 回车换行
      if (keyDownEvent.keyCode === 13) {
        disableInputFn()
        const curIndex = index + 1
        if (curIndex >= this.maxLine) {
          // 回车后超出可编辑的长度
          this.dispatch('enter-over-length', curIndex)
          return
        }
        this.$refs.emojInput.blur()
        this.listItemClick()
        this.dispatch('handlerKeydown', curIndex)
        this.dispatch('middle', { ...this.middle, activeClass: curIndex })
      }
    },
    handlerClear(index) {
      const copyValue = JSON.parse(JSON.stringify(this.value))
      copyValue.splice(index, 1)
      this.dispatch('input', copyValue)
      this.dispatch('on-change', copyValue)
      this.$nextTick(() => {
        this.curEmojInput.formatValue()
        this.curEmojInput.focus('end')
      })
    },
    transformHtml2Text(html) {
      return html
    },
    transformText2Html(text) {
      return text
    },
    getFaceHtml(icon, type, name) {
      const str = `<img style="pointer-events: none; margin-left: 4px; vertical-align: middle; " src="${icon}" draggable="false" width="16" height="16" data-type="${type}" data-name="${name}">`
      return str
    },
    insertEnter() {
      // 如果输入框内不存在内容，不允许点击换行符
      if (!this.curEmojInput.getValue()) {
        this.$Message.error('请先输入文本内容')
        return
      }
      if (this.curEmojInput.getEnters() >= this.maxEnter) {
        this.$Message.error(`最多能插入${this.maxEnter + 1}个换行`)
        return
      }
      let html = `${this.getFaceHtml(this.addLineFeedIcon, 'enter', '[回车]')}<br>&nbsp;`
      this.curEmojInput.insertHtmlMark(html)
    },
    insertFace(val) {
      if (this.curEmojInput.getEmojiNum() >= this.maxEmoji) {
        this.$Message.warning(`建议不超过${this.maxEmoji}个表情包`)
        return
      }
      this.faceIcon = val.url
      let html = this.getFaceHtml(this.faceIcon, 'emoj', val.value)
      this.curEmojInput.insertHtmlMark(html)
    },
    // 插入文本
    insertText(text) {
      const com = this.$refs.emojInput
      if (this.middle.preActiveClass === null && this.middle.activeClass === null) {
        com.$el.click()
        this.$nextTick(() => {
          com.insertText(text)
        })
        return
      }
      com.insertText(text)
    },
    dispatch(event, ...argv) {
      this.$parent.$parent.$emit(event, ...argv)
    },
    // 向外抛出 input 事件，改变绑定数据
    handleEmitInput(value, index) {
      if (this.value[index] === value) {
        return
      }
      const copyValue = [...this.value]
      copyValue[index] = value || ''
      this.dispatch('input', copyValue)
      this.dispatch('on-change', copyValue)
    },
    // 粘贴
    handlerPaste(event, index) {
      let itemList = event.clipboardData.items
      // 超出可编辑的列表长度
      let overLength = []
      for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i]
        if (item.kind === 'string' && item.type.match('text/plain')) {
          item.getAsString(str => {
            let splitReg = getSplitReg(JSON.stringify(str).replace(/"/g, ''))
            let arr = JSON.stringify(str)
              .replace(/"/g, '')
              .split(splitReg)
              .filter(o => o)
            const copyValue = JSON.parse(JSON.stringify(this.value))
            arr.forEach((o, i) => {
              if (i === 0) {
                this.insertText(o || '')
              } else if (index + i < this.maxLine) {
                copyValue[index + i] = o
                o && this.dispatch('on-error', index + i, this.validFn(this.calcInputLength(o), o))
              } else {
                overLength.push(o)
                this.dispatch('paste-over-length', overLength)
              }
            })
            this.$refs.emojInput.blur()
            this.dispatch('input', copyValue)
            this.dispatch('on-change', copyValue)
          })
        }
      }
    },
    // 计算输入框的输入长度
    calcInputLength(text) {
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
    // 点击编辑行
    onClickEditorLine(index) {
      const el = this.$refs.emojInput
      this.dispatch('middle', { ...this.middle, activeClass: index })
      this.$nextTick(() => {
        el.focus()
      })
    },
    // 错误类型
    validFn(ln, value) {
      let errors = []
      if (ln && (ln > this.maxLength || ln < this.minLength)) {
        errors.push('lengthError')
      }
      if (typeof this.propsValidFn === 'function') {
        const allErrors = this.propsValidFn(value)
        errors = [...errors, ...allErrors]
      }
      return errors
    },
    listItemClick() {
      this.dispatch('itemClick', this)
    },
    onError(errors, index) {
      setTimeout(() => {
        this.dispatch('on-error', index, errors.length ? [...this.errors, ...errors] : [])
      })
    },
    getValue() {
      const com = this.$refs.emojInput
      return com.getValue()
    }
  }
}
</script>
