<template>
  <div :class="classes">
    <!-- trigger="custom" -->
    <filter-list-panel
      :trigger="trigger"
      @on-visible-change="handleVisibleChange">
      <filter-list-input
        :value="inputData"
        :label="label"
        :styles="inputStyles"
        :placeholder="inputPlaceholder"
        :icon-state="visible"></filter-list-input>
      <div
        slot="list"
        :class="prefixCls + '-body'">
        <div :class="prefixCls + '-body-panel'">
          <Input
            v-model="queryValue"
            :placeholder="filterPlaceholder"
            :class="prefixCls + '-body-panel-search'"
            @on-change="filterChange">
            <Icon
              slot="prefix"
              type="ios-search" />
            <Icon
              v-show="!!query"
              slot="suffix"
              type="ios-close"
              :class="prefixCls + '-body-panel-search-clear'"
              size="20"
              @click="onClearSearch" />
          </Input>
          <div :class="prefixCls + '-body-content'">
            <slot v-if="!notFound"></slot>
            <div
              v-if="notFound"
              :class="prefixCls + '-body-not-found'">
              {{ notFoundText }}
            </div>
          </div>

          <!-- <filter-list-select v-model="current"></filter-list-select> -->
        </div>
        <filter-list-option></filter-list-option>
      </div>
    </filter-list-panel>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list'
import filterListPanel from './filter-list-panel'
// import filterListSelect from './filter-list-select'
import filterListOption from './filter-list-option'
import filterListInput from './filter-list-input'
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: prefixCls,
  components: { filterListPanel, filterListOption, filterListInput },
  props: {
    value: {
      type: [Array, String, Number],
      default: () => []
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    trigger: String,
    placement: String,
    label: String,
    inputPlaceholder: String,
    filterPlaceholder: {
      type: String,
      default: '请输入要搜索的内容'
    },
    label: String,
    query: {
      type: String,
      default: ''
    },
    notFound: {
      type: Boolean,
      default: false
    },
    notFoundText: {
      type: String,
      default: '无匹配数据'
    },
    inputWidth: {
      type: [String, Number],
      default: '200px'
    }
  },
  data() {
    return {
      prefixCls,
      current: this.value,
      visible: false,
      queryValue: this.query
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    inputData() {
      return this.data.filter(val => this.current.includes(val.value))
    },
    inputStyles() {
      return {
        width: typeof this.inputWidth === 'number' ? `${this.inputWidth}px` : this.inputWidth
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.current = val
      },
      deep: true
    },
    queryValue(val) {
      this.$emit('query-change', val)
    }
    // current: {
    //   handler(val) {
    //     this.$emit('input', val)
    //     this.$emit('on-change', val)
    //   },
    //   deep: true
    // }
  },
  methods: {
    handleVisibleChange(val) {
      this.visible = val
    },
    filterChange() {},
    onClearSearch() {
      this.queryValue = ''
    }
  }
}
</script>
