import AccountList from './account-list.vue';

AccountList.install = function (Vue) {
  Vue.component(AccountList.name, AccountList);
};

export default AccountList;
