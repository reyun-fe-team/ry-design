import CarouselPreviewer from './carousel-previewer.vue'

CarouselPreviewer.install = function (Vue) {
  Vue.component(CarouselPreviewer.name, CarouselPreviewer)
}

export default CarouselPreviewer
