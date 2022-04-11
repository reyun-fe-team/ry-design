<template>
  <rd-module-header moduleName="我是标题-我是标题"
                    isTabs
                    :tabsList="tabsList">
    <template #extra>
      <Button type="info">Info</Button>
    </template>
  </rd-module-header>
</template>
<script>
export default {
  data() {
    return {
      tabsList: [
        {
          label: '一级页面',
          name: 'frist'
        },
        {
          label: '2级页面',
          name: 'frist2'
        },
        {
          label: '3级页面',
          name: 'frist3'
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
