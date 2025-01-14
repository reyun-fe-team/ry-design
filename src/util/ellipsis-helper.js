import { prefix } from '@src/config.js'
const prefixCls = prefix + 'ellipsis'

let measureEl = null

export const getMeasureEl = () => {
  if (measureEl) {
    return measureEl
  }

  measureEl = document.createElement('span')
  measureEl.className = `${prefixCls}-measure-el`
  measureEl.style.visibility = 'hidden'
  measureEl.style.position = 'absolute'
  measureEl.style.top = '-9999px'
  measureEl.style.left = '-9999px'
  measureEl.style.whiteSpace = 'nowrap'
  document.body.appendChild(measureEl)

  // 添加页面卸载时的清理
  window.addEventListener('unload', removeMeasureEl)

  return measureEl
}

export const removeMeasureEl = () => {
  if (measureEl) {
    document.body.removeChild(measureEl)
    measureEl = null
    window.removeEventListener('unload', removeMeasureEl)
  }
}

export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}
