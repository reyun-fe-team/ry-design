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
import RadioGroup from './components/basics/radio-group'
import TableColumns from './components/basics/table-columns/index.js'
import DraggableCard from './components/basics/draggable-card'
import WordLimit from './components/basics/word-limit'
import Ellipsis from './components/basics/ellipsis'
import TableMultiInputs from './components/basics/table-multi-inputs'
import TextEmojInput from './components/basics/text-emoj-input'

// business
import BatchUploadXls from './components/business/batch-upload-xls'
import PageHeaderModule from './components/business/page-header-module'
import AccountList from './components/business/account-list'
import EditRowBid from './components/business/edit-row-bid'
import ReverseButton from './components/business/reverse-button'
import { LayoutModuleConfig, LayoutModuleView } from './components/business/layout-module-config'
import TextItemShow from './components/business/text-item-show'
import DeleteModals from './components/business/delete-modals'

import ViewUI from 'view-design'
import Package from '../package.json'
import 'view-design/dist/styles/iview.css'
import './style/index.less'

// directives
import lineClamp from './directives/line-clamp'
import resize from './directives/resize'

Vue.use(ViewUI)
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
  TextEmojInput
]
const directives = {
  'line-clamp': lineClamp,
  resize
}

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: process.env.VERSION,
  install,
  Transfer,
  MultiCascader,
  PrefixContainer,
  SingleHeader,
  PageHeader,
  Breadcrumb,
  MultiRadioButton,
  PageHeaderModule,
  Modals,
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
  TextEmojInput
}
