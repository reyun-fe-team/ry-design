
<template>
  <div>
    <h2>单选事例1:{{ valueRadio1 }}</h2>
    <hr />
    <rd-tree-select
      v-if="true"
      v-model="valueRadio1"
      label="单选: "
      check-strictly
      clearable
      :data="data1"
      :max-width="500"
      :max-height="300"
      :option-label-method="pathMethod"></rd-tree-select>
    <h2 style="margin-top: 100px">独立-checkStrictly:{{ valueCheckStrictly }}</h2>
    <!-- :default-expanded-keys="['中国']"     :default-expand-all="false" -->
    <rd-tree-select
      v-model="valueCheckStrictly"
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
      :default-expanded-keys="['中国']"
      :default-expand-all="false"
      :option-label-method="labelMethod"></rd-tree-select>

    <h2 style="margin-top: 100px; color: blue">
      默认-点父亲, 儿子们选中-有勾选的在右侧:{{ defaultValue }}
    </h2>
    <rd-tree-select
      v-if="true"
      v-model="defaultValue"
      label="默认多选 : "
      multiple
      show-select-option
      show-checkbox
      filterable
      clearable
      :data="data"
      :max-height="300"
      :height="300"
      :max-width="5000"
      :option-label-method="pathMethod"
      @on-change="valueDownChange"></rd-tree-select>

    <h2 style="margin-top: 100px">
      默认-点父亲, 儿子们选中-有勾选的父亲label的在右侧(春福原来要求的):{{ valueDown }}
    </h2>
    <rd-tree-select
      v-if="true"
      ref="rd-tree-select-ref1"
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
      show-parent-label
      :option-label-method="downLabelMethod"
      @on-change="valueDownChange"></rd-tree-select>
    <Button
      type="primary"
      @click="getHalfCheckedKeys">
      getHalfCheckedKeys
    </Button>

    <h2 style="margin-top: 100px">多选事例-默认向上选中-周博用:{{ valueUp }}</h2>
    <rd-tree-select
      v-if="true"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      valueCheckStrictly: ['中国', '朝阳'],
      defaultValue: ['北京', '朝阳', '昌平'],
      valueDown: ['水果', '朝阳'],
      //valueUp: [],
      valueUp: ['中国', '水果', '西瓜', '西瓜肉', '香蕉', '北京'],
      valueRadio1: '北京',
      data: [
        {
          label: '中国',
          // expand: false,
          value: '中国',
          selected: false,
          checked: false,
          children: [
            {
              label: '北京',
              // expand: false,
              value: '北京',
              selected: false,
              checked: false,
              children: [
                {
                  label: '朝阳',
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
              // expand: false,
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
            },
            {
              label: '水果',
              // expand: false,
              value: '水果',
              selected: false,
              checked: false,
              children: [
                {
                  label: '西瓜',
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
            }
          ]
        }
      ],
      data1: [
        {
          label: '中国',
          expand: true,
          value: '中国',
          selected: false,
          checked: false,
          children: [
            {
              label: '北京',
              expand: true,
              value: '北京',
              selected: false,
              checked: false,
              children: [
                {
                  label: '朝阳',
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
            },
            {
              label: '水果',
              expand: true,
              value: '水果',
              selected: false,
              checked: false,
              children: [
                {
                  label: '西瓜',
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
            }
          ]
        }
      ],
      data2: [
        {
          name: '中国',
          expand: true,
          code: '中国',
          selected: false,
          checked: false,
          data: [
            {
              name: '北京',
              expand: true,
              code: '北京',
              selected: false,
              checked: false,
              data: [
                {
                  name: '朝阳',
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
            },
            {
              name: '水果',
              expand: true,
              code: '水果',
              selected: false,
              checked: false,
              data: [
                {
                  name: '西瓜',
                  code: '西瓜',
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
            }
          ]
        }
      ]
    }
  },
  methods: {
    upOptionLabelMethod(row) {
      return row.label
    },
    downLabelMethod(row) {
      return row.parentLabel
    },
    labelMethod(row) {
      return row.label
    },
    pathMethod(row) {
      return row.path
    },
    getHalfCheckedKeys() {
      const rest = this.$refs['rd-tree-select-ref1'].getHalfCheckedKeys()
      console.log({ rest })
    },
    valueDownChange(data, info) {
      console.log(data, info)
    }
  }
}
</script>
