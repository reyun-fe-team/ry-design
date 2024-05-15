<template>
  <div>
    {{ value }}
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
      value: ''
    }
  },
  methods: {
    change(e) {
      console.log('e: ', e)
    },
    reset() {
      this.value = ''
    }
  }
}
</script>