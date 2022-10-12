<template>
  <div>
    <p>同步的</p>
    <rd-multi-cascader
      v-model="allListModel"
      :max-tag-placeholder="num => `+${num}`"
      style="width: 400px"
      :echo-label="allListLabels"
      :data="allDataList"
      clearable
      @getLables="getLables"></rd-multi-cascader>

    <p>异步的</p>
    <rd-multi-cascader
      v-model="syncListModel"
      :max-tag-placeholder="num => `+${num}`"
      style="width: 300px"
      :echo-label="syncListLabels"
      :max-request="3"
      sync
      :sync-call-back="syncCallBack"
      :data="syncDataList"
      :max-tag-count="1"
      @getLables="getLables"></rd-multi-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 同步的
      allListLabels: ['资源-组件交互文档', '指南-设计原则', '指南-导航'],
      allListModel: ['ziyuan-jiaohu', 'zhinan-shejiyuanze', 'zhinan-daohang'],
      allDataList: [
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
                },
                {
                  value: 'xiaolv1',
                  label: '效率1'
                },
                {
                  value: 'kekong1',
                  label: '可控1'
                },
                {
                  value: 'xiaolv2',
                  label: '效率2'
                },
                {
                  value: 'kekong2',
                  label: '可控2'
                },
                {
                  value: 'xiaolv3',
                  label: '效率3'
                },
                {
                  value: 'kekong3',
                  label: '可控3'
                },
                {
                  value: 'xiaolv4',
                  label: '效率4'
                },
                {
                  value: 'kekong4',
                  label: '可控4'
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
      // 异步的
      syncListLabels: ['指南-设计原则', '指南-导航'],
      syncListModel: ['zhinan-shejiyuanze', 'zhinan-daohang'],
      syncDataList: [
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
          if (data.value === 'shejiyuanze') {
            list = [
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
          }

          if (data.value === 'daohang') {
            list = [
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

          resolve(list)
        }, 1000)
      })
    }
  }
}
</script>
