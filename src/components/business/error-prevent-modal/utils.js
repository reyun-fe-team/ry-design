/**
 * 防出错校验
 * @param.ruleList 规则列表
 * @param.validateDataList 待校验数据列表
 * */
const ruleSet = ['position', 'goal', 'deepGoal', 'budgetPlan', 'budgetAd', 'bid', 'deepBid']
const ruleMap = new Map([
  [
    'position',
    {
      // 投放位置校验：data中包含任意一项rule的配置
      fn: (rule, row) => {
        let data = row['position']
        // console.log({ rule, data })

        let ruleText = rule.checkValue.map(e => e.label).join('、') || '-'
        let includes = rule.checkValue.filter(e => data.includes(e.value))

        // 错误=有校验规则&&没有一项在规则范围内
        let ruleError = rule.checkValue.length > 0 && includes.length === 0
        return {
          key: 'position',
          text: ruleText,
          error: ruleError
        }
      }
    }
  ],
  [
    'goal',
    {
      // 优化目标校验：data中包含任意一项rule的配置
      fn: (rule, row) => {
        let data = row['goal']
        // console.log('优化目标校验', { rule, data })

        let ruleText = rule.checkValue.map(e => e.label).join('、') || '-'
        let includes = rule.checkValue.filter(e => data.includes(e.value))

        // 错误=选择数据&&有规则&&没有一项在规则范围内
        let ruleError = data.length > 0 && rule.checkValue.length > 0 && includes.length === 0
        return {
          key: 'goal',
          text: ruleText,
          error: ruleError
        }
      }
    }
  ],
  [
    'deepGoal',
    {
      fn: (rule, row) => {
        let data = row['deepGoal']
        // console.log('深度优化目标校验', { rule, data })

        let ruleText = rule.checkValue.map(e => e.label).join('、') || '-'
        let includes = rule.checkValue.filter(e => data.includes(e.value))

        // 错误=选择数据&&有规则&&不在规则范围内。
        let ruleError = data.length > 0 && rule.checkValue.length > 0 && includes.length === 0
        return {
          key: 'deepGoal',
          text: ruleText,
          error: ruleError
        }
      }
    }
  ],
  [
    'bid',
    {
      fn: (rule, row) => {
        let data = row['bid']
        // console.log('出价校验', { rule, row, data })

        let result = []

        // 不限：0, 统一：最小，分别：最大最小
        let min = Math.min(...data)
        let max = Math.max(...data)
        // 优化目标和出价一起校验：row.goal, 只校验出价：row.bidGoal
        let bidGoal = row.goal || row.bidGoal || []

        // console.log('出价校验', { min, max })

        // 仅校验符合优化目标的出价
        let checkValue = rule.checkValue.filter(f => bidGoal.includes(f.goal.value))
        checkValue.forEach(e => {
          // 判断优化目标
          //   console.log('一条数据', { row })

          let bool = validateNumber(e.bidType.value, e.value, [min, max])
          let text = validateNumberText(e)
          result.push({
            text,
            error: !bool
          })
        })

        // 错误=有符合的校验规则&&校验结果任意一项错误
        let ruleError = checkValue.length > 0 && result.some(e => e.error)
        return {
          key: 'bid',
          text: result,
          error: ruleError
        }
      }
    }
  ],
  [
    'deepBid',
    {
      fn: (rule, row) => {
        let data = row['deepBid']
        // console.log('深度出价校验', { rule, row, data })

        let result = []
        // 不限：0, 统一：最小，分别：最大最小
        let min = Math.min(...data)
        let max = Math.max(...data)
        let deepGoal = row.deepGoal || row.deepBidDeepGoal || []

        let checkValue = rule.checkValue.filter(f => deepGoal.includes(f.deepGoal.value))

        // console.log('深度出价校验规则列表', checkValue)

        checkValue.forEach(e => {
          let bool = validateNumber(e.bidType.value, e.value, [min, max])
          let text = validateNumberText(e)
          result.push({
            text,
            error: !bool
          })
        })

        // console.log('深度出价校验结果', { result })
        // 错误=有符合的校验规则&&校验结果任意一项错误
        let ruleError = checkValue.length > 0 && result.every(e => e.error)
        // console.log('深度出价校验结果', { ruleError })
        return {
          key: 'deepBid',
          text: result,
          error: ruleError
        }
      }
    }
  ],
  [
    'budgetPlan',
    {
      fn: (rule, row) => {
        let data = row['budgetPlan']
        // console.log('预算校验', { rule, data })

        let result = []
        // 不限：0, 统一：最小，分别：最大最小
        let min = Math.min(...data)
        let max = Math.max(...data)

        rule.checkValue.forEach(e => {
          if (e.isNone) {
            result.push({
              text: '不限',
              error: false
            })
          }
          // 不可以使用不限，则校验
          if (!e.isNone) {
            let check = validateNumber(e.bidType.value, e.value, [min, max])
            let text = validateNumberText(e)
            result.push({
              text,
              error: !check
            })
          }
        })

        // 错误=有校验规则&&检查结果任意一项错误
        let ruleError = rule.checkValue.length > 0 && result.some(e => e.error)
        return {
          key: 'budgetPlan',
          text: result,
          error: ruleError
        }
      }
    }
  ],
  [
    'budgetAd',
    {
      fn: (rule, row) => {
        let data = row['budgetAd']
        console.log('广告预算校验', { rule, row, data })

        let result = []
        // 不限：0, 统一：最小，分别：最大最小
        let min = Math.min(...data)
        let max = Math.max(...data)

        // console.log({ min, max })

        rule.checkValue.forEach(e => {
          if (e.isNone) {
            result.push({
              text: '不限',
              error: false
            })
          }
          // 不可以使用不限，则校验
          if (!e.isNone) {
            let check = validateNumber(e.bidType.value, e.value, [min, max])
            let text = validateNumberText(e)
            result.push({
              text,
              error: !check
            })
          }
        })

        // 错误=有校验规则&&检查结果任意一项错误
        let ruleError = rule.checkValue.length > 0 && result.some(e => e.error)
        return {
          key: 'budgetAd',
          text: result,
          error: ruleError
        }
      }
    }
  ]
])

