import Vue from 'vue'
import { Tooltip } from 'view-design'

// 悬浮的z-index = 1060 + tooltipZIndex
let tooltipZIndex = 5000

function hasDoc() {
  return typeof window !== 'undefined' && 'document' in window
}

function createTooltip(target, options = {}) {
  const RyTooltip = {
    props: { reference: null },
    methods: {
      // 改写悬浮事件
      handleShowPopper() {
        Tooltip.methods.handleShowPopper.call(this)
        this.tIndex = tooltipZIndex++
      }
    },
    extends: Tooltip
  }
  const tooltip = new Vue({
    el: document.createElement('div'),
    render(h) {
      let contentChild = null
      let { contentRender } = options
      // 传入了自定义渲染函数
      if (typeof contentRender === 'function') {
        let renderDom = options.contentRender(h, options)
        contentChild = h('div', { slot: 'content', class: 'v-tooltip-content-slot' }, [renderDom])
      }
      return h(
        RyTooltip,
        {
          props: {
            ...options,
            transfer: true,
            theme: 'light',
            reference: target
          }
        },
        [contentChild]
      )
    }
  })
  return tooltip.$children[0]
}

function showTooltip(event) {
  const el = event.target
  const tooltipOption = el._tooltipOption
  if (tooltipOption) {
    // 没有创建组件才去初始化
    let tooltipRef = el._tooltipRef
    if (!tooltipRef) {
      tooltipRef = createTooltip(el, tooltipOption)
      const popper = tooltipRef.$refs.popper
      if (popper && hasDoc()) {
        popper.classList.add('ry-tooltip-directives')
      }
      el._tooltipRef = tooltipRef
    }
    // 打开浮层
    tooltipRef.handleShowPopper()
  }
}

function hideTooltip(event) {
  const el = event.target
  const tooltipRef = el._tooltipRef
  if (tooltipRef) {
    // 关闭浮层
    tooltipRef.handleClosePopper()
  }
}

const directive = {
  // 绑定（触发一次）
  bind(el, binding) {
    el._tooltipOption = binding.value
    el.addEventListener('mouseenter', showTooltip)
    el.addEventListener('mouseleave', hideTooltip)
  },
  // 组件更新
  componentUpdated(el, binding) {
    // 更新数据和事件
    el._tooltipOption = binding.value
    el.removeEventListener('mouseenter', showTooltip)
    el.removeEventListener('mouseleave', hideTooltip)
    el.addEventListener('mouseenter', showTooltip)
    el.addEventListener('mouseleave', hideTooltip)
    // 存在已经创建的实例，干掉直接重新创建，更新最新数据
    // 如果已经创建过了很多个实例，下次会重复创建
    // 性能有损耗
    const tooltipRef = el._tooltipRef
    if (tooltipRef) {
      const popper = tooltipRef.$refs.popper
      if (popper && hasDoc()) {
        document.body.removeChild(popper)
      }
      delete el._tooltipRef
    }
  },
  // 销毁组件（触发一次）
  unbind(el) {
    const tooltipRef = el._tooltipRef
    if (tooltipRef) {
      tooltipRef.$nextTick(() => {
        tooltipRef.handleClosePopper()
        tooltipRef.$destroy()
      })
    }
    // 删除属性
    delete el._tooltipOption
    delete el._tooltipRef
    // 解绑事件
    el.removeEventListener('mouseenter', showTooltip)
    el.removeEventListener('mouseleave', hideTooltip)
  }
}

export default directive
