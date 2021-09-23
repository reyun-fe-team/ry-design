import Vue from 'vue';
import Input from "./components/input";
import Transfer from "./components/ry-transfer";
import ViewUI from 'view-design';
Vue.use(ViewUI);
console.log('已经进入ryDesign')
const components = [Input, Transfer];
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
  Input,
  Transfer
};