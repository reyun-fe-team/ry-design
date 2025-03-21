import Vue from 'vue'
// basics
import Transfer from './components/basics/transfer'
import MultiCascader from './components/basics/multi-cascader'
import PrefixContainer from './components/basics/prefix-container'
import SingleHeader from './components/basics/single-header'
import PageHeader from './components/basics/page-header'
import Breadcrumb from './components/basics/breadcrumb'
import MultiRadioButton from './components/basics/multi-radio-button'
import Modals from './components/basics/modals'
import Drawer from './components/basics/drawer'
import RadioGroup from './components/basics/radio-group'
import TableColumns from './components/basics/table-columns/index.js'
import DraggableCard from './components/basics/draggable-card'
import WordLimit from './components/basics/word-limit'
import Ellipsis from './components/basics/ellipsis'
import TableMultiInputs from './components/basics/table-multi-inputs'
import TextEmojInput from './components/basics/text-emoj-input'
import Icon from './components/basics/icon'
import TextInputList from './components/basics/text-input-list'
import VirtualList from './components/basics/virtual-list'
import BatchInputs from './components/basics/batch-inputs'
import Wildcard from './components/basics/wildcard'
import CascaderTransfer from './components/basics/cascader-transfer'
import Exception from './components/basics/exception'
import Button from './components/basics/custom-button'
import DigitalDetailsTooltip from './components/basics/digital-details-tooltip'
import Page from './components/basics/page'
import Schedule from './components/basics/schedule'
import DropdownSearch from './components/basics/dropdown-search'
import Sort from './components/basics/sort'
import Image from './components/basics/image'
import ImageGroup from './components/basics/image-group'
import ImagePreview from './components/basics/image-preview'
import DropdownPanel from './components/basics/dropdown-panel'
import Indicator from './components/basics/indicator'
import Empty from './components/basics/empty'
import Space from './components/basics/space'
import CarouselPreviewer from './components/basics/carousel-previewer'
import TreeSelect from './components/basics/tree-select'
import Tree from './components/basics/tree'
import CollapseTransition from './components/basics/transitions/collapse-transition'
import FooterToolbar from './components/basics/footer-toolbar'
import SelectConstituency from './components/basics/select-constituency'
import DynamicRender from './components/basics/dynamic-render'
import Fragment from './components/basics/fragment'
// business
import BatchUploadXls from './components/business/batch-upload-xls'
import PageHeaderModule from './components/business/page-header-module'
import AccountList from './components/business/account-list'
import EditRowBid from './components/business/edit-row-bid'
import ReverseButton from './components/business/reverse-button'
import { LayoutModuleConfig, LayoutModuleView } from './components/business/layout-module-config'
import TextItemShow from './components/business/text-item-show'
import DeleteModals from './components/business/delete-modals'
import AccountSelect from './components/business/account-select'
import ProductSelect from './components/business/product-select'
import SubmissionRule from './components/business/submission-rule'
import BatchModifyBids from './components/business/batch-modify-bids'
import AccountGroupList from './components/business/account-group-list'
import DatePicker from './components/basics/date-picker'
import EchoContainer from './components/business/echo-container'
import FilterList from './components/business/filter-list'
import FilterListSelect from './components/business/filter-list-select'
import FormDatePicker from './components/business/form-date-picker'
import FormInput from './components/business/form-input'
import FormIndicator from './components/business/form-indicator'
import FormSelectIndicator from './components/business/form-select-indicator'
import FilterLisCascader from './components/business/filter-list-cascader'
import { FilterArea, FilterAreaTemplateList } from './components/business/filter-area'
import PlacementLocation from './components/business/placement-location'
import ErrorPreventModal from './components/business/error-prevent-modal'
import FilterDropdownInput from './components/business/filter-dropdown-input'

import ViewUI from 'view-design'

import Package from '../package.json'
import 'view-design/dist/styles/iview.css'
import './style/index.less'

// umy-ui u-table
import { UTable, UTableColumn } from 'umy-ui'
// directives
import lineClamp from './directives/line-clamp'
import clickOutside from './directives/click-out-side'
import transferDom from './directives/transfer-dom'
import resize from './directives/resize'
import lockBodyScroll from './directives/lock-body-scroll'
import frag from './directives/frag'
// directivesCreateFuncs
import createTooltip from './directives/tooltip'
import createDragging from './directives/dragging'

