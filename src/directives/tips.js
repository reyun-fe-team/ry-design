/*
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2023-03-01 13:58:21
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2023-03-01 17:50:47
 * @FilePath: /ry-design/src/directives/tips.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

    // 展示浮层
    tooltipRef.handleShowPopper()
  }
}

function hideTooltip(event) {
  const el = event.target
  const tooltipRef = el._tooltipRef
  if (tooltipRef) {
    tooltipRef.handleClosePopper()
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
      tooltipRef.handleClosePopper()
      tooltipRef.$nextTick(() => {
        tooltipRef.$destroy()
        document.body.removeChild(document.body.getElementById('#' + tooltipDomId))
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
