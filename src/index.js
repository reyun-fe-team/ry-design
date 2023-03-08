import Vue from 'vue'
// basics
import RdTransfer from './components/basics/transfer'
import RdMultiCascader from './components/basics/multi-cascader'
import RdPrefixContainer from './components/basics/prefix-container'
import RdSingleHeader from './components/basics/single-header'
import RdPageHeader from './components/basics/page-header'
import RdBreadcrumb from './components/basics/breadcrumb'
import RdMultiRadioButton from './components/basics/multi-radio-button'
import RdModals from './components/basics/modals'
import RdRadioGroup from './components/basics/radio-group'
import RdTableColumns from './components/basics/table-columns/index.js'
import RdDraggableCard from './components/basics/draggable-card'
import RdWordLimit from './components/basics/word-limit'
import RdEllipsis from './components/basics/ellipsis'
import RdTableMultiInputs from './components/basics/table-multi-inputs'
import RdTextEmojInput from './components/basics/text-emoj-input'
import RdIcon from './components/basics/icon'
import {
  TextInputList as RdTextInputList,
  VirtualList as RdVirtualList
} from './components/basics/text-input-list'
import RdWildcard from './components/basics/wildcard'
import RdCascaderTransfer from './components/basics/cascader-transfer'
import RdException from './components/basics/exception'
import RdButton from './components/basics/custom-button'
import RdDigitalDetailsTooltip from './components/basics/digital-details-tooltip'
import RdPage from './components/basics/page'
import RdSchedule from './components/basics/schedule'
import RdSort from './components/basics/sort'
import RdImagePreview from './components/basics/image-preview'
import RdDropdownSearch from './components/basics/dropdown-search'
import RdDropdownPanel from './components/basics/dropdown-panel'

// business
import RdBatchUploadXls from './components/business/batch-upload-xls'
import RdPageHeaderModule from './components/business/page-header-module'
import RdAccountList from './components/business/account-list'
import RdEditRowBid from './components/business/edit-row-bid'
import RdReverseButton from './components/business/reverse-button'
import {
  LayoutModuleConfig as RdLayoutModuleConfig,
  LayoutModuleView as RdLayoutModuleView
} from './components/business/layout-module-config'
import RdTextItemShow from './components/business/text-item-show'
import RdDeleteModals from './components/business/delete-modals'
import RdAccountSelect from './components/business/account-select'
import RdProductSelect from './components/business/product-select'
import RdSubmissionRule from './components/business/submission-rule'
import RdBatchModifyBids from './components/business/batch-modify-bids'
import RdAccountGroupList from './components/business/account-group-list'
import RdDatePicker from './components/basics/date-picker'

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

const consoleLogVersion = () => {
  window.console.log(
    '%c%s',
    'padding:0 20px; color: #4688f1; background: #fff; font-size: 18px;',
    'welcome ryDesign v' + Package.version + '，view-design' + ' 🔥'
  )
}
consoleLogVersion()

const components = [
  RdTransfer,
  RdPrefixContainer,
  RdMultiCascader,
  RdSingleHeader,
  RdPageHeader,
  RdBreadcrumb,
  RdMultiRadioButton,
  RdAccountList,
  RdPageHeaderModule,
  RdRadioGroup,
  RdModals,
  RdEditRowBid,
  RdTableColumns,
  RdReverseButton,
  RdLayoutModuleConfig,
  RdLayoutModuleView,
  RdDraggableCard,
  RdDeleteModals,
  RdTableMultiInputs,
  RdTextItemShow,
  RdWordLimit,
  RdBatchUploadXls,
  RdEllipsis,
  RdTextEmojInput,
  RdIcon,
  RdTextInputList,
  RdVirtualList,
  RdWildcard,
  RdAccountSelect,
  RdCascaderTransfer,
  RdException,
  RdProductSelect,
  RdSubmissionRule,
  RdButton,
  RdBatchModifyBids,
  RdDigitalDetailsTooltip,
  RdPage,
  RdSchedule,
  RdAccountGroupList,
  UTable,
  UTableColumn,
  RdSort,
  RdImagePreview,
  RdDropdownSearch,
  RdDropdownPanel,
  RdDatePicker
]
const directives = {
  'line-clamp': lineClamp,
  'click-outside': clickOutside,
  'transfer-dom': transferDom,
  tooltip: tips
}

Vue.use(ViewUI, {
  datePicker: {
    customIcon: 'icon iconfont ry-icon-data',
    iconSize: 14
  }
})

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })

  setIviewMessage(Vue)
}

//auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  version: Package.version,
  install,
  RdTransfer,
  RdMultiCascader,
  RdPrefixContainer,
  RdSingleHeader,
  RdPageHeader,
  RdBreadcrumb,
  RdMultiRadioButton,
  RdPageHeaderModule,
  RdModals,
  RdEditRowBid,
  RdTableColumns,
  RdReverseButton,
  RdLayoutModuleConfig,
  RdLayoutModuleView,
  RdWordLimit,
  RdBatchUploadXls,
  RdEllipsis,
  RdDraggableCard,
  RdTableMultiInputs,
  RdTextItemShow,
  RdDeleteModals,
  RdTextEmojInput,
  RdTextInputList,
  RdAccountSelect,
  RdCascaderTransfer,
  RdException,
  RdProductSelect,
  RdSubmissionRule,
  RdButton,
  RdBatchModifyBids,
  RdVirtualList,
  RdDigitalDetailsTooltip,
  RdPage,
  RdSchedule,
  RdAccountGroupList,
  UTable,
  UTableColumn,
  RdSort,
  RdImagePreview,
  RdDropdownSearch,
  RdDropdownPanel,
  RdDatePicker
}
module.exports.default = module.exports = API // eslint-disable-line no-undef
