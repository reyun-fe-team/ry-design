<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-select-indicator</h2>
    <rd-form-select-indicator
      v-model="dataFiltering"
      :has-switch="false"
      :data-list="groupList"
      :show-index-is-union="true"
      :clearable="true"
      :width="240"
      :min-line="0"
      :filterable="false"
      :styles="{ width: '240px' }"
      @on-change="handlerChange" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      dataFiltering: {
        data: [
          {
            label: '花费',
            type: 'charge',
            symbol: '>',
            symbolLabel: '大于',
            ruleType: '',
            startValue: 0,
            endValue: 0,
            value: 20,
            dataType: 'TYPE_NUM'
          },
          {
            type: 'shows',
            symbol: '<=',
            symbolLabel: '小于等于',
            ruleType: '封面曝光数',
            startValue: 0,
            endValue: 0,
            value: 88,
            dataType: 'TYPE_NUM'
          }
        ],
        selectData: ['charge', 'shows']
      }
    }
  },
  computed: {
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
  },
  methods: {
    handlerChange(currentValue, formData) {
      console.log('currentValue, formData', currentValue, formData)
    }
  }
}
</script>
