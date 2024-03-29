import elementResizeDetectorMaker from 'element-resize-detector'
import _isEqual from 'lodash/isEqual'

function removeListen(el) {
  el.__observer__ && el.__observer__.removeListener(el, el.__resizeHandler__)
  delete el.__resizeHandler__
  delete el.__observer__
  delete el.__resizeRecorder__
}

function addListen(el, binding) {
  if (binding.value && typeof binding.value === 'function') {
    // resize handler
    el.__resizeHandler__ = element => {
      let data = { width: '', height: '', element }

      if (element && element === el) {
        data.width = element.offsetWidth
        data.height = element.offsetHeight
      }

      // 数据变了
      if (element.__resizeRecorder__ && !_isEqual(element.__resizeRecorder__, data)) {
        binding.value(data)
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
    el.__observer__ = elementResizeDetectorMaker()
    // 监听
    el.__observer__.listenTo(el, el.__resizeHandler__)
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
