import "babel-polyfill";
import Vue from "vue";
import App from "./app.vue";
import ryDesign from '../src/index';
import "./styles/index.less";
import router from "./router.js"
Vue.use(ryDesign);

// 开启debug模式
Vue.config.debug = true;

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");