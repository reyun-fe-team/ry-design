export const TIME_FORMAT = 'YYYY-MM-DD HH:mm'

export const MappingMedia = new Map([
  ['baidu', { CAMPAIGN: '计划', PLAN: '单元' }],
  ['kuaishou', { CAMPAIGN: '广告计划', PLAN: '广告组' }],
  ['toutiao', { CAMPAIGN: '项目', PLAN: '广告' }],
  ['gdtV30', { CAMPAIGN: '广告', PLAN: '创意' }],
  ['bilibili', { CAMPAIGN: '广告计划', PLAN: '广告单元' }]
])

export const MapSubmitRule = new Map([
  ['NOW'],
  ['DELAY'],
  [
    'BATCH',
    {
      timeList: [
        { value: 'FIVE_MINUTE', label: '5分钟' },
        { value: 'TEN_MINUTE', label: '10分钟' },
        { value: 'FIFTEEN_MINUTE', label: '15分钟' },
        { value: 'TWENTY_MINUTE', label: '20分钟' },
        { value: 'THIRTY_MINUTE', label: '30分钟' },
        { value: 'FORTY_MINUTE', label: '40分钟' },
        { value: 'FORTY_FIVE_MINUTE', label: '45分钟' },
        { value: 'FIFTY_MINUTE', label: '50分钟' },
        { value: 'ONE_HOUR', label: '60分钟' },
        { value: 'TWO_HOUR', label: '2小时' },
        { value: 'FOUR_HOUR', label: '4小时' },
        { value: 'SIX_HOUR', label: '6小时' },
        { value: 'TWELVE_HOUR', label: '12小时' },
        { value: 'EIGHTEEN_HOUR', label: '18小时' },
        { value: 'TWENTY_FOUR_HOUR', label: '24小时' },
        { value: 'THIRTY_SIX_HOUR', label: '36小时' },
        { value: 'TWO_DAY', label: '2天' },
        { value: 'THREE_DAY', label: '3天' },
        { value: 'FOUR_DAY', label: '4天' },
        { value: 'FIVE_DAY', label: '5天' },
        { value: 'SIX_DAY', label: '6天' }
      ]
    }
  ],
  [
    'REPEAT',
    {
      timeList: [
        { value: 'FIVE_MINUTE', label: '5分钟' },
        { value: 'TEN_MINUTE', label: '10分钟' },
        { value: 'FIFTEEN_MINUTE', label: '15分钟' },
        { value: 'THIRTY_MINUTE', label: '30分钟' },
        { value: 'FORTY_FIVE_MINUTE', label: '45分钟' },
        { value: 'ONE_HOUR', label: '1小时' },
        { value: 'THREE_HOUR', label: '3小时' },
        { value: 'SIX_HOUR', label: '6小时' },
        { value: 'TWELVE_HOUR', label: '12小时' },
        { value: 'TWENTY_FOUR_HOUR', label: '24小时' }
      ]
    }
  ]
])

export function getSubmitRuleList(mediaCode, dimension) {
  let label = getDimensionLabel(mediaCode, dimension)
  let planLabel = getPlanLabel(mediaCode)
  return [
    { label: '立即提交', value: 'NOW', disabled: false },
    {
      label: '定时提交',
      value: 'DELAY',
      tooltip: '全部广告按下方设置时间提交创建',
      disabled: false
    },
    {
      label: '分批提交',
      value: 'BATCH',
      tooltip: `全部${label}按下方规则分批次提交创建，第一批保存后立即创建`,
      disabled: false
    },
    {
      label: '重复提交',
      value: 'REPEAT',
      tooltip: `全部${planLabel}按下方规则重复多次创建（为避免创意名称重复，我们将为您自动增加时间后缀）`,
      disabled: false
    }
  ]
}

export function getSubmitDimensionList(mediaCode) {
  return [
    { label: getCampaignLabel(mediaCode), value: 'CAMPAIGN' },
    { label: getPlanLabel(mediaCode), value: 'PLAN' }
  ]
}

export function getAdsMoreAccountList(mediaCode, dimension) {
  let label = getDimensionLabel(mediaCode, dimension)
  return [
    {
      label: '关闭',
      value: 'OFF',
      tooltip: `所有账户统一按照预览区生成的${label}顺序分批次提交`
    },
    { label: '开启', value: 'ON', tooltip: `所有账户同时按批次提交相同数量的${label}` }
  ]
}

export function getDimensionLabel(mediaCode, dimension) {
  return MappingMedia.get(mediaCode)[dimension]
}

export function getCampaignLabel(mediaCode) {
  return MappingMedia.get(mediaCode).CAMPAIGN
}

export function getPlanLabel(mediaCode) {
  return MappingMedia.get(mediaCode).PLAN
}
