import EchoContainer from './echo-container.vue'

EchoContainer.install = function (Vue) {
  Vue.component(EchoContainer.name, EchoContainer)
}

export default EchoContainer
