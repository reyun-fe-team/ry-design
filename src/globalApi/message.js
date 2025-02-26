// iview的Message控件,只允许提示最后一次
import _isString from 'lodash/isString'
import _isPlainObject from 'lodash/isPlainObject'

export default function (Vue) {
  const types = ['info', 'success', 'warning', 'error', 'loading']
  const specialTypes = ['warning', 'error']
  const duration = 3
  const destroy = Vue.prototype.$Message.destroy

  for (const type of types) {
    const originalFn = Vue.prototype.$Message[type]
    Vue.prototype.$Message[type] = function (options) {
      destroy()
      if (specialTypes.includes(type)) {
        options = {
          content: _isString(options) ? options : options.content,
          duration: _isPlainObject(options) ? options.duration || duration : duration
        }
      }
      return originalFn.call(this, options)
    }
  }
}
