
<template>
  <div>
    多选事例-checkStrictly:{{ value }}
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

    多选事例-向下:{{ valueDown }}
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
      :option-label-method="downLabelMethod"></rd-tree-select>

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
      :data="data"
      :max-height="300"
      :height="300"
      :max-width="5000"
      deep-up-check
      :option-label-method="upOptionLabelMethod"
      select-type="click-up"></rd-tree-select>

    单选事例:{{ valueRadio }}
    <hr />
    <!-- <rd-tree-select
      v-model="valueRadio"
      label="单选: "
      show-select-option
      :data="data"
      :max-width="500"
      :max-height="300"></rd-tree-select> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      valueDown: ['水果', '朝阳'],
      valueUp: [],
      valueRadio: '水果',
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
    },
    labelMethod(row) {
      return row.label
    }
  }
}
</script>
