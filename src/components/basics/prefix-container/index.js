import PrefixContainer from './prefix-container.vue';

PrefixContainer.install = function (Vue) {
  Vue.component(PrefixContainer.name, PrefixContainer);
};

export default PrefixContainer;
