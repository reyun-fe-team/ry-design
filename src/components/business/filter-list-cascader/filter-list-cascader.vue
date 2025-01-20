<template>
  <div>
    <rd-filter-list
      ref="filter-list"
      v-model="current"
      :real-data="realData"
      :data="optionData"
      :label="label"
      :trigger="trigger"
      :query="query"
      :not-found-text="notFoundText"
      :drop-down-same-width-as-panel="dropDownSameWidthAsPanel"
      :input-width="inputWidth"
      :input-height="inputHeight"
      :option-width="optionWidth"
      :width="width"
      :height="height"
      :max-height="maxHeight"
      :min-height="minHeight"
      :filterable="filterable"
      :show-select-option="showSelectOption"
      :clearable="clearable"
      :show-image="showImage"
      :show-description="showDescription"
      :input-placeholder="inputPlaceholder"
      :filter-placeholder="filterPlaceholder"
      :disabled="disabled"
      :transfer="transfer"
      :not-found="!filterData.length"
      @query-change="queryChange"
      @on-visible-change="handleVisibleChange">
      <template slot="search-operate">
        <slot name="search-operate"></slot>
      </template>
      <!-- 展示结果面板 -->
      <filter-list-cascader-panel
        v-if="!isSearching"
        v-model="current"
        :styles="mainStyles"
        :data="filterData"
        :max="max"></filter-list-cascader-panel>
      <!-- 搜索结果面板 -->
      <filter-list-cascader-result-panel
        v-else
        v-model="current"
        :styles="mainStyles"
        :search-value="query"
        :data="filterData"></filter-list-cascader-result-panel>
    </rd-filter-list>
  </div>
</template>

<script>
// Add import for new component
import filterListCascaderResultPanel from './filter-list-cascader-result-panel'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-cascader'
import axios from 'axios'
import _cloneDeep from 'lodash/cloneDeep'
import { oneOf } from '@src/util/assist.js'
import Emitter from '@src/mixins/emitter'
import filterListCascaderPanel from './filter-list-cascader-panel'

