import Input from "./components/input";

const components = [Input];
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
  Input
};