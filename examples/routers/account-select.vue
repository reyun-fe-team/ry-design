<template>
  <div>
    {{ data }}---{{ dataGroup }}
    <h2>prefix-container</h2>
    <rd-prefix-container>
      <span slot="prepend">投放账户</span>
      <rd-account-select
        v-model="data"
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
      data: ['204822'],
      dataGroup: ['42855'],
      crossSubjectData: ['42855'],
      accountListGroup: [],
      accountListGroup1: [
        {
          label: '深圳市飞鸟与鱼科技开发有限公司',
          disabled: false,
          children: [
            {
              label: '直播推广(1692207118558215)',
              value: '204813'
            }
          ]
        },
        {
          label: '乐凡互娱（深圳）科技有限公司',
          disabled: false,
          children: [
            {
              label: '商品账户(1700994591908871)',
              value: '163635'
            }
          ]
        },
        {
          label: '广州四三九九信息科技有限公司',
          disabled: false,
          children: [
            {
              label: 'E客户2账号1,千万别用(1634200346909700)',
              value: '42855'
            },
            {
              label: 'f客户账号2,千万别用(1634200597136396)',
              value: '42856'
            }
          ]
        },
        {
          label: '河南中原消费金融股份有限公司',
          disabled: false,
          children: [
            {
              label: '客户账号，勿动(1706950103950343)',
              value: '163642'
            }
          ]
        },
        {
          label: '深圳市有量科技有限公司',
          disabled: false,
          children: [
            {
              label: '游戏礼包测试(1641193686676484)',
              value: '204823'
            }
          ]
        },
        {
          label: '淘宝（中国）软件有限公司',
          disabled: false,
          children: [
            {
              label: '备用直达账号, 非测勿用(1708873100730382)',
              value: '204824'
            }
          ]
        },
        {
          label: '江西萌菲信息技术有限公司',
          disabled: false,
          children: [
            {
              label: '游戏礼包测试-1(1693296101554189)',
              value: '19783808'
            }
          ]
        },
        {
          label: '海南掌昆网络科技有限公司',
          disabled: false,
          children: [
            {
              label: '礼包码专用-其他勿动(1662583944415245)',
              value: '19858964'
            }
          ]
        },
        {
          label: '北京阅见未来网络科技有限公司',
          disabled: false,
          children: [
            {
              label: '快应用账户(1705245755560973)',
              value: '204811'
            }
          ]
        },
        {
          label: '北京米花互动科技有限公司',
          disabled: false,
          children: [
            {
              label: '123(1637289497376779)',
              value: '42853'
            }
          ]
        },
        {
          label: '北京热云科技有限公司',
          disabled: false,
          children: [
            {
              label: '热云-4(1649895381861389)',
              value: '1154'
            },
            {
              label: '热云-5(1648987205666823)',
              value: '1155'
            },
            {
              label: '热云-6(1649638379064323)',
              value: '1153'
            }
          ]
        },
        {
          label: '广州名药汇医药有限公司',
          disabled: false,
          children: [
            {
              label: '事件管理测试账号(1024366663709223)',
              value: '163645'
            }
          ]
        },
        {
          label: '汕头市添翼互娱网络科技有限公司',
          disabled: false,
          children: [
            {
              label: '添翼25(1636566821593091)',
              value: '1104'
            }
          ]
        },
        {
          label: '北京球球趣玩科技有限公司',
          disabled: false,
          children: [
            {
              label: '热云-A1(1668896402945037)',
              value: '1157'
            }
          ]
        },
        {
          label: '厦门极致互动网络技术股份有限公司',
          disabled: false,
          children: [
            {
              label: '预约测试账号(1686411905612807)',
              value: '204814'
            },
            {
              label: '预约测试账号2(1686411905085454)',
              value: '19783809'
            }
          ]
        },
        {
          label: '广州精灵计算机系统有限公司',
          disabled: false,
          children: [
            {
              label: '(1702893990353933)',
              value: '19858972'
            },
            {
              label: '(1703168882299911)',
              value: '1703168882299911'
            },
            {
              label: 'WIFI闪电宝-BF-02(1703168881218574)',
              value: '19858970'
            }
          ]
        },
        {
          label: '南京欣网互联信息技术有限公司',
          disabled: false,
          children: [
            {
              label: '(1702249679675470)',
              value: '204822'
            }
          ]
        },
        {
          label: '成都掌沃无限科技有限公司',
          disabled: false,
          children: [
            {
              label: 'C(1677271073840135)',
              value: '9946'
            }
          ]
        }
      ],
      accountList: [
        {
          label: '(1702249679675470)',
          value: '204822'
        },
        {
          label: '(1702893990353933)',
          value: '19858972'
        },
        {
          label: '(1703168882299911)',
          value: '19858973'
        },
        {
          label: 'WIFI闪电宝-BF-02(1703168881218574)',
          value: '19858970'
        },
        {
          label: '123(1637289497376779)',
          value: '42853'
        },
        {
          label: 'C(1677271073840135)',
          value: '9946'
        },
        {
          label: 'E客户2账号1,千万别用(1634200346909700)',
          value: '42855'
        },
        {
          label: 'f客户账号2,千万别用(1634200597136396)',
          value: '42856'
        },
        {
          label: '事件管理测试账号(1024366663709223)',
          value: '163645'
        },
        {
          label: '商品账户(1700994591908871)',
          value: '163635'
        },
        {
          label: '备用直达账号, 非测勿用(1708873100730382)',
          value: '204824'
        },
        {
          label: '客户账号，勿动(1706950103950343)',
          value: '163642'
        },
        {
          label: '快应用账户(1705245755560973)',
          value: '204811'
        },
        {
          label: '添翼25(1636566821593091)',
          value: '1104'
        },
        {
          label: '游戏礼包测试(1641193686676484)',
          value: '204823'
        },
        {
          label: '游戏礼包测试-1(1693296101554189)',
          value: '19783808'
        },
        {
          label: '热云-4(1649895381861389)',
          value: '1154'
        },
        {
          label: '热云-5(1648987205666823)',
          value: '1155'
        },
        {
          label: '热云-6(1649638379064323)',
          value: '1153'
        },
        {
          label: '热云-A1(1668896402945037)',
          value: '1157'
        },
        {
          label: '直播推广(1692207118558215)',
          value: '204813'
        },
        {
          label: '礼包码专用-其他勿动(1662583944415245)',
          value: '19858964'
        },
        {
          label: '预约测试账号(1686411905612807)',
          value: '204814'
        },
        {
          label: '预约测试账号2(1686411905085454)',
          value: '19783809'
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
