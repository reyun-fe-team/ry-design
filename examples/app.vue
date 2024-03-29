<template>
  <div class="app">
    <div class="coms">
      <h2>点击按钮查看组件示例</h2>
      <div class="menu">
        <Button
          v-for="(item, i) in comsList"
          :key="i"
          class="com-btn"
          :class="{ active: activeRoute === item.path }"
          @click="$router.push(item.path)">
          {{ item.name }}
        </Button>
      </div>
    </div>
    <div class="view">
      <h2 class="result-desc">示例结果如下：</h2>
      <div class="router-view">
        <router-view></router-view>
      </div>
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
h2 {
  padding: 5px 0;
}

.coms {
  margin: 16px;
  .com-btn {
    margin-top: 16px;
    margin-right: 16px;
  }
}

.menu {
  max-height: 200px;
  overflow: auto;
  // 兼容Firefox
  scrollbar-width: none;

  // 兼容Chrome
  &::-webkit-scrollbar {
    display: none;
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
