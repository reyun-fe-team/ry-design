import "babel-polyfill";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
import ryDesign from '../src/index';
import "./styles/index.less";
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ryDesign);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
  esModule: false,
  mode: "history",
  routes: [{
    path: "/input",
    component: resolve => require(["./routers/input.vue"], resolve)
  }, {
    path: "/transfer",
    component: resolve => require(["./routers/transfer.vue"], resolve)
  }]
});

router.afterEach(_ => {
  window.scrollTo(0, 0);
});

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");