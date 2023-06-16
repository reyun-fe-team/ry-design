<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-select-indicator</h2>
    <formSelectIndicator
      v-model="indicatorData"
      label="点击数："
      unit="元"
      :clearable="true"
      :width="240"
      :styles="{ width: '240px' }" />
  </main>
</template>

<script>
import formSelectIndicator from '@src/components/business/form-select-indicator/form-select-indicator'
export default {
  components: {
    formSelectIndicator
  },
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
  }
}
</script>
