import FilterArea from './filter-area'
import FilterAreaTemplateList from './filter-area-template-list'

FilterArea.install = function (Vue) {
  Vue.component(FilterArea.name, FilterArea)
}

FilterAreaTemplateList.install = function (Vue) {
  Vue.component(FilterAreaTemplateList.name, FilterAreaTemplateList)
}

export { FilterArea, FilterAreaTemplateList }
export default FilterArea
