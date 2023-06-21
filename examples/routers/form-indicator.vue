<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-indicator</h2>
    <rd-form-indicator
      v-model="indicatorData"
      :clearable="true"
      :width="240"
      :styles="{ width: '240px' }" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      indicatorData: {
        label: '深度转化成本:',
        type: 'TYPE_NUM',
        symbol: '',
        symbolLabel: '',
        ruleType: '',
        startValue: 0,
        endValue: 0,
        value: 0,
        dataType: 'TYPE_NUM'
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
