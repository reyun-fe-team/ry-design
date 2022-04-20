<template>
  <main>
    <rd-radio-group
      v-model="value"
      :default-list="list"
      :is-disabled-item-fun="isDisabledItemFun"
      @on-change="onChange"></rd-radio-group>
  </main>
</template>

<script>
export default {
  name: 'RadioGroup',
  data() {
    return {
      value: '111',
      list: [
        {
          _label: '按展示付费(oCPM)',
          _value: 'PRICING_OCPM',
          _tooltip: '11111111111111',
          _disabled: true
        },
        {
          _label: '按点击付费（oCPC）',
          _value: 'PRICING_OCPC'
        },
        {
          _label: '按点击付费（CPC）',
          _value: 'PRICING_CPC',
          _tooltip: '11111111111111'
        },
        {
          _label: '按展示付费（CPM）',
          _value: 'PRICING_CPM'
        },
        {
          _label: '按转化付费（CPA）',
          _value: 'PRICING_CPA'
        }
      ]
    }
  },
  methods: {
    isDisabledItemFun(e) {
      return e._value === 'PRICING_CPA'
    },
    onChange(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
