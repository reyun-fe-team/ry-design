import PageHeaderModule from './page-header-module.vue';

PageHeaderModule.install = function (Vue) {
  Vue.component(PageHeaderModule.name, PageHeaderModule);
};

export default PageHeaderModule;
