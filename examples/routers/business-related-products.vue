<template>
  <div>
    <rd-related-products
      v-model="value"
      :on-search-product-library="onSearchProductLibrary"
      :accounts="accounts"></rd-related-products>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      accounts: [
        {
          advertiserId: '1700994591908871',
          value: '24686960',
          label: '测试专用-商品1(1700994591908871)'
        }
      ]
    }
  },
  methods: {
    onSearchProductLibrary(params) {
      console.log('params: ', params)
      return new Promise((resolve, reject) => {
        resolve({
          total: 2,
          list: [
            {
              label: '商品库 1',
              value: '1',
              tag: '游戏'
            },
            {
              label: '商品库 2',
              value: '2',
              tag: '游戏'
            }
          ]
        })
      })
    }
  }
}
</script>
