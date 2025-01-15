import { prefix } from '@src/config.js'
import { getKey } from './assist'

const prefixCls = prefix + 'ellipsis'
let measureEl = null

export const getMeasureByContentStyle = (measureEl, $content, text) => {
  const computedStyle = window.getComputedStyle($content)
  const stylesToCopy = ['fontSize', 'fontFamily', 'fontWeight', 'letterSpacing']
  stylesToCopy.forEach(style => {
    measureEl.style[style] = computedStyle[style]
  })

  measureEl.innerHTML = text

  return measureEl
}

export const getMeasureEl = ($content, text) => {
  if (measureEl) {
    return getMeasureByContentStyle(measureEl, $content, text)
  }

  // 查找页面上是否有对应的measureEl
  measureEl = document.getElementById(`${prefixCls}-measure-el}`)
  if (measureEl) {
    return getMeasureByContentStyle(measureEl, $content, text)
  }

  // 创建measureEl
  measureEl = document.createElement('span')
  measureEl.id = `${prefixCls}-measure-el`
  measureEl.className = `${prefixCls}-measure-el-${getKey()}`
  const styles = {
    visibility: 'hidden',
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
    whiteSpace: 'nowrap'
  }
  for (const styleName in styles) {
    measureEl.style[styleName] = styles[styleName]
  }
  document.body.appendChild(measureEl)

  // 添加页面卸载时的清理
  window.addEventListener('unload', removeMeasureEl)
  // 添加hash变化时的清理
  window.addEventListener('popstate', removeMeasureEl)

  return getMeasureByContentStyle(measureEl, $content, text)
}

export const removeMeasureEl = () => {
  if (measureEl) {
    document.body.removeChild(measureEl)
    measureEl = null
    window.removeEventListener('unload', removeMeasureEl)
    window.removeEventListener('popstate', removeMeasureEl)
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
