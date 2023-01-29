/**
 * iview的Message控件,只允许提示最后一次
 */
export const setIviewMessage = Vue => {
  const message = ['info', 'success', 'warning', 'error', 'loading']
  const durationMessage = ['warning', 'error']
  const duration = 3
  for (let val of message) {
    let fn = Vue.prototype.$Message[val]
    Vue.prototype.$Message[val] = function (options) {
      Vue.prototype.$Message.destroy()
      if (durationMessage.includes(val)) {
        if (Object.prototype.toString.call(options) === '[object String]') {
          options = {
            content: options,
            duration
          }
        } else if (Object.prototype.toString.call(options) === '[object Object]') {
          if (!options.hasOwnProperty('duration')) {
            options['duration'] = duration
          }
        }
      }
      return fn.call(this, options)
    }
  }
}
