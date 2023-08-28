<template>
  <div>
    {{ commitData }}
    <h2>filter-list-cascader</h2>
    <Button @click="fu">赋予</Button>
    <section>
      <rd-filter-list-cascader
        v-model="selectMultiple"
        :data="options"
        :width="360"
        :height="320"
        filterable
        multiple
        show-select-option></rd-filter-list-cascader>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMultiple: [],
      options: [
        {
          label: '编导',
          value: 'DIRECTOR',
          children: [
            {
              type: 'DIRECTOR',
              value: 1,
              label: '编导1'
            },
            {
              type: 'DIRECTOR',
              value: 7,
              label: 'qweqwe'
            },
            {
              type: 'DIRECTOR',
              value: 11,
              label: '宋真棒'
            },
            {
              type: 'DIRECTOR',
              value: 32,
              label: '新增静静编导'
            },
            {
              type: 'DIRECTOR',
              value: 35,
              label: '新来的'
            }
          ]
        },
        {
          label: '剪辑师',
          value: 'EDITOR',
          children: [
            {
              type: 'EDITOR',
              value: 3,
              label: '剪辑2'
            },
            {
              type: 'EDITOR',
              value: 6,
              label: '剪辑4'
            },
            {
              type: 'EDITOR',
              value: 9,
              label: '宋真好'
            },
            {
              type: 'EDITOR',
              value: 30,
              label: '新增剪辑'
            }
          ]
        },
        {
          label: '摄影师',
          value: 'CAMERA',
          children: [
            {
              type: 'CAMERA',
              value: 2,
              label: '摄像1'
            },
            {
              type: 'CAMERA',
              value: 8,
              label: '宋真强'
            },
            {
              type: 'CAMERA',
              value: 29,
              label: '新增拍摄'
            }
          ]
        },
        {
          label: '设计师',
          value: 'DESIGNER',
          children: [
            {
              type: 'DESIGNER',
              value: 2534,
              label: '111'
            },
            {
              type: 'DESIGNER',
              value: 2544,
              label: '123'
            },
            {
              type: 'DESIGNER',
              value: 2535,
              label: '222'
            },
            {
              type: 'DESIGNER',
              value: 2477,
              label: '组长'
            },
            {
              type: 'DESIGNER',
              value: 2536,
              label: '333'
            },
            {
              type: 'DESIGNER',
              value: 2429,
              label: '设计师'
            },
            {
              type: 'DESIGNER',
              value: 2614,
              label: 'dsds发发发'
            },
            {
              type: 'DESIGNER',
              value: 2504,
              label: '测试设计师新开'
            },
            {
              type: 'DESIGNER',
              value: 30357,
              label: '设计经理041401'
            },
            {
              type: 'DESIGNER',
              value: 30360,
              label: '设计经理041404'
            },
            {
              type: 'DESIGNER',
              value: 30353,
              label: '设计师0417'
            },
            {
              type: 'DESIGNER',
              value: 30356,
              label: '手动添加设计经理'
            },
            {
              type: 'DESIGNER',
              value: 30019,
              label: '一级代理商123'
            },
            {
              type: 'DESIGNER',
              value: 2501,
              label: '设计师_广点通'
            },
            {
              type: 'DESIGNER',
              value: 2541,
              label: '设计经理'
            },
            {
              type: 'DESIGNER',
              value: 2592,
              label: 'renlijuan'
            },
            {
              type: 'DESIGNER',
              value: 2532,
              label: '设计产品'
            },
            {
              type: 'DESIGNER',
              value: 2538,
              label: '设计经理测试'
            },
            {
              type: 'DESIGNER',
              value: 30017,
              label: '设计师1'
            },
            {
              type: 'DESIGNER',
              value: 2432,
              label: 'shejishi'
            },
            {
              type: 'DESIGNER',
              value: 2509,
              label: 'zhangmeng'
            },
            {
              type: 'DESIGNER',
              value: 2416,
              label: '宋真帅'
            },
            {
              type: 'DESIGNER',
              value: 30287,
              label: '张武'
            },
            {
              type: 'DESIGNER',
              value: 2480,
              label: '宋涛-设计'
            },
            {
              type: 'DESIGNER',
              value: 2522,
              label: '素材v3设计师'
            },
            {
              type: 'DESIGNER',
              value: 2581,
              label: '王辰设计师'
            },
            {
              type: 'DESIGNER',
              value: 30345,
              label: 'yubin'
            },
            {
              type: 'DESIGNER',
              value: 2443,
              label: 'sadasdasd'
            },
            {
              type: 'DESIGNER',
              value: 2537,
              label: 'zhangmeng设计经理'
            },
            {
              type: 'DESIGNER',
              value: 2568,
              label: 'Bo'
            },
            {
              type: 'DESIGNER',
              value: 2531,
              label: 'zuohaitao13'
            },
            {
              type: 'DESIGNER',
              value: 2587,
              label: 'zuo审核设计经理'
            },
            {
              type: 'DESIGNER',
              value: 2588,
              label: 'zuo审核设计师'
            },
            {
              type: 'DESIGNER',
              value: 2599,
              label: 'zht31'
            },
            {
              type: 'DESIGNER',
              value: 2524,
              label: '左海涛7'
            },
            {
              type: 'DESIGNER',
              value: 2525,
              label: 'zuohaitao9'
            }
          ]
        },
        {
          label: '项目',
          value: 'APP',
          children: []
        },
        {
          label: '标签',
          value: 'TAG'
        },
        {
          label: '组长',
          value: 'LEADER',
          children: [
            {
              type: 'LEADER',
              value: 4,
              label: '组长4'
            },
            {
              type: 'LEADER',
              value: 5,
              label: '组长5'
            },
            {
              type: 'LEADER',
              value: 10,
              label: '宋真牛'
            },
            {
              type: 'LEADER',
              value: 12,
              label: '管理员'
            },
            {
              type: 'LEADER',
              value: 14,
              label: '10'
            },
            {
              type: 'LEADER',
              value: 15,
              label: '4'
            },
            {
              type: 'LEADER',
              value: 23,
              label: '夏组长'
            },
            {
              type: 'LEADER',
              value: 31,
              label: '新增组长'
            }
          ]
        },
        {
          label: '外采公司',
          value: 'OUTER',
          children: [
            {
              type: 'OUTER',
              value: 13,
              label: '测试供应商'
            },
            {
              type: 'OUTER',
              value: 16,
              label: '热云股份有限公司测试'
            },
            {
              type: 'OUTER',
              value: 19,
              label: '测试供应商牛'
            },
            {
              type: 'OUTER',
              value: 21,
              label: '测试公司'
            },
            {
              type: 'OUTER',
              value: 22,
              label: '供应商1'
            },
            {
              type: 'OUTER',
              value: 27,
              label: '供应商'
            },
            {
              type: 'OUTER',
              value: 28,
              label: '123'
            },
            {
              type: 'OUTER',
              value: 33,
              label: '新增供应商0106'
            },
            {
              type: 'OUTER',
              value: 34,
              label: 'sdf'
            },
            {
              type: 'OUTER',
              value: 36,
              label: 'xlf'
            }
          ]
        }
      ],
      options1: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: '1-1',
              label: '上海'
              // children: [
              //   { value: 3, label: '普陀' },
              //   { value: 4, label: '黄埔' },
              //   { value: 5, label: '徐汇' }
              // ]
            },
            {
              value: '1-2',
              label: '江苏'
              // children: [
              //   { value: 8, label: '南京' },
              //   { value: 9, label: '苏州' },
              //   { value: 10, label: '无锡' }
              // ]
            },
            {
              value: '1-3',
              label: '浙江'
              // children: [
              //   { value: 13, label: '杭州' },
              //   { value: 14, label: '宁波' },
              //   { value: 15, label: '嘉兴' }
              // ]
            }
          ]
        },
        {
          value: 2,
          label: '西北',
          children: [
            {
              value: '2-1',
              label: '浙江1'
              // children: [
              //   { value: 19, label: '西安' },
              //   { value: 20, label: '延安' }
              // ]
            },
            {
              value: '2-2',
              label: '新疆维吾尔族自治区'
              // children: [
              //   { value: 22, label: '乌鲁木齐' },
              //   { value: 23, label: '克拉玛依' }
              // ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    commitData() {
      return this.options.reduce((list, { children = [], value }) => {
        const designerRoleIdList = children
          .filter(val => this.selectMultiple.includes(val.value))
          .map(val => val.value)
        if (designerRoleIdList.length) {
          list.push({
            designerRoleType: value,
            designerRoleIdList
          })
        }
        return list
      }, [])
    }
  },
  methods: {
    fu() {
      setTimeout(() => {
        this.selectMultiple = [3, 6, 9, 30]
      }, 2000)
    }
  }
}
</script>