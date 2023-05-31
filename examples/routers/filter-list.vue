<template>
  <main>
    <h2 style="margin: 24px 0">rd-filter-list</h2>

    <rd-filter-list
      v-model="data"
      label="广告账户"
      trigger="custom"></rd-filter-list>

    <hr style="margin: 24px 0" />
    <h2 style="margin: 24px 0">filter-list-input</h2>

    没有标题label的场景
    <filter-list-input
      v-model="inputData1"
      placeholder="请选择请选择请选择请选择请选择请选择"
      style="width: 200px"></filter-list-input>
    选择一个场景
    <filter-list-input
      v-model="inputData2"
      label="标题"
      style="width: 200px"></filter-list-input>
    多选场景
    <filter-list-input
      v-model="inputData3"
      label="标题"
      style="width: 200px"></filter-list-input>
  </main>
</template>

<script>
import filterListInput from '@src/components/business/filter-list/filter-list-input.vue'
export default {
  components: { filterListInput },
  props: {},
  data() {
    return {
      inputData1: [],
      inputData2: ['撒打算大撒打算大撒打算大空间哈上课的哈色短款加厚'],
      inputData3: [1, 2],
      data: []
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>