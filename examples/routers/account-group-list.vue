<template>
  <div>
    <rd-account-group-list
      id="adsMediaAccountId"
      :data-list="dataList"
      :icon-size="18"
      item-id="id"
      item-name="name"
      style="display: flex; justify-content: center; margin-top: 130px"
      width="800px"
      @on-change="getActiveAccount">
      我是右边的插槽盒子
    </rd-account-group-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          accountName: '账户1',
          adsMediaAccountId: '1234',
          children: [
            {
              num: 1,
              unitName: '广告组1',
              unitId: 'ggz123'
            }
          ]
        },
        {
          accountName: 'User_1576228589840(4732053)',
          adsMediaAccountId: '5566',
          children: [
            {
              num: 1,
              unitName: '多账号统一配置定向包{账户别名}提升应用安装071111:57:1602_N1',
              unitId: 'ggz321'
            }
          ]
        },
        {
          accountName: '账户3',
          adsMediaAccountId: '7788',
          children: [
            {
              num: 1,
              unitName: '广告组3',
              unitId: 'ggz099'
            }
          ]
        }
      ]
    }
  },
  computed: {},
  mounted() {},
  methods: {
    getActiveAccount(val) {
      console.error(val)
    }
  }
}
</script>