// util
import { setIviewMessage } from './util/message'

Vue.use(ViewUI, {
  datePicker: {
    customIcon: 'icon iconfont ry-icon-data',
    iconSize: 14
  }
})
const consoleLogVersion = () => {
  window.console.log(
    '%c%s',
    'padding:0 20px; color: #4688f1; background: #fff; font-size: 18px;',
    'welcome ryDesign v' + Package.version + ' 🔥'
  )
}
consoleLogVersion()

const components = [
  Transfer,
  PrefixContainer,
  MultiCascader,
  SingleHeader,
  PageHeader,
  Breadcrumb,
  MultiRadioButton,
  AccountList,
  PageHeaderModule,
  RadioGroup,
  Modals,
  Drawer,
  EditRowBid,
  TableColumns,
  ReverseButton,
  LayoutModuleConfig,
  LayoutModuleView,
  DraggableCard,
  DeleteModals,
  TableMultiInputs,
  TextItemShow,
  WordLimit,
  BatchUploadXls,
  Ellipsis,
  TextEmojInput,
  Icon,
  TextInputList,
  VirtualList,
  Wildcard,
  AccountSelect,
  CascaderTransfer,
  Exception,
  ProductSelect,
  SubmissionRule,
  Button,
  BatchModifyBids,
  DigitalDetailsTooltip,
  Page,
  Schedule,
  AccountGroupList,
  UTable,
  UTableColumn,
  Sort,
  Image,
  ImageGroup,
  DropdownSearch,
  Sort,
  ImagePreview,
  DropdownPanel,
  DatePicker,
  Indicator,
  Empty,
  EchoContainer,
  FilterList,
  FilterListSelect,
  FormDatePicker,
  FormInput,
  FormIndicator,
  FormSelectIndicator,
  FilterLisCascader,
  FilterArea,
  Space,
  PlacementLocation,
  BatchInputs,
  ErrorPreventModal,
  CarouselPreviewer,
  TreeSelect,
  Tree,
  CollapseTransition,
  FilterAreaTemplateList,
  FooterToolbar,
  FilterDropdownInput,
  SelectConstituency,
  DynamicRender,
  Fragment
]

// 对象式-指令
const directives = {
  'line-clamp': lineClamp,
  'click-outside': clickOutside,
  'transfer-dom': transferDom,
  resize: resize,
  'lock-body-scroll': lockBodyScroll,
  frag: frag
}

// 函数式-创建指令对象
const directivesCreateFuncs = {
  tooltip: createTooltip,
  dragging: createDragging
}

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
  Object.keys(directivesCreateFuncs).forEach(key => {
    Vue.directive(key, directivesCreateFuncs[key](Vue))
  })
  setIviewMessage(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION,
  install,
  BatchInputs,
  Transfer,
  MultiCascader,
  PrefixContainer,
  SingleHeader,
  PageHeader,
  Breadcrumb,
  MultiRadioButton,
  PageHeaderModule,
  Modals,
  Drawer,
  EditRowBid,
  TableColumns,
  ReverseButton,
  LayoutModuleConfig,
  LayoutModuleView,
  WordLimit,
  BatchUploadXls,
  Ellipsis,
  DraggableCard,
  TableMultiInputs,
  TextItemShow,
  DeleteModals,
  TextEmojInput,
  TextInputList,
  AccountSelect,
  CascaderTransfer,
  Exception,
  ProductSelect,
  SubmissionRule,
  Button,
  BatchModifyBids,
  VirtualList,
  DigitalDetailsTooltip,
  Page,
  Schedule,
  AccountGroupList,
  UTable,
  UTableColumn,
  Sort,
  Image,
  ImageGroup,
  DropdownSearch,
  ImagePreview,
  DropdownPanel,
  DatePicker,
  Indicator,
  Empty,
  EchoContainer,
  FilterList,
  FilterListSelect,
  FilterLisCascader,
  Space,
  PlacementLocation,
  ErrorPreventModal,
  CarouselPreviewer,
  TreeSelect,
  Tree,
  CollapseTransition,
  FilterArea,
  FilterAreaTemplateList,
  FooterToolbar,
  FilterDropdownInput,
  SelectConstituency,
  DynamicRender,
  Fragment
}
