<template>
  <div>
    <rd-account-list
      id="adsMediaAccountId"
      :data-list="dataList"
      :icon-size="18"
      item-id="id"
      item-name="name"
      style="display: flex; justify-content: center; margin-top: 130px"
      width="800px"
      height="100%"
      max-height="500px"
      :before-check="beforeCheck"
      @on-change="getActiveAccount">
      <div style="height: 900px; background-color: rebeccapurple">我是右边的插槽盒子</div>
    </rd-account-list>
  </div>
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
  mounted() {},
  methods: {
    beforeCheck() {
      if (true) {
        // return Promise.resolve()
        this.$Message.error('11111')
      }
    },
    getActiveAccount(val) {
      console.log(val)
    }
  }
}
</script>
