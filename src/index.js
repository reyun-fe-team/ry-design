import Vue from 'vue';
import Transfer from "./components/transfer"
import MultiCascader from "./components/multi-cascader/index.js";
import PrefixContainer from "./components/prefix-container/index.js";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import "./style/index.less";

Vue.use(ViewUI);
console.log('进入ryDesign')

const components = [Transfer,PrefixContainer,MultiCascader];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: process.env.VERSION,
  install,
  Transfer,
  MultiCascader,
  PrefixContainer
};