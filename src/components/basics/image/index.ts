import Image from './image.vue'

Image.install = function (Vue) {
  Vue.component(Image.name, Image)
}

export default Image
