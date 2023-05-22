export const tableColumns = [
  {
    title: '',
    type: 'selection',
    width: 64,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '定向包名称',
    key: 'targetName',
    minWidth: 160,
    fixed: 'left',
    slot: 'targetName'
  },
  {
    title: '定向包描述',
    key: 'targetRemark',
    minWidth: 240,
    fixed: 'left',
    slot: 'targetRemark'
  },
  {
    title: '操作',
    key: 'operation',
    width: 180,
    fixed: 'left',
    slot: 'operation'
  },
  {
    title: '投放账户',
    key: 'mediaAccountName',
    minWidth: 160
  },
  {
    title: '使用范围',
    key: 'targetScope',
    minWidth: 120
  },
  {
    title: '投放状态',
    key: 'deliveryStatus',
    minWidth: 96,
    slot: 'deliveryStatus'
  },
  {
    title: '推广目标',
    key: 'promoteTarget',
    minWidth: 120
  },
  {
    title: '定向方式',
    key: 'autoTarget',
    minWidth: 120
  },
  {
    title: '最近一次关联广告组',
    key: 'unitCount',
    width: 160,
    slot: 'unitCount'
  },
  {
    title: '更新时间',
    key: 'gmtModified',
    width: 160
  }
]
export const tableMockData = [
  {
    adsTargetId: 9879,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2022-06-08 17:11:02',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: 1151,
    mediaAccountName: '5546852(建国7279)',
    platform: '1',
    promoteTarget: '提升应用安装',
    targetName: '这个是标准名称',
    targetRemark: '如果这是一个很长的文本',
    targetScope: '单账号',
    unitCount: 1
  },
  {
    adsTargetId: 7164,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2022-06-08 17:10:07',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: 94,
    mediaAccountName: '广州酷狗计算机科技有限公司(2148501600)',
    platform: '1',
    promoteTarget: '提升应用安装',
    targetName: '这是两行单行的定向包名称',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '单账号',
    unitCount: 20
  },
  {
    adsTargetId: 7187,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2022-05-25 11:39:29',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '广州酷狗计算机科技有限公司(2148501600)',
    platform: '1',
    promoteTarget: '提升应用安装',
    targetName: '这个是超出了两行的定向包名称，会出现省略符号222222222222222222',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 9612,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'fail', name: '失败' },
    errorMsg: '',
    gmtModified: '2022-05-16 16:43:45',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '广州酷狗计算机科技有限公司(2148501600)',
    platform: '1',
    promoteTarget: '提升应用安装',
    targetName: '1默认定向',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 8262,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'fail', name: '失败' },
    errorMsg: '',
    gmtModified: '2022-02-15 18:44:09',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '广州酷狗计算机科技有限公司(2148501600)',
    platform: '1',
    promoteTarget: '提升应用安装',
    targetName: 'ttt',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 8261,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'fail', name: '失败' },
    errorMsg: '',
    gmtModified: '2022-02-15 18:43:46',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '广州酷狗计算机科技有限公司(2148501600)',
    platform: '1',
    promoteTarget: '提升应用安装',
    targetName: 'test11',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 7202,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'loading', name: '投放中' },
    errorMsg: '',
    gmtModified: '2021-11-25 10:56:22',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: 19783788,
    mediaAccountName: '10077786(客户账号小说，慎用！！)',
    platform: '0',
    promoteTarget: '收集销售线索',
    targetName: 'test_111',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '单账号',
    unitCount: 0
  },
  {
    adsTargetId: 7166,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'loading', name: '投放中' },
    errorMsg: '',
    gmtModified: '2021-11-18 15:42:38',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '10077786(客户账号小说，慎用！！)',
    platform: '1',
    promoteTarget: '提升应用安装',
    targetName: '测试1-副本',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 7165,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'loading', name: '投放中' },
    errorMsg: '',
    gmtModified: '2021-11-18 15:41:43',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '10077786(客户账号小说，慎用！！)',
    platform: '1',
    promoteTarget: '提升应用安装',
    targetName: '测试1',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 7046,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2021-11-10 11:18:48',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '10077786(客户账号小说，慎用！！)',
    platform: '1',
    promoteTarget: '收集销售线索',
    targetName: 'test233',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 7052,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2021-11-10 11:15:21',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '10077786(客户账号小说，慎用！！)',
    platform: '1',
    promoteTarget: '收集销售线索',
    targetName: 'test222',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 6954,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2021-11-10 11:14:45',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '上海阅文信息技术有限公司(2341076088)',
    platform: '1',
    promoteTarget: '收集销售线索',
    targetName: 'test123333',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 6956,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2021-11-10 10:48:15',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '上海阅文信息技术有限公司(2341076088)',
    platform: '1',
    promoteTarget: '收集销售线索',
    targetName: '331',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 6955,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2021-11-04 10:55:58',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '上海阅文信息技术有限公司(2341076088)',
    platform: '1',
    promoteTarget: '收集销售线索',
    targetName: '23',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 6925,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2021-11-03 17:34:19',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '上海阅文信息技术有限公司(2341076088)',
    platform: '1',
    promoteTarget: '收集销售线索',
    targetName: 'test12',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 6483,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2021-10-12 18:52:58',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '上海阅文信息技术有限公司(2341076088)',
    platform: '0',
    promoteTarget: '收集销售线索',
    targetName: 'qeeee',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  },
  {
    adsTargetId: 6051,
    autoTarget: '自定义定向',
    deliveryStatus: { value: 'success', name: '成功' },
    errorMsg: '',
    gmtModified: '2021-08-31 10:51:55',
    hostingTarget: '',
    keyword: [],
    mediaAccountId: null,
    mediaAccountName: '上海阅文信息技术有限公司(2341076088)',
    platform: '1',
    promoteTarget: '收集销售线索',
    targetName: '1233',
    targetRemark:
      '如果这是一个很长的文本，那么最多也只能存在两行，然后超出的部分用省略号显示，当鼠标悬浮到文本上时，也会显示悬浮框',
    targetScope: '通用定向',
    unitCount: 0
  }
]
