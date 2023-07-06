<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-indicator</h2>
    <div
      v-for="(_, index) of arr"
      :key="index">
      <rd-form-indicator
        v-model="arr[index]"
        :clearable="true"
        :width="240"
        :styles="{ width: '240px' }" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        {
          label: '转化数',
          type: 'convertCnt',
          symbol: '!=',
          symbolLabel: '不等于',
          startValue: 0,
          endValue: 0,
          value: 12,
          dataType: 'TYPE_NUM',
          selectName: '不等于12.00'
        },
        {
          label: '点击数',
          type: 'click',
          symbol: '<=',
          symbolLabel: '小于等于',
          startValue: 0,
          endValue: 0,
          value: 14,
          dataType: 'TYPE_NUM',
          selectName: '小于等于14.00'
        },
        {
          label: '安卓下载开始数',
          type: 'clickStartCnt',
          symbol: '<=',
          symbolLabel: '小于等于',
          startValue: 0,
          endValue: 0,
          value: 15,
          dataType: 'TYPE_NUM',
          selectName: '小于等于15.00'
        },
        {
          label: '点击率',
          type: 'ctr',
          symbol: 'BETWEEN',
          symbolLabel: '介于',
          ruleType: 'number-input-between',
          startValue: 13,
          endValue: 33,
          value: 0,
          dataType: 'TYPE_PERCENTAGE',
          selectName: '介于13.00-33.00'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
