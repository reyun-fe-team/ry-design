import Vue from 'vue'
import VueRouter from "vue-router";

const router = new VueRouter({
  esModule: false,
  mode: "history",
  routes: [{
    path: "/input",
    component: resolve => require(["./routers/input"], resolve)
  }, {
    path: "/button",
    component: resolve => require(["./routers/button"], resolve)
  }]
});

router.afterEach(_ => {
  window.scrollTo(0, 0);
});

Vue.use(VueRouter);

export default router