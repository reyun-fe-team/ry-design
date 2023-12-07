export const mockRuleList = [
  //   {
  //     id: '001',
  //     name: '规则1',
  //     objectType: 'app',
  //     objectLabel: '项目：项目名称',
  //     ruleJSON: [
  //       {
  //         key: 'position',
  //         name: '可选投放位置',
  //         checkValue: [
  //           { value: '7', label: '信息流广告' },
  //           { value: '6', label: '上下滑大屏广告' }
  //         ]
  //       },
  //       {
  //         key: 'bid',
  //         name: '出价限制',
  //         checkValue: [
  //           {
  //             goal: { value: 'PAY', label: '购买' },
  //             bidType: { value: 'BETWEEN', label: '介于' },
  //             value: [1, 10],
  //             unit: '元'
  //           },
  //           {
  //             goal: { value: 'PAY', label: '购买' },
  //             bidType: { value: 'BETWEEN', label: '介于' },
  //             value: [2, 11],
  //             unit: '元'
  //           }
  //         ]
  //       },
  //       {
  //         key: 'deepBid',
  //         name: '深度出价限制',
  //         checkValue: [
  //           {
  //             deepGoal: { value: 'PAY', label: '购买' },
  //             bidType: { value: 'LT', label: '介于' },
  //             value: [0],
  //             unit: '元'
  //           }
  //         ]
  //       },
  //       {
  //         key: 'budgetPlan',
  //         name: '项目预算限制',
  //         checkValue: [
  //           {
  //             bidType: { value: 'LT', label: '小于' },
  //             value: [1],
  //             unit: '元',
  //             isNone: false
  //           }
  //         ]
  //       },
  //       {
  //         key: 'budgetAd',
  //         name: '广告预算限制',
  //         checkValue: [
  //           {
  //             bidType: { value: 'LT', label: '小于' },
  //             value: [1],
  //             unit: '元',
  //             isNone: false
  //           }
  //         ]
  //       },
  //       {
  //         key: 'goal',
  //         name: '可选优化目标',
  //         checkValue: [
  //           { value: '180', label: '激活' },
  //           { value: '2', label: '行为数' }
  //         ]
  //       },
  //       {
  //         key: 'deepGoal',
  //         name: '可选深度优化目标',
  //         checkValue: [{ value: '3', label: '付费' }]
  //       }
  //     ],
  //     mediaAccountIds: [
  //       {
  //         accountId: '24788890',
  //         accountName: '测试账户1'
  //       }
  //     ]
  //   },
  // {
  //   id: '002',
  //   name: '规则2',
  //   objectType: 'app',
  //   objectLabel: '项目：项目名称',
  //   ruleJSON: [
  //     {
  //       key: 'position',
  //       name: '可选投放位置',
  //       checkValue: [
  //         { value: '11-7', label: '随便写的-信息流广告' },
  //         { value: '11-6', label: '随便写的-上下滑大屏广告' }
  //       ]
  //     },
  //     {
  //       key: 'bid',
  //       name: '出价限制',
  //       checkValue: [
  //         {
  //           goal: { value: 'PAY', label: '购买' },
  //           bidType: { value: 'BETWEEN', label: '介于' },
  //           value: [1, 10],
  //           unit: '元'
  //         },
  //         {
  //           goal: { value: 'PAY', label: '购买' },
  //           bidType: { value: 'BETWEEN', label: '介于' },
  //           value: [2, 11],
  //           unit: '元'
  //         }
  //       ]
  //     },
  //     {
  //       key: 'deepBid',
  //       name: '深度出价限制',
  //       checkValue: [
  //         {
  //           deepGoal: { value: 'PAY', label: '购买' },
  //           bidType: { value: 'LT', label: '介于' },
  //           value: [0],
  //           unit: '元'
  //         }
  //       ]
  //     },
  //     {
  //       key: 'budgetPlan',
  //       name: '项目预算限制',
  //       checkValue: [
  //         {
  //           bidType: { value: 'LT', label: '小于' },
  //           value: [9],
  //           unit: '元',
  //           isNone: false
  //         }
  //       ]
  //     },
  //     {
  //       key: 'budgetAd',
  //       name: '广告预算限制',
  //       checkValue: [
  //         {
  //           bidType: { value: 'LT', label: '小于' },
  //           value: [9],
  //           unit: '元',
  //           isNone: false
  //         }
  //       ]
  //     },
  //     {
  //       key: 'goal',
  //       name: '可选优化目标',
  //       checkValue: [
  //         { value: '11-180', label: '随便写的-优化目标--激活' },
  //         { value: '11-2', label: '随便写的-优化目标--行为数' }
  //       ]
  //     },
  //     {
  //       key: 'deepGoal',
  //       name: '可选深度优化目标',
  //       checkValue: []
  //     }
  //   ],
  //   mediaAccountIds: [
  //     {
  //       accountId: '24788890',
  //       accountName: '测试账户1'
  //     }
  //   ]
  // },
  {
    id: '003',
    name: '规则3',
    objectType: 'app',
    objectLabel: '项目：项目名称',
    ruleJSON: [
      {
        key: 'position',
        name: '可选投放位置',
        checkValue: []
      },
      {
        key: 'goal',
        name: '可选优化目标',
        checkValue: [{ value: '11-180', label: '随便写的-优化目标--激活' }]
      },
      {
        key: 'deepGoal',
        name: '可选深度优化目标',
        checkValue: [
          { value: '11-180', label: '随便写的-优化目标--激活' },
          { value: '11-2', label: '随便写的-优化目标--行为数' }
        ]
      },
      {
        key: 'bid',
        name: '出价限制',
        checkValue: [
          {
            goal: { value: '2', label: '购买' },
            bidType: { value: 'BETWEEN', label: '介于' },
            value: [10, 11],
            unit: '元'
          }
        ]
      },
      {
        key: 'deepBid',
        name: '深度出价限制',
        checkValue: [
          {
            deepGoal: { value: '0', label: '购买' },
            bidType: { value: 'GT', label: '大于' },
            value: [10],
            unit: '元'
          }
        ]
      },
      {
        key: 'budgetPlan',
        name: '项目预算限制',
        checkValue: [
          {
            bidType: { value: 'GT', label: '大于' },
            value: [400],
            unit: '元',
            isNone: false
          }
        ]
      },
      {
        key: 'budgetAd',
        name: '广告预算限制',
        checkValue: [
          {
            bidType: { value: 'LT', label: '小于' },
            value: [550],
            unit: '元',
            isNone: false
          }
        ]
      }
    ],
    mediaAccountIds: [
      {
        accountId: '24788890',
        accountName: '测试账户1'
      },
      {
        accountId: '11-24788890',
        accountName: '随便写的-测试账户1'
      }
    ]
  }
]

