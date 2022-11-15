<template>
  <div>
    <p>列表展示</p>
    <rd-digital-details-tooltip
      type="list"
      :data="listData"
      :columns="columns"></rd-digital-details-tooltip>

    <p>单项展示</p>
    <!-- <rd-digital-details-tooltip></rd-digital-details-tooltip> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { key: 'index', title: '序号' },
        { key: 'title', title: '文本' }
      ],
      listData: [
        { index: 1, title: '111' },
        { index: 2, title: '2222' },
        { index: 3, title: '333' }
      ]
    }
  },
  methods: {
    beforeRemove() {
      return true
      // return new Promise((resolve, reject) => {
      //   resolve(false)
      //   reject(new Error('俄'))
      // })
    },
    onChange(data) {
      this.nowData = data
    }
  }
}
</script>

<style lang="less" scoped>
.show-data {
  display: flex;
  .before,
  .now {
    width: 300px;
    height: 200px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .now {
    margin-left: 30px;
  }
}
</style>
