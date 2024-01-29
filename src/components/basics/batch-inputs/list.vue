<template>
  <div
    :class="[prefixCls]"
    :style="{ height: height + 'px' }">
    <rd-virtual-list
      ref="list"
      :class="prefixCls + '-virtual-list'"
      data-key="uid"
      :data-sources="getLine"
      :extra-props="extraProps"
      :data-component="VirtualItem"
      v-on="$listeners"></rd-virtual-list>
  </div>
</template>
<script>
import VirtualItem from './line'
import { prefix } from '@src/config.js'
import { getKey } from '@src/util/assist'
const prefixCls = prefix + 'batch-inputs'

// 获取富文本的纯文字内容
function getPlainText(htmlString) {
  if (!htmlString) {
    return htmlString
  }

  const div = document.createElement('div')
  div.innerHTML = htmlString
  const childNodes = div.childNodes

  let stringArray = []

  for (let index = 0; index < childNodes.length; index++) {
    const ele = childNodes[index]
    const { nodeValue, nodeType, nodeName } = ele

    let text = ''

    switch (nodeType) {
      case Node.TEXT_NODE: {
        text = nodeValue
        break
      }
      case Node.ELEMENT_NODE: {
        if (nodeName === 'IMG') {
          text = ele.getAttribute('value')
        }
        if (nodeName === 'BR') {
          text = '\\'
        }
        break
      }
    }

    stringArray.push(text)
  }

  let textString = stringArray.join('')
  const repReg1 = /\s*|<[^>]+>|↵|[\r\n]|&nbsp;|(\n)|(\t)|(\r)|<\/?[^>]*>|\\s*/g
  textString = textString.replace(repReg1, '')

  const arrEntities = {
    lt: '<',
    gt: '>',
    nbsp: ' ',
    amp: '&',
    quot: '"'
  }
  const repReg2 = /&(lt|gt|nbsp|amp|quot);/gi
  textString = textString.replace(repReg2, (all, t) => arrEntities[t])

  return textString
}

export default {
  name: prefixCls,
  provide() {
    return {
      root: this
    }
  },
  props: {
    // 显示文字长度
    showLimit: {
      type: Boolean,
      default: true
    },
    // 最大行数
    maxLine: {
      type: Number,
      default: 30
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
    placeholder: {
      type: String,
      default: '请输入或粘贴创意标题，每行一标题，敲击回车换行'
    },
    // 文本计算方法.默认每个文字算2个字符
    calcTextFn: {
      type: Function,
      // eslint-disable-next-line no-control-regex
      default: text => text.replaceAll(/[^\x00-\xff]/g, '**').length
    },
    validFn: {
      type: Function,
      default: null
    },
    // 高度
    // 需要指定一个具体的高度，否则虚列滚动计算失效
    height: {
      type: [Number, String],
      default: 250
    }
  },
  data() {
    return {
      // 每行的渲染组件
      VirtualItem,
      prefixCls,
      // 当前数据计数器
      middle: {
        preActiveClass: null,
        activeClass: null
      },
      // 错误信息
      errorList: [],
      // 事件
      emits: {
        'on-enter-over-length': this.handleEnterOverLength,
        'on-paste-over-length': this.handlePasteOverLength,
        'on-middle-change': this.handleMiddleChange,
        'on-error': this.handleError,
        'on-change': this.handleChange
      },
      currentInput: null
    }
  },
  computed: {
    extraProps() {
      let { $props, middle, emits, errorList } = this
      return { ...$props, middle, emits, errorList }
    },
    getLine() {
      let arr = []
      for (let index = 0; index < this.maxLine; index++) {
        arr.push({
          uid: getKey(),
          index,
          item: index + 1,
          maxLine: this.maxLine
        })
      }
      return arr
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        if (this.value.length === 0 && this.middle.activeClass !== null) {
          this.errorList = []
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => this.getCurrentInput())
  },
  methods: {
    handleMiddleChange(middle) {
      this.middle = middle
      let { activeClass } = this.middle
      this.$emit('on-middle-change', this.middle)

      this.getCurrentInput(activeClass)

      if (this.currentInput) {
        this.currentInput.$refs.Input.focus()
      }
    },
    handleError(index, error) {
      this.errorList.splice(index, 1, error)
      this.$emit('on-error', index, error)
    },
    // 回车超出可编辑的列表长度
    handleEnterOverLength(index) {
      this.$emit('on-enter-over-length', index)
    },
    // 复制粘贴超出可编辑的列表返回超出的内容
    handlePasteOverLength(data) {
      this.$emit('on-paste-over-length', data)
    },
    handleChange(val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
    },
    // 转成纯文本内容
    getPlainTextValues() {
      return this.value.map(value => getPlainText(value))
    },
    // 获取当前的输入行
    getCurrentInput(activeClass = 0) {
      let currentVirtualItem = this.$refs.list.$children.find(item => item.index === activeClass)
      if (currentVirtualItem) {
        this.currentInput = currentVirtualItem.$children[0]
      }
    },
    // 插入内容
    insertNode(type, data) {
      if (this.currentInput) {
        this.currentInput.insertNode(type, data)
      }
    }
  }
}
</script>