// 完全通过的规则
export const mockRuleList2 = [
  {
    id: '004',
    name: '规则4',
    objectType: 'app',
    objectLabel: '项目：项目名称',
    ruleJSON: [
      {
        key: 'position',
        name: '可选投放位置',
        checkValue: []
      },
      {
        key: 'goal',
        name: '可选优化目标',
        checkValue: [{ value: '180', label: '随便写的-优化目标--激活' }]
      },
      {
        key: 'deepGoal',
        name: '可选深度优化目标',
        checkValue: []
      },
      {
        key: 'bid',
        name: '出价限制',
        checkValue: [
          {
            goal: { value: '180', label: '购买' },
            bidType: { value: 'BETWEEN', label: '介于' },
            value: [0, 11],
            unit: '元'
          }
        ]
      },
      {
        key: 'deepBid',
        name: '深度出价限制',
        checkValue: [
          {
            deepGoal: { value: '3', label: '购买' },
            bidType: { value: 'LT', label: '小于' },
            value: [10],
            unit: '元'
          }
        ]
      },
      {
        key: 'budgetPlan',
        name: '项目预算限制',
        checkValue: [
          {
            bidType: { value: 'GT', label: '大于' },
            value: [400],
            unit: '元',
            isNone: false
          }
        ]
      },
      {
        key: 'budgetAd',
        name: '广告预算限制',
        checkValue: [
          {
            bidType: { value: 'LT', label: '小于' },
            value: [199],
            unit: '元',
            isNone: false
          }
        ]
      }
    ],
    mediaAccountIds: [
      {
        accountId: '24788890',
        accountName: '测试账户1'
      },
      {
        accountId: '11-24788890',
        accountName: '随便写的-测试账户1'
      }
    ]
  }
]
