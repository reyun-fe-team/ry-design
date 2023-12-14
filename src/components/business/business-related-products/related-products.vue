<!--
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2023-11-30 17:48:07
 * @Description: 标准业务类组件-关联投产品
-->
<template>
  <div :class="[prefixCls]">
    <rd-account-list
      :height="height"
      v-bind="accountOptions"
      :data-list="formDataList"
      @on-change="getActiveAccount">
      <RelatedProductsSelector
        :key="activeAccountId"
        :mutil-library="mutilLibrary"
        :active-account-id="activeAccountId"
        :active-form-item="activeFormItem"
        :on-search-product="onSearchProduct"
        :on-search-product-library="onSearchProductLibrary"></RelatedProductsSelector>
    </rd-account-list>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'related-products'
import Emitter from '@src/mixins/emitter'
import _cloneDeep from 'lodash/cloneDeep'
import RelatedProductsSelector from './related-products-selector'

export default {
  name: prefixCls,
  components: { RelatedProductsSelector },
  mixins: [Emitter],
  props: {
    // 商品库多选
    mutilLibrary: {
      type: Boolean,
      default: false
    },
    // 搜索产品
    onSearchProduct: {
      type: Function,
      require: true
    },
    // 搜索产品库
    onSearchProductLibrary: {
      type: Function,
      require: true
    },
    // 选择的数据
    value: {
      type: Array,
      default: () => []
    },
    // 容器高度
    height: {
      type: String,
      default: '540px'
    },
    // 账号选择组件的属性
    accountOptions: {
      type: Object,
      default: () => {
        return {
          itemId: 'value',
          itemName: 'label',
          id: 'advertiserId'
        }
      },
      validator: function (value) {
        let keys = ['id', 'itemId', 'itemName']
        let pass = true
        for (const key in value) {
          const valid =
            Object.hasOwnProperty.call(value, key) &&
            keys.includes(key) &&
            typeof value[key] === 'string'

          if (!valid) {
            pass = false
            break
          }
        }
        return pass
      }
    },
    // 账号数据(包含 label，value 字段)
    accounts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      prefixCls,
      formDataList: [],
      // 选择的账号id
      activeAccountId: '',
      // 当前数据
      activeFormItem: { value: '', children: [] }
    }
  },
  computed: {
    // 账号的数据id
    accountValues() {
      return this.accounts.filter(item => item.value)
    },
    valueString() {
      return JSON.stringify(this.value)
    }
  },
  watch: {
    // 账号变化
    accountValues: {
      deep: true,
      handler() {
        this.init()
      }
    },
    // 数据变化
    valueString() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let initialValue = []
      for (let index = 0; index < this.accounts.length; index++) {
        let element = this.accounts[index]
        let find = this.value.find(item => `${element.value}` === `${item.value}`)
        if (find) {
          // 计算最后一级的数量
          let num = find.children.reduce((t, c) => {
            return t + c.children.length
          }, 0)
          initialValue.push({ ...element, value: find.value, num })
        } else {
          initialValue.push({ ...element, num: 0 })
        }
      }
      this.formDataList = _cloneDeep(initialValue)
    },
    // 切换账号
    getActiveAccount(accountId) {
      this.activeAccountId = accountId
      this.activeFormItem = this.formDataList.find(o => o.value === accountId)
    }
  }
}
</script>
