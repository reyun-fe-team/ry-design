import ryTransfer from "./transfer.vue";

ryTransfer.install = function (Vue) {
    Vue.component(ryTransfer.name, ryTransfer);
};

export default ryTransfer;