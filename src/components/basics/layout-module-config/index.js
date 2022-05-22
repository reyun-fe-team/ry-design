import LayoutModuleConfig from './layout-module-config'

LayoutModuleConfig.install = function (Vue) {
  Vue.component(LayoutModuleConfig.name, LayoutModuleConfig)
}

export default LayoutModuleConfig
