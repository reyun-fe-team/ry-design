<template>
  <div :class="prefixCls">
    <Input v-model="currentQuery" size="small" :icon="icon" :placeholder="placeholder" @on-click="handleClick"></Input>
  </div>
</template>
<script>
export default {
  name: 'Search',
  props: {
    prefixCls: String,
    placeholder: String,
    query: String
  },
  data() {
    return {
      currentQuery: this.query
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
  computed: {
    icon() {
      return this.query === '' ? 'ios-search' : 'ios-close-circle'
    }
  },
  methods: {
    handleClick() {
      if (this.currentQuery === '') return
      this.currentQuery = ''
      this.$emit('on-query-clear')
    }
  }
}
</script>
