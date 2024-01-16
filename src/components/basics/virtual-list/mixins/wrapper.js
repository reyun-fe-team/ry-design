export default {
  created() {
    this.shapeKey = this.horizontal ? 'offsetWidth' : 'offsetHeight'
  },
  mounted() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.dispatchSizeChange()
      })
      this.resizeObserver.observe(this.$el)
    }
  },
  // 由于componet将被重用，因此disptach在更新时
  updated() {
    this.dispatchSizeChange()
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  },
  methods: {
    getCurrentSize() {
      return this.$el ? this.$el[this.shapeKey] : 0
    },
    // 用unqiue键识别父级当前大小
    dispatchSizeChange() {
      this.$parent.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial)
    }
  }
}
