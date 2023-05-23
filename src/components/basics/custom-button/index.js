/*
 * @Date: 2022-12-07 16:11:47
 * @LastEditTime: 2022-12-07 16:13:11
 * @Description: 按钮组件
 */
import Button from './button.vue'

Button.install = function (Vue) {
  Vue.component(Button.name, Button)
}

export default Button
