<template>
  <div>
    <h2 style="margin: 24px 0">rd-select-filter-area-template-list</h2>
    <rd-select-filter-area-template-list
      :data="data"
      @on-all-filter="templateAllFilter"
      @on-change="templateChange"
      @on-update="templateUpdate"
      @on-delete="templateDelete"></rd-select-filter-area-template-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { label: '1111111', value: 11111111 },
        { label: '2222222', value: 11111112 },
        { label: '3333333', value: 11111113 },
        { label: '1111114', value: 11111114 },
        { label: '1111115', value: 11111115 },
        { label: '1111111', value: 11111116 },
        { label: '2222222', value: 11111117 },
        { label: '3333333', value: 11111118 },
        { label: '1111114', value: 11111119 },
        { label: '1111115', value: 11111110 }
      ]
    }
  },
  methods: {
    // 没有模版的场景
    templateAllFilter() {},
    // 有模版触发对应模版的方法
    templateChange(val) {},
    // 更新模版
    templateUpdate(val) {},
    // 删除模版
    templateDelete(val) {}
  }
}
</script>
