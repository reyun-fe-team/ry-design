<template>
  <div :class="[prefixCls, { [prefixCls + '-hidden']: !computedReady && !enableCss }]">
    <!-- 前缀 -->
    <slot name="prefix"></slot>
    <!-- 文字 -->
    <div
      ref="text"
      :key="renderKey"
      v-tooltip="tooltipOptions"
      v-line-clamp="enableCss ? lines : null"
      :class="[prefixCls + '-text']"
      @mouseenter.self="handleTooltipEnter">
      <span
        :class="[prefixCls + '-text-span']"
        v-html="text"></span>
    </div>
    <!-- 后缀 -->
    <slot name="suffix"></slot>
  </div>
</template>
<script>
import Vue from 'vue'
import { oneOf, getStyle, getBase64Code } from '@src/util/assist.js'
import _throttle from 'lodash/throttle'
import _debounce from 'lodash/debounce'
import { getMeasureEl, getStrFullLength, cutStrByFullLength } from '@src/util/ellipsis-helper.js'
import { prefix } from '@src/config.js'

const prefixCls = prefix + 'ellipsis'

export default {
  name: prefixCls,
  props: {
    // ---------------css方式计算配置-----------------
    // css方式，开启后仅支持lines属性，仅支持webkit内核浏览器
    enableCss: {
      type: Boolean,
      default: true
    },
    // 文本
    text: {
      type: String,
      default: ''
    },
    // 限制行数，将换算为 height。如果设置了 height，则直接使用 height 计算
    lines: {
      type: Number,
      default: 1
    },
    // ---------------css方式计算配置-----------------

    // ---------------js方式计算配置-----------------
    // 限制高度
    // eslint-disable-next-line vue/require-default-prop
    height: [Number],
    // 按照指定长度截取
    // eslint-disable-next-line vue/require-default-prop
    length: [Number],
    // 是否将全角字符的长度视为2来计算字符串长度，适用于 length
    fullWidthRecognition: {
      type: Boolean,
      default: false
    },
    // ---------------js方式计算配置-----------------

    // ---------------tooltip配置-----------------
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
    // tooltip最大宽度
    maxWidth: {
      type: [String, Number],
      default: 350
    },
    // tooltip位置
    placement: {
      type: String,
      default: 'bottom',
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
      }
    },
    // tooltip延迟时间
    // eslint-disable-next-line vue/require-default-prop
    delay: [Number],
    // ---------------tooltip配置-----------------

    // ---------------autoResize配置-----------------
    // @todo 暂不支持
    // 是否自动根据外层宽度动态改变
    // 宽度变了，自动计算
    autoResize: {
      type: Boolean,
      default: false
    }
    // ---------------autoResize配置-----------------
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
    renderKey() {
      return getBase64Code(this.text || '')
    },
    // 气泡提示的配置
    tooltipOptions() {
      let { tooltip, disabled, text, maxWidth, placement, delay, oversize } = this

      // 禁用 || 不开启 tooltip
      const isDisabled = disabled || !tooltip || !oversize

      const minDelay = 250
      delay = !delay ? minDelay : delay < minDelay ? minDelay : delay

      return {
        disabled: isDisabled,
        maxWidth,
        placement,
        delay,
        contentRender: (...args) => this.renderTooltipContent(...args, text)
      }
    },
    // 初始化选项，文字长度计算的追踪属性
    initializedOptions() {
      let { disabled, text, height, lines, enableCss } = this
      return { disabled, text, height, lines, enableCss }
    }
  },
  watch: {
    // 初始化选项，文字长度计算的追踪属性
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
    // 渲染tooltip内容
    // eslint-disable-next-line
    renderTooltipContent(h, options, text) {
      return h('span', { domProps: { innerHTML: text } })
    },
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
      let wrapperHeight = $el.getBoundingClientRect().height

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
            text = this.fullWidthRecognition
              ? cutStrByFullLength(text, this.length)
              : text.slice(0, this.length)
          }
        }
        // 按照容器大小
        else {
          if (wrapperHeight > height) {
            this.oversize = true

            while (wrapperHeight > height && n > 0) {
              if (wrapperHeight > height * 3) {
                text = text.substring(0, Math.floor(text.length / 2))
              } else {
                text = text.substring(0, text.length - 1)
              }

              this.renderTextContent(text)
              wrapperHeight = $el.getBoundingClientRect().height
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
        this.renderTextContent(this.computedText)
        if (!this.autoResize) {
          $el.offsetHeight > this.height ? this.$emit('on-hide') : this.$emit('on-show')
        }
      }
    },
    // 创建省略号
    createEllipsisIcon() {
      let dom = null
      if (!this.oversize) {
        return dom
      }

      const instance = new Vue({
        el: document.createElement('div'),
        render: h => {
          const child = this.$slots.more || '...'
          return h('span', { class: [prefixCls + '-more'] }, [child])
        }
      })

      return instance.$el
    },
    // 创建文本元素
    createTextElement(text) {
      const textNode = document.createElement('span')
      textNode.classList.add(prefixCls + '-text-span')
      textNode.innerHTML = text
      return textNode
    },
    // 渲染文本元素的内容
    renderTextContent(text) {
      // 清空文本
      this.$refs.text.innerHTML = ''

      const textNode = this.createTextElement(text)
      const ellipsisIcon = this.createEllipsisIcon()

      let appendNodes = [textNode, ellipsisIcon]
      appendNodes = appendNodes.filter(node => node instanceof Node)
      appendNodes.forEach(node => this.$refs.text.appendChild(node))
    },
    // 进入元素处理tooltip
    handleTooltipEnter: _debounce(function () {
      const { disabled, enableCss, tooltip } = this
      // 禁用 || 不开启css || 不开启tooltip
      if (disabled || !enableCss || !tooltip) {
        return
      }

      const $content = this.$refs.text
      // 没有文本
      if (!this.text || !$content.childNodes[0]) {
        return
      }

      const measureEl = getMeasureEl($content, this.text)
      const actualWidth = measureEl.getBoundingClientRect().width
      // 计算容器宽度.适配多行
      const containerWidth = $content.getBoundingClientRect().width
      const textWidth = containerWidth * (this.lines || 1)

      this.oversize = actualWidth > textWidth
    }, 250),
    // 元素宽高
    handleResize: _throttle(function () {
      this.computeText()
    }, 250)
  }
}
</script>
