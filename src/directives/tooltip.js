import { Tooltip } from 'view-design'

// 悬浮的z-index = 1060 + tooltipZIndex
let tooltipZIndex = 5000
// 悬浮的props收集的集合
let tooltipOptionsMap = {}

function hasDoc() {
  return typeof window !== 'undefined' && 'document' in window
}

export default function (Vue) {
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
    const RyTooltipProps = Vue.observable({
      ...options,
      // 组件更新后设置创建 tooltip
      compUpdatedVisible: false,
      transfer: true,
      theme: 'light',
      reference: target
    })
    const RyTooltipCom = new Vue({
      el: document.createElement('div'),
      render(h) {
        let contentChild = null
        let { contentRender } = options
        // 传入了自定义渲染函数
        if (typeof contentRender === 'function') {
          let renderDom = options.contentRender(h, options)
          contentChild = h('div', { slot: 'content', class: 'v-tooltip-content-slot' }, [renderDom])
        }
        return h(RyTooltip, { props: RyTooltipProps }, [contentChild])
      }
    })
    const RyTooltipContentCom = RyTooltipCom.$children[0]
    tooltipOptionsMap[RyTooltipContentCom._uid] = RyTooltipProps
    return RyTooltipContentCom
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

  function destroyTooltip(event) {
    const el = event.target
    const tooltipRef = el._tooltipRef
    if (tooltipRef) {
      // 销毁浮层
      tooltipRef.$destroy()
      // 删除对应的配置数据
      next(() => {
        delete el._tooltipOption
        delete el._tooltipRef
        delete tooltipOptionsMap[tooltipRef._uid]
      })
    }
  }

  function next(fn) {
    Vue.nextTick(() => {
      window.requestAnimationFrame(() => fn && fn())
    })
  }

  return {
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
        const _uid = tooltipRef._uid
        const notUpdate = ['transfer', 'theme', 'reference']
        const nowOptions = tooltipOptionsMap[_uid]
        for (const key in binding.value) {
          if (!notUpdate.includes(key)) {
            nowOptions[key] = binding.value[key]
          }
        }
      }

      // 自动展开或关闭（组件更新时触发）
      if (binding.value && 'compUpdatedVisible' in binding.value) {
        next(() => {
          const isShow = binding.value.compUpdatedVisible === true
          isShow ? showTooltip({ target: el }) : hideTooltip({ target: el })
        })
      }

      // 销毁
      if (!binding.value) {
        next(() => {
          destroyTooltip({ target: el })
        })
      }
    },
    // 销毁组件（触发一次）
    unbind(el) {
      const tooltipRef = el._tooltipRef
      if (tooltipRef) {
        // 删除对应的配置数据
        delete tooltipOptionsMap[tooltipRef._uid]
        tooltipRef.handleClosePopper()
        tooltipRef.$destroy()
      }
      // 删除属性
      delete el._tooltipOption
      delete el._tooltipRef
      // 解绑事件
      el.removeEventListener('mouseenter', showTooltip)
      el.removeEventListener('mouseleave', hideTooltip)
    }
  }
}
