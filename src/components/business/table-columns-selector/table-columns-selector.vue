<template>
  <div :class="[prefixCls]">
    <rd-table-columns
      :key="currDimension"
      v-model="columnsValue[currDimension]"
      :data="tableColumns"
      :show-header="false"
      :show-add-custom="showAddCustom"
      @on-change-data="onTableColumnsChange">
      <div
        v-if="isShowHeaderTabs"
        slot="header"
        class="table-columns-header">
        <div class="header-tabs">
          <div
            v-for="item in dimension"
            :key="item.value"
            class="header-tabs-item"
            :class="{ active: item.value === currDimension }"
            @click="changeDimensionHandle(item.value)">
            {{ item.label }}
            <span
              v-if="columnsValue[item.value] && columnsValue[item.value].length"
              class="badge-count">
              {{ columnsValue[item.value].length }}
            </span>
          </div>
        </div>
        <span
          v-if="showAddCustom"
          :class="prefixCls + '-add-custom'"
          @click="handlerAddCustom">
          + 添加自定义指标
        </span>
      </div>
    </rd-table-columns>
    <rd-draggable-card
      v-if="showSelectedCard"
      :data="selectedList"
      :height="441"
      @on-change="onDraggableSortChange"></rd-draggable-card>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'table-columns-selector'
import _cloneDeep from 'lodash/cloneDeep'
import _isEqual from 'lodash/isEqual'
export default {
  name: prefixCls,
  props: {
    value: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    showAddCustom: {
      type: Boolean,
      default: false
    },
    dimension: {
      type: Array,
      default: () => [
        { label: '可添加指标', value: 'default' },
        { label: 'TKIO指标', value: 'monitoring' }
      ]
    },
    showSelectedCard: {
      type: Boolean,
      default: true
    },
    // eslint-disable-next-line vue/require-default-prop
    splitRule: Function
  },
  data() {
    return {
      prefixCls, //样式
      dimensionData: {
        default: []
      }, //分割后的原始数据
      flatDimensionData: {
        default: []
      }, //分割后的原始扁平数据
      tableColumns: [], //当前维度的所有指标
      selectedList: [], //已选数据详细数据
      columnsValue: {
        default: []
      }, //已选维度的key
      selectedDimensionData: {
        default: []
      }, //已选维度的key
      currDimension: 'default' //当前指标维度
    }
  },
  computed: {
    // 是否用slot表达头部
    isShowHeaderTabs({ dimension }) {
      const validLength = dimension.filter(e => !!e.label && !!e.value).length
      return validLength > 1
    }
  },
  watch: {
    value: {
      handler(n, o) {
        if (!_isEqual(n, o)) {
          this.setDefaultDeimensionSelectedData()
        }
      }
    },
    selectedList: {
      handler(n, o) {
        if (!_isEqual(n, o)) {
          this.emitData()
        }
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.initTableColumnsData()
    },
    // 初始化原始数据
    initTableColumnsData() {
      const { dimension, isShowHeaderTabs, data } = this
      if (!isShowHeaderTabs) {
        this.tableColumns = _cloneDeep(data)
      } else {
        const defaultKey = dimension[0].value
        dimension.forEach(item => {
          this.$set(this.columnsValue, item.value, [])
          this.$set(this.selectedDimensionData, item.value, [])
        })
        this.splitSourceData()
        this.currDimension = defaultKey
        this.tableColumns = this.dimensionData[defaultKey]

        this.setDefaultDeimensionSelectedData()
      }
    },
    // 分割原始数据
    splitSourceData() {
      const { dimension, splitRule, data } = this
      if (!splitRule) {
        const result = {
          default: []
        }
        data.forEach(item => {
          const { key } = item
          const dimensionKeys = dimension.map(e => e.value)
          if (dimensionKeys.includes(key)) {
            if (!result[key]) {
              result[key] = [item]
            } else {
              result[key].push(item)
            }
          } else {
            result['default'].push(item)
          }
        })
        this.dimensionData = result
        Object.keys(this.dimensionData).forEach(key => {
          const value = this.dimensionData[key]
          this.flatDimensionData[key] = this.flatTree(value)
        })
      }
    },
    // 重置数据
    clearData() {
      Object.keys(this.columnsValue).forEach(key => {
        this.columnsValue[key] = []
        this.selectedDimensionData[key] = []
      })
    },
    // 将初始化已选值赋值到各个维度中
    setDefaultDeimensionSelectedData() {
      const { value, clearData } = this
      clearData()
      const findProperty = (obj, value) => {
        for (let key in obj) {
          const keys = obj[key].map(v => v.key)
          if (keys.includes(value)) {
            return key
          }
        }
        return null
      }
      value.forEach(item => {
        const key = findProperty(this.flatDimensionData, item)
        this.columnsValue[key].push(item)
        const e = this.flatDimensionData[key].find(v => v.key === item)
        if (e) {
          this.selectedDimensionData[key].push(e)
        }
      })
    },
    // 拍平数据
    flatTree(tree, titles = '') {
      return tree.reduce((res, item) => {
        if (item.children && item.children.length) {
          res = res.concat(this.flatTree(item.children, titles + '/' + item.title))
        } else {
          res.push({
            ...item,
            key: item.key,
            title: item.title,
            label: item.title,
            parents: titles.slice(1)
          })
        }
        return res
      }, [])
    },
    // 切换维度
    changeDimensionHandle(key) {
      this.currDimension = key
      this.tableColumns = this.dimensionData[key]
    },
    // 选择指标项组件-数据变化
    onTableColumnsChange(data) {
      const { value } = data
      const { currDimension, value: modelValue } = this
      this.selectedDimensionData[currDimension] = this.flatDimensionData[currDimension].filter(v =>
        value.includes(v.key)
      )
      const mergeData = Object.values(this.selectedDimensionData).flat()
      // 重新排序赋值
      this.selectedList = mergeData.sort((x, y) => {
        let xIndex = modelValue.indexOf(x.key)
        let yIndex = modelValue.indexOf(y.key)
        return (xIndex >= 0 ? xIndex : 999999) - (yIndex >= 0 ? yIndex : 999999)
      })
    },
    // 拖拽卡片组件-数据变化
    onDraggableSortChange(data) {
      this.selectedList = data
    },
    handlerAddCustom() {
      this.$emit('add-custom')
    },
    // 向上传递数据
    emitData() {
      const keys = this.selectedList.map(e => e.key)
      this.$emit('input', keys)
      this.$emit('on-change', { value: keys, list: this.selectedList })
    }
  }
}
</script>