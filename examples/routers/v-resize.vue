<template>
  <div>
    <Button @click="isAddVreizer = true">添加Vreizer监听器</Button>
    <Button @click="isAddVreizer = false">删除Vreizer监听器</Button>
    <Button @click="handleResetWidth">改变宽度</Button>
    <Button @click="handleResetHeight">改变高度</Button>
    <Button @click="handleResetWidthHeight">同时改变高度和宽度</Button>

    <div
      v-resize="isAddVreizer ? handleVreizer : null"
      style="margin-top: 10px; font-size: 20px; border: 2px solid #f00; color: #000"
      :style="{ width: contentWidth + 'px', height: contentHeight + 'px' }">
      <p>width:{{ contentWidth }}px</p>
      <p>height: {{ contentHeight }}px</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAddVreizer: false,
      contentWidth: 200,
      contentHeight: 200
    }
  },
  methods: {
    handleVreizer(data) {
      console.log('data: ', data)
      let obj = { width: data.width + 'px', height: data.height + 'px' }
      this.$Message.info(JSON.stringify(obj))
    },
    handleResetWidth() {
      let random_number = Math.floor(Math.random() * (500 - 200 + 1)) + 200
      this.contentWidth = random_number
    },
    handleResetHeight() {
      let random_number = Math.floor(Math.random() * (500 - 200 + 1)) + 200
      this.contentHeight = random_number
    },
    handleResetWidthHeight() {
      this.handleResetWidth()
      this.handleResetHeight()
    }
  }
}
</script>
