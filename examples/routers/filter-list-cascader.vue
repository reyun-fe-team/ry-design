<template>
  <div>
    <h2>filter-list-cascader</h2>
    <section>
      <rd-filter-list-cascader
        v-model="selectMultiple"
        :data="options"
        :width="360"
        :height="320"
        filterable
        multiple
        show-select-option></rd-filter-list-cascader>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMultiple: [],
      groupList: [],
      options: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: '1-1',
              label: '上海'
              // children: [
              //   { value: 3, label: '普陀' },
              //   { value: 4, label: '黄埔' },
              //   { value: 5, label: '徐汇' }
              // ]
            },
            {
              value: '1-2',
              label: '江苏'
              // children: [
              //   { value: 8, label: '南京' },
              //   { value: 9, label: '苏州' },
              //   { value: 10, label: '无锡' }
              // ]
            },
            {
              value: '1-3',
              label: '浙江'
              // children: [
              //   { value: 13, label: '杭州' },
              //   { value: 14, label: '宁波' },
              //   { value: 15, label: '嘉兴' }
              // ]
            }
          ]
        },
        {
          value: 2,
          label: '西北',
          children: [
            {
              value: '2-1',
              label: '陕西'
              // children: [
              //   { value: 19, label: '西安' },
              //   { value: 20, label: '延安' }
              // ]
            },
            {
              value: '2-2',
              label: '新疆维吾尔族自治区'
              // children: [
              //   { value: 22, label: '乌鲁木齐' },
              //   { value: 23, label: '克拉玛依' }
              // ]
            }
          ]
        }
      ]
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
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    labelMethod(data) {
      return data.newLabel
    }
  }
}
</script>