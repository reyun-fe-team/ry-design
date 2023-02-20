<template>
  <div>
    <Button @click="batchAction">批量操作</Button>
    <rd-batch-modify-bids
      :show="show"
      width="640"
      title="批量修改出价"
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
    ok() {
      this.cancel()
    },
    cancel() {
      this.show = false
    }
  }
}
</script>