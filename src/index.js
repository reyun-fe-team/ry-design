import Vue from 'vue';
import Transfer from "./components/transfer"
import MultiCascader from "./components/multi-cascader/index.js";
import PrefixContainer from "./components/prefix-container/index.js";
import ViewUI from 'view-design';
Vue.use(ViewUI);
console.log('已经进入ryDesign')
const components = [Transfer, MultiCascader, PrefixContainer];
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: process.env.VERSION, // eslint-disable-line no-undef
  install,
  Transfer,
  MultiCascader,
  PrefixContainer
};