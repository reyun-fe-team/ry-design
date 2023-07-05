<template>
  <div>
    <h2>filter-list-cascader</h2>
    <Button @click="fu">赋予</Button>
    <section>
      <rd-filter-list-cascader
        v-model="selectMultiple"
        :data="options"
        :width="360"
        :height="320"
        filterable
        multiple
        save-type="leave-save"
        show-select-option></rd-filter-list-cascader>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMultiple: [],
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
              label: '浙江1'
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
  methods: {
    fu() {
      setTimeout(() => {
        this.selectMultiple = ['1-1', '1-2', '1-3', '2-1']
      }, 2000)
    }
  }
}
</script>