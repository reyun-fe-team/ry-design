

props 

* getRuleList 获取规则列表

使用方式
```
paramsRuleList = { mediaCodes: [], mediaAccountIds: [] }
validateDataList = [{ 
    position: [],  // 投放位置
    goal: [], // 优化目标
    deepGoal: [], // 深度优化目标
    bid: [], // 出价
    deepBid: [], // 深度出价
    budgetPlan: [], // 项目预算
    budgetAd: [], // 广告预算
}]
await this.$refs.refErrorPreventModal.onErrorPrevent({paramsRuleList,validateDataList})

返回promise
```