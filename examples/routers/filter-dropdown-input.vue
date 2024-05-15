<template>
  <div>
    <rd-filter-dropdown-input
      v-model="value"
      @on-change="change"></rd-filter-dropdown-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '222'
    }
  },
  methods: {
    change(e) {
      console.log('e: ', e)
    }
  }
}
</script>