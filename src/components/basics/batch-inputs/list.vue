<template>
  <rd-virtual-list
    ref="VirtualList"
    :class="[prefixCls, 'small-scroll-y']"
    :style="{ height: height + 'px' }"
    :keeps="keeps"
    :extra-props="extraProps"
    v-bind="listDataProp"
    v-on="$listeners"></rd-virtual-list>
</template>
<script>
import VirtualItem from './line'
import { prefix } from '@src/config.js'
import { getKey, waitOut } from '@src/util/assist'
const prefixCls = prefix + 'batch-inputs'
// 行高
const RowHeight = 35
// 附加虚拟滚动的行数
const ExtraRows = 5
// 获取富文本的纯文字内容
const getPlainText = htmlString => {
  if (!htmlString) {
    return htmlString
  }
  // 去掉回车符号
  htmlString = htmlString.replaceAll(/<br>|&nbsp;/g, '')
  const div = document.createElement('div')
  div.innerHTML = htmlString
  const childNodes = div.childNodes

  let stringArray = []

  for (let index = 0; index < childNodes.length; index++) {
    const ele = childNodes[index]
    const isTextNode = ele.nodeType === Node.TEXT_NODE
    const isEleNode = ele.nodeType === Node.ELEMENT_NODE
    if (isTextNode) {
      stringArray.push(ele.nodeValue)
    }
    if (isEleNode && ele.nodeName === 'IMG') {
      const imgValue = ele.getAttribute('value')
      stringArray.push(imgValue)
    }
  }

  const repReg1 = /\s*|<[^>]+>|↵|[\r\n]|&nbsp;|(\n)|(\t)|(\r)|<\/?[^>]*>|\\s*/g
  let textString = stringArray.join('').replace(repReg1, '')

  // 一些转义符号
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
    // 类型 只能是文本 PlainText 支持的html内容 Html
    type: {
      type: String,
      default: 'PlainText'
    },
    // 一个图标几个字符
    iconWordCount: {
      type: Number,
      default: 1
    },
    // 显示文字长度
    showLimit: {
      type: Boolean,
      default: true
    },
    // 最大行数
    maxLine: {
      type: Number,
      default: 100
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
      default: null
    },
    validFn: {
      type: Function,
      default: null
    },
    // 高度
    // 需要指定一个具体的高度，否则虚列滚动计算失效
    height: {
      type: [Number, String],
      default: 350
    }
  },
  data() {
    return {
      prefixCls,
      // 当前数据计数器
      middle: { preActiveClass: null, activeClass: null },
      // 错误信息
      errorList: [],
      // 当前输入的组件实例
      currentInput: null
    }
  },
  computed: {
    // 列表数据字段
    listDataProp() {
      return {
        dataKey: 'uid',
        dataSources: this.dataSources,
        // 每行的渲染组件
        dataComponent: VirtualItem
      }
    },
    // 输入行数据
    dataSources() {
      const arr = []
      for (let index = 0; index < this.maxLine; index++) {
        const data = { index, uid: getKey(), item: index + 1, maxLine: this.maxLine }
        arr.push(data)
      }
      return arr
    },
    // 虚拟滚动时渲染的行数
    keeps() {
      const rows = Math.round(this.height / RowHeight)
      const newRows = rows + ExtraRows
      return rows > 30 || newRows > 30 ? 30 : newRows
    },
    // 额外参数
    extraProps() {
      let { $props, middle, emits, errorList } = this
      return { ...$props, middle, emits, errorList }
    },
    // 事件
    emits() {
      return {
        'on-enter-over-length': this.handleEnterOverLength,
        'on-paste-over-length': this.handlePasteOverLength,
        'on-middle-change': this.handleMiddleChange,
        'on-error': this.handleError,
        'on-change': this.handleChange,
        'on-enter': this.handleEnter
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        const isEmptyValue = this.value.length === 0 && this.middle.activeClass !== null
        if (isEmptyValue) {
          this.errorList = []
        }
      }
    }
  },
  async created() {
    await this.$nextTick()
    waitOut(() => this.getCurrentInput())
  },
  methods: {
    // 回车
    handleEnter(index) {
      this.scrollToIndex(index)
    },
    // 更新选中的行
    handleMiddleChange(middle) {
      this.middle = middle
      this.$emit('on-middle-change', this.middle)

      this.getCurrentInput()

      // 聚焦，设置光标在最后
      if (this.currentInput) {
        this.currentInput.$refs.Input.setPlaceCaretAtEnd()
      }
    },
    // 接受错误
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
    // 数据更新
    handleChange(val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
    },
    // 滚动到某一行
    scrollToIndex(index = 0) {
      const _VirtualList = this.$refs.VirtualList
      if (_VirtualList) {
        _VirtualList.scrollToIndex(index)
      }
    },
    // 获取当前输入行的数据
    getCurrentValue() {
      if (this.middle.activeClass === null) {
        return ''
      }
      return this.value[this.middle.activeClass]
    },
    // 转成纯文本内容
    getPlainTextValues() {
      return this.value.map(value => getPlainText(value))
    },
    // 获取当前的输入行
    getCurrentInput() {
      let { activeClass } = this.middle
      activeClass = activeClass || 0

      const _VirtualList = this.$refs.VirtualList
      if (!_VirtualList) {
        return
      }
      let currentVirtualItem = _VirtualList.$children.find(item => item.index === activeClass)
      if (currentVirtualItem) {
        this.currentInput = currentVirtualItem.$children[0]
      }
    },
    // 插入内容
    insertNode(type, data) {
      this.getCurrentInput()

      // 插入内容
      if (this.currentInput) {
        this.currentInput.insertNode(type, data)
      }
    }
  }
}
</script>
