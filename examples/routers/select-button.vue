<template>
  <div class="display-flex">
    <div class="item">
      <span>{{ title }}</span>
      <rd-select-button
        :select-text="text"
        :prefix-edit-text="prefixEditText"
        :suffix-edit-text="suffixEditText"
        :status="status"
        @on-click="handleClick"></rd-select-button>
    </div>
    <div
      class="item"
      style="margin-left: 16px">
      <span>编辑冻结状态</span>
      <rd-select-button
        :select-text="text"
        :prefix-edit-text="prefixEditText"
        :suffix-edit-text="suffixEditText"
        :disabled="true"
        status="edit"></rd-select-button>
    </div>
    <div
      class="item"
      style="margin-left: 16px">
      <span>加载状态</span>
      <rd-select-button
        :select-text="text"
        :prefix-edit-text="prefixEditText"
        :suffix-edit-text="suffixEditText"
        status="loading"
        @on-click="handleClick"></rd-select-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectButton',
  data() {
    return {
      title: '选择状态',
      text: '请选择应用',
      prefixEditText: '已选择应用10个',
      suffixEditText: '编辑',
      status: 'select'
    }
  },
  methods: {
    handleClick() {
      this.status = this.status === 'select' ? 'edit' : 'select'
      if (this.status === 'select') {
        this.title = '选择状态'
      } else if (this.status === 'edit') {
        this.title = '编辑状态'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  span {
    padding: 0 8px;
  }
}
</style>