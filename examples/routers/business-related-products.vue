<template>
  <div>
    <rd-related-products
      v-model="value"
      :accounts="dataList"></rd-related-products>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      dataList: [
        {
          advertiserId: '1700994591908871',
          value: '24686960',
          label: '测试专用-商品1(1700994591908871)',
          num: 1
        }
      ]
    }
  }
}
</script>
