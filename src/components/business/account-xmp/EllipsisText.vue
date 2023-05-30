<template>
  <div class="xmp-ellipsis-text">
    <!-- 如果页面有太多Tooltip， 比如列表， 导致页面卡死, 所以做成只有需要hover提示的才用tooltip -->
    <div
      v-if="isUseDiv"
      ref="content"
      class="xmp-limit-line-text-content">
      <slot>
        {{ content }}
      </slot>
    </div>
    <Tooltip
      v-else
      ref="tooltip"
      :max-width="tipsMaxWidth"
      :placement="tipsPlacement"
      :content="content"
      :disabled="tipsDisabled"
      transfer
      :transfer-class-name="transferClassName">
      <template #content>
        <slot name="content"></slot>
      </template>
      <div
        ref="content"
        class="xmp-limit-line-text-content">
        <slot>
          {{ content }}
        </slot>
      </div>
    </Tooltip>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [String, Number]
    },
    transferClassName: {
      type: String
    },
    tipsMaxWidth: {
      type: [String, Number],
      default: 300
    },
    tipsPlacement: {
      type: String,
      default: 'top'
    },
    tipsDisabled: {
      type: Boolean,
      default: false
    },
    line: {
      type: [String, Number],
      default: 2
    },
    showTips: {
      type: Boolean,
      default: true
    },
    /**
     * *是否hover显示tooltip，逻辑判断优先级showTips > alwaysShowTips，即showTips = true时alwaysShowTips才生效
     */
    alwaysShowTips: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showTooltip: false
    }
  },
  computed: {
    isUseDiv() {
      return !this.showTooltip || !this.showTips
    }
  },
  watch: {
    content() {
      this.checkTooltipEnable()
    },
    line() {
      this.setLineNum()
    },
    isUseDiv() {
      this.setLineNum()
    }
  },
  mounted() {
    this.setLineNum()
    this.checkTooltipEnable()
    this.addResizeListener(this.$el, () => {
      this.checkTooltipEnable()
    })
  },
  beforeDestroy() {
    this.removeResizeListener(this.$el)
  },
  methods: {
    checkTooltipEnable() {
      if (!this.showTips) {
        return
      }
      if (this.alwaysShowTips) {
        this.showTooltip = true
        return
      }
      const contentEl = this.$refs['content']
      this.showTooltip = contentEl.offsetHeight < contentEl.scrollHeight
    },
    setLineNum() {
      this.$nextTick(() => {
        const contentEl = this.$refs['content']
        if (contentEl) {
          contentEl.style.webkitLineClamp = this.line.toString()
        }
      })
    },
    resizeHandler(entries) {
      for (const entry of entries) {
        const listeners = entry.target.__resizeListeners__ || []
        if (listeners.length) {
          listeners.forEach(fn => {
            fn()
          })
        }
      }
    },
    addResizeListener(element, fn) {
      if (!element.__resizeListeners__) {
        element.__resizeListeners__ = []
        element.__ro__ = new ResizeObserver(this.resizeHandler)
        element.__ro__.observe(element)
      }
      element.__resizeListeners__.push(fn)
    },
    removeResizeListener(element, fn) {
      if (!element || !element.__resizeListeners__) {
        return
      }
      if (fn) {
        element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
      } else {
        element.__resizeListeners__ = []
      }
      if (!element.__resizeListeners__.length && element.__ro__) {
        element.__ro__.disconnect()
      }
    }
    // handleClosePopper() {
    //   if (this.isUseDiv) {
    //     return
    //   }
    //   const el = get(this.$refs, 'tooltip')
    //   if (el) {
    //     el.handleClosePopper()
    //   }
    // }
  }
}
</script>
