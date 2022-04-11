<template>
  <main style="padding: 20px">
    <rd-breadcrumb :data="breadcrumbItems">
    </rd-breadcrumb>
  </main>
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
      ]
    };
  }
};
</script>
