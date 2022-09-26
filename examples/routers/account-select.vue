<template>
  <div>
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
      data: [],
      dataGroup: [],
      accountListGroup: [
        {
          label: '深圳市飞鸟与鱼科技开发有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1692207118558215',
              aliasName: '直播推广',
              company: '深圳市飞鸟与鱼科技开发有限公司',
              mediaAccountId: '204813',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1692207118558215(直播推广)',
              label: '直播推广(1692207118558215)',
              value: '204813',
              accountName: '直播推广',
              accountId: '1692207118558215'
            }
          ],
          mediaAccountIds: ['204813']
        },
        {
          label: '乐凡互娱（深圳）科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1700994591908871',
              aliasName: '商品账户',
              company: '乐凡互娱（深圳）科技有限公司',
              mediaAccountId: '163635',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1700994591908871(商品账户)',
              label: '商品账户(1700994591908871)',
              value: '163635',
              accountName: '商品账户',
              accountId: '1700994591908871'
            }
          ],
          mediaAccountIds: ['163635']
        },
        {
          label: '广州四三九九信息科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1634200346909700',
              aliasName: 'E客户2账号1,千万别用',
              company: '广州四三九九信息科技有限公司',
              mediaAccountId: '42855',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1634200346909700(E客户2账号1,千万别用)',
              label: 'E客户2账号1,千万别用(1634200346909700)',
              value: '42855',
              accountName: 'E客户2账号1,千万别用',
              accountId: '1634200346909700'
            },
            {
              advertiserId: '1634200597136396',
              aliasName: 'f客户账号2,千万别用',
              company: '广州四三九九信息科技有限公司',
              mediaAccountId: '42856',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1634200597136396(f客户账号2,千万别用)',
              label: 'f客户账号2,千万别用(1634200597136396)',
              value: '42856',
              accountName: 'f客户账号2,千万别用',
              accountId: '1634200597136396'
            }
          ],
          mediaAccountIds: ['42855', '42856']
        },
        {
          label: '河南中原消费金融股份有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1706950103950343',
              aliasName: '客户账号，勿动',
              company: '河南中原消费金融股份有限公司',
              mediaAccountId: '163642',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1706950103950343(客户账号，勿动)',
              label: '客户账号，勿动(1706950103950343)',
              value: '163642',
              accountName: '客户账号，勿动',
              accountId: '1706950103950343'
            }
          ],
          mediaAccountIds: ['163642']
        },
        {
          label: '深圳市有量科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1641193686676484',
              aliasName: '游戏礼包测试',
              company: '深圳市有量科技有限公司',
              mediaAccountId: '204823',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1641193686676484(游戏礼包测试)',
              label: '游戏礼包测试(1641193686676484)',
              value: '204823',
              accountName: '游戏礼包测试',
              accountId: '1641193686676484'
            }
          ],
          mediaAccountIds: ['204823']
        },
        {
          label: '淘宝（中国）软件有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1708873100730382',
              aliasName: '备用直达账号, 非测勿用',
              company: '淘宝（中国）软件有限公司',
              mediaAccountId: '204824',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1708873100730382(备用直达账号, 非测勿用)',
              label: '备用直达账号, 非测勿用(1708873100730382)',
              value: '204824',
              accountName: '备用直达账号, 非测勿用',
              accountId: '1708873100730382'
            }
          ],
          mediaAccountIds: ['204824']
        },
        {
          label: '江西萌菲信息技术有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1693296101554189',
              aliasName: '游戏礼包测试-1',
              company: '江西萌菲信息技术有限公司',
              mediaAccountId: '19783808',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1693296101554189(游戏礼包测试-1)',
              label: '游戏礼包测试-1(1693296101554189)',
              value: '19783808',
              accountName: '游戏礼包测试-1',
              accountId: '1693296101554189'
            }
          ],
          mediaAccountIds: ['19783808']
        },
        {
          label: '海南掌昆网络科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1662583944415245',
              aliasName: '礼包码专用-其他勿动',
              company: '海南掌昆网络科技有限公司',
              mediaAccountId: '19858964',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1662583944415245(礼包码专用-其他勿动)',
              label: '礼包码专用-其他勿动(1662583944415245)',
              value: '19858964',
              accountName: '礼包码专用-其他勿动',
              accountId: '1662583944415245'
            }
          ],
          mediaAccountIds: ['19858964']
        },
        {
          label: '北京阅见未来网络科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1705245755560973',
              aliasName: '快应用账户',
              company: '北京阅见未来网络科技有限公司',
              mediaAccountId: '204811',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1705245755560973(快应用账户)',
              label: '快应用账户(1705245755560973)',
              value: '204811',
              accountName: '快应用账户',
              accountId: '1705245755560973'
            }
          ],
          mediaAccountIds: ['204811']
        },
        {
          label: '北京米花互动科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1637289497376779',
              aliasName: '123',
              company: '北京米花互动科技有限公司',
              mediaAccountId: '42853',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1637289497376779(123)',
              label: '123(1637289497376779)',
              value: '42853',
              accountName: '123',
              accountId: '1637289497376779'
            }
          ],
          mediaAccountIds: ['42853']
        },
        {
          label: '北京热云科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1649895381861389',
              aliasName: '热云-4',
              company: '北京热云科技有限公司',
              mediaAccountId: '1154',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1649895381861389(热云-4)',
              label: '热云-4(1649895381861389)',
              value: '1154',
              accountName: '热云-4',
              accountId: '1649895381861389'
            },
            {
              advertiserId: '1648987205666823',
              aliasName: '热云-5',
              company: '北京热云科技有限公司',
              mediaAccountId: '1155',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1648987205666823(热云-5)',
              label: '热云-5(1648987205666823)',
              value: '1155',
              accountName: '热云-5',
              accountId: '1648987205666823'
            },
            {
              advertiserId: '1649638379064323',
              aliasName: '热云-6',
              company: '北京热云科技有限公司',
              mediaAccountId: '1153',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1649638379064323(热云-6)',
              label: '热云-6(1649638379064323)',
              value: '1153',
              accountName: '热云-6',
              accountId: '1649638379064323'
            }
          ],
          mediaAccountIds: ['1154', '1155', '1153']
        },
        {
          label: '广州名药汇医药有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1024366663709223',
              aliasName: '事件管理测试账号',
              company: '广州名药汇医药有限公司',
              mediaAccountId: '163645',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1024366663709223(事件管理测试账号)',
              label: '事件管理测试账号(1024366663709223)',
              value: '163645',
              accountName: '事件管理测试账号',
              accountId: '1024366663709223'
            }
          ],
          mediaAccountIds: ['163645']
        },
        {
          label: '汕头市添翼互娱网络科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1636566821593091',
              aliasName: '添翼25',
              company: '汕头市添翼互娱网络科技有限公司',
              mediaAccountId: '1104',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1636566821593091(添翼25)',
              label: '添翼25(1636566821593091)',
              value: '1104',
              accountName: '添翼25',
              accountId: '1636566821593091'
            }
          ],
          mediaAccountIds: ['1104']
        },
        {
          label: '北京球球趣玩科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1668896402945037',
              aliasName: '热云-A1',
              company: '北京球球趣玩科技有限公司',
              mediaAccountId: '1157',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1668896402945037(热云-A1)',
              label: '热云-A1(1668896402945037)',
              value: '1157',
              accountName: '热云-A1',
              accountId: '1668896402945037'
            }
          ],
          mediaAccountIds: ['1157']
        },
        {
          label: '厦门极致互动网络技术股份有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1686411905612807',
              aliasName: '预约测试账号',
              company: '厦门极致互动网络技术股份有限公司',
              mediaAccountId: '204814',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1686411905612807(预约测试账号)',
              label: '预约测试账号(1686411905612807)',
              value: '204814',
              accountName: '预约测试账号',
              accountId: '1686411905612807'
            },
            {
              advertiserId: '1686411905085454',
              aliasName: '预约测试账号2',
              company: '厦门极致互动网络技术股份有限公司',
              mediaAccountId: '19783809',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1686411905085454(预约测试账号2)',
              label: '预约测试账号2(1686411905085454)',
              value: '19783809',
              accountName: '预约测试账号2',
              accountId: '1686411905085454'
            }
          ],
          mediaAccountIds: ['204814', '19783809']
        },
        {
          label: '广州精灵计算机系统有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1702893990353933',
              aliasName: '',
              company: '广州精灵计算机系统有限公司',
              mediaAccountId: '19858972',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1702893990353933()',
              label: '(1702893990353933)',
              value: '19858972',
              accountName: '',
              accountId: '1702893990353933'
            },
            {
              advertiserId: '1703168882299911',
              aliasName: '',
              company: '广州精灵计算机系统有限公司',
              mediaAccountId: '19858973',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1703168882299911()',
              label: '(1703168882299911)',
              value: '19858973',
              accountName: '',
              accountId: '1703168882299911'
            },
            {
              advertiserId: '1703168881218574',
              aliasName: '',
              company: '广州精灵计算机系统有限公司',
              mediaAccountId: '19858970',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1703168881218574(WIFI闪电宝-BF-02)',
              label: 'WIFI闪电宝-BF-02(1703168881218574)',
              value: '19858970',
              accountName: 'WIFI闪电宝-BF-02',
              accountId: '1703168881218574'
            }
          ],
          mediaAccountIds: ['19858972', '19858973', '19858970']
        },
        {
          label: '南京欣网互联信息技术有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1702249679675470',
              aliasName: '',
              company: '南京欣网互联信息技术有限公司',
              mediaAccountId: '204822',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1702249679675470()',
              label: '(1702249679675470)',
              value: '204822',
              accountName: '',
              accountId: '1702249679675470'
            }
          ],
          mediaAccountIds: ['204822']
        },
        {
          label: '成都掌沃无限科技有限公司',
          disabled: false,
          children: [
            {
              advertiserId: '1677271073840135',
              aliasName: 'C',
              company: '成都掌沃无限科技有限公司',
              mediaAccountId: '9946',
              mediaCode: 'toutiao',
              mediaName: '头条',
              name: '1677271073840135(C)',
              label: 'C(1677271073840135)',
              value: '9946',
              accountName: 'C',
              accountId: '1677271073840135'
            }
          ],
          mediaAccountIds: ['9946']
        }
      ],
      accountList: [
        {
          advertiserId: '1702249679675470',
          aliasName: '',
          company: '南京欣网互联信息技术有限公司',
          mediaAccountId: '204822',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1702249679675470()',
          label: '(1702249679675470)',
          value: '204822'
        },
        {
          advertiserId: '1702893990353933',
          aliasName: '',
          company: '广州精灵计算机系统有限公司',
          mediaAccountId: '19858972',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1702893990353933()',
          label: '(1702893990353933)',
          value: '19858972'
        },
        {
          advertiserId: '1703168882299911',
          aliasName: '',
          company: '广州精灵计算机系统有限公司',
          mediaAccountId: '19858973',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1703168882299911()',
          label: '(1703168882299911)',
          value: '19858973'
        },
        {
          advertiserId: '1703168881218574',
          aliasName: '',
          company: '广州精灵计算机系统有限公司',
          mediaAccountId: '19858970',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1703168881218574(WIFI闪电宝-BF-02)',
          label: 'WIFI闪电宝-BF-02(1703168881218574)',
          value: '19858970'
        },
        {
          advertiserId: '1637289497376779',
          aliasName: '123',
          company: '北京米花互动科技有限公司',
          mediaAccountId: '42853',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1637289497376779(123)',
          label: '123(1637289497376779)',
          value: '42853'
        },
        {
          advertiserId: '1677271073840135',
          aliasName: 'C',
          company: '成都掌沃无限科技有限公司',
          mediaAccountId: '9946',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1677271073840135(C)',
          label: 'C(1677271073840135)',
          value: '9946'
        },
        {
          advertiserId: '1634200346909700',
          aliasName: 'E客户2账号1,千万别用',
          company: '广州四三九九信息科技有限公司',
          mediaAccountId: '42855',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1634200346909700(E客户2账号1,千万别用)',
          label: 'E客户2账号1,千万别用(1634200346909700)',
          value: '42855'
        },
        {
          advertiserId: '1634200597136396',
          aliasName: 'f客户账号2,千万别用',
          company: '广州四三九九信息科技有限公司',
          mediaAccountId: '42856',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1634200597136396(f客户账号2,千万别用)',
          label: 'f客户账号2,千万别用(1634200597136396)',
          value: '42856'
        },
        {
          advertiserId: '1024366663709223',
          aliasName: '事件管理测试账号',
          company: '广州名药汇医药有限公司',
          mediaAccountId: '163645',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1024366663709223(事件管理测试账号)',
          label: '事件管理测试账号(1024366663709223)',
          value: '163645'
        },
        {
          advertiserId: '1700994591908871',
          aliasName: '商品账户',
          company: '乐凡互娱（深圳）科技有限公司',
          mediaAccountId: '163635',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1700994591908871(商品账户)',
          label: '商品账户(1700994591908871)',
          value: '163635'
        },
        {
          advertiserId: '1708873100730382',
          aliasName: '备用直达账号, 非测勿用',
          company: '淘宝（中国）软件有限公司',
          mediaAccountId: '204824',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1708873100730382(备用直达账号, 非测勿用)',
          label: '备用直达账号, 非测勿用(1708873100730382)',
          value: '204824'
        },
        {
          advertiserId: '1706950103950343',
          aliasName: '客户账号，勿动',
          company: '河南中原消费金融股份有限公司',
          mediaAccountId: '163642',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1706950103950343(客户账号，勿动)',
          label: '客户账号，勿动(1706950103950343)',
          value: '163642'
        },
        {
          advertiserId: '1705245755560973',
          aliasName: '快应用账户',
          company: '北京阅见未来网络科技有限公司',
          mediaAccountId: '204811',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1705245755560973(快应用账户)',
          label: '快应用账户(1705245755560973)',
          value: '204811'
        },
        {
          advertiserId: '1636566821593091',
          aliasName: '添翼25',
          company: '汕头市添翼互娱网络科技有限公司',
          mediaAccountId: '1104',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1636566821593091(添翼25)',
          label: '添翼25(1636566821593091)',
          value: '1104'
        },
        {
          advertiserId: '1641193686676484',
          aliasName: '游戏礼包测试',
          company: '深圳市有量科技有限公司',
          mediaAccountId: '204823',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1641193686676484(游戏礼包测试)',
          label: '游戏礼包测试(1641193686676484)',
          value: '204823'
        },
        {
          advertiserId: '1693296101554189',
          aliasName: '游戏礼包测试-1',
          company: '江西萌菲信息技术有限公司',
          mediaAccountId: '19783808',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1693296101554189(游戏礼包测试-1)',
          label: '游戏礼包测试-1(1693296101554189)',
          value: '19783808'
        },
        {
          advertiserId: '1649895381861389',
          aliasName: '热云-4',
          company: '北京热云科技有限公司',
          mediaAccountId: '1154',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1649895381861389(热云-4)',
          label: '热云-4(1649895381861389)',
          value: '1154'
        },
        {
          advertiserId: '1648987205666823',
          aliasName: '热云-5',
          company: '北京热云科技有限公司',
          mediaAccountId: '1155',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1648987205666823(热云-5)',
          label: '热云-5(1648987205666823)',
          value: '1155'
        },
        {
          advertiserId: '1649638379064323',
          aliasName: '热云-6',
          company: '北京热云科技有限公司',
          mediaAccountId: '1153',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1649638379064323(热云-6)',
          label: '热云-6(1649638379064323)',
          value: '1153'
        },
        {
          advertiserId: '1668896402945037',
          aliasName: '热云-A1',
          company: '北京球球趣玩科技有限公司',
          mediaAccountId: '1157',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1668896402945037(热云-A1)',
          label: '热云-A1(1668896402945037)',
          value: '1157'
        },
        {
          advertiserId: '1692207118558215',
          aliasName: '直播推广',
          company: '深圳市飞鸟与鱼科技开发有限公司',
          mediaAccountId: '204813',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1692207118558215(直播推广)',
          label: '直播推广(1692207118558215)',
          value: '204813'
        },
        {
          advertiserId: '1662583944415245',
          aliasName: '礼包码专用-其他勿动',
          company: '海南掌昆网络科技有限公司',
          mediaAccountId: '19858964',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1662583944415245(礼包码专用-其他勿动)',
          label: '礼包码专用-其他勿动(1662583944415245)',
          value: '19858964'
        },
        {
          advertiserId: '1686411905612807',
          aliasName: '预约测试账号',
          company: '厦门极致互动网络技术股份有限公司',
          mediaAccountId: '204814',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1686411905612807(预约测试账号)',
          label: '预约测试账号(1686411905612807)',
          value: '204814'
        },
        {
          advertiserId: '1686411905085454',
          aliasName: '预约测试账号2',
          company: '厦门极致互动网络技术股份有限公司',
          mediaAccountId: '19783809',
          mediaCode: 'toutiao',
          mediaName: '头条',
          name: '1686411905085454(预约测试账号2)',
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
