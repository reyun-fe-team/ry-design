<template>
  <div class="inline-block">
    <div :class="classes">
      <header :class="prefixCls + '-header'">
        <Checkbox
          :value="checkedAll"
          :disabled="checkedAllDisabled"
          @on-change="toggleSelectAll"></Checkbox>
        <span
          :class="prefixCls + '-header-title'"
          @click="toggleSelectAll(!checkedAll)">
          {{ title }}
        </span>
        <span :class="prefixCls + '-header-count'">{{ count }}</span>
      </header>
      <div :class="bodyClasses">
        <div
          v-if="filterable"
          :class="prefixCls + '-body-search-wrapper'">
          <Search
            :query="query"
            :placeholder="filterPlaceholder"
            @on-query-clear="handleQueryClear"
            @on-query-change="handleQueryChange"></Search>
        </div>
        <ul :class="prefixCls + '-content'">
          <li
            v-for="(item, index) in filterData"
            :key="index"
            :class="itemClasses(item)"
            @click.prevent="select(item)">
            <Checkbox
              :value="isCheck(item)"
              :disabled="item.disabled"></Checkbox>
            <span v-html="showLabel(item)"></span>
          </li>
          <li
            v-if="!filterData.length"
            :class="prefixCls + '-content-not-found'">
            {{ notFoundText }}
          </li>
        </ul>
      </div>
      <div
        v-if="showFooter"
        :class="prefixCls + '-footer'">
        <slot></slot>
      </div>
    </div>

    <template v-if="bthOpened">
      <Operation
        :prefix-cls="prefixCls"
        :operations="operations"
        :left-active="leftActive"
        :right-active="rightActive"></Operation>
    </template>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
let prefixCls = prefix + 'transfer-list'
import Search from './search.vue'
import Operation from './operation.vue'
export default {
  name: prefixCls,
  components: { Search, Operation },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    renderFormat: {
      type: Function,
      default(item) {
        return item.label || item.key
      }
    },
    title: {
      type: String,
      default: '标题'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterPlaceholder: {
      type: String,
      default: '请输入搜索内容'
    },
    filterMethod: {
      type: Function,
      default(data, query) {
        const type = 'label' in data ? 'label' : 'key'
        return data[type].indexOf(query) > -1
      }
    },
    bthOpened: {
      type: Boolean,
      default: false
    },
    leftActive: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    notFoundText: {
      type: String,
      default: '列表为空'
    },
    operations: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      query: '',
      checkedKeys: this.value,
      showItems: this.data,
      rightActive: false,
      showFooter: true
    }
  },
  computed: {
    classes() {
      return [
        `${this.prefixCls}`,
        {
          [`${this.prefixCls}-with-footer`]: this.showFooter
        }
      ]
    },
    bodyClasses() {
      return [
        `${this.prefixCls}-body`,
        {
          [`${this.prefixCls}-body-with-search`]: this.filterable,
          [`${this.prefixCls}-body-with-footer`]: this.showFooter
        }
      ]
    },
    validKeysCount() {
      return this.checkedKeys.length
    },
    count() {
      const validKeysCount = this.validKeysCount
      return (validKeysCount > 0 ? `${validKeysCount}/` : '') + `${this.data.length}`
    },
    checkedAll() {
      return (
        this.filterData.filter(data => !data.disabled).length === this.validKeysCount &&
        this.validKeysCount !== 0
      )
    },
    checkedAllDisabled() {
      return this.filterData.filter(data => !data.disabled).length <= 0
    },
    filterData() {
      return this.showItems.filter(item => this.filterMethod(item, this.query))
    }
  },
  watch: {
    value: function (newV) {
      this.checkedKeys = newV
    },
    data(newV) {
      this.showItems = newV
    },
    checkedKeys: function (newV) {
      this.onCheckedKeysChange(newV)
    }
  },
  mounted() {
    this.showFooter = this.$slots.default !== undefined
  },
  methods: {
    onCheckedKeysChange(data) {
      let leftActive = false
      let rightActive = false
      if (data.length) {
        leftActive = true
        rightActive = true
        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          let noMoveData = this.data.filter(option => {
            return option.key === item
          })
          if (noMoveData && noMoveData.length && noMoveData[0].noMove === 'left') {
            leftActive = false
          }
          if (noMoveData && noMoveData.length && noMoveData[0].noMove === 'right') {
            rightActive = false
          }
        }
      }
      this.rightActive = rightActive
      this.$emit('input', data)
      this.$emit('to-left-disabled', leftActive)
    },
    itemClasses(item) {
      return [
        `${this.prefixCls}-content-item`,
        {
          [`${this.prefixCls}-content-item-disabled`]: item.disabled
        }
      ]
    },
    showLabel(item) {
      return this.renderFormat(item)
    },
    isCheck(item) {
      return this.checkedKeys.some(key => key === item.key)
    },
    select(item) {
      if (item.disabled) {
        return
      }
      const index = this.checkedKeys.indexOf(item.key)
      index > -1 ? this.checkedKeys.splice(index, 1) : this.checkedKeys.push(item.key)
    },
    updateFilteredData() {
      this.showItems = this.data
    },
    toggleSelectAll(status) {
      const keys = status
        ? this.filterData
            .filter(data => !data.disabled || this.checkedKeys.indexOf(data.key) > -1)
            .map(data => data.key)
        : this.filterData
            .filter(data => data.disabled && this.checkedKeys.indexOf(data.key) > -1)
            .map(data => data.key)
      this.checkedKeys = keys
    },
    handleQueryClear() {
      this.query = ''
    },
    handleQueryChange(val) {
      this.query = val
    },
    moveTo(type) {
      this.$emit('move-to', type)
    }
  }
}
</script>
