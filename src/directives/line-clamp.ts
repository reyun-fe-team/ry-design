/**
 * 限制文本最多显示几行，以...结束，仅适用于 webkit 内核浏览器
 * */
import { addClass, removeClass } from '../util/assist.js'

export default {
  inserted(el, binding) {
    if (binding.value) {
      addClass(el, 'rd-line-clamp')
      el.style['-webkit-line-clamp'] = binding.value
    }
  },
  componentUpdated(el, binding) {
    if (binding.value) {
      el.style['-webkit-line-clamp'] = binding.value
    }
  },
  unbind(el) {
    removeClass(el, 'rd-line-clamp')
    el.style['-webkit-line-clamp'] = null
  }
}
