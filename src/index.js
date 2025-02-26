import Vue from 'vue'
// components
import * as Components from './components'
// iview 组件
import ViewUI from 'view-design'
// 组件包
import Package from '../package.json'
// iview 样式
import 'view-design/dist/styles/iview.css'
// 全局样式
import './style/index.less'
// 初始化指令
import initDirectives from './directives'
// 初始化全局API
import initGlobalApi from './globalApi'
// 工具函数
import { consoleLogVersion } from './util/util'

Vue.use(ViewUI, {
  datePicker: {
    customIcon: 'icon iconfont ry-icon-data',
    iconSize: 14
  }
})

// 打印版本号
consoleLogVersion(Package.version)

// 全局注册组件
const initRegisterComponents = Vue => {
  Object.keys(Components).forEach(key => {
    Vue.component(Components[key].name, Components[key])
  })
}

const install = function (Vue) {
  // 全局注册组件
  initRegisterComponents(Vue)
  // 初始化指令
  initDirectives(Vue)
  // 初始化全局API
  initGlobalApi(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION,
  install,
  ...Components
}
