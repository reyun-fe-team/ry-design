<template>
  <div
    :class="prefixCls"
    @click="toggleSelectAll(!checkedAll)">
    <Checkbox
      style="margin: 0 0 0 10px"
      :value="checkedAll"
      :indeterminate="checkedAllIndeterminate"
      @click="toggleSelectAll"></Checkbox>
    <div :class="prefixCls + '-contain'">全选</div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-select-all'

export default {
  name: prefixCls,
  props: {
    checkedAll: {
      type: Boolean,
      default: false
    },
    checkedAllIndeterminate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    toggleSelectAll(status) {
      this.$emit('on-checked-all', status)
    }
  }
}
</script>
