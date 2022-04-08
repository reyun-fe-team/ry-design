import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import ryDesign from '../src/index';
// import "./styles/index.less";

Vue.use(VueRouter);
Vue.use(ryDesign);

// 开启debug模式
Vue.config.debug = true;

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
<<<<<<< HEAD
      path: '/page-header',
      component: resolve => require(['./routers/page-header.vue'], resolve)
    },
=======
      path: '/multi-radio-button',
      component: resolve => require(['./routers/multi-radio-button'], resolve)
    }
>>>>>>> d277494be064aa14582861497623ef4d657ae9aa
  ]
});

router.afterEach(_ => {
  window.scrollTo(0, 0);
});

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
