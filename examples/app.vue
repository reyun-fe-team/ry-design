<template>
  <div class="app">
    <div class="coms">
      <p>点击按钮查看组件示例</p>
      <Button
        v-for="(item, i) in comsList"
        :key="i"
        class="com-btn"
        :class="{ active: activeRoute === item.path }"
        @click="$router.push(item.path)">
        {{ item.name }}
      </Button>
    </div>
    <div class="view">
      <p class="result-desc">示例结果如下：</p>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comsList: [],
      activeRoute: ''
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.activeRoute = this.$router.currentRoute.path
      }
    }
  },
  created() {
    const { routes } = this.$router.options
    this.comsList = routes.map(r => {
      const path = r.path
      const name = path.slice(1)
      return { name, path }
    })
  }
}
</script>
<style lang="less" scoped>
.coms {
  margin: 16px;
  .com-btn {
    margin-top: 16px;
    margin-right: 16px;
  }
}
.view {
  margin: 16px;
  border-top: 1px dashed #ddd;
  .result-desc {
    margin: 16px 0;
  }
}
</style>
