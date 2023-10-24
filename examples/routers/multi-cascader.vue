<template>
  <div>
    <p>同步的</p>
    <rd-multi-cascader
      v-model="allListModel"
      :show-empty-wrap-by-not-synced="false"
      tag-max-width="0"
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

    <p>ads案例</p>
    <rd-multi-cascader
      v-model="selectReviewUser"
      :max-request="2"
      label-lv="last"
      label-key="name"
      :separator="cascaderSeparator"
      style="width: 320px"
      :data="reviewUserList"></rd-multi-cascader>

    <p>label相同的</p>
    <rd-multi-cascader
      v-model="sameLabelValues"
      style="width: 300px"
      :data="sameLabelData"
      label-lv="all"
      :max-request="2"></rd-multi-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectReviewUser: [],
      // 用特殊字符分开防止名称中有相同值，分割时有误
      cascaderSeparator: '-@@-',
      reviewUserList: [
        {
          children: [
            {
              name: '宇宙3',
              value: 2472
            }
          ],
          role: 'MANAGER',
          roleName: '优化经理',
          name: '优化经理',
          value: 'MANAGER'
        },
        {
          children: [
            {
              name: '宇宙4',
              value: 2288
            }
          ],
          role: 'OPERATE',
          roleName: '优化师',
          name: '优化师',
          value: 'OPERATE'
        }
      ],
      // 同步的
      allListLabels: ['资源-组件交互文档', '指南-设计原则', '指南-导航'],
      allListModel: ['ziyuan-jiaohu', 'zhinan-shejiyuanze', 'zhinan-daohang'],
      allDataList: [
        {
          showCheck: true,
          value: 'zhinan',
          label: '指南',
          tooltip: '指南tooltip指南tooltip指南tooltip',
          children: [
            {
              showCheck: true,
              value: 'shejiyuanze',
              label: '设计原则',
              tooltip:
                '设计原则tooltip设计原则tooltip设计原则tooltip设计原则tooltip设计原则tooltip设计原则tooltip设计原则tooltip设计原则tooltip设计原则tooltip设计原则tooltip',
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
      ],
      // label相同的
      sameLabelData: [
        {
          label: '2019',
          value: '2019',
          children: [
            { value: '201901', label: '01' },
            { value: '201902', label: '02' },
            { value: '201903', label: '03' },
            { value: '201904', label: '04' },
            { value: '201905', label: '05' },
            { value: '201906', label: '06' },
            { value: '201907', label: '07' },
            { value: '201908', label: '08' },
            { value: '201909', label: '09' },
            { value: '201910', label: '10' },
            { value: '201911', label: '11' },
            { value: '201912', label: '12' }
          ]
        },
        {
          label: '2020',
          value: '2020',
          children: [
            { value: '202001', label: '01' },
            { value: '202002', label: '02' },
            { value: '202003', label: '03' },
            { value: '202004', label: '04' },
            { value: '202005', label: '05' },
            { value: '202006', label: '06' },
            { value: '202007', label: '07' },
            { value: '202008', label: '08' },
            { value: '202009', label: '09' },
            { value: '202010', label: '10' },
            { value: '202011', label: '11' },
            { value: '202012', label: '12' }
          ]
        },
        {
          label: '2021',
          value: '2021',
          children: [
            { value: '202101', label: '01' },
            { value: '202102', label: '02' },
            { value: '202103', label: '03' },
            { value: '202104', label: '04' },
            { value: '202105', label: '05' },
            { value: '202106', label: '06' },
            { value: '202107', label: '07' },
            { value: '202108', label: '08' },
            { value: '202109', label: '09' },
            { value: '202110', label: '10' },
            { value: '202111', label: '11' },
            { value: '202112', label: '12' }
          ]
        },
        {
          label: '2022',
          value: '2022',
          children: [
            { value: '202201', label: '01' },
            { value: '202202', label: '02' },
            { value: '202203', label: '03' },
            { value: '202204', label: '04' },
            { value: '202205', label: '05' },
            { value: '202206', label: '06' },
            { value: '202207', label: '07' },
            { value: '202208', label: '08' },
            { value: '202209', label: '09' },
            { value: '202210', label: '10' },
            { value: '202211', label: '11' },
            { value: '202212', label: '12' }
          ]
        },
        {
          label: '2023',
          value: '2023',
          children: [
            { value: '202301', label: '01' },
            { value: '202302', label: '02' },
            { value: '202303', label: '03' },
            { value: '202304', label: '04' },
            { value: '202305', label: '05' },
            { value: '202306', label: '06' },
            { value: '202307', label: '07' },
            { value: '202308', label: '08' },
            { value: '202309', label: '09' },
            { value: '202310', label: '10' },
            { value: '202311', label: '11' },
            { value: '202312', label: '12' }
          ]
        },
        {
          label: '2024',
          value: '2024',
          children: [
            { value: '202401', label: '01' },
            { value: '202402', label: '02' },
            { value: '202403', label: '03' },
            { value: '202404', label: '04' },
            { value: '202405', label: '05' },
            { value: '202406', label: '06' },
            { value: '202407', label: '07' },
            { value: '202408', label: '08' },
            { value: '202409', label: '09' },
            { value: '202410', label: '10' },
            { value: '202411', label: '11' },
            { value: '202412', label: '12' }
          ]
        }
      ],
      sameLabelValues: ['2019-201901', '2019-201902', '2020-202001', '2020-202002']
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