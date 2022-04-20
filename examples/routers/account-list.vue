<template>
  <main>
    <rd-account-list
      id="adsMediaAccountId"
      :data-list="dataList"
      :icon-size="18"
      item-id="id"
      item-name="name"
      style="display: flex; justify-content: center; margin-top: 130px"
      width="800px"
      @on-change="getActiveAccount">
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
          num: 1
        },
        {
          name: 'test2',
          adsMediaAccountId: '123',
          id: 2,
          iconIview: 'ios-checkmark-circle-outline'
        },
        {
          name: 'test3',
          adsMediaAccountId: '123',
          id: 3,
          num: '不限'
        }
      ]
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    getActiveAccount(val) {
      console.log(val)
    }
  }
}
</script>
