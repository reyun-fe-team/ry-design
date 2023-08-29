import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import ryDesign from '../src/index'
// import iView from 'view-design'
// import ryDesign from '../dist/ry-design.min.js'
// import '../dist/styles/main.css'
// Vue.use(iView)
Vue.use(VueRouter)
Vue.use(ryDesign)

// 开启debug模式
Vue.config.debug = true

// 路由配置
const router = new VueRouter({
  esModule: false,
  mode: 'history',
  routes: [
    {
      path: '/transfer',
      component: resolve => require(['./routers/transfer.vue'], resolve)
    },
    {
      path: '/multi-cascader',
      component: resolve => require(['./routers/multi-cascader.vue'], resolve)
    },
    {
      path: '/prefix-container',
      component: resolve => require(['./routers/prefix-container.vue'], resolve)
    },
    {
      path: '/single-header',
      component: resolve => require(['./routers/single-header.vue'], resolve)
    },
    {
      path: '/account-list',
      component: resolve => require(['./routers/account-list'], resolve)
    },
    {
      path: '/page-header',
      component: resolve => require(['./routers/page-header.vue'], resolve)
    },
    {
      path: '/multi-radio-button',
      component: resolve => require(['./routers/multi-radio-button'], resolve)
    },
    {
      path: '/breadcrumb',
      component: resolve => require(['./routers/breadcrumb'], resolve)
    },
    {
      path: '/page-header-module',
      component: resolve => require(['./routers/page-header-module'], resolve)
    },
    {
      path: '/radio-group',
      component: resolve => require(['./routers/radio-group'], resolve)
    },
    {
      path: '/modals',
      component: resolve => require(['./routers/modals'], resolve)
    },
    {
      path: '/edit-row-bid',
      component: resolve => require(['./routers/edit-row-bid'], resolve)
    },
    {
      path: '/table-columns',
      component: resolve => require(['./routers/table-columns'], resolve)
    },
    {
      path: '/reverse-button',
      component: resolve => require(['./routers/reverse-button'], resolve)
    },
    {
      path: '/layout-module-config',
      component: resolve => require(['./routers/layout-module-config'], resolve)
    },
    {
      path: '/draggable-card',
      component: resolve => require(['./routers/draggable-card'], resolve)
    },
    {
      path: '/word-limit',
      component: resolve => require(['./routers/word-limit'], resolve)
    },
    {
      path: '/batch-upload-xls',
      component: resolve => require(['./routers/batch-upload-xls'], resolve)
    },
    {
      path: '/ellipsis',
      component: resolve => require(['./routers/ellipsis'], resolve)
    },
    {
      path: '/table-multi-inputs',
      component: resolve => require(['./routers/table-multi-inputs'], resolve)
    },
    {
      path: '/text-item-show',
      component: resolve => require(['./routers/text-item-show'], resolve)
    },
    {
      path: '/text-emoj-input',
      component: resolve => require(['./routers/text-emoj-input'], resolve)
    },
    {
      path: '/common-table',
      component: resolve => require(['./routers/common-table/index'], resolve)
    },
    {
      path: '/text-input-list',
      component: resolve => require(['./routers/text-input-list'], resolve)
    },
    {
      path: '/wildcard',
      component: resolve => require(['./routers/wildcard'], resolve)
    },
    {
      path: '/util-class',
      component: resolve => require(['./routers/util-class'], resolve)
    },
    {
      path: '/account-select',
      component: resolve => require(['./routers/account-select'], resolve)
    },
    {
      path: '/cascader-transfer',
      component: resolve => require(['./routers/cascader-transfer'], resolve)
    },
    {
      path: '/exception',
      component: resolve => require(['./routers/exception'], resolve)
    },
    {
      path: '/product-select',
      component: resolve => require(['./routers/product-select'], resolve)
    },
    {
      path: '/submission-rule',
      component: resolve => require(['./routers/submission-rule'], resolve)
    },
    {
      path: '/custom-button',
      component: resolve => require(['./routers/custom-button'], resolve)
    },
    {
      path: '/batch-modify-bids',
      component: resolve => require(['./routers/batch-modify-bids'], resolve)
    },
    {
      path: '/digital-details-tooltip',
      component: resolve => require(['./routers/digital-details-tooltip'], resolve)
    },
    {
      path: '/page',
      component: resolve => require(['./routers/page'], resolve)
    },
    {
      path: '/schedule',
      component: resolve => require(['./routers/schedule'], resolve)
    },
    {
      path: '/account-group-list',
      component: resolve => require(['./routers/account-group-list'], resolve)
    },
    {
      path: '/dropdown-search',
      component: resolve => require(['./routers/dropdown-search'], resolve)
    },
    {
      path: '/sort',
      component: resolve => require(['./routers/sort'], resolve)
    },
    {
      path: '/image-preview',
      component: resolve => require(['./routers/image-preview'], resolve)
    },
    {
      path: '/dropdown-panel',
      component: resolve => require(['./routers/dropdown-panel'], resolve)
    },
    {
      path: '/image',
      component: resolve => require(['./routers/image'], resolve)
    },
    {
      path: '/image-group',
      component: resolve => require(['./routers/image-group'], resolve)
    },
    {
      path: '/date-picker',
      component: resolve => require(['./routers/date-picker'], resolve)
    },
    {
      path: '/indicator',
      component: resolve => require(['./routers/indicator'], resolve)
    },
    {
      path: '/empty',
      component: resolve => require(['./routers/empty'], resolve)
    },
    {
      path: '/echo-container',
      component: resolve => require(['./routers/echo-container'], resolve)
    },
    {
      path: '/filter-list',
      component: resolve => require(['./routers/filter-list'], resolve)
    },
    {
      path: '/filter-list-select',
      component: resolve => require(['./routers/filter-list-select'], resolve)
    },
    {
      path: '/filter-cascader',
      component: resolve => require(['./routers/filter-cascader'], resolve)
    },
    {
      path: '/form-date-picker',
      component: resolve => require(['./routers/form-date-picker'], resolve)
    },
    {
      path: '/form-input',
      component: resolve => require(['./routers/form-input'], resolve)
    },
    {
      path: '/form-indicator',
      component: resolve => require(['./routers/form-indicator'], resolve)
    },
    {
      path: '/form-select-indicator',
      component: resolve => require(['./routers/form-select-indicator'], resolve)
    },
    {
      path: '/filter-list-cascader',
      component: resolve => require(['./routers/filter-list-cascader'], resolve)
    }
  ]
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
