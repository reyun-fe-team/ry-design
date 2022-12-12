import TextInputList from './text-input-list'
import VirtualList from './virtual-list'

TextInputList.install = function (Vue) {
  Vue.component(TextInputList.name, TextInputList)
}

VirtualList.install = function (Vue) {
  Vue.component(VirtualList.name, VirtualList)
}
export { TextInputList, VirtualList }
export default TextInputList
