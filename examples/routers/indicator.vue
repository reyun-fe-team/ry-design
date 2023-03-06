<template>
  <div>
    <rd-indicator
      :unit="unit"
      :min="10"
      :max="1000" />
    <Button @click="onClickDeep">弹窗内展示</Button>
    <div v-if="deepVisible">
      <rd-modals
        v-model="deepVisible"
        :width="600"
        style="height: 300px"
        @on-cancel="onClickDeepCancel"
        @on-ok="onClickDeepCancel">
        <div slot="content">
          <rd-indicator
            :unit="unit"
            :min="10"
            :max="1000" />
        </div>
      </rd-modals>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deepVisible: false,
      unit: '%'
    }
  },
  methods: {
    onClickDeep() {
      this.deepVisible = true
    },
    onClickDeepCancel() {
      this.deepVisible = false
    }
  }
}
</script>
