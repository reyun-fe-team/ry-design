<template>
  <rd-page-header-module isTabs
                         isRoute
                         :tabsList="tabsList">
    <template #extra>
      <Button type="info">Info</Button>
    </template>
  </rd-page-header-module>
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
