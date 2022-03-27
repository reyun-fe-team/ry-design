<template>
  <main>
    <rd-account-list
      id="adsMediaAccountId"
      name="name"
      name-value="id"
      style="display: flex; justify-content: center; margin-top: 130px"
      :data-list="dataList"
      icon-name="iconType"
      :icon-size="18"
      width="800px"
      @on-change="getActiveAccount"
    >
      我是右边的插槽盒子
    </rd-account-list>
  </main>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          name: 'test1',
          adsMediaAccountId: '123',
          id: 1,
          num: 1,
          icon: 'icon-success',
          iconType: 'ios-checkmark-circle-outline'
        },
        {
          name: 'test2',
          adsMediaAccountId: '123',
          id: 2,
          num: 2
        },
        {
          name: 'test3',
          adsMediaAccountId: '123',
          id: 3,
          num: 3
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {
    getActiveAccount(val) {
      console.log(val);
    }
  }
};
</script>
