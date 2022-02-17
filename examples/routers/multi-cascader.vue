<template>
  <div>
    <rd-cascader-multi style="width: 200px;"
              v-model="list"
              :echoLabel="labels"
              :data="data2"
              sync
              @getLables="getLables"
              :syncCallBack="syncCallBack"></rd-cascader-multi>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ['zhinan-shejiyuanze', 'zhinan-daohang'],
      labels: ['指南-设计原则', '指南-导航'],
      data: [
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
      ],
      data2: [
        {
          showCheck: true,
          value: 'zhinan',
          label: '指南'
        },
        {
          value: 'ziyuan',
          label: '资源'
        }
      ]
    }
  },
  methods: {
    getLables(lbs) {
      this.labels = lbs
    },
    syncCallBack(data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let list = []
          if (data.value === 'zhinan') {
            list = [
              {
                value: 'shejiyuanze',
                label: '设计原则'
              },
              {
                value: 'daohang',
                label: '导航'
              }
            ]
          }
          if (data.value === 'ziyuan') {
            list = [
              {
                value: 'a',
                label: 'A'
              },
              {
                value: 'b',
                label: 'B'
              }
            ]
          }

          resolve(list)
        }, 1000)
      })
    }
  }
}
</script>