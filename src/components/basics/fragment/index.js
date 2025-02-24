import { prefix } from '@src/config.js'
const prefixCls = prefix + 'fragment'

const componentOptions = {
  name: prefixCls,
  render(h) {
    const props = {
      class: prefixCls,
      directives: [{ name: 'frag' }]
    }
    return h('div', props, this.$slots.default)
  }
}

componentOptions.install = function (Vue) {
  Vue.component(componentOptions.name, componentOptions)
}

export default componentOptions
