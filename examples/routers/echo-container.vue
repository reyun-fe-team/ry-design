<template>
  <div>
    <rd-echo-container
      v-model="selectValue"
      type="select"
      label="单选"
      is-label-tooltip
      :label-tooltip-option="{ content: 'tooltip内容' }"
      :data="selectData"></rd-echo-container>
    <br />
    <rd-echo-container
      v-model="selectMultipleValue"
      type="select"
      label="多选"
      multiple
      :data="selectData"></rd-echo-container>
    <br />
    <rd-echo-container
      v-model="inputValue"
      type="input"
      label="输入框"
      placeholder="请输入"></rd-echo-container>
    <br />
    <rd-echo-container
      v-model="textValue"
      type="text"
      label="文本框"></rd-echo-container>
    <br />
    <rd-echo-container
      v-model="multiCascaderValue"
      type="multi-cascader"
      label="下拉多级复选框"
      tooltip-key="tooltip"
      :max-tag-count="1"
      :show-empty-wrap-by-not-synced="false"
      :data="multiCascaderData"></rd-echo-container>
    <br />
    <rd-echo-container
      v-model="indicatorValue"
      type="indicator"
      label="数据指标"
      :unit="unit"
      :indicator-rule="indicatorRule"
      :min="10"
      :max="1000"></rd-echo-container>
    <br />
    <rd-echo-container @on-clear="clear">
      <span slot="label">
        插槽
        <Icon
          custom="iconfont ry-icon-suo"
          color="#555666"></Icon>
        :
      </span>
      <div
        slot="content"
        class="echo-date-box">
        <rd-date-picker
          v-model="time"
          class="echo-date"
          width="180px"
          :clearable="false"></rd-date-picker>
        <Divider
          type="vertical"
          class="rd-echo-container-content-box-vertical-line" />
      </div>
    </rd-echo-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectValue: '204822',
      selectMultipleValue: ['204822', '19858972'],
      inputValue: '',
      textValue: '文本内容',
      multiCascaderValue: ['yizhi', 'fankui'],
      indicatorValue: {
        symbol: '!=',
        symbolLabel: '不等于',
        value: 10,
        startValue: 0,
        endValue: 0,
        selectName: '不等于10.00%'
      },
      unit: '%',
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
      ],
      time: [],
      selectData: [
        {
          label: '热云数据01',
          value: '204822'
        },
        {
          label: '热云数据02',
          value: '19858972'
        },
        {
          label: '热云数据03',
          value: '19858973'
        },
        {
          label: '热云数据04',
          value: '19858970'
        },
        {
          label: '热云数据05',
          value: '42853'
        },
        {
          label: '热云数据06',
          value: '9946'
        },
        {
          label: '热云数据07',
          value: '42855'
        },
        {
          label: '热云数据08',
          value: '42856'
        },
        {
          label: '热云数据09',
          value: '163645'
        },
        {
          label: '热云数据10',
          value: '163635'
        },
        {
          label: '热云数据11',
          value: '204824'
        }
      ],
      multiCascaderData: [
        {
          showCheck: true,
          value: 'zhinan',
          label: '指南',
          children: [
            {
              showCheck: true,
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clear() {
      this.time = []
    }
  }
}
</script>
<style scoped lang="less">
.echo-date-box {
  display: flex;
  align-items: center;
  .echo-date {
    /deep/.ivu-input {
      border: none;
      background: inherit;
      outline: none;
      box-shadow: none;
    }
  }
  /deep/ .ivu-divider,
  .ivu-divider-vertical {
    margin: 0 8px 0 0;
  }
}
.rd-echo-container :hover {
  /deep/ .ivu-select-dropdown {
    color: initial;
  }
}
</style>