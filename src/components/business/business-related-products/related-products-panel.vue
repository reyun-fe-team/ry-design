<template>
  <div :class="[prefixCls]">
    <!-- 产品库 -->
    <div :class="[prefixCls + '-library']">
      <div :class="[prefixCls + '-header']">
        <span :class="[prefixCls + '-header-title']">产品库</span>
        <span :class="[prefixCls + '-header-refresh']">刷新</span>
      </div>
      <!-- 搜索 -->
      <div :class="[prefixCls + '-search']">
        <Input
          v-model="platformInfo.param"
          suffix="ios-search"
          clearable
          :placeholder="libraryPlaceholder"></Input>
      </div>
      <template v-if="platformInfo.list.length > 0">
        <!-- 列表 -->
        <div :class="[prefixCls + '-content']">
          <div
            v-for="platform in platformInfo.list"
            :key="platform.value"
            :class="[
              prefixCls + '-item',
              { [prefixCls + '-item-active']: platformInfo.info.value === platform.value }
            ]">
            <div :class="[prefixCls + '-item-name']">{{ platform.label }}</div>
            <div :class="[prefixCls + '-item-info']">
              <div
                v-if="platform[tagKey]"
                :class="[prefixCls + '-item-tag']">
                {{ platform[tagKey] }}
              </div>
              <div :class="[prefixCls + '-item-id']">{{ platform.value }}</div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <Page
          :class="[prefixCls + '-page']"
          :total="platformInfo.total"
          :current="platformInfo.current"
          :page-size="platformInfo.size"
          size="small"></Page>
      </template>
      <!-- 没有数据 -->
      <div
        v-else
        :class="[prefixCls + '-empty']">
        暂无数据
      </div>
      <!-- 加载中 -->
      <Spin
        v-if="platformInfo.loading"
        :class="[prefixCls + '-loading']"
        size="large"></Spin>
    </div>
    <!-- 产品 -->
    <div :class="[prefixCls + '-product']">
      <div :class="[prefixCls + '-header']">
        <span :class="[prefixCls + '-header-title']">产品</span>
        <span :class="[prefixCls + '-header-refresh']">刷新</span>
      </div>
      <!-- 选择了产品库就展示产品 -->
      <template v-if="platformInfo.info.value">
        <!-- 搜索 -->
        <div :class="[prefixCls + '-search']">
          <Input
            v-model="productInfo.param"
            suffix="ios-search"
            clearable
            :placeholder="productPlaceholder"></Input>
        </div>
        <template v-if="productInfo.list.length > 0">
          <!-- 列表 -->
          <div :class="[prefixCls + '-content']">
            <!-- 全选 -->
            <div
              v-if="mutilProduct"
              :class="[prefixCls + '-item', prefixCls + '-checkall']">
              <Checkbox>全选</Checkbox>
            </div>
            <div
              v-for="product in productInfo.list"
              :key="product.value"
              :class="[
                prefixCls + '-item',
                { [prefixCls + '-item-active']: productInfo.info.value === product.value }
              ]">
              <Checkbox v-if="mutilProduct"></Checkbox>
              <Radio v-if="!mutilProduct"></Radio>
              <!-- 缩略图 -->
              <div :class="[prefixCls + '-item-img']">
                <img style="width: 100%; height: 100%; object-fit: cover" />
              </div>
              <div :class="[prefixCls + '-item-info']">
                <div :class="[prefixCls + '-item-name']">{{ product.label }}</div>
                <div :class="[prefixCls + '-item-id']">ID：{{ product.productId }}</div>
                <div
                  v-if="product[assetIdKey]"
                  :class="[prefixCls + '-item-assetid']">
                  投放条件：{{ product[assetIdKey] }}
                </div>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <Page
            :class="[prefixCls + '-page']"
            :total="productInfo.total"
            :current="productInfo.current"
            :page-size="productInfo.size"
            size="small"></Page>
        </template>
        <!-- 没有数据 -->
        <div
          v-else
          :class="[prefixCls + '-empty']">
          暂无数据
        </div>
        <!-- 加载中 -->
        <Spin
          v-if="productInfo.loading"
          :class="[prefixCls + '-loading']"
          size="large"></Spin>
      </template>
    </div>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
import _cloneDeep from 'lodash/cloneDeep'
const prefixCls = prefix + 'related-products-panel'
const defaultValue = {
  loading: false,
  total: 0,
  current: 1,
  size: 20,
  param: '',
  list: [],
  info: {}
}
export default {
  name: prefixCls,
  props: {
    // 选择的账号
    activeAccountId: {
      type: [String, Number],
      default: ''
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
    // 商品库多选
    mutilLibrary: {
      type: Boolean,
      default: false
    },
    // 商品多选
    mutilProduct: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls,
      // 产品库
      platformInfo: _cloneDeep(defaultValue),
      // 产品
      productInfo: _cloneDeep(defaultValue),
      formItem: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化（请求数据）
    async init() {
      await this.getPlatform()
      // 默认取值第一个选择的商品库查询
      if (this.value.length > 0) {
        // 是否在查询到的列表中
        let find = this.platformInfo.list.find(item => item.value === this.value[0].value)
        if (find) {
          // 更新选择的商品库
          this.platformInfo.info = find
          this.getProduct()
        }
      }
    },
    // 搜索产品库
    getPlatform() {
      return new Promise((resolve, reject) => {
        this.platformInfo.loading = true
        let { activeAccountId, platformInfo } = this
        let { current, size, param, info } = platformInfo
        let params = {
          current,
          size,
          param,
          info,
          activeAccountId
        }
        this.onSearchProductLibrary(params)
          .then(({ total, list }) => {
            this.platformInfo.total = total
            this.platformInfo.list = list
            this.platformInfo.loading = false
            resolve()
          })
          .catch(err => reject(err))
      })
    },
    // 搜索产品
    getProduct() {
      return new Promise((resolve, reject) => {
        this.platformInfo.loading = true
        let { activeAccountId, platformInfo, productInfo } = this
        let { info: platform } = platformInfo
        let { current, size, param, info } = productInfo
        let params = {
          platform,
          current,
          size,
          param,
          info,
          activeAccountId
        }
        this.onSearchProducts(params)
          .then(({ total, list }) => {
            this.productInfo.total = total
            this.productInfo.list = list
            this.productInfo.loading = false
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
}
</script>
