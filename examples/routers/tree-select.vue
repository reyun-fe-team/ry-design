
<template>
  <div>
    多选事例:{{ value }}
    <hr />
    <rd-tree-select
      v-model="value"
      label="多选: "
      multiple
      show-select-option
      show-checkbox
      check-strictly
      filterable
      clearable
      :data="data"
      :max-height="300"
      :height="300"
      :max-width="5000"></rd-tree-select>

    单选事例:{{ valueRadio }}
    <hr />
    <!-- <rd-tree-select
      v-model="valueRadio"
      label="单选: "
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
      valueRadio: '水果',
      data: [
        {
          title: '地球',
          expand: true,
          value: '地球',
          selected: false,
          checked: false,
          children: [
            {
              title: '水果1',
              expand: true,
              value: '水果',
              selected: false,
              checked: false,
              children: [
                {
                  title: '西瓜1',
                  value: '西瓜',
                  selected: false,
                  checked: false,
                  children: [
                    {
                      title: '西瓜肉',
                      value: '西瓜肉',
                      selected: false,
                      checked: false
                    },
                    {
                      title: '西瓜籽',
                      value: '西瓜籽',
                      selected: false,
                      checked: false
                    }
                  ]
                },
                {
                  title: '香蕉',
                  value: '香蕉',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              title: '北京',
              expand: true,
              value: '北京',
              selected: false,
              checked: false,
              children: [
                {
                  title: '朝阳1',
                  value: '朝阳',
                  selected: false,
                  checked: false
                },
                {
                  title: '昌平',
                  value: '昌平',
                  selected: false,
                  checked: false
                }
              ]
            },
            {
              title: '上海',
              expand: true,
              value: '上海',
              selected: false,
              checked: false,
              children: [
                {
                  title: '南京路',
                  value: '南京路',
                  selected: false,
                  checked: false
                },
                {
                  title: '外滩',
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
  }
}
</script>
