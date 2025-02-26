// directives
import lineClamp from './line-clamp'
import clickOutside from './click-out-side'
import transferDom from './transfer-dom'
import resize from './resize'
import lockBodyScroll from './lock-body-scroll'
import frag from './frag'
// directivesCreateFuncs
import createTooltip from './tooltip'
import createDragging from './dragging'

// 对象式-指令
const directives = {
  'line-clamp': lineClamp,
  'click-outside': clickOutside,
  'transfer-dom': transferDom,
  resize: resize,
  'lock-body-scroll': lockBodyScroll,
  frag: frag
}

// 函数式-创建指令对象
const directivesCreateFuncs = {
  tooltip: createTooltip,
  dragging: createDragging
}

// 初始化指令
export default function initDirectives(Vue) {
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
  Object.keys(directivesCreateFuncs).forEach(key => {
    Vue.directive(key, directivesCreateFuncs[key](Vue))
  })
}
