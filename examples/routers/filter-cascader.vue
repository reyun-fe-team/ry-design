<template>
  <div>
    <h2>filter-cascader事例</h2>
    <div>
      <div style="display: inline-block">
        多选组 事例：{{ selectMultiple }}
        <rd-filter-list-select
          v-model="selectMultiple"
          :input-width="400"
          :width="200"
          filterable
          show-select-option
          :data="data"
          :group-name-list="groupNameList"
          multiple
          save-type="leave-save"
          label="级联多选"></rd-filter-list-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMultiple: [],
      groupList: []
    }
  },
  computed: {
    groupNameList() {
      let params = {}
      this.groupList.forEach(item => {
        const key = item.children[0].value
        params[key] = item.label
      })
      return params
    },
    data() {
      let list = []
      // this.groupList.forEach(item => {
      //   list = [...list, ...item.children]
      // })
      return list
    }
  },
  mounted() {
    for (let i = 0; i < 3; i++) {
      let children = []
      for (let j = 0; j < 20; j++) {
        const value = `${i.toString(36)}${j}`
        children.push({
          value: `${i + 1}-${value}-value`,
          label: `${i + 1}-${value} (beijin-description)`,
          newLabel: `${i + 1}-${value}`,
          disabled: [2, 4, 6, 7].includes(j) ? true : false,
          description: 'beijin-description',
          src: 'https://web.adsdesk.cn/img/lpf.f19b1cfc.png'
        })
      }
      this.groupList.push({
        label: i + 1 + '热云数据热云数据热云数据热云数据热云数据热云数据',
        children
      })
    }
  }
}
</script>
