import PageHeader from './page-header.vue';

PageHeader.install = function (Vue) {
  Vue.component(PageHeader.name, PageHeader);
};

export default PageHeader;
