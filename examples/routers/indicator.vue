<template>
  <div>
    <rd-indicator
      :unit="unit"
      :indicator-rule="indicatorRule"
      :min="10"
      :max="1000" />
    <Button @click="onClickDeep">弹窗内展示</Button>
    <div v-if="deepVisible">
      <rd-modals
        v-model="deepVisible"
        title="数据筛选"
        :width="1100"
        @on-cancel="onClickDeepCancel"
        @on-ok="onClickDeepCancel">
        <div slot="content">
          <Form
            :label-width="60"
            inline
            @submit.native.prevent>
            <FormItem label="数据指标">
              <Select
                v-model="currentSelect"
                multiple
                filterable
                transfer
                :max-tag-count="1"
                style="width: 184px"
                @on-change="selectChange">
                <Option
                  v-for="item in dataList"
                  :key="item[valueKey]"
                  :value="item[valueKey] || ''">
                  {{ item[labelKey] }}
                </Option>
              </Select>
            </FormItem>
            <FormItem
              v-for="(option, index) in currentSelect"
              :key="option"
              :label="currentValue[index].label">
              <rd-indicator
                v-model="currentValue[index]"
                :unit="unit"
                :min="0"
                :indicator-rule="indicatorRule"></rd-indicator>
            </FormItem>
          </Form>
        </div>
      </rd-modals>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deepVisible: false,
      unit: '%',
      currentSelect: [],
      currentValue: [],
      dataList: [
        {
          key: 'cost',
          type: 'TYPE_AMOUNT',
          value: '总花费'
        },
        {
          key: 'show',
          type: 'TYPE_NUM',
          value: '展示数'
        },
        {
          key: 'cpm',
          type: 'TYPE_AMOUNT',
          value: '平均千次展现费用'
        },
        {
          key: 'click',
          type: 'TYPE_NUM',
          value: '点击数'
        },
        {
          key: 'cpc',
          type: 'TYPE_AMOUNT',
          value: '平均点击单价'
        },
        {
          key: 'clickRate',
          type: 'TYPE_PERCENTAGE',
          value: '点击率'
        },
        {
          key: 'convert',
          type: 'TYPE_NUM',
          value: '转化数'
        },
        {
          key: 'convertCost',
          type: 'TYPE_AMOUNT',
          value: '转化成本'
        },
        {
          key: 'clickConvertRate',
          type: 'TYPE_PERCENTAGE',
          value: '转化率'
        },
        {
          key: 'deepConvert',
          type: 'TYPE_NUM',
          value: '深度转化数'
        },
        {
          key: 'deepConvertCost',
          type: 'TYPE_AMOUNT',
          value: '深度转化成本'
        },
        {
          key: 'deepConvertRate',
          type: 'TYPE_PERCENTAGE',
          value: '深度转化数率'
        },
        {
          key: 'attributionConvert',
          type: 'TYPE_NUM',
          value: '转化数（计费时间）'
        },
        {
          key: 'attributionConvertCost',
          type: 'TYPE_AMOUNT',
          value: '转化成本（计费时间）'
        },
        {
          key: 'attributionDeepConvert',
          type: 'TYPE_NUM',
          value: '深度转化数（计费时间）'
        },
        {
          key: 'attributionDeepConvertCost',
          type: 'TYPE_AMOUNT',
          value: '深度转化成本（计费时间）'
        },
        {
          key: 'downloadStart',
          type: 'TYPE_NUM',
          value: '安卓下载开始数'
        },
        {
          key: 'downloadStartCost',
          type: 'TYPE_AMOUNT',
          value: '安卓下载开始成本'
        }
      ],
      labelKey: 'value',
      valueKey: 'key',
      typeKey: 'type',
      indicatorRule: [
        {
          value: '=',
          label: '等于'
        },
        {
          value: '!=',
          label: '不等于'
        },
        {
          value: '<',
          label: '小于'
        },
        {
          value: '>',
          label: '大于'
        },
        {
          value: '>=',
          label: '大于等于'
        },
        {
          value: '<=',
          label: '小于等于'
        },
        {
          value: 'BETWEEN',
          label: '介于',
          ruleType: 'number-input-between'
        }
      ]
    }
  },
  methods: {
    onClickDeep() {
      this.deepVisible = true
    },
    onClickDeepCancel() {
      this.deepVisible = false
    },
    selectChange(val) {
      this.currentValue = val.map(item => {
        let find = this.currentValue.find(option => option.type === item)
        if (find) {
          return find
        }
        let { [this.labelKey]: label, [this.typeKey]: dataType } = this.dataList.find(
          val => val[this.valueKey] === item
        )
        let params = {
          label,
          type: item,
          symbol: '',
          symbolLabel: '',
          ruleType: '',
          startValue: 0,
          endValue: 0,
          value: 0,
          dataType
        }
        return params
      })
      this.$emit('update:select-data', val)
      this.$emit('select-change', val)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ivu-modal-body {
  height: 540px;
}
</style>
