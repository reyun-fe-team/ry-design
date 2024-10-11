<template>
  <div class="dis-flex">
    <rd-account-group-list
      id="id"
      :data="dataList"
      :icon-size="18"
      item-id="accountId"
      item-name="accountName"
      width="800px"
      @on-change="getActiveAccount">
      我是右边的插槽盒子
      <div>
        公司:
        <strong>{{ parent }}</strong>
        账户:
        <strong>{{ active }}</strong>
      </div>
    </rd-account-group-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          groupName: '北京悠米悠米广告有限公司',
          groupId: 'bj12345',
          children: [
            {
              num: 1,
              accountName: '广告组测试用名称1',
              accountId: 'ggz111'
            }
          ]
        },
        {
          groupName: 'User_1576228589840(4732053)',
          groupId: '5566',
          children: [
            {
              num: 1,
              accountName: '多账号统一配置定向包{账户别名}提升应用安装071111:57:1602_N1',
              accountId: 'ggz321'
            },
            {
              accountName: '多账号统一配置定向包{账户别名}提升应用安装070011:57:1602_N1',
              accountId: 'ggz322',
              iconCustom: 'icon-Success-Small'
            }
          ]
        },
        {
          groupName: '账户3',
          groupId: '7788',
          children: [
            {
              num: '不限',
              accountName: '广告组3',
              accountId: 'ggz099',
              id: 'ggz099'
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
<style
  lang="less"
  scoped></style>
