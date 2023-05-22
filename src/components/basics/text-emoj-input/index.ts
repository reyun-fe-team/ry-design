/*
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:26:56
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-15 19:30:00
 * @FilePath: /ry-design/src/components/basics/text-emoj-input/index.js
 * @Description: 文本-表情-输入组件
 */
import TextEmojInput from './text-emoj-input'

TextEmojInput.install = function (Vue) {
  Vue.component(TextEmojInput.name, TextEmojInput)
}

export default TextEmojInput
