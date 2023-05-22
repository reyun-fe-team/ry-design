import DraggableCard from './draggable-card.vue'

DraggableCard.install = function (Vue) {
  Vue.component(DraggableCard.name, DraggableCard)
}

export default DraggableCard
