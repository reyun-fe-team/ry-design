import ModuleHeader from './module-header.vue';

ModuleHeader.install = function (Vue) {
  Vue.component(ModuleHeader.name, ModuleHeader);
};

export default ModuleHeader;
