<template>
  <rd-page-header title="我是标题-我是标题"
                  subTitle="我是子标题-我是子标题"
                  :avatar="avatar"
                  backIcon
                  :breadcrumb="breadcrumbItems"
                  @back="back">
    <template>
      <div style="row-gap: 0px;">
        <div style="flex: 1 1 0%;">
          <p> 第一段文本，第一段文本，第一段文本，第一段文本，第一段文本，第一段文本</p>
          <p> 第二段文本，第二段文本，第二段文本，第二段文本，第二段文本，第二段文本，第二段文本，第二段文本</p>
        </div>
      </div>
    </template>
    <template #tags>
      <Icon type="ios-albums" />
      <Icon type="md-albums" />
      <Icon type="ios-alert-outline" />
    </template>
    <template #extra>
      <Button type="info">Info</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>
    </template>
    <template #footer>
      <Tabs value="name1">
        <TabPane label="标签一"
                 name="name1">标签一的内容</TabPane>
        <TabPane label="标签二"
                 name="name2">标签二的内容</TabPane>
        <TabPane label="标签三"
                 name="name3">标签三的内容</TabPane>
      </Tabs>
    </template>
  </rd-page-header>
</template>
<script>
export default {
  data() {
    return {
      breadcrumbItems: [
        {
          to: '/a',
          name: '一级页面'
        },
        {
          to: '/b',
          name: '二级页面'
        },
        {
          name: '三级页面'
        }
      ],
      avatar:
        'https://fc1tn.baidu.com/it/u=4039863068,2012609708&fm=202&mola=new&crop=v1'
    };
  },
  methods: {
    back(e) {
      alert('您返回了！');
    }
  }
};
</script>
