import Vue from 'vue'
// basics
import Transfer from './components/basics/transfer'
import MultiCascader from './components/basics/multi-cascader/index.js'
import PrefixContainer from './components/basics/prefix-container/index.js'
import SingleHeader from './components/basics/single-header/index.js'
import PageHeader from './components/basics/page-header/index.js'
import Breadcrumb from './components/basics/breadcrumb/index.js'
import MultiRadioButton from './components/basics/multi-radio-button/index.js'
import Modals from './components/basics/modals/index.js'
// business
import PageHeaderModule from './components/business/page-header-module/index.js'
import AccountList from './components/business/account-list/index.js'
import RadioGroup from './components/basics/radio-group/index.js'

import ViewUI from 'view-design'
import Package from '../package.json'
import 'view-design/dist/styles/iview.css'
import './style/index.less'

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
  Modals
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
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
  Modals
}
