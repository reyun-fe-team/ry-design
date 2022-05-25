/*
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-22 16:50:08
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-25 15:31:29
 * @FilePath: /ry-design/src/components/business/layout-module-config/index.js
 * @Description: 极速创建第一步模块布局组件 注册文件
 */
import LayoutModuleConfig from './layout-config'
import LayoutModuleView from './layout-module-view'

LayoutModuleView.install = function (Vue) {
  Vue.component(LayoutModuleView.name, LayoutModuleView)
}
LayoutModuleConfig.install = function (Vue) {
  Vue.component(LayoutModuleConfig.name, LayoutModuleConfig)
}

export { LayoutModuleConfig, LayoutModuleView }
export default LayoutModuleConfig
