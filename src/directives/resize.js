const isResizeObserver = 'ResizeObserver' in window

function removeListen(el) {
  el.__observer__ && el.__observer__.unobserve(el)
  delete el.__resizeHandler__
  delete el.__observer__
  delete el.__resizeRecorder__
}

function addListen(el, binding) {
  if (!isResizeObserver) {
    return
  }

  if (binding.value && typeof binding.value === 'function') {
    // resize handler
    el.__resizeHandler__ = entries => {
      const ResizeObserverEntry = entries[0]
      const element = ResizeObserverEntry.target
      const contentRect = ResizeObserverEntry.contentRect
      let data = { width: contentRect.width, height: contentRect.height, element }

      // 数据变了
      if (element.__resizeRecorder__) {
        const { width, height } = element.__resizeRecorder__
        const { width: newWidth, height: newHeight } = data
        if (width !== newWidth || height !== newHeight) {
          binding.value(data)
        }
      }

      // 存在记录器更新值
      if (element.__resizeRecorder__) {
        element.__resizeRecorder__ = data
      }
      // 添加一个记录器
      else {
        element.__resizeRecorder__ = data
      }
    }
    // 创建一个元素大小调整检测器实例
    el.__observer__ = new ResizeObserver(el.__resizeHandler__)
    // 监听
    el.__observer__.observe(el)
  }

  // 移除
  if (!binding.value) {
    removeListen(el)
  }
}

export default {
  // 使用 bind，会在初始化时调用两次handler
  mounted(el, binding) {
    addListen(el, binding)
  },
  // 组件更新
  componentUpdated(el, binding) {
    addListen(el, binding)
  },
  // 销毁组件
  unbind(el) {
    removeListen(el)
  },
  // 元素卸载
  unmounted(el) {
    removeListen(el)
  }
}
