import elementResizeDetectorMaker from 'element-resize-detector'

function removeListen(el) {
  el.__observer__ && el.__observer__.removeListener(el, el.__resizeHandler__)
  delete el.__resizeHandler__
  delete el.__observer__
}

function addListen(el, binding) {
  function resizeHandler(element) {
    let data = { width: '', height: '' }
    if (element) {
      data.width = element.offsetWidth
      data.height = element.offsetHeight
    }
    binding.value(data)
  }

  if (binding.value && typeof binding.value === 'function') {
    el.__resizeHandler__ = resizeHandler
    // 创建一个元素大小调整检测器实例
    el.__observer__ = elementResizeDetectorMaker()
    el.__observer__.listenTo(el, resizeHandler)
  }
}

export default {
  // 使用 bind，会在初始化时调用两次handler
  mounted(el, binding) {
    addListen(el, binding)
  },
  // 绑定
  bind(el, binding) {},
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
