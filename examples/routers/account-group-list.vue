<template>
  <div class="dis-flex">
    <rd-account-group-list
      id="adsMediaAccountId"
      :data-list="dataList"
      :icon-size="18"
      item-id="id"
      item-name="name"
      width="800px"
      @on-change="getActiveAccount">
      我是右边的插槽盒子
    </rd-account-group-list>
    <div>
      当前选中的账户--
      <strong>{{ parent }}</strong>
      &nbsp;&nbsp;&nbsp;广告组--
      <strong>{{ active }}</strong>
    </div>
    <pre>{{ dataList }}}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          accountName: '北京悠米悠米广告有限公司',
          adsMediaAccountId: 'bj12345',
          children: [
            {
              num: 1,
              unitName: '广告组测试用名称1',
              unitId: 'ggz111'
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
            },
            {
              num: 1,
              unitName: '多账号统一配置定向包{账户别名}提升应用安装070011:57:1602_N1',
              unitId: 'ggz322'
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
      ],
      active: '',
      parent: ''
    }
  },
  methods: {
    getActiveAccount(child, parent) {
      this.active = child
      this.parent = parent
    }
  }
}
</script>
<style lang="less" scoped>
.dis-flex {
  display: flex;
  justify-content: space-around;
}
</style>
