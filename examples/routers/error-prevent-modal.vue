<template>
  <div>
    <Button @click="openModal">openModal</Button>
    <rd-error-prevent-modal
      ref="refErrorPreventModal"
      :validate-data-fn="validateDataFn"></rd-error-prevent-modal>
  </div>
</template>
<script>
const mockData = {
  result: [
    {
      id: 92,
      name: '测试_副本_副本_副本_副本_副本_副本_副本_副本',
      tBody: [
        {
          accountLabel: {
            error: false,
            key: 'accountLabel',
            message: '测试专用-5301(20565301)'
          },
          bid: {
            error: true,
            key: 'bid',
            message: '大于 : 100000000 元'
          },
          budgetAd: {
            error: true,
            key: 'budgetAd',
            message: '不限预算：不可用</br>介于 : 0.01 ~ 0.01 元'
          },
          budgetPlan: {
            error: true,
            key: 'budgetPlan',
            message: '不限预算：不可用</br>介于 : 0.01 ~ 0.01 元'
          },
          deepBid: {
            error: false,
            key: 'deepBid',
            message: '介于 : 0.01 ~ 0.01 元'
          },
          deepGoal: {
            error: false,
            key: 'deepGoal',
            message: '次日留存,首次付费'
          },
          goal: {
            error: false,
            key: 'goal',
            message:
              'none,品牌转化,关注,点击,曝光,App 安装,App 激活,App 注册,次日留存,App 购买,下单,H5 购买,销售线索,加入购物车,H5 注册,商品详情页浏览,网页咨询,电话咨询,表单预约,首次付费,首次会员购买'
          },
          objectLabel: {
            error: false,
            key: 'objectLabel',
            message: '用户'
          },
          position: {
            error: true,
            key: 'position',
            message:
              '微信朋友圈,微信公众号与小程序,微信新闻插件,QQ浏览器,QQ、腾讯音乐及游戏,腾讯新闻,腾讯视频,优量汇,微信视频号'
          }
        }
      ]
    },
    {
      id: 104,
      name: '测试_副本_副本_副本_副本_副本_副本_副本',
      tBody: [
        {
          accountLabel: {
            error: false,
            key: 'accountLabel',
            message: '测试专用-5301(20565301)'
          },
          bid: {
            error: true,
            key: 'bid',
            message: '介于 : 1 ~ 1 元'
          },
          budgetAd: {
            error: true,
            key: 'budgetAd',
            message: '介于 : 1 ~ 1 元'
          },
          budgetPlan: {
            error: true,
            key: 'budgetPlan',
            message: '介于 : 1 ~ 1 元'
          },
          deepBid: {
            error: false,
            key: 'deepBid',
            message: '-'
          },
          deepGoal: {
            error: false,
            key: 'deepGoal',
            message: '-'
          },
          goal: {
            error: false,
            key: 'goal',
            message: '-'
          },
          objectLabel: {
            error: false,
            key: 'objectLabel',
            message: '投放账号'
          },
          position: {
            error: false,
            key: 'position',
            message: '不限'
          }
        }
      ]
    },
    {
      id: 109,
      name: '121',
      tBody: [
        {
          accountLabel: {
            error: false,
            key: 'accountLabel',
            message: '测试专用-5301(20565301)'
          },
          bid: {
            error: false,
            key: 'bid',
            message: '-'
          },
          budgetAd: {
            error: false,
            key: 'budgetAd',
            message: '介于 : 1 ~ 1 元'
          },
          budgetPlan: {
            error: false,
            key: 'budgetPlan',
            message: '介于 : 1 ~ 1 元'
          },
          deepBid: {
            error: false,
            key: 'deepBid',
            message: '-'
          },
          deepGoal: {
            error: false,
            key: 'deepGoal',
            message: '-'
          },
          goal: {
            error: true,
            key: 'goal',
            message: '曝光'
          },
          objectLabel: {
            error: false,
            key: 'objectLabel',
            message: '投放账号'
          },
          position: {
            error: false,
            key: 'position',
            message: '不限'
          }
        }
      ]
    },
    {
      id: 93,
      name: '测试_副本_副本_副本_副本_副本_副本_副本_副本_副本',
      tBody: [
        {
          accountLabel: {
            error: false,
            key: 'accountLabel',
            message: '测试专用-5301(20565301)'
          },
          bid: {
            error: true,
            key: 'bid',
            message: '大于 : 100000000 元'
          },
          budgetAd: {
            error: true,
            key: 'budgetAd',
            message: '介于 : 0.01 ~ 0.01 元'
          },
          budgetPlan: {
            error: true,
            key: 'budgetPlan',
            message: '介于 : 1111 ~ 212112 元'
          },
          deepBid: {
            error: false,
            key: 'deepBid',
            message: '介于 : 0.01 ~ 0.01 元'
          },
          deepGoal: {
            error: false,
            key: 'deepGoal',
            message: '次日留存,首次付费'
          },
          goal: {
            error: false,
            key: 'goal',
            message:
              'none,品牌转化,关注,点击,曝光,App 安装,App 激活,App 注册,次日留存,App 购买,下单,H5 购买,销售线索,加入购物车,H5 注册,商品详情页浏览,网页咨询,电话咨询,表单预约,首次付费,首次会员购买'
          },
          objectLabel: {
            error: false,
            key: 'objectLabel',
            message: 'ADS项目'
          },
          position: {
            error: false,
            key: 'position',
            message:
              '微信朋友圈,微信公众号与小程序,微信新闻插件,QQ浏览器,QQ、腾讯音乐及游戏,腾讯新闻,腾讯视频,优量汇,微信视频号'
          }
        }
      ]
    }
  ],
  tHead: [
    {
      key: 'objectLabel',
      title: '防出错对象'
    },
    {
      key: 'accountLabel',
      title: '投放账号'
    },
    {
      key: 'position',
      title: '可选投放位置'
    },
    {
      key: 'goal',
      title: '可选优化目标'
    },
    {
      key: 'deepGoal',
      title: '可选深度优化目标'
    },
    {
      key: 'bid',
      title: '出价限制'
    },
    {
      key: 'deepBid',
      title: '深度出价限制'
    },
    {
      key: 'budgetPlan',
      title: '计划日预算预算限制'
    },
    {
      key: 'budgetAd',
      title: '广告日预算限制'
    }
  ]
}

export default {
  methods: {
    validateDataFn() {
      return Promise.resolve(mockData)
    },
    async openModal() {
      this.$refs.refErrorPreventModal.modalVisible = true
      const paramsData = {
        mediaCodes: ['kuaishou'],
        mediaAccountIds: ['24788890'],
        data: [
          {
            position: ['10'],
            // roiSource: 'goal',
            goal: ['191'],
            roiBid: [33],
            cpxBid: [33],
            budgetPlan: [500, 500, 500, 500, 555, 500, 500],
            isPlanDay: true,
            budgetAd: [111, 222, 222, 111, 222, 221, 222],
            isAdDay: true
          }
        ]
      }

      await this.$refs.refErrorPreventModal.onErrorPrevent({ paramsData })
    }
  }
}
</script>