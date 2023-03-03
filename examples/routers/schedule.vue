<template>
  <div>
    <h1>简单例子</h1>
    <div @click="changeColspan">切换 {{ colspan }}</div>
    {{ sheetStates }}
    <br />
    <rd-schedule
      ref="schedule"
      v-model="sheetStates" 
      @on-white-block="onWhite"></rd-schedule>
    <br />
    <rd-schedule
      ref="schedule"
      v-model="sheetStates2"
      :colspan="2"></rd-schedule>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colspan: 1,
      sheetStates:
        '111110111110111110111110000010100010000010000010000010100010000010000010111110100010111110111110100000100010100000100000100000100010100000100000111110111110111110111110',
      sheetStates2:
        '111110111110111110111110000010100010000010000010000010100010000010000010111110100010111110111110100000100010100000100000100000100010100000100000111110111110111110111110'
    }
  },
  computed: {},
  methods: {
    onWhite(v) {
      console.log(v)
    },
    changeColspan() {
      this.colspan = this.colspan === 1 ? 2 : 1
      this.$nextTick(() => {
        this.$refs['schedule'].init()
      })
    }
  }
}
</script>

