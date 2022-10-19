<template>
  <div>
    普通select
    <Select
      v-model="model"
      multiple
      style="width: 260px"
      filterable>
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value">
        {{ item.label }}
      </Option>
    </Select>
    {{ data }}---{{ dataGroup }}
    <h2>prefix-container</h2>
    <rd-prefix-container>
      <span slot="prepend">投放账户</span>
      <rd-account-select
        v-model="data"
        :data="accountList"></rd-account-select>
    </rd-prefix-container>
    <rd-prefix-container>
      <span slot="prepend">投放账户</span>
      <rd-account-select
        v-model="data"
        style="width: 400px"
        :data="accountList"></rd-account-select>
    </rd-prefix-container>
    <h2>没有组的概念</h2>
    <rd-account-select
      v-model="data"
      :data="accountList"></rd-account-select>
    <h2>组</h2>
    <rd-account-select
      v-model="dataGroup"
      grouping
      :data="accountListGroup"></rd-account-select>
    <h2>跨主体</h2>
    <rd-account-select
      v-model="crossSubjectData"
      grouping
      :data="accountListGroup"
      cross-subject></rd-account-select>
    <h2>form</h2>
    <Form
      ref="formInline"
      :model="formInline"
      :rules="ruleInline"
      @submit.prevent>
      <FormItem
        prop="campaignName"
        label="选择账户">
        <rd-account-select
          v-model="formInline.campaignName"
          :data="accountList"></rd-account-select>
      </FormItem>
      <h2>form-组</h2>
      <FormItem
        prop="campaignName1"
        label="选择账户">
        <rd-account-select
          v-model="formInline.campaignName1"
          grouping
          :data="accountListGroup"></rd-account-select>
      </FormItem>
    </Form>
    <Button
      type="primary"
      @click="handleSubmit('formInline')">
      Signin
    </Button>
    <Dropdown>
      <a href="javascript:void(0)">
        下拉菜单
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem disabled>驴打滚123123</DropdownItem>
        <DropdownItem disabled>炸酱面</DropdownItem>
        <DropdownItem disabled>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem divided>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model: [],
      data: ['204822', '19858972'],
      dataGroup: ['42855'],
      crossSubjectData: ['42855'],
      accountListGroup: [],
      accountListGroup1: [
        {
          label: '深圳市飞鸟与鱼科技开发有限公司',
          disabled: false,
          children: [
            {
              label: '直播推广',
              value: '204813'
            }
          ]
        },
        {
          label: '乐凡互娱（深圳）科技有限公司',
          disabled: false,
          children: [
            {
              label: '乐凡互娱01',
              value: '163635'
            }
          ]
        },
        {
          label: '广州四三九九信息科技有限公司',
          disabled: false,
          children: [
            {
              label: '广州四三九九01',
              value: '42855'
            },
            {
              label: '广州四三九九02',
              value: '42856'
            }
          ]
        },
        {
          label: '河南中原消费金融股份有限公司',
          disabled: false,
          children: [
            {
              label: '客户账号，勿动',
              value: '163642'
            }
          ]
        },
        {
          label: '深圳市有量科技有限公司',
          disabled: false,
          children: [
            {
              label: '游戏礼包测试',
              value: '204823'
            }
          ]
        },
        {
          label: '淘宝（中国）软件有限公司',
          disabled: false,
          children: [
            {
              label: '淘宝01',
              value: '204824'
            }
          ]
        },
        {
          label: '江西萌菲信息技术有限公司',
          disabled: false,
          children: [
            {
              label: '游戏礼包测试-1',
              value: '19783808'
            }
          ]
        },
        {
          label: '海南掌昆网络科技有限公司',
          disabled: false,
          children: [
            {
              label: '礼包码专用-其他勿动',
              value: '19858964'
            }
          ]
        },
        {
          label: '北京阅见未来网络科技有限公司',
          disabled: false,
          children: [
            {
              label: '快应用账户',
              value: '204811'
            }
          ]
        },
        {
          label: '北京米花互动科技有限公司',
          disabled: false,
          children: [
            {
              label: '北京米花01',
              value: '42853'
            }
          ]
        },
        {
          label: '北京热云科技有限公司',
          disabled: false,
          children: [
            {
              label: '热云-1',
              value: '1154'
            },
            {
              label: '热云-2',
              value: '1155'
            },
            {
              label: '热云-3',
              value: '1153'
            }
          ]
        },
        {
          label: '广州名药汇医药有限公司',
          disabled: false,
          children: [
            {
              label: '名药汇医01',
              value: '163645'
            }
          ]
        },
        {
          label: '汕头市添翼互娱网络科技有限公司',
          disabled: false,
          children: [
            {
              label: '汕头市添翼01',
              value: '1104'
            }
          ]
        },
        {
          label: '北京球球趣玩科技有限公司',
          disabled: false,
          children: [
            {
              label: '球球-A1',
              value: '1157'
            }
          ]
        },
        {
          label: '厦门极致互动网络技术股份有限公司',
          disabled: false,
          children: [
            {
              label: '预约测试账号',
              value: '204814'
            },
            {
              label: '预约测试账号2',
              value: '19783809'
            }
          ]
        },
        {
          label: '广州精灵计算机系统有限公司',
          disabled: false,
          children: [
            {
              label: '精灵02',
              value: '19858972'
            },
            {
              label: '精灵03',
              value: '19858222'
            },
            {
              label: '精灵04',
              value: '19858970'
            }
          ]
        },
        {
          label: '南京欣网互联信息技术有限公司',
          disabled: false,
          children: [
            {
              label: '欣网01',
              value: '204822'
            }
          ]
        },
        {
          label: '成都掌沃无限科技有限公司',
          disabled: false,
          children: [
            {
              label: '掌沃06',
              value: '9946'
            }
          ]
        }
      ],
      accountList: [
        {
          label:
            '热云数据01热云数据01热云数据01热云数据01热云数据01热云数据01热云数据01热云数据01热云数据01',
          value: '204822'
        },
        {
          label: '热云数据02',
          value: '19858972'
        },
        {
          label: '热云数据03',
          value: '19858973'
        },
        {
          label: '热云数据04',
          value: '19858970'
        },
        {
          label: '热云数据05',
          value: '42853'
        },
        {
          label: '热云数据06',
          value: '9946'
        },
        {
          label: '热云数据07',
          value: '42855'
        },
        {
          label: '热云数据08',
          value: '42856'
        },
        {
          label: '热云数据09',
          value: '163645'
        },
        {
          label: '热云数据10',
          value: '163635'
        },
        {
          label: '热云数据11',
          value: '204824'
        }
      ],
      formInline: {
        campaignName: [],
        campaignName1: []
      },
      ruleInline: {
        campaignName: [
          {
            validator: (rule, value, callback) => {
              this.$nextTick(() => {
                if (!this.formInline.campaignName.length) {
                  callback(new Error('添加账号'))
                } else {
                  callback()
                }
              })
            },
            trigger: 'change'
          }
        ],
        campaignName1: [
          {
            validator: (rule, value, callback) => {
              this.$nextTick(() => {
                if (!this.formInline.campaignName1.length) {
                  callback(new Error('添加账号'))
                } else {
                  callback()
                }
              })
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.accountListGroup = this.accountListGroup1
    }, 2000)
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
