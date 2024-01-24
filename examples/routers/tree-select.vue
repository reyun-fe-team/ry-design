
<template>
  <div>
    <!-- 多选事例-checkStrictly:{{ value }}
    <hr />
    <rd-tree-select
      v-model="value"
      label="多选checkStrictly : "
      multiple
      show-select-option
      show-checkbox
      check-strictly
      filterable
      clearable
      :data="data"
      :max-height="300"
      :height="300"
      :max-width="5000"
      :option-label-method="labelMethod"></rd-tree-select>

    多选事例-向下-春福:{{ valueDown }}
    <hr />
    <rd-tree-select
      v-model="valueDown"
      label="多选: "
      multiple
      show-select-option
      show-checkbox
      filterable
      clearable
      :data="data"
      :max-height="300"
      :height="300"
      :max-width="5000"
      :option-label-method="downLabelMethod"></rd-tree-select> -->

    多选事例-默认向上选中:{{ valueUp }}
    <hr />
    <rd-tree-select
      v-model="valueUp"
      label="多选: "
      multiple
      show-select-option
      show-checkbox
      filterable
      clearable
      :data="data2"
      :max-height="300"
      :height="300"
      :max-width="5000"
      deep-up-checked
      :option-label-method="upOptionLabelMethod"
      select-type="click-up"></rd-tree-select>

    单选事例1:{{ valueRadio1 }}
    <hr />
    <rd-tree-select
      v-model="valueRadio1"
      label="单选: "
      show-checkbox
      show-select-option
      check-strictly
      :data="data1"
      :max-width="500"
      :max-height="300"></rd-tree-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      valueDown: ['水果', '朝阳'],
      valueUp: [],
      valueRadio1: '水果',
      data: [
        {
          label: '地球',
          expand: true,
          value: '地球',
          selected: false,
          checked: false,
          children: [
            {
              label: '水果1',
              expand: true,
              value: '水果',
              selected: false,
              checked: false,
              children: [
                {
                  label: '西瓜1',
                  value: '西瓜',
                  selected: false,
                  checked: false,
                  children: [
                    {
                      label: '西瓜肉',
                      value: '西瓜肉',
                      selected: false,
                      checked: false
                    },
                    {
                      label: '西瓜籽',
                      value: '西瓜籽',
                      selected: false,
                      checked: false
                    }
                  ]
                },
                {
                  label: '香蕉',
                  value: '香蕉',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              label: '北京',
              expand: true,
              value: '北京',
              selected: false,
              checked: false,
              children: [
                {
                  label: '朝阳1',
                  value: '朝阳',
                  selected: false,
                  checked: false
                },
                {
                  label: '昌平',
                  value: '昌平',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              label: '上海',
              expand: true,
              value: '上海',
              selected: false,
              checked: false,
              children: [
                {
                  label: '南京路',
                  value: '南京路',
                  selected: false,
                  checked: false
                },
                {
                  label: '外滩',
                  value: '外滩',
                  selected: false,
                  checked: false
                }
              ]
            }
          ]
        }
      ],
      data1: [
        {
          label: '地球2',
          expand: true,
          value: '地球2',
          selected: false,
          checked: false,
          children: [
            {
              label: '水果2',
              expand: true,
              value: '水果2',
              selected: false,
              checked: false,
              children: [
                {
                  label: '西瓜2',
                  value: '西瓜2',
                  selected: false,
                  checked: false,
                  children: [
                    {
                      label: '西瓜肉',
                      value: '西瓜肉',
                      selected: false,
                      checked: false
                    },
                    {
                      label: '西瓜籽',
                      value: '西瓜籽',
                      selected: false,
                      checked: false
                    }
                  ]
                },
                {
                  label: '香蕉',
                  value: '香蕉',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              label: '北京',
              expand: true,
              value: '北京',
              selected: false,
              checked: false,
              children: [
                {
                  label: '朝阳1',
                  value: '朝阳',
                  selected: false,
                  checked: false
                },
                {
                  label: '昌平',
                  value: '昌平',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              label: '上海',
              expand: true,
              value: '上海',
              selected: false,
              checked: false,
              children: [
                {
                  label: '南京路',
                  value: '南京路',
                  selected: false,
                  checked: false
                },
                {
                  label: '外滩',
                  value: '外滩',
                  selected: false,
                  checked: false
                }
              ]
            }
          ]
        }
      ],
      data2:[{ "id": "624", "label": "啧啧啧", "value": "624", "children": [ { "id": "625", "label": "走走走", "value": "625", "children": [ { "id": "627", "label": "啊啊啊", "value": "627" }, { "id": "628", "label": "我问问1", "value": "628", "children": [ { "id": "629", "label": "文如其人我确认我认为", "value": "629", "children": [ { "id": "631", "label": "qweeee", "value": "631" }, { "id": "632", "label": "hgjvgjhm", "value": "632" }, { "id": "633", "label": "jhgkghkbkj", "value": "633" } ] }, { "id": "630", "label": "q让我去而我额确认", "value": "630" } ] } ] }, { "id": "626", "label": "再找找", "value": "626" } ] }, { "id": "634", "label": "一级", "value": "634", "children": [ { "id": "635", "label": "二级", "value": "635", "children": [ { "id": "636", "label": "三级", "value": "636", "children": [ { "id": "637", "label": "四级", "value": "637", "children": [ { "id": "638", "label": "五级", "value": "638" }],
    }
  },
  methods: {
    upOptionLabelMethod(row) {
      return row.label
      // return row.label
      //return row.parentLabel
    },
    downLabelMethod(row) {
      return row.parentLabel
      //return row.labelStr
    },
    labelMethod(row) {
      return row.label
    }
  }
}
</script>
