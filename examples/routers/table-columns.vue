<template>
  <main>
    <div class="show-data">
      {{ value }}
    </div>
    <rd-table-columns
      v-model="value"
      :data="list"
      :edit-call-back="editCallBack"
      @on-sort-data="onSortData"></rd-table-columns>
  </main>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      value: ['media'],
      list: [
        {
          key: 'a',
          hide: false,
          check: false,
          title: '属性指标',
          children: [
            {
              key: 'aa',
              hide: false,
              check: true,
              title: '广告组属性',
              children: [
                {
                  key: 'aaa1',
                  hide: false,
                  slot: 'aaa1',
                  check: true,
                  fixed: 'left',
                  tooltip: '可选提示',
                  title: '广告组名称',
                  disabled: true,
                  unlock: true,
                  minWidth: 180,
                  sortable: 'custom',
                  // 前缀
                  prefix: {
                    icon: 'ios-unlock',
                    content: ''
                  },
                  // 后缀
                  suffix: {
                    icon: 'ios-information-circle',
                    content: ''
                  }
                },
                {
                  key: 'aaa2',
                  hide: false,
                  check: false,
                  title: '广告组ID',
                  edit: true, // 编辑
                  minWidth: 120,
                  sortable: 'custom'
                },
                {
                  key: 'aaa3',
                  hide: false,
                  check: false,
                  title: '广告组状态',
                  minWidth: 120
                },
                {
                  key: 'aaa4',
                  hide: false,
                  check: false,
                  title: '媒体',
                  minWidth: 150,
                  sortable: 'custom'
                },
                {
                  key: 'aaa5',
                  hide: false,
                  check: false,
                  title: '媒体账号',
                  minWidth: 250,
                  sortable: 'custom'
                },
                {
                  key: 'aaa6',
                  hide: false,
                  check: false,
                  title: '应用',
                  checked: true,
                  disable: true,
                  minWidth: 100
                }
              ]
            }
          ]
        },
        {
          key: 'b',
          hide: false,
          check: false,
          title: '效果指标',
          children: [
            {
              key: 'b1',
              hide: false,
              check: false,
              title: '展示数据',
              children: [
                {
                  key: 'b1-1',
                  hide: false,
                  check: false,
                  title: '消耗',
                  minWidth: 120,
                  sortable: 'custom'
                },
                {
                  key: 'b1-2',
                  hide: false,
                  check: false,
                  title: '展示数',
                  minWidth: 100,
                  sortable: 'custom'
                },
                {
                  key: 'b1-3',
                  hide: false,
                  check: false,
                  title: '千次展示均价',
                  minWidth: 130,
                  sortable: 'custom'
                },
                {
                  key: 'b1-4',
                  hide: false,
                  check: false,
                  title: '点击数',
                  minWidth: 100,
                  sortable: 'custom'
                },
                {
                  key: 'b1-5',
                  hide: false,
                  check: false,
                  title: '点击率',
                  minWidth: 100,
                  sortable: 'custom'
                },
                {
                  key: 'b1-6',
                  hide: false,
                  check: false,
                  title: '点击均价',
                  minWidth: 120,
                  sortable: 'custom'
                }
              ]
            },
            {
              key: 'b2',
              hide: false,
              check: false,
              title: '转化数据',
              children: [
                {
                  key: 'b2-1',
                  hide: false,
                  check: false,
                  title: '转化数',
                  minWidth: 100,
                  sortable: 'custom'
                },
                {
                  key: 'b2-2',
                  hide: false,
                  check: false,
                  title: '转化率',
                  minWidth: 100,
                  sortable: 'custom'
                },
                {
                  key: 'b2-3',
                  hide: false,
                  check: false,
                  title: '转化成本',
                  minWidth: 120,
                  sortable: 'custom'
                },
                {
                  key: 'b2-4',
                  hide: false,
                  check: false,
                  title: '深度转化数',
                  minWidth: 120
                },
                {
                  key: 'b2-5',
                  hide: false,
                  check: false,
                  title: '深度转化成本',
                  minWidth: 120
                },
                {
                  key: 'b2-6',
                  hide: false,
                  check: false,
                  title: '深度转化数率',
                  minWidth: 120
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {},
  mounted() {},
  methods: {
    editCallBack(data) {
      // 请求接口
      return new Promise((resolve, reject) => {
        if (data.title.length === 1) {
          resolve(data.title)
        } else {
          reject()
          this.$Message.error('error')
        }
      })
    },
    onSortData(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less">
.show-data {
  width: 300px;
  height: 200px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
