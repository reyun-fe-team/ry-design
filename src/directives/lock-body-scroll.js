// 弹出组件锁定body滚动
// 1、弹出组件渲染完成后获取展示状态 visible === true
// 2、判断是否显示
// 3、如果有显示，则锁定body滚动 并记录状态【弹出组件展示的数量】在window.__IVU_POPUP_VISIBLE_COUNT__ ++
// 4、如果隐藏，并记录状态【弹出组件展示的数量】在window.__IVU_POPUP_VISIBLE_COUNT__ --
// 5、如果window.__IVU_POPUP_VISIBLE_COUNT__ > 0 则锁定body滚动，否则解锁body滚动

// 记录弹出组件展示数量的key
const POPUP_VISIBLE_COUNT_KEY = '__IVU_POPUP_VISIBLE_COUNT__'

// 记录弹出组件的ID
const POPUP_COMPONENT_ID_LIST = []

// 弹出组件需要监听的展示状态的属性名
const POPUP_COMPONENT_VISIBLE_PROPERTY_NAME = 'visible'

// 记录弹出组件的展示状态
const recordPopupVisibleState = (vnode, visible) => {
  const componentId = vnode.componentInstance._uid
  if (visible) {
    POPUP_COMPONENT_ID_LIST.push(componentId)
  } else {
    let index = POPUP_COMPONENT_ID_LIST.indexOf(componentId)
    index !== -1 && POPUP_COMPONENT_ID_LIST.splice(index, 1)
  }
}

// 获取弹出组件的展示状态
const getPopupVisibleState = vnode => {
  const componentId = vnode.componentInstance._uid
  return POPUP_COMPONENT_ID_LIST.includes(componentId)
}

// 判断是不是vue组件
const isVueComponent = vnode => {
  return !_.isNil(vnode.componentInstance)
}

// 获取组件实例
const getComponentInstance = vnode => {
  return isVueComponent(vnode) ? vnode.componentInstance : null
}

// 判断是不是modal组件
const isModalComponent = vnode => {
  return isVueComponent(vnode) && vnode.componentInstance.$options.name === 'Modal'
}

// 判断是不是抽屉组件
const isDrawerComponent = vnode => {
  return isVueComponent(vnode) && vnode.componentInstance.$options.name === 'Drawer'
}

// 判断是不是弹出组件
const isPopupComponent = vnode => {
  return isModalComponent(vnode) || isDrawerComponent(vnode)
}

// 如果是modal组件或弹出组件，判断是否显示
const isPopupShow = vnode => {
  return isPopupComponent(vnode) ? vnode.componentInstance.$data.visible : false
}

// 获取当前弹出组件展示的数量
const getPopupVisibleCount = () => {
  return window[POPUP_VISIBLE_COUNT_KEY] || 0
}

// 记录累加弹出组件展示的数量
const addPopupVisibleCount = () => {
  let count = getPopupVisibleCount()
  count++
  window[POPUP_VISIBLE_COUNT_KEY] = count
}

// 记录累减弹出组件展示的数量
const reducePopupVisibleCount = () => {
  let count = getPopupVisibleCount()
  count--
  window[POPUP_VISIBLE_COUNT_KEY] = count
}

// 锁定body滚动
const lockBodyScroll = () => {
  // 判断是否还有其他弹出组件展示
  let count = getPopupVisibleCount()
  // 如果count > 0 则锁定body滚动
  if (count > 0) {
    document.body.style.overflow = 'hidden'
  }
}

// 解锁body滚动
const unlockBodyScroll = () => {
  let count = getPopupVisibleCount()
  // 如果count === 0 则解锁body滚动
  if (!count) {
    document.body.style.overflow = ''
  }
}

// 计算一帧的时间
// 16ms 一帧
const frameTime = 16

// 延迟一段时间。等待下一次渲染帧
// 因为vue的渲染是异步的，所以需要延迟一段时间，等待下一次渲染帧
const delay = (fn, delay = frameTime) => {
  window.requestAnimationFrame(() => setTimeout(fn, delay))
}

// 监听属性变化的回调处理
// eslint-disable-next-line
const watchPopupVisibleChangeHandle = (newVal, oldVal, vnode) => {
  // 获取当前组件是否已经记录为展示
  const oldVisible = getPopupVisibleState(vnode)
  const newVisible = newVal

  // 记录弹出组件的展示状态
  recordPopupVisibleState(vnode, newVisible)

  // 如果旧的展示状态和新的展示状态不一致
  if (oldVisible !== newVisible) {
    // 如果新的展示状态为true，则记录累加弹出组件展示的数量
    // 如果新的展示状态为false，则记录累减弹出组件展示的数量
    newVisible ? addPopupVisibleCount() : reducePopupVisibleCount()
  }

  // 根据新的展示状态，锁定或解锁body滚动
  newVisible ? lockBodyScroll() : unlockBodyScroll()
}

export default {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  // eslint-disable-next-line
  bind: (el, binding, vnode, oldVnode) => {
    // 是否是弹出组件
    const isPopup = isPopupComponent(vnode)
    // 获取组件实例
    const componentInstance = getComponentInstance(vnode)
    if (!isPopup || !componentInstance) {
      return
    }

    // 监听属性变化
    const unwatch = componentInstance.$watch(POPUP_COMPONENT_VISIBLE_PROPERTY_NAME, (n, o) => {
      watchPopupVisibleChangeHandle(n, o, vnode)
    })

    // 保存注销函数，用于解绑时清除监听
    el._unwatch = unwatch
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  // 元素被插入文档时，计算数量
  // eslint-disable-next-line
  inserted: (el, binding, vnode, oldVnode) => {
    delay(() => {
      const oldVisible = getPopupVisibleState(vnode)
      const newVisible = isPopupShow(vnode)
      // 如果旧的展示状态和新的展示状态不一致，并且新的展示状态为true，则记录弹出组件的展示状态
      if (oldVisible !== newVisible && newVisible) {
        // 记录弹出组件的展示状态
        recordPopupVisibleState(vnode, newVisible)
        // 记录累加弹出组件展示的数量
        addPopupVisibleCount()
      }

      // 锁定body滚动
      lockBodyScroll()
    })
  },
  // 只调用一次，指令与元素解绑时调用。
  // eslint-disable-next-line
  unbind: (el, binding, vnode, oldVnode) => {
    delay(() => {
      // 移除监听
      el._unwatch && el._unwatch()
      // 清除监听的事件
      delete el._unwatch
      // 记录弹出组件的展示状态
      recordPopupVisibleState(vnode, false)
      // 记录累减弹出组件展示的数量
      reducePopupVisibleCount()

      // 解锁body滚动
      unlockBodyScroll()
    })
  },
  // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
  // eslint-disable-next-line
  update: (el, binding, vnode, oldVnode) => {},
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  // eslint-disable-next-line
  componentUpdated: (el, binding, vnode, oldVnode) => {}
}
