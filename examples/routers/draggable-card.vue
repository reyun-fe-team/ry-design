<template>
  <div class="draggable-card-class">
    <div class="show-data">
      <div class="before">
        <p>之前</p>
        {{ list }}
      </div>
      <div class="now">
        <p>现在</p>
        {{ nowData }}
      </div>
    </div>
    <br />
    <rd-draggable-card
      :data="list"
      :before-remove="beforeRemove"
      :clear-all-func="() => false"
      @on-change="onChange"></rd-draggable-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { key: '1', label: '列表1', disabled: false },
        { key: '2', label: '列表2', disabled: true },
        { key: '3', label: '列表3', disabled: false },
        { key: '4', label: '列表4' },
        { key: '5', label: '列表5' },
        { key: '6', label: '列表6' }
      ],
      nowData: []
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