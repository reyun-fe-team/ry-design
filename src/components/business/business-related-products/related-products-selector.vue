<template>
  <div :class="[prefixCls]">
    <!-- 产品库/产品 -->
    <RelatedProductsPanel
      :mutil-library="mutilLibrary"
      :active-account-id="activeAccountId"
      :value="formItem.children"
      :on-search-product="onSearchProduct"
      :on-search-product-library="onSearchProductLibrary"
      @on-change="handleChange"></RelatedProductsPanel>
    <!-- 已选 -->
    <div :class="[prefixCls + '-selected']"></div>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
import RelatedProductsPanel from './related-products-panel'
import _cloneDeep from 'lodash/cloneDeep'

const prefixCls = prefix + 'related-products-selector'
export default {
  name: prefixCls,
  components: {
    RelatedProductsPanel
  },
  props: {
    // 商品库多选
    mutilLibrary: {
      type: Boolean,
      default: false
    },
    // 选择的账号
    activeAccountId: {
      type: [String, Number],
      default: ''
    },
    // 当前的数据
    activeFormItem: {
      type: Object,
      default: () => {}
    },
    // 搜索产品
    onSearchProduct: {
      type: Function,
      require: true,
      default: null
    },
    // 搜索产品库
    onSearchProductLibrary: {
      type: Function,
      require: true,
      default: null
    }
  },
  data() {
    return {
      prefixCls,
      currentProductLibraryId: '',
      currentProductId: '',
      formItem: { value: '', children: [] },
      productLibraryList: [],
      productList: []
    }
  },
  created() {
    this.formItem = _cloneDeep(this.activeFormItem)
  },
  methods: {
    handleChange() {}
  }
}
</script>
