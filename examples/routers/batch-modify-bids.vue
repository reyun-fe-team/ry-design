<template>
  <div>
    <Button @click="batchAction">批量操作</Button>
    <rd-batch-modify-bids
      :show="show"
      width="500"
      title="修改出价"
      @on-ok="ok"
      @on-cancel="cancel"></rd-batch-modify-bids>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    batchAction() {
      this.show = true
    },
    ok(data) {
      console.log('data: ', data)
      this.cancel()
    },
    cancel() {
      this.show = false
    }
  }
}
</script>