import Vue from 'vue'
import { Tooltip } from 'view-design'

// 渲染dom的ID
let tooltipDomId = ''

function createTooltip(target, options = {}) {
  tooltipDomId = 'v-tooltip-' + +new Date()
  const MyTooltip = { props: { reference: null }, extends: Tooltip }
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
        MyTooltip,
        {
          id: tooltipDomId,
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
      el._tooltipRef = tooltipRef
    }

    // 打开浮层
    tooltipRef.$nextTick(() => {
      tooltipRef.handleShowPopper()
    })
  }
}

function hideTooltip(event) {
  const el = event.target
  const tooltipRef = el._tooltipRef
  if (tooltipRef) {
    // 关闭浮层
    tooltipRef.$nextTick(() => {
      tooltipRef.handleClosePopper()
    })
  }
}

const directive = {
  bind(el, binding) {
    el._tooltipOption = binding.value
    el.addEventListener('mouseenter', showTooltip)
    el.addEventListener('mouseleave', hideTooltip)
  },
  unbind(el) {
    // 销毁组件
    const tooltipRef = el._tooltipRef
    if (tooltipRef) {
      tooltipRef.$nextTick(() => {
        tooltipRef.handleClosePopper()
        tooltipRef.$destroy()
        if (typeof window !== 'undefined' && 'document' in window) {
          const dom = document.getElementById(tooltipDomId)
          dom && document.body.removeChild(dom)
        }
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
