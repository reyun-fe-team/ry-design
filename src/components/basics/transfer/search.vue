<template>
  <div :class="prefixCls">
    <Input
      v-model="currentQuery"
      size="small"
      :icon="icon"
      :placeholder="placeholder"
      @on-click="handleClick"></Input>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
let prefixCls = prefix + 'transfer-list-search'
export default {
  name: prefixCls,
  props: {
    placeholder: String,
    query: String
  },
  data() {
    return {
      prefixCls: prefixCls,
      currentQuery: this.query
    }
  },
  computed: {
    icon() {
      return this.query === '' ? 'ios-search' : 'ios-close-circle'
    }
  },
  watch: {
    query(val) {
      this.currentQuery = val
    },
    currentQuery(val) {
      this.$emit('on-query-change', val)
    }
  },
  methods: {
    handleClick() {
      if (this.currentQuery === '') {
        return
      }
      this.currentQuery = ''
      this.$emit('on-query-clear')
    }
  }
}
</script>
