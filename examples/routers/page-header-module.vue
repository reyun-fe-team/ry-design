<template>
  <div style="margin: 10px;">
    <br>
    <p>单标题</p>
    <rd-page-header-module singleTitle="人效分析"
                           subTitle="此报表仅为AdsDesk创建数据统计">
      <template #extra>
        <Button type="info">Info</Button>
      </template>
    </rd-page-header-module>
    <br>
    <p>tab组件</p>
    <rd-page-header-module isTabs
                           :tabsList="tabsList">
      <template #extra>
        <p>tab组件，可使用关联路由的形式</p>
      </template>
    </rd-page-header-module>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsList: [
        {
          label: '模块头部组件',
          name: 'page-header-module'
        },
        {
          label: '页头组件',
          name: 'page-header'
        },
        {
          label: '面包屑组件',
          name: 'breadcrumb'
        }
      ]
    };
  },
  methods: {
    back(e) {
      alert('您返回了！');
    }
  }
};
</script>
