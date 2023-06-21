<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-select-indicator</h2>
    <formSelectIndicator
      v-model="currentData"
      :group-list="groupList"
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
    return {}
  },
  computed: {
    currentData() {
      return {
        selectRadio: '',
        indicatorData: {
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
    groupList() {
      return [
        {
          label: '花费',
          value: 'charge',
          dataType: 'TYPE_NUM'
        },
        {
          label: '封面曝光数',
          value: 'shows',
          dataType: 'TYPE_NUM'
        },
        {
          label: '封面点击数',
          value: 'photoClick',
          dataType: 'TYPE_NUM'
        },
        {
          label: '素材曝光数',
          value: 'aclick',
          dataType: 'TYPE_NUM'
        },
        {
          label: '行为数',
          value: 'bclick',
          dataType: 'TYPE_NUM'
        },
        {
          label: '点击率',
          value: 'ctr',
          dataType: 'TYPE_PERCENTAGE'
        },
        {
          label: '转化率',
          value: 'convertRate',
          dataType: 'TYPE_PERCENTAGE'
        }
      ]
    }
  }
}
</script>
