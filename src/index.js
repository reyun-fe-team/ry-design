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
import TableColumns from './components/basics/table-columns'
import DraggableCard from './components/basics/draggable-card'
import WordLimit from './components/basics/word-limit/index.'
import Ellipsis from './components/basics/ellipsis'
import TableMultiInputs from './components/basics/table-multi-inputs'
import TextEmojInput from './components/basics/text-emoj-input'
import Icon from './components/basics/icon'
import { TextInputList, VirtualList } from './components/basics/text-input-list'
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
import AccountGroupList from './components/business/account-group-list/index.'
import DatePicker from './components/basics/date-picker'
import EchoContainer from './components/business/echo-container'

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
import tips from './directives/tips'

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
  EchoContainer
]
const directives = {
  'line-clamp': lineClamp,
  'click-outside': clickOutside,
  'transfer-dom': transferDom,
  tooltip: tips
}

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })

  setIviewMessage(Vue)
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
  EchoContainer
}
