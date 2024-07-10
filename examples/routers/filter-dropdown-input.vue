<template>
  <div>
    value:{{ value }}
    <br />
    matchingMethod:{{ matchingMethod }}
    <rd-filter-dropdown-input
      v-model="value"
      @on-change="change"></rd-filter-dropdown-input>
    <div @click="reset">重置</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      matchingMethod: ''
    }
  },
  methods: {
    change(e) {
      console.log('e: ', e)
      this.matchingMethod = e.matchingMethod
    },
    reset() {
      this.value = ''
    }
  }
}
</script>