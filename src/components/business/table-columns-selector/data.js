export const data = [
  {
    key: 'attribute',
    hide: false,
    check: false,
    title: '属性指标',
    children: [
      {
        key: 'accountAttr',
        hide: false,
        check: false,
        title: '投放账号属性',
        textAlign: 'right',
        children: [
          {
            key: 'accountName',
            hide: false,
            slot: 'accountName',
            check: true,
            fixed: 'left',
            title: '投放账户',
            disabled: true,
            minWidth: 180,
            textAlign: 'left'
          },
          {
            key: 'advertiserId',
            hide: false,
            check: false,
            title: '账户ID',
            minWidth: 120,
            textAlign: 'left'
          },
          {
            key: 'company',
            hide: false,
            check: false,
            title: '公司名称',
            minWidth: 120,
            textAlign: 'left'
          },
          {
            key: 'media',
            hide: false,
            slot: 'media',
            check: false,
            title: '媒体',
            minWidth: 150,
            textAlign: 'left'
          },
          {
            key: 'productName',
            hide: false,
            check: false,
            title: '产品',
            checked: true,
            disabled: false,
            minWidth: 100,
            textAlign: 'left'
          },
          {
            key: 'appName',
            hide: false,
            check: false,
            title: '项目',
            checked: true,
            minWidth: 100,
            textAlign: 'left'
          },
          {
            key: 'budgetAmount',
            hide: false,
            slot: 'budgetAmount',
            check: false,
            title: '账户日预算',
            minWidth: 140,
            textAlign: 'right'
          },
          {
            key: 'accountBalance',
            hide: false,
            check: false,
            title: '账号总余额',
            minWidth: 130,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'innerEscrowStatus',
            hide: false,
            slot: 'innerEscrowStatus',
            check: false,
            title: '托管状态',
            minWidth: 130,
            textAlign: 'left'
          },
          {
            key: 'balanceWarn',
            hide: false,
            check: false,
            title: '余额预警',
            minWidth: 130,
            sortable: 'custom',
            textAlign: 'left'
          },
          {
            key: 'validBalance',
            hide: false,
            check: false,
            title: '账户可用总余额',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'accountCash',
            hide: false,
            check: false,
            title: '现金余额',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'validCash',
            hide: false,
            check: false,
            title: '现金可用余额',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'accountGrant',
            hide: false,
            check: false,
            title: '赠款余额',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'validGrant',
            hide: false,
            check: false,
            title: '赠款可用余额',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'totalCost',
            hide: false,
            check: false,
            title: '总支出',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'cashCost',
            hide: false,
            check: false,
            title: '现金支出',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'rewardCost',
            hide: false,
            check: false,
            title: '赠款支出',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'income',
            hide: false,
            check: false,
            title: '账户总存入',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'transferIn',
            hide: false,
            check: false,
            title: '账户总转入',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'transferOut',
            hide: false,
            check: false,
            title: '账户总支出',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'returnGoodsCost',
            hide: false,
            check: false,
            title: '返货支出',
            minWidth: 130,
            textAlign: 'right'
          },
          {
            key: 'createTime',
            hide: false,
            check: false,
            title: '创建时间',
            minWidth: 130,
            textAlign: 'left'
          },
          {
            key: 'gmtModified',
            hide: false,
            check: false,
            title: '更新时间',
            minWidth: 130,
            textAlign: 'left'
          },
          {
            key: 'operateName',
            hide: false,
            check: false,
            title: '关联优化师',
            minWidth: 130,
            textAlign: 'left'
          },
          {
            key: 'feedQuotaRate',
            hide: false,
            check: false,
            title: '所有广告配额使用进度',
            minWidth: 160,
            textAlign: 'left'
          },
          {
            key: 'feedMaxCostInfo',
            hide: false,
            check: false,
            title: '所有广告最高月消耗',
            minWidth: 160,
            textAlign: 'right'
          },
          {
            key: 'searchQuotaRate',
            hide: false,
            check: false,
            title: '搜索广告配额使用进度',
            minWidth: 160,
            textAlign: 'left'
          },
          {
            key: 'searchMaxCostInfo',
            hide: false,
            check: false,
            title: '搜索广告最高月消耗',
            minWidth: 160,
            textAlign: 'right'
          },
          {
            key: 'accountDeliveryokRate',
            hide: false,
            slot: 'accountDeliveryokRate',
            check: true,
            title: '低效广告率',
            minWidth: 200,
            textAlign: 'right'
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
        key: 'showData',
        hide: false,
        check: true,
        title: '展示数据',
        textAlign: 'right',
        children: [
          {
            key: 'cost',
            hide: false,
            check: true,
            title: '总花费',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'show',
            hide: false,
            check: true,
            title: '展示数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'cpm',
            hide: false,
            check: true,
            title: '平均千次展现费用',
            minWidth: 130,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'click',
            hide: false,
            check: true,
            title: '点击数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'cpc',
            hide: false,
            check: true,
            title: '平均点击单价',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickRate',
            hide: false,
            check: true,
            title: '点击率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'convert',
        hide: false,
        check: true,
        title: '转化数据',
        textAlign: 'right',
        children: [
          {
            key: 'convert',
            hide: false,
            check: true,
            title: '转化数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'convertCost',
            hide: false,
            check: true,
            title: '转化成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickConvertRate',
            hide: false,
            check: true,
            title: '转化率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'deepConvert',
            hide: false,
            check: true,
            title: '深度转化数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'deepConvertCost',
            hide: false,
            check: true,
            title: '深度转化成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'deepConvertRate',
            hide: false,
            check: true,
            title: '深度转化率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'convertTime',
        hide: false,
        check: true,
        title: '转化数据（计费时间）',
        textAlign: 'right',
        children: [
          {
            key: 'attributionConvert',
            hide: false,
            check: true,
            title: '转化数（计费时间）',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionConvertCost',
            hide: false,
            check: true,
            title: '转化成本（计费时间）',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionDeepConvert',
            hide: false,
            check: true,
            title: '深度转化数（计费时间）',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionDeepConvertCost',
            hide: false,
            check: true,
            title: '深度转化成本（计费时间）',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'appConvert',
        hide: false,
        check: false,
        title: '应用下载广告数据',
        textAlign: 'right',
        children: [
          {
            key: 'downloadStart',
            hide: false,
            check: false,
            title: '安卓下载开始数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'downloadStartCost',
            hide: false,
            check: false,
            title: '安卓下载开始成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'downloadStartRate',
            hide: false,
            check: false,
            title: '安卓下载开始率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'downloadFinish',
            hide: false,
            check: false,
            title: '安卓下载完成数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'downloadFinishCost',
            hide: false,
            check: false,
            title: '安卓下载完成成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'downloadFinishRate',
            hide: false,
            check: false,
            title: '安卓下载完成率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickInstall',
            hide: false,
            check: false,
            title: '点击安装数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'installFinish',
            hide: false,
            check: false,
            title: '安卓安装完成数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'installFinishCost',
            hide: false,
            check: false,
            title: '安卓安装完成成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'installFinishRate',
            hide: false,
            check: false,
            title: '安卓安装完成率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'active',
            hide: false,
            check: false,
            title: '激活数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'activeCost',
            hide: false,
            check: false,
            title: '激活成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickActiveRate',
            hide: false,
            check: false,
            title: '激活率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'register',
            hide: false,
            check: false,
            title: '注册数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'registerCost',
            hide: false,
            check: false,
            title: '注册成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'registerRate',
            hide: false,
            check: false,
            title: '注册率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionNextDayOpenCnt',
            hide: false,
            check: false,
            title: '次留数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionNextDayOpenCost',
            hide: false,
            check: false,
            title: '次留成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionNextDayOpenRate',
            hide: false,
            check: false,
            title: '次留率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'gameAddiction',
            hide: false,
            check: false,
            title: '关键行为数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'gameAddictionCost',
            hide: false,
            check: false,
            title: '关键行为成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'gameAddictionRate',
            hide: false,
            check: false,
            title: '关键行为率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'payCount',
            hide: false,
            check: false,
            title: '首次付费次数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'payCountCost',
            hide: false,
            check: false,
            title: '首次付费成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'payCountRate',
            hide: false,
            check: false,
            title: '首次付费率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'loanCompletion',
            hide: false,
            check: false,
            title: '完件数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'loanCompletionCost',
            hide: false,
            check: false,
            title: '完件成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'loanCompletionRate',
            hide: false,
            check: false,
            title: '完件率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'preLoanCredit',
            hide: false,
            check: false,
            title: '预授信数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'preLoanCreditCost',
            hide: false,
            check: false,
            title: '预授信成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'loanCredit',
            hide: false,
            check: false,
            title: '授信数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'loanCreditCost',
            hide: false,
            check: false,
            title: '授信成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'loanCreditRate',
            hide: false,
            check: false,
            title: '授信率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'inAppUv',
            hide: false,
            check: false,
            title: 'APP内访问',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'inAppDetailUv',
            hide: false,
            check: false,
            title: 'APP内访问详情页',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'inAppCart',
            hide: false,
            check: false,
            title: 'APP内加入购物车',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'inAppPay',
            hide: false,
            check: false,
            title: 'APP内付费',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'inAppOrder',
            hide: false,
            check: false,
            title: 'APP内下单',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'gamePayCount',
            hide: false,
            check: false,
            title: '付费次数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'gamePayCost',
            hide: false,
            check: false,
            title: '付费成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionGamePay7dCount',
            hide: false,
            check: false,
            title: '7日付费次数（激活时间）',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionGamePay7dCost',
            hide: false,
            check: false,
            title: '7日付费成本（激活时间）',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention2dCnt',
            hide: false,
            check: false,
            title: '2日留存数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention2dCost',
            hide: false,
            check: false,
            title: '2日留存成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention2dRate',
            hide: false,
            check: false,
            title: '2日留存率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention3dCnt',
            hide: false,
            check: false,
            title: '3日留存数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention3dCost',
            hide: false,
            check: false,
            title: '3日留存成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention3dRate',
            hide: false,
            check: false,
            title: '3日留存率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention4dCnt',
            hide: false,
            check: false,
            title: '4日留存数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention4dCost',
            hide: false,
            check: false,
            title: '4日留存成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention4dRate',
            hide: false,
            check: false,
            title: '4日留存率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention5dCnt',
            hide: false,
            check: false,
            title: '5日留存数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention5dCost',
            hide: false,
            check: false,
            title: '5日留存成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention5dRate',
            hide: false,
            check: false,
            title: '5日留存率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention6dCnt',
            hide: false,
            check: false,
            title: '6日留存数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention6dCost',
            hide: false,
            check: false,
            title: '6日留存成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention6dRate',
            hide: false,
            check: false,
            title: '6日留存率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention7dCnt',
            hide: false,
            check: false,
            title: '7日留存数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention7dCost',
            hide: false,
            check: false,
            title: '7日留存成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention7dRate',
            hide: false,
            check: false,
            title: '7日留存率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention7dSumCnt',
            hide: false,
            check: false,
            title: '7日留存总数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionRetention7dTotalCost',
            hide: false,
            check: false,
            title: '7日留存总成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionActivePay7dPerCount',
            hide: false,
            check: false,
            title: '7日人均付费次数（激活时间）',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'page',
        hide: false,
        check: false,
        title: '落地页转化数据',
        textAlign: 'right',
        children: [
          {
            key: 'phone',
            hide: false,
            check: false,
            title: '点击电话按钮',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'form',
            hide: false,
            check: false,
            title: '表单提交',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'advancedCreativeFormSubmit',
            hide: false,
            check: false,
            title: '附加创意表单提交',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'mapSearch',
            hide: false,
            check: false,
            title: '地图搜索',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'button',
            hide: false,
            check: false,
            title: '按钮button',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'view',
            hide: false,
            check: false,
            title: '关键页面浏览',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'download',
            hide: false,
            check: false,
            title: '下载开始',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'qq',
            hide: false,
            check: false,
            title: 'QQ咨询',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lottery',
            hide: false,
            check: false,
            title: '抽奖',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'vote',
            hide: false,
            check: false,
            title: '投票',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'message',
            hide: false,
            check: false,
            title: '短信咨询',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'redirect',
            hide: false,
            check: false,
            title: '页面跳转',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'shopping',
            hide: false,
            check: false,
            title: '商品购买',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'consult',
            hide: false,
            check: false,
            title: '在线咨询',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wechat',
            hide: false,
            check: false,
            title: '微信复制',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'phoneConfirm',
            hide: false,
            check: false,
            title: '智能电话确认拨打',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'phoneConnect',
            hide: false,
            check: false,
            title: '智能电话确认接通',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'phoneEffective',
            hide: false,
            check: false,
            title: '智能电话有效接通',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'consultEffective',
            hide: false,
            check: false,
            title: '有效咨询',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'coupon',
            hide: false,
            check: false,
            title: '建站卡券领取',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'couponSinglePage',
            hide: false,
            check: false,
            title: '卡券页领取',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'redirectToShop',
            hide: false,
            check: false,
            title: '调起店铺',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'poiAddressClick',
            hide: false,
            check: false,
            title: '查看店铺地址',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'poiCollect',
            hide: false,
            check: false,
            title: '店铺收藏',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wechatLoginCount',
            hide: false,
            check: false,
            title: '微信内注册数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wechatLoginCost',
            hide: false,
            check: false,
            title: '微信内注册成本',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wechatFirstPayCount',
            hide: false,
            check: false,
            title: '微信内首次付费数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wechatFirstPayCost',
            hide: false,
            check: false,
            title: '微信内首次付费成本',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wechatFirstPayRate',
            hide: false,
            check: false,
            title: '微信内首次付费率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wechatPayAmount',
            hide: false,
            check: false,
            title: '微信内首次付费金额',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'pageStore',
        hide: false,
        check: false,
        title: '落地页及门店数据',
        textAlign: 'right',
        children: [
          {
            key: 'liveComponentClickCount',
            hide: false,
            check: false,
            title: '直播间组件点击数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'liveComponentClickCost',
            hide: false,
            check: false,
            title: '直播间组件点击成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'validPlayList',
        hide: false,
        check: false,
        title: '视频数据',
        textAlign: 'right',
        children: [
          {
            key: 'totalPlay',
            hide: false,
            check: false,
            title: '播放数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'validPlay',
            hide: false,
            check: false,
            title: '有效播放数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'validPlayCost',
            hide: false,
            check: false,
            title: '有效播放成本',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'validPlayRate',
            hide: false,
            check: false,
            title: '有效播放率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'play25FeedBreak',
            hide: false,
            check: false,
            title: '25%进度播放数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'play50FeedBreak',
            hide: false,
            check: false,
            title: '50%进度播放数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'play75FeedBreak',
            hide: false,
            check: false,
            title: '75%进度播放数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'play100FeedBreak',
            hide: false,
            check: false,
            title: '99%进度播放数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'averagePlayTimePerPlay',
            hide: false,
            check: false,
            title: '平均单次播放时长',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'playOverRate',
            hide: false,
            check: false,
            title: '播完率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wifiPlayRate',
            hide: false,
            check: false,
            title: 'WiFi播放占比',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'wifiPlay',
            hide: false,
            check: false,
            title: 'WiFi播放量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'playDurationSum',
            hide: false,
            check: false,
            title: '播放时长，单位ms',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'cardShow',
            hide: false,
            check: false,
            title: '3秒卡片展现数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'advancedCreative',
        hide: false,
        check: false,
        title: '附件创意',
        textAlign: 'right',
        children: [
          {
            key: 'advancedCreativePhoneClick',
            hide: false,
            check: false,
            title: '附加创意电话按钮点击',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'advancedCreativeCounselClick',
            hide: false,
            check: false,
            title: '附加创意在线咨询点击',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'advancedCreativeFormClick',
            hide: false,
            check: false,
            title: '附加创意表单按钮点击',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'advancedCreativeCouponAddition',
            hide: false,
            check: false,
            title: '附加创意卡券领取',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'interactive',
        hide: false,
        check: false,
        title: '互动数据',
        textAlign: 'right',
        children: [
          {
            key: 'share',
            hide: false,
            check: false,
            title: '分享数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'comment',
            hide: false,
            check: false,
            title: '评论数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'like',
            hide: false,
            check: false,
            title: '点赞数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'follow',
            hide: false,
            check: false,
            title: '新增关注数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'homeVisited',
            hide: false,
            check: false,
            title: '主页访问量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'iesChallengeClick',
            hide: false,
            check: false,
            title: '挑战赛查看数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'iesMusicClick',
            hide: false,
            check: false,
            title: '音乐查看数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'locationClick',
            hide: false,
            check: false,
            title: 'POI点击数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'messageAction',
            hide: false,
            check: false,
            title: '私信数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickLandingPage',
            hide: false,
            check: false,
            title: '推广页访问量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickShopwindow',
            hide: false,
            check: false,
            title: '主页商品橱窗访问量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickWebsite',
            hide: false,
            check: false,
            title: '主页内落地页橱窗访问量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickDownload',
            hide: false,
            check: false,
            title: '主页下载链接点击量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickCallDy',
            hide: false,
            check: false,
            title: '主页内电话拨打点击量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'live',
        hide: false,
        check: false,
        title: '直播间数据',
        textAlign: 'right',
        children: [
          {
            key: 'lubanLiveEnterCnt',
            hide: false,
            check: false,
            title: '直播间观看数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'liveWatchOneMinuteCount',
            hide: false,
            check: false,
            title: '直播间超过1分钟观看数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLiveFollowCnt',
            hide: false,
            check: false,
            title: '直播间关注数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'liveFansClubJoinCnt',
            hide: false,
            check: false,
            title: '直播间加入粉丝团',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLiveCommentCnt',
            hide: false,
            check: false,
            title: '直播间评论数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLiveShareCnt',
            hide: false,
            check: false,
            title: '直播间分享数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLiveGiftCnt',
            hide: false,
            check: false,
            title: '直播间打赏次数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLiveGiftAmount',
            hide: false,
            check: false,
            title: '直播间礼物总金额',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLiveSlidecartClickCnt',
            hide: false,
            check: false,
            title: '直播间查看购物车数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLiveClickProductCnt',
            hide: false,
            check: false,
            title: '直播间点击商品数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLivePayOrderCount',
            hide: false,
            check: false,
            title: '直播间订单量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanLivePayOrderStatCost',
            hide: false,
            check: false,
            title: '直播间订单金额',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'shop',
        hide: false,
        check: false,
        title: '行业指标-电商行业',
        textAlign: 'right',
        children: [
          {
            key: 'lubanOrderCnt',
            hide: false,
            check: false,
            title: '鲁班订单量',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanOrderStatAmount',
            hide: false,
            check: false,
            title: '鲁班订单金额',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'lubanOrderRoi',
            hide: false,
            check: false,
            title: '鲁班订单ROI',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'game',
        hide: false,
        check: false,
        title: '游戏行业',
        textAlign: 'right',
        children: [
          {
            key: 'attributionActivePayIntraOneDayCount',
            hide: false,
            check: false,
            title: '激活后24h首次付费数',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionActivePayIntraOneDayCost',
            hide: false,
            check: false,
            title: '激活后24h首次付费成本',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionActivePayIntraOneDayRate',
            hide: false,
            check: false,
            title: '激活后24h首次付费率',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionActivePayIntraOneDayAmount',
            hide: false,
            check: false,
            title: '激活后24h付费金额',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionActivePayIntraOneDayRoi',
            hide: false,
            check: false,
            title: '激活后24小时付费ROI',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionMicroGame0dLtv',
            hide: false,
            check: false,
            title: '小游戏当日LTV',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionMicroGame3dLtv',
            hide: false,
            check: false,
            title: '小游戏激活后三日LTV',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionMicroGame7dLtv',
            hide: false,
            check: false,
            title: '小游戏激活后七日LTV',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionGameInAppLtv1day',
            hide: false,
            check: false,
            title: '当日付费金额',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionMicroGame3dRoi',
            hide: false,
            check: false,
            title: '小游戏激活后三日广告变现ROI',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionMicroGame7dRoi',
            hide: false,
            check: false,
            title: '小游戏激活后七日广告变现ROI',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionMicroGame0dRoi',
            hide: false,
            check: false,
            title: '小游戏当日广告变现ROI',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'attributionGameInAppRoi1day',
            hide: false,
            check: false,
            title: '当日付费ROI',
            minWidth: 120,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      }
    ]
  },
  {
    key: 'customization',
    hide: false,
    check: true,
    title: '自定义指标',
    children: [
      {
        key: 'customAttribute',
        hide: false,
        check: true,
        title: '自定义属性',
        minWidth: 120,
        textAlign: 'right',
        children: [
          {
            key: 'user2268Attribute20230811105938',
            hide: false,
            check: false,
            title: '444',
            disabled: false,
            minWidth: 120,
            hoverNotes: '+12总花费展示数',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811175751',
            hide: false,
            check: false,
            title: '121212',
            disabled: false,
            minWidth: 120,
            hoverNotes: '平均点击单价+展示数',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811183935',
            hide: false,
            check: false,
            title: '332323',
            disabled: false,
            minWidth: 120,
            hoverNotes: '平均千次展现费用-点击数',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811184120',
            hide: false,
            check: false,
            title: '6767676',
            disabled: false,
            minWidth: 120,
            hoverNotes: '点击率转化数',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811184321',
            hide: false,
            check: false,
            title: '234234',
            disabled: false,
            minWidth: 120,
            hoverNotes: '点击数-总花费',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811184615',
            hide: false,
            check: false,
            title: '22332333333',
            disabled: false,
            minWidth: 120,
            hoverNotes: '总花费+展示数',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811184728',
            hide: false,
            check: false,
            title: '66655555',
            disabled: false,
            minWidth: 120,
            hoverNotes: '平均千次展现费用+转化数',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811184835',
            hide: false,
            check: false,
            title: '77777',
            disabled: false,
            minWidth: 120,
            hoverNotes: '点击数-展示数',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811184924',
            hide: false,
            check: false,
            title: '44444',
            disabled: false,
            minWidth: 120,
            hoverNotes: '点击数-转化数',
            textAlign: 'right'
          },
          {
            key: 'user2268Attribute20230811184957',
            hide: false,
            check: false,
            title: '1212121212',
            disabled: false,
            minWidth: 120,
            hoverNotes: '点击数平均千次展现费用-',
            textAlign: 'right'
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
        title: '监测基础指标',
        textAlign: 'right',
        children: [
          {
            key: 'numImpression',
            hide: false,
            check: false,
            title: '展示总数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickCount',
            hide: false,
            check: false,
            title: '点击',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickRateTkio',
            hide: false,
            check: false,
            title: '点击率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numClick',
            hide: false,
            check: false,
            title: '有效点击总数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumClickAll',
            hide: false,
            check: false,
            title: '排重点击数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumClickDay',
            hide: false,
            check: false,
            title: '按天排重点击数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numInstall',
            hide: false,
            check: false,
            title: '排重激活设备数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'clickActiveRateTkio',
            hide: false,
            check: false,
            title: '激活率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dau',
            hide: false,
            check: false,
            title: 'DAU',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'mau',
            hide: false,
            check: false,
            title: 'MAU',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'monitoringConversionList',
        hide: false,
        check: false,
        title: '监测转化指标',
        textAlign: 'right',
        children: [
          {
            key: 'numIntradayReged',
            hide: false,
            check: false,
            title: '当天激活且注册设备数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumRegedDay',
            hide: false,
            check: false,
            title: '按天排重注册数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumRegedMon',
            hide: false,
            check: false,
            title: '排重注册设备数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'registerRateTkio',
            hide: false,
            check: false,
            title: '注册率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'logdevice',
            hide: false,
            check: false,
            title: '按天排重登录设备数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'monitoringFakeList',
        hide: false,
        check: false,
        title: '监测异常数据',
        textAlign: 'right',
        children: [
          {
            key: 'numClickFake',
            hide: false,
            check: false,
            title: '异常点击总数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numClickFakeRate',
            hide: false,
            check: false,
            title: '异常点击率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numInstallFake',
            hide: false,
            check: false,
            title: '异常激活总数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numInstallFakeRate',
            hide: false,
            check: false,
            title: '异常激活率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'monitoringNewuserList',
        hide: false,
        check: false,
        title: '监测留存指标',
        textAlign: 'right',
        children: [
          {
            key: 'numNewuserRetenD1',
            hide: false,
            check: false,
            title: 'D1留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD2',
            hide: false,
            check: false,
            title: 'D2留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD3',
            hide: false,
            check: false,
            title: 'D3留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD4',
            hide: false,
            check: false,
            title: 'D4留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD5',
            hide: false,
            check: false,
            title: 'D5留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD6',
            hide: false,
            check: false,
            title: 'D6留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD7',
            hide: false,
            check: false,
            title: 'D7留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD14',
            hide: false,
            check: false,
            title: 'D14留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD30',
            hide: false,
            check: false,
            title: 'D30留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD45',
            hide: false,
            check: false,
            title: 'D45留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD60',
            hide: false,
            check: false,
            title: 'D60留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numNewuserRetenD90',
            hide: false,
            check: false,
            title: 'D90留存',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'monitoringIncomeList',
        hide: false,
        check: false,
        title: '监测付费指标',
        textAlign: 'right',
        children: [
          {
            key: 'amtIncomeRegion',
            hide: false,
            check: false,
            title: '区间付费',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'amtIncomeRegionRoi',
            hide: false,
            check: false,
            title: '区间付费ROI',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'amtIncomeNewUser',
            hide: false,
            check: false,
            title: '新增付费',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numPayerNewUser',
            hide: false,
            check: false,
            title: '新增付费设备数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'amtIncomeNewUserRoi',
            hide: false,
            check: false,
            title: '新增付费ROI',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'amtIncomeAllUser',
            hide: false,
            check: false,
            title: '总付费',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numPayerAllUser',
            hide: false,
            check: false,
            title: '总付费设备数',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'amtIncomeAllUserRoi',
            hide: false,
            check: false,
            title: '总付费ROI',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numPayerAllUserRate',
            hide: false,
            check: false,
            title: '新增日付费率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'arpdau',
            hide: false,
            check: false,
            title: 'ARPDAU',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'arppu',
            hide: false,
            check: false,
            title: 'ARPPU',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numPayerAllUserDauRate',
            hide: false,
            check: false,
            title: '活跃设备付费率',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'monitoringAvgCostList',
        hide: false,
        check: false,
        title: '监测平均成本指标',
        textAlign: 'right',
        children: [
          {
            key: 'numInstallCost',
            hide: false,
            check: false,
            title: '平均激活成本',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumRegedMonCost',
            hide: false,
            check: false,
            title: '平均注册成本',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numPayerNewUserCost',
            hide: false,
            check: false,
            title: '平均付费成本',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'd1Cost',
            hide: false,
            check: false,
            title: '平均次留成本',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'monitoringLTVList',
        hide: false,
        check: false,
        title: '监测LTV数据',
        textAlign: 'right',
        children: [
          {
            key: 'ltv0',
            hide: false,
            check: false,
            title: 'LTV0',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv1',
            hide: false,
            check: false,
            title: 'LTV1',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv2',
            hide: false,
            check: false,
            title: 'LTV2',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv3',
            hide: false,
            check: false,
            title: 'LTV3',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv4',
            hide: false,
            check: false,
            title: 'LTV4',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv5',
            hide: false,
            check: false,
            title: 'LTV5',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv6',
            hide: false,
            check: false,
            title: 'LTV6',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv7',
            hide: false,
            check: false,
            title: 'LTV7',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv14',
            hide: false,
            check: false,
            title: 'LTV14',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv30',
            hide: false,
            check: false,
            title: 'LTV30',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv45',
            hide: false,
            check: false,
            title: 'LTV45',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv60',
            hide: false,
            check: false,
            title: 'LTV60',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv90',
            hide: false,
            check: false,
            title: 'LTV90',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv120',
            hide: false,
            check: false,
            title: 'LTV120',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv150',
            hide: false,
            check: false,
            title: 'LTV150',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'ltv180',
            hide: false,
            check: false,
            title: 'LTV180',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'monitoringDupnumEventList',
        hide: false,
        check: false,
        title: '自定义事件（排重数)',
        textAlign: 'right',
        children: [
          {
            key: 'dupnumEvent1',
            hide: false,
            check: false,
            title: '事件1',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent2',
            hide: false,
            check: false,
            title: '事件2',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent3',
            hide: false,
            check: false,
            title: '事件3',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent4',
            hide: false,
            check: false,
            title: '事件4',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent5',
            hide: false,
            check: false,
            title: '事件5',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent6',
            hide: false,
            check: false,
            title: '事件6',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent7',
            hide: false,
            check: false,
            title: '事件7',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent8',
            hide: false,
            check: false,
            title: '事件8',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent9',
            hide: false,
            check: false,
            title: '事件9',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent10',
            hide: false,
            check: false,
            title: '事件10',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent11',
            hide: false,
            check: false,
            title: '事件11',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'dupnumEvent12',
            hide: false,
            check: false,
            title: '事件12',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      },
      {
        key: 'monitoringNumEventList',
        hide: false,
        check: false,
        title: '自定义事件（总次数)',
        textAlign: 'right',
        children: [
          {
            key: 'numEvent1',
            hide: false,
            check: false,
            title: '事件1',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent2',
            hide: false,
            check: false,
            title: '事件2',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent3',
            hide: false,
            check: false,
            title: '事件3',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent4',
            hide: false,
            check: false,
            title: '事件4',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent5',
            hide: false,
            check: false,
            title: '事件5',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent6',
            hide: false,
            check: false,
            title: '事件6',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent7',
            hide: false,
            check: false,
            title: '事件7',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent8',
            hide: false,
            check: false,
            title: '事件8',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent9',
            hide: false,
            check: false,
            title: '事件9',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent10',
            hide: false,
            check: false,
            title: '事件10',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent11',
            hide: false,
            check: false,
            title: '事件11',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          },
          {
            key: 'numEvent12',
            hide: false,
            check: false,
            title: '事件12',
            minWidth: 100,
            sortable: 'custom',
            textAlign: 'right'
          }
        ]
      }
    ]
  }
]
