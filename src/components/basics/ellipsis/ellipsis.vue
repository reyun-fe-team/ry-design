<template>
  <div
    v-line-clamp="enableCss ? lines : null"
    v-tooltip="tooltipOptions"
    :class="[prefixCls, { [prefixCls + '-hidden']: !computedReady && !enableCss }]">
    <!-- 前缀 -->
    <slot name="prefix"></slot>
    <!-- 文字 -->
    <span
      :key="textDomRenderKey"
      ref="text"
      v-resize="autoResize ? handleResize : null"
      :class="[prefixCls + '-text']">
      {{ text }}
    </span>
    <!-- ...符号 -->
    <span
      v-show="oversize"
      ref="more"
      :class="[prefixCls + '-more']">
      <slot name="more">...</slot>
    </span>
    <!-- 后缀 -->
    <slot name="suffix"></slot>
  </div>
</template>
<script>
import { oneOf, getStyle, getBase64Code } from '@src/util/assist.js'
import _throttle from 'lodash/throttle'
import { prefix } from '@src/config.js'

const prefixCls = prefix + 'ellipsis'

const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

export default {
  name: prefixCls,
  props: {
    // css方式，开启后仅支持lines属性，仅支持webkit内核浏览器
    enableCss: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    // 限制高度
    // eslint-disable-next-line vue/require-default-prop
    height: {
      type: Number
    },
    // 限制行数，将换算为 height。如果设置了 height，则直接使用 height 计算
    // eslint-disable-next-line vue/require-default-prop
    lines: {
      type: Number
    },
    // 按照指定长度截取
    // eslint-disable-next-line vue/require-default-prop
    length: {
      type: Number
    },
    // 是否将全角字符的长度视为2来计算字符串长度，适用于 length
    fullWidthRecognition: {
      type: Boolean,
      default: false
    },
    // 是否自动根据外层宽度动态改变
    // 宽度变了，自动计算
    // @TODO: 需要优化,不要使用
    autoResize: {
      type: Boolean,
      default: false
    },
    // 自动计算时，省略符号内容占据的文字个数
    autoResizeMoreTextCount: {
      type: Number,
      default: 1
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否开启 tooltip
    tooltip: {
      type: Boolean,
      default: false
    },
    // 以下是 tooltip 部分选项
    transfer: {
      type: Boolean,
      default: true
    },
    theme: {
      validator(value) {
        return oneOf(value, ['dark', 'light'])
      },
      default: 'light'
    },
    maxWidth: {
      type: [String, Number],
      default: 250
    },
    placement: {
      validator(value) {
        return oneOf(value, [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ])
      },
      default: 'bottom'
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      prefixCls,
      oversize: false,
      // 先隐形计算，计算好后，再根据配置显示
      computedReady: false,
      // 计算后的 text 内容
      computedText: this.text
    }
  },
  computed: {
    // 需要根据传入的文案，计算一个元素的渲染更新的key，dom才能实时渲染，拿到最新的元素高度
    textDomRenderKey() {
      return getBase64Code(this.text || '')
    },
    // 气泡提示的配置
    tooltipOptions() {
      let { tooltip, text, theme, maxWidth, placement, transfer, delay, oversize } = this
      const options = {
        content: text,
        theme: theme,
        maxWidth: maxWidth,
        placement: placement,
        transfer: transfer,
        delay: delay
      }
      return tooltip && oversize ? options : null
    },
    // 初始化选项，文字长度计算的追踪属性
    initializedOptions() {
      let { disabled, text, height, lines } = this
      return { disabled, text, height, lines }
    }
  },
  watch: {
    initializedOptions: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 等待dom完成更新
    waitNextTick() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async resolve => {
        await this.$nextTick()
        window.requestAnimationFrame(() => resolve())
      })
    },
    async init() {
      if (!this.disabled && !this.enableCss) {
        this.computeText()
      }
    },
    // 根据配置计算
    async computeText() {
      this.oversize = false
      this.computedReady = false

      await this.waitNextTick()

      let $text = this.$refs.text
      let $el = this.$el

      // 更新元素宽高
      // 动态修改元素的样式。返回最新的尺寸
      $el.getBoundingClientRect()

      let $more = this.$refs.more
      let n = 1000
      let text = this.text
      let height = this.height
      // 当 height 未定义，且 lines 定义时，计算真实高度，否则使用 this.height
      if (!height && this.lines) {
        const lineHeight = parseInt(getStyle($el, 'lineHeight'), 10)
        height = lineHeight * this.lines
      }

      if ($text) {
        // 指定 length，则按具体字数剪裁
        if (this.length) {
          const textLength = this.fullWidthRecognition ? getStrFullLength(text) : text.length
          if (textLength > this.length) {
            this.oversize = true
            $more.style.display = 'inline-block'
            text = this.fullWidthRecognition
              ? cutStrByFullLength(text, this.length)
              : text.slice(0, this.length)
          }
        }
        // 按照容器大小
        else {
          if ($el.offsetHeight > height) {
            this.oversize = true
            $more.style.display = 'inline-block'

            while ($el.offsetHeight > height && n > 0) {
              if ($el.offsetHeight > height * 3) {
                $text.innerText = text = text.substring(0, Math.floor(text.length / 2))
              } else {
                $text.innerText = text = text.substring(0, text.length - 1)
              }
              n--
            }
          }
        }
      }

      this.computedText = text
      this.limitShow()
    },
    // 触发显示与隐藏
    async limitShow() {
      this.computedReady = true

      let $text = this.$refs.text
      let $el = this.$el

      if ($text) {
        $text.innerText = this.computedText
        if (!this.autoResize) {
          $el.offsetHeight > this.height ? this.$emit('on-hide') : this.$emit('on-show')
        }
      }
    },
    // 元素宽高
    handleResize: _throttle(function () {
      this.computeText()
    }, 150)
  }
}
</script>
