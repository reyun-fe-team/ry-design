
<template>
  <div>
    <h2>多选事例-checkStrictly:{{ value }}</h2>
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
      save-type="leave-save"
      :max-width="5000"
      :option-label-method="labelMethod"></rd-tree-select>

    <h2>多选事例-默认:{{ defaultValue }}</h2>
    <rd-tree-select
      v-model="defaultValue"
      label="默认 : "
      multiple
      show-select-option
      show-checkbox
      filterable
      clearable
      :data="data"
      :max-height="300"
      :height="300"
      save-type="leave-save"
      :max-width="5000"
      :option-label-method="labelMethod"></rd-tree-select>

    <h2 style="margin-top: 100px">多选事例-向下-春福:{{ valueDown }}</h2>

    <rd-tree-select
      v-model="valueDown"
      label="多选: "
      multiple
      option-show-parent
      show-select-option
      show-checkbox
      filterable
      clearable
      :data="data"
      :max-height="300"
      :height="300"
      :max-width="5000"
      save-type="leave-save"
      :option-label-method="downLabelMethod"></rd-tree-select>

    <h2 style="margin-top: 100px">多选事例-默认向上选中-周博用:{{ valueUp }}</h2>
    <rd-tree-select
      v-model="valueUp"
      label="多选: "
      multiple
      show-select-option
      show-checkbox
      filterable
      clearable
      :data="data2"
      :max-height="400"
      :height="300"
      :max-width="200"
      deep-up-checked
      node-key="code"
      :default-props="{
        children: 'data',
        label: 'name'
      }"
      save-type="always-save"
      :option-label-method="upOptionLabelMethod"></rd-tree-select>

    单选事例1:{{ valueRadio1 }}
    <hr />
    <rd-tree-select
      v-model="valueRadio1"
      label="单选: "
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
      defaultValue: ['水果1', '西瓜1', '西瓜肉', '西瓜籽', '香蕉'],
      valueDown: ['水果1', '朝阳'],
      valueUp: ['地球3', '水果2', '西瓜2', '西瓜肉', '香蕉', '北京'],
      valueRadio1: '水果1',
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
              value: '水果1',
              selected: false,
              checked: false,
              children: [
                {
                  label: '西瓜1',
                  value: '西瓜1',
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
      data2: [
        {
          name: '地球3',
          expand: true,
          code: '地球3',
          selected: false,
          checked: false,
          data: [
            {
              name: '水果2',
              expand: true,
              code: '水果2',
              selected: false,
              checked: false,
              data: [
                {
                  name: '西瓜2',
                  code: '西瓜2',
                  selected: false,
                  checked: false,
                  data: [
                    {
                      name: '西瓜肉西瓜肉西瓜肉西瓜肉西瓜肉西瓜肉西瓜肉西瓜肉西瓜肉西瓜肉西瓜肉',
                      code: '西瓜肉',
                      selected: false,
                      checked: false
                    },
                    {
                      name: '西瓜籽',
                      code: '西瓜籽',
                      selected: false,
                      checked: false
                    }
                  ]
                },
                {
                  name: '香蕉',
                  code: '香蕉',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              name: '北京',
              expand: true,
              code: '北京',
              selected: false,
              checked: false,
              data: [
                {
                  name: '朝阳1',
                  code: '朝阳',
                  selected: false,
                  checked: false
                },
                {
                  name: '昌平',
                  code: '昌平',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              name: '上海',
              expand: true,
              code: '上海',
              selected: false,
              checked: false,
              data: [
                {
                  name: '南京路',
                  code: '南京路',
                  selected: false,
                  checked: false
                },
                {
                  name: '外滩',
                  code: '外滩',
                  selected: false,
                  checked: false
                }
              ]
            }
          ]
        }
      ]
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