const checkValuesNotEqual = (value, values) => {
  const strValue = JSON.stringify(value)
  const strValues = JSON.stringify(values)
  return strValue !== strValues
}
export default {
  name: prefixCls,
  components: { filterListCascaderPanel, filterListCascaderResultPanel },
  mixins: [Emitter],
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        api: '', // API路径
        method: 'POST', // 请求方法
        params: {}, // 请求参数
        dataPath: '', // 数据在响应中的路径，如 'data.list'
        transform: null, // 数据转换函数
        headers: {}, // 请求头
        data: {} // 请求体
      })
    },
    immediate: {
      type: Boolean,
      default: true // 是否在组件挂载时立即请求数据
    },
    levelKeyMap: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [Array, String, Number],
      default: () => {
        return []
      }
    },
    label: String,
    multiple: {
      type: Boolean,
      default: false
    },
    notFoundText: String,
    filterable: Boolean,
    showSelectOption: Boolean,
    clearable: Boolean,
    trigger: String,
    saveType: {
      type: String,
      default: 'always-save',
      //default: 'leave-save',
      // 时时保存 always-save 离开保存leave-save
      validator(value) {
        return oneOf(value, ['always-save', 'leave-save'])
      }
    },
    // 是否需要自动计算下拉面板的宽度与input panel 等宽
    dropDownSameWidthAsPanel: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: [Number, String],
    maxHeight: {
      type: [Number, String],
      default: 320
    },
    minHeight: [Number, String],
    inputWidth: [String, Number],
    inputHeight: {
      type: [String, Number],
      default: 32
    },
    optionWidth: [String, Number],
    filterMethod: {
      type: Function,
      default(data, query) {
        const type = 'label' in data ? 'label' : 'value'
        return data[type].indexOf(query) > -1
      }
    },
    labelMethod: Function,
    showImage: Boolean,
    showDescription: Boolean,
    inputPlaceholder: String,
    filterPlaceholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    transfer: Boolean,
    max: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      prefixCls,
      current: [],
      query: '',
      isSearching: false, // 是否在搜索，搜索模式下展示搜索结果面板
      sourceData: [] // 存储从接口获取的数据
    }
  },
  computed: {
    filterData() {
      const sourceList = this.data.length ? this.data : this.sourceData
      if (this.query === '') {
        return JSON.parse(JSON.stringify(sourceList))
      }
      return sourceList.reduce((list, item) => {
        const _item = JSON.parse(JSON.stringify(item))
        let end = []
        const isChildren = item.children && !!item.children.length
        if (!isChildren && this.filterMethod(item, this.query)) {
          list.push(_item)
        } else if (isChildren) {
          end = _item.children.filter(val => this.filterMethod(val, this.query))
          if (end && end.length) {
            _item.children = end
            list.push(_item)
          }
        }
        return list
      }, [])
    },
    realData() {
      let current = Array.isArray(this.value) ? this.value : [this.value]
      return _cloneDeep(current)
    },
    mainStyles() {
      let style = {}
      if (this.height) {
        const height = parseInt(this.height)
        style.height = `${height}px`
      }
      if (this.maxHeight) {
        const maxHeight = parseInt(this.maxHeight)
        style.maxHeight = `${maxHeight}px`
      }
      if (this.minHeight) {
        const minHeight = parseInt(this.minHeight)
        style.minHeight = `${minHeight}px`
      }
      return style
    },
    pullCurrentWatch() {
      // 其实程序做到这一步就可以监听到数据的变化了，再用JSON.parse做数据还原方便后边数据处理。
      return JSON.parse(JSON.stringify(this.current))
    },
    optionData() {
      const sourceData = this.data.length ? this.data : this.sourceData
      return sourceData.reduce((list, val) => {
        if (val.children && val.children.length) {
          list = [...list, ...val.children]
        } else if (val && (!val.children || !val.children.length)) {
          list = [...list, val]
        }
        return list
      }, [])
    }
  },
  watch: {
    value(value) {
      if (value === '') {
        this.current = []
      } else if (checkValuesNotEqual(value, this.current)) {
        this.$nextTick(() => {
          const data = this.getInitialValue()
          this.current = data
        })
      }
    },
    pullCurrentWatch(now, before) {
      if (this.saveType === 'always-save' || !this.multiple) {
        const newValue = JSON.stringify(now)
        const oldValue = JSON.stringify(before)
        const shouldEmitInput = newValue === oldValue
        if (!shouldEmitInput) {
          // console.log('时时触发-emitChange')
          this.emitChange()
        }
      }
    }
  },
  created() {
    if (this.immediate && this.dataSource.api) {
      this.fetchData()
    }
  },
  mounted() {
    const data = this.getInitialValue()
    this.current = data
  },
  methods: {
    async fetchData(params = {}) {
      if (!this.dataSource.api) {
        return
      }

      try {
        this.loading = true
        const requestConfig = {
          url: this.dataSource.api,
          method: this.dataSource.method || 'POST',
          params: { ...this.dataSource.params, ...params },
          data: this.dataSource.data || {}, // 请求体数据
          headers: this.dataSource.headers || {} // 添加请求头配置
        }

        const response = await axios(requestConfig)

        // 获取数据路径
        let data = response
        if (this.dataSource.dataPath) {
          data = this.dataSource.dataPath.split('.').reduce((obj, key) => obj[key], response)
        }

        // 数据转换
        if (typeof this.dataSource.transform === 'function') {
          data = this.dataSource.transform(data)
        }

        this.sourceData = data
        this.$emit('on-data-loaded', data)
      } catch (error) {
        this.$emit('on-data-error', error)
        console.error('Failed to fetch data:', error)
      } finally {
        this.loading = false
      }
    },

    // 刷新数据方法
    refresh(params = {}) {
      return this.fetchData(params)
    },
    getInitialValue() {
      const { multiple, value } = this
      let initialValue = Array.isArray(value) ? _cloneDeep(value) : [value]
      if (
        !multiple &&
        (typeof initialValue[0] === 'undefined' ||
          (String(initialValue[0]).trim() === '' && !Number.isFinite(initialValue[0])))
      ) {
        initialValue = []
      }
      return initialValue
    },
    emitChange() {
      let emitValue = this.multiple ? _cloneDeep(this.current) : this.current[0]
      // Form 重置时，如果初始值是 null，也置为 null，而不是 []
      if (Array.isArray(emitValue) && !emitValue.length && this.value === null) {
        emitValue = null
      } else if (emitValue === undefined && this.value === null) {
        emitValue = null
      }

      // 添加层级化输出
      const hierarchicalValue = this.getHierarchicalValue(emitValue)

      // 保持原有输出
      this.$emit('input', emitValue)
      this.$emit('on-change', emitValue)
      // 新增层级化输出
      this.$emit('on-hierarchical-change', hierarchicalValue)
      this.dispatch('FormItem', 'on-form-change', emitValue)
    },
    // 新增方法：获取层级化的值
    getHierarchicalValue(value) {
      const findPath = (data, targetValue, path = []) => {
        for (const item of data) {
          if (item.value === targetValue) {
            return [...path, { level: path.length, value: item.value }]
          }
          if (item.children && item.children.length) {
            const found = findPath(item.children, targetValue, [
              ...path,
              { level: path.length, value: item.value }
            ])
            if (found) {
              return found
            }
          }
        }
        return null
      }

      if (!value) {
        return null
      }
      const sourceData = this.data.length ? this.data : this.sourceData
      const values = Array.isArray(value) ? value : [value]
      const result = values.map(val => {
        const path = findPath(sourceData, val)
        return path || [{ level: 0, value: val }]
      })

      // Modified: Convert to array format
      const hierarchical = {}
      result.forEach(path => {
        path.forEach(({ level, value }) => {
          const defaultKey = `level${level}`
          const levelKey = this.levelKeyMap[defaultKey] || defaultKey
          if (!hierarchical[levelKey]) {
            hierarchical[levelKey] = []
          }
          if (!hierarchical[levelKey].includes(value)) {
            hierarchical[levelKey].push(value)
          }
        })
      })

      // Convert to array format
      return Object.entries(hierarchical).map(([key, values]) => ({
        [key]: values
      }))
    },
    queryChange(val) {
      this.query = val
      this.isSearching = val !== '' // Update isSearching based on query
    },
    handleClick({ value }) {
      if (this.multiple) {
        if (this.current.includes(value)) {
          this.current = this.current.filter(item => item !== value)
        } else {
          this.current.push(value)
        }
      } else {
        this.current = [value]
        this.$refs['filter-list'].closeDropdown()
      }
    },
    handleVisibleChange(val) {
      if (!val && this.saveType === 'leave-save' && this.multiple) {
        // console.log('离开触发-emitChange')
        this.emitChange()
      }
      this.$emit('on-visible-change', val)
    }
  }
}
</script>
