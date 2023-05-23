<template>
  <div>
    <rd-radio-group
      v-model="value"
      :default-list="list"
      :is-disabled-item-fun="isDisabledItemFun"
      is-dynamic-enum
      @on-change="onChange"></rd-radio-group>
  </div>
</template>

<script>
export default {
  name: 'RadioGroup',
  data() {
    return {
      value: '111',
      list: [
        {
          label: '按',
          value: 'PRICING_OCPM',
          disabledTooltip: '123123123',
          tooltip: ['11111111111111', '22222222'],
          disabled: true
        },
        {
          label: '按点击付费（oCPC）',
          value: 'PRICING_OCPC'
        },
        {
          label: '按点击付费（CPC）',
          value: 'PRICING_CPC',
          tooltip: '11111111111111'
        },
        {
          label: '按展示付费（CPM）',
          value: 'PRICING_CPM'
        },
        {
          label: '按转化付费（CPA）',
          value: 'PRICING_CPA'
        }
      ]
    }
  },
  methods: {
    isDisabledItemFun(e) {
      return e._value === 'PRICING_CPA' || e.value === 'PRICING_CPA'
    },
    onChange(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