export const errorPreventValidate = ({ ruleList, validateDataList }) => {
  console.log('校验的规则', { ruleList })
  console.log('需要校验的数据', { validateDataList })
  console.log('---------------------------')

  let result = [] // 校验结果
  // 需要校验的指标
  let validateKeys = Object.keys(validateDataList[0])

  ruleList.forEach(item => {
    let singleRuleResult = {
      id: item.id,
      name: item.name,
      visible: false,
      tBody: []
    }
    item.mediaAccountIds.forEach(account => {
      let row = {
        accountLabel: account.accountName,
        objectLabel: item.objectLabel
      }
      validateDataList.forEach(data => {
        ruleSet
          .filter(r => validateKeys.includes(r))
          .forEach(key => {
            let rule = item.ruleJSON.find(f => f.key === key)
            let validate = ruleMap.get(key).fn(rule, data)
            if (validate) {
              row = Object.assign({}, row, { [validate.key]: validate })
            }
          })
        singleRuleResult.tBody.push(row)
      })
    })
    result.push(singleRuleResult)
  })

  let table = transformResultData(result)
  return {
    table,
    message: table.length > 0
  }
}

// 数字校验
function validateNumber(type, [rangeMin, rangeMax], [min, max]) {
  // 大于
  if (type === 'GT') {
    return max > rangeMin
  }
  // 小于
  if (type === 'LT') {
    return min < rangeMin
  }
  // 介于
  if (type === 'BETWEEN') {
    return min >= rangeMin && max <= rangeMax
  }
}
// 数字校验提示
function validateNumberText(item) {
  let type = item.bidType.value
  let label = item.bidType.label
  let text = ''
  // 大于
  if (type === 'GT') {
    text = `${label}: ${item.value[0]} ${item.unit}`
  }
  // 小于
  if (type === 'LT') {
    text = `${label}: ${item.value[0]} ${item.unit}`
  }
  // 介于
  if (type === 'BETWEEN') {
    text = `${label}: ${item.value[0]}~${item.value[1]} ${item.unit}`
  }

  return text
}
// 转换校验结果数据，返回弹窗结果
function transformResultData(data) {
  data.forEach(item => {
    item.tBody = item.tBody.filter(row => {
      let visible = false
      for (let [, value] of Object.entries(row)) {
        if (value.error) {
          visible = true
          break
        }
      }
      return visible
    })
    item.visible = item.tBody.length > 0
  })

  console.log('校验结果原数据', data)
  // 过滤不可见的
  return data.filter(f => f.visible)
}
