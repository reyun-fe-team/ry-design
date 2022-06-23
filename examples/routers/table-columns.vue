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
          key: 'attribute',
          hide: false,
          check: false,
          title: '属性指标',
          children: [
            {
              key: 'cam',
              hide: false,
              check: true,
              title: '广告组属性',
              children: [
                {
                  key: 'campaignName',
                  hide: false,
                  slot: 'campaignName',
                  check: true,
                  fixed: 'left',
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
                  key: 'dupnumEvent1',
                  hide: false,
                  check: true,
                  title: '广告组ID',
                  edit: true, // 编辑
                  minWidth: 120,
                  sortable: 'custom',
                  __id: 'cTVs4C'
                },
                {
                  key: 'status',
                  hide: false,
                  slot: 'status',
                  check: true,
                  title: '广告组状态',
                  minWidth: 120,
                  __id: 'KyOBgp'
                },
                {
                  key: 'media',
                  hide: false,
                  slot: 'media',
                  check: true,
                  title: '媒体',
                  minWidth: 150,
                  sortable: 'custom',
                  __id: 'J3PLn9'
                },
                {
                  key: 'accountName',
                  hide: false,
                  check: true,
                  title: '媒体账号',
                  minWidth: 250,
                  sortable: 'custom',
                  __id: '9vl0HP'
                },
                {
                  key: 'appName',
                  hide: false,
                  check: true,
                  title: '应用',
                  checked: true,
                  disable: true,
                  minWidth: 100,
                  __id: 'PzoDJ5'
                },
                {
                  key: 'intellCam',
                  hide: false,
                  slot: 'intellCam',
                  check: true,
                  title: '智投',
                  minWidth: 100,
                  __id: 'zTfJnM'
                },
                {
                  key: 'landingType',
                  hide: false,
                  slot: 'landingType',
                  check: true,
                  title: '推广目的',
                  minWidth: 100,
                  __id: '5JauhF'
                },
                {
                  key: 'budget',
                  hide: false,
                  slot: 'budget',
                  check: true,
                  title: '组预算',
                  minWidth: 130,
                  __id: '6ERYeX'
                },
                {
                  key: 'campaignCreateTime',
                  hide: false,
                  check: true,
                  title: '创建时间',
                  minWidth: 130,
                  __id: 'FhUDYn'
                },
                {
                  key: 'campaignModifyTime',
                  hide: false,
                  check: true,
                  title: '更新时间',
                  minWidth: 130,
                  __id: '0GJYYJ'
                }
              ]
            }
          ]
        },
        {
          key: 'analysisattribute',
          hide: false,
          check: true,
          title: '效果指标',
          children: [
            {
              key: 'aaaa',
              hide: false,
              check: true,
              title: '展示数据',
              children: [
                {
                  key: 'cost',
                  hide: false,
                  check: true,
                  title: '消耗',
                  minWidth: 120,
                  sortable: 'custom',
                  __id: 'dqoUm3'
                },
                {
                  key: 'show',
                  hide: false,
                  check: true,
                  title: '展示数',
                  minWidth: 100,
                  sortable: 'custom',
                  __id: 'nAm5rl'
                },
                {
                  key: 'cpm',
                  hide: false,
                  check: true,
                  title: '千次展示均价',
                  minWidth: 130,
                  sortable: 'custom',
                  __id: '3iL3pt'
                },
                {
                  key: 'click',
                  hide: false,
                  check: true,
                  title: '点击数',
                  minWidth: 100,
                  sortable: 'custom',
                  __id: 'GpVt97'
                },
                {
                  key: 'clickRate',
                  hide: false,
                  check: true,
                  title: '点击率',
                  minWidth: 100,
                  sortable: 'custom',
                  __id: '4vzQDS'
                },
                {
                  key: 'cpc',
                  hide: false,
                  check: true,
                  title: '点击均价',
                  minWidth: 120,
                  sortable: 'custom',
                  __id: '0jaVMA'
                }
              ]
            },
            {
              key: 'convert',
              hide: false,
              check: true,
              title: '转化数据',
              children: [
                {
                  key: 'convert',
                  hide: false,
                  check: true,
                  title: '转化数',
                  minWidth: 100,
                  sortable: 'custom',
                  __id: 'Kl5twL'
                },
                {
                  key: 'clickConvertRate',
                  hide: false,
                  check: true,
                  title: '转化率',
                  minWidth: 100,
                  sortable: 'custom',
                  __id: 'QTQqNN'
                },
                {
                  key: 'convertCost',
                  hide: false,
                  check: true,
                  title: '转化成本',
                  minWidth: 120,
                  sortable: 'custom',
                  __id: 'bCnthh'
                },
                {
                  key: 'deepConvert',
                  hide: false,
                  check: true,
                  title: '深度转化数',
                  minWidth: 120,
                  __id: 'qruQ0t'
                },
                {
                  key: 'deepConvertCost',
                  hide: false,
                  check: true,
                  title: '深度转化成本',
                  minWidth: 120,
                  __id: 'UIAWTn'
                },
                {
                  key: 'deepConvertRate',
                  hide: false,
                  check: true,
                  title: '深度转化数率',
                  minWidth: 120,
                  __id: 'kFueVA'
                }
              ]
            },
            {
              key: 'appConvert',
              hide: false,
              check: true,
              title: '应用转化数据',
              children: [
                {
                  key: 'active',
                  hide: false,
                  check: true,
                  title: '激活数',
                  minWidth: 120,
                  __id: 'uDIfjt'
                },
                {
                  key: 'clickActiveRate',
                  hide: false,
                  check: true,
                  title: '激活率',
                  minWidth: 120,
                  __id: 'zhnerf'
                },
                {
                  key: 'activeCost',
                  hide: false,
                  check: true,
                  title: '激活成本',
                  minWidth: 120,
                  __id: 'tjBNyY'
                },
                {
                  key: 'register',
                  hide: false,
                  check: true,
                  title: '注册数',
                  minWidth: 120,
                  __id: 'hw5KZ2'
                },
                {
                  key: 'registerRate',
                  hide: false,
                  check: true,
                  title: '注册率',
                  minWidth: 120,
                  __id: 'gzV6ig'
                },
                {
                  key: 'registerCost',
                  hide: false,
                  check: true,
                  title: '注册成本',
                  minWidth: 120,
                  __id: 'CzkfPT'
                },
                {
                  key: 'payCount',
                  hide: false,
                  check: true,
                  title: '付费数',
                  minWidth: 120,
                  __id: 'TAqirr'
                },
                {
                  key: 'payCountRate',
                  hide: false,
                  check: true,
                  title: '付费率',
                  minWidth: 120,
                  __id: 'J5aNIS'
                },
                {
                  key: 'payCountCost',
                  hide: false,
                  check: true,
                  title: '付费成本',
                  minWidth: 120,
                  __id: 'qc2p4r'
                },
                {
                  key: 'downloadFinish',
                  hide: false,
                  check: true,
                  title: '安卓下载量',
                  minWidth: 120,
                  __id: 'NpwSTu'
                },
                {
                  key: 'installFinish',
                  hide: false,
                  check: true,
                  title: '安卓安装量',
                  minWidth: 120,
                  __id: 'fcqx3k'
                },
                {
                  key: 'gameAddiction',
                  hide: false,
                  check: true,
                  title: '关键行为数',
                  minWidth: 120,
                  __id: 'Q9cIoO'
                },
                {
                  key: 'gameAddictionCost',
                  hide: false,
                  check: true,
                  title: '关键行为成本',
                  minWidth: 120,
                  __id: '4GR4xx'
                },
                {
                  key: 'gameAddictionRate',
                  hide: false,
                  check: true,
                  title: '关键行为率',
                  minWidth: 120,
                  __id: 'sxElAU'
                }
              ]
            },
            {
              key: 'page',
              hide: false,
              check: true,
              title: '落地页数据',
              children: [
                {
                  key: 'phone',
                  hide: false,
                  check: true,
                  title: '电话拨打数',
                  minWidth: 100,
                  __id: 'sx2pq9'
                },
                {
                  key: 'form',
                  hide: false,
                  check: true,
                  title: '表单提交',
                  minWidth: 100,
                  __id: 'KCO9Bm'
                },
                {
                  key: 'consult',
                  hide: false,
                  check: true,
                  title: '在线咨询',
                  minWidth: 100,
                  __id: 'PpbagL'
                },
                {
                  key: 'formCost',
                  hide: false,
                  check: true,
                  title: '表单提交成本',
                  minWidth: 100,
                  __id: 'FOTsbx'
                },
                {
                  key: 'consultCost',
                  hide: false,
                  check: true,
                  title: '在线咨询成本',
                  minWidth: 100,
                  __id: 'jbmL6R'
                }
              ]
            },
            {
              key: 'validPlayList',
              hide: false,
              check: false,
              title: '视频数据',
              children: [
                { key: 'totalPlay', hide: false, check: false, title: '播放数', minWidth: 100 },
                { key: 'validPlay', hide: false, check: false, title: '有效播放数', minWidth: 100 },
                {
                  key: 'validPlayRate',
                  hide: false,
                  check: false,
                  title: '有效播放率',
                  minWidth: 100
                },
                {
                  key: 'validPlayCost',
                  hide: false,
                  check: false,
                  title: '有效播放成本',
                  minWidth: 100
                }
              ]
            }
          ]
        },
        {
          key: 'monitoring',
          hide: false,
          check: false,
          title: 'TKIO监测指标',
          children: [
            {
              key: 'monitoringBasisList',
              hide: false,
              check: false,
              title: '监测基础数据',
              children: [
                {
                  edit: true,
                  key: 'dupnumClickAll',
                  hide: false,
                  check: false,
                  title: '排重点击数',
                  minWidth: 100
                },
                {
                  key: 'numInstall',
                  hide: false,
                  check: false,
                  title: '排重激活数',
                  minWidth: 100
                },
                {
                  key: 'clickActiveRateTkio',
                  hide: false,
                  check: false,
                  title: '激活率',
                  minWidth: 100
                },
                {
                  key: 'activeCostTkio',
                  hide: false,
                  check: false,
                  title: '激活成本（ 元）',
                  minWidth: 100
                },
                {
                  key: 'dupnumRegedDay',
                  hide: false,
                  check: false,
                  title: '按天排重注册数',
                  minWidth: 100
                },
                {
                  key: 'registerRateTkio',
                  hide: false,
                  check: false,
                  title: '注册率',
                  minWidth: 100
                },
                {
                  key: 'registerCostTkio',
                  hide: false,
                  check: false,
                  title: '注册成本（ 元）',
                  minWidth: 100
                }
              ]
            },
            {
              key: 'monitoringIncomeList',
              hide: false,
              check: false,
              title: '监测付费数据',
              children: [
                {
                  key: 'amtIncomeAllUser',
                  hide: false,
                  check: false,
                  title: '总付费',
                  minWidth: 100
                },
                {
                  key: 'numPayerAllUser',
                  hide: false,
                  check: false,
                  title: '总付费设备数',
                  minWidth: 100
                },
                {
                  key: 'amtIncomeAllUserRoi',
                  hide: false,
                  check: false,
                  title: '总付费ROI',
                  minWidth: 100
                },
                {
                  key: 'amtIncomeNewUser',
                  hide: false,
                  check: false,
                  title: '新增付费',
                  minWidth: 100
                },
                {
                  key: 'numPayerNewUser',
                  hide: false,
                  check: false,
                  title: '新增付费设备数',
                  minWidth: 100
                },
                {
                  key: 'amtIncomeNewUserRoi',
                  hide: false,
                  check: false,
                  title: '新增付费ROI',
                  minWidth: 100
                },
                {
                  key: 'amtIncomeRegion',
                  hide: false,
                  check: false,
                  title: '区间付费',
                  minWidth: 100
                },
                {
                  key: 'amtIncomeRegionRoi',
                  hide: false,
                  check: false,
                  title: '区间付费ROI',
                  minWidth: 100
                },
                {
                  key: 'numInstallNumPayerNewUserRate',
                  hide: false,
                  check: false,
                  title: '新增日付费率',
                  minWidth: 100
                }
              ]
            },
            {
              key: 'monitoringNewuserList',
              hide: false,
              check: false,
              title: '监测留存数据',
              children: [
                {
                  key: 'numNewuserRetenD1',
                  hide: false,
                  check: false,
                  title: 'D1留存',
                  minWidth: 100
                },
                {
                  key: 'numNewuserRetenD2',
                  hide: false,
                  check: false,
                  title: 'D2留存',
                  minWidth: 100
                },
                {
                  key: 'numNewuserRetenD3',
                  hide: false,
                  check: false,
                  title: 'D3留存',
                  minWidth: 100
                },
                {
                  key: 'numNewuserRetenD4',
                  hide: false,
                  check: false,
                  title: 'D4留存',
                  minWidth: 100
                },
                {
                  key: 'numNewuserRetenD5',
                  hide: false,
                  check: false,
                  title: 'D5留存',
                  minWidth: 100
                },
                {
                  key: 'numNewuserRetenD6',
                  hide: false,
                  check: false,
                  title: 'D6留存',
                  minWidth: 100
                },
                {
                  key: 'numNewuserRetenD7',
                  hide: false,
                  check: false,
                  title: 'D7留存',
                  minWidth: 100
                },
                {
                  key: 'numNewuserRetenD14',
                  hide: false,
                  check: false,
                  title: 'D14留存',
                  minWidth: 100
                }
              ]
            },
            {
              key: 'monitoringLTVList',
              hide: false,
              check: false,
              title: '监测LTV数据',
              children: [
                {
                  key: 'ltv0',
                  hide: false,
                  check: false,
                  title: 'LTV0',
                  minWidth: 100
                },
                { key: 'ltv1', hide: false, check: false, title: 'LTV1', minWidth: 100 },
                { key: 'ltv2', hide: false, check: false, title: 'LTV2', minWidth: 100 },
                { key: 'ltv3', hide: false, check: false, title: 'LTV3', minWidth: 100 },
                { key: 'ltv4', hide: false, check: false, title: 'LTV4', minWidth: 100 },
                { key: 'ltv5', hide: false, check: false, title: 'LTV5', minWidth: 100 },
                { key: 'ltv6', hide: false, check: false, title: 'LTV6', minWidth: 100 },
                { key: 'ltv7', hide: false, check: false, title: 'LTV7', minWidth: 100 },
                { key: 'ltv14', hide: false, check: false, title: 'LTV14', minWidth: 100 }
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
        resolve(data.title)
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
