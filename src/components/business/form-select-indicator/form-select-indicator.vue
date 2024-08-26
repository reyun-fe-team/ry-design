<template>
  <div :class="classes">
    <div
      v-if="hasSwitch"
      :class="prefixCls + '-data-filtering'">
      <i-switch
        v-model="dataFilteringChecked"
        size="small"
        @on-change="changeDataFilterStatus" />
      <span :class="prefixCls + '-data-filtering-text'">按指标数值筛选</span>
    </div>
    <template v-if="dataFilteringChecked">
      <div>
        <div
          v-for="(_, index) in currentValue.data"
          :key="index"
          :class="prefixCls + '-content'"
          @mouseover="handleMouseOver(index)"
          @mouseleave="handleMouseLeave">
          <div
            :style="formStyle"
            :class="prefixCls + '-form'">
            <rd-filter-list-select
              v-model="currentValue.selectData[index]"
              :max-height="256"
              :input-width="160"
              filterable
              :data="getFilteredDataList(index)"
              @on-click="handleStop"
              @on-change="changeData(index)"></rd-filter-list-select>
            <div :class="prefixCls + '-form-line'"></div>
            <rd-form-indicator
              :ref="`rdFormIndicator-${index}`"
              v-model="currentValue.data[index]"
              :show-label="false"
              :show-clear-icon="false"
              :unit="getUnit(index)"
              :width="182"
              :indicator-rule="indicatorRule"
              :styles="{ width: '240px' }"
              @on-change="changeIndicator" />
          </div>
          <span
            v-if="currentValue.data.length > minLine && showDeleteIcon === index"
            :class="prefixCls + '-icon-delete'">
            <Icon
              custom="iconfont ry-icon-trash-outline"
              @click="handlerDelete(index)"></Icon>
          </span>
        </div>
      </div>
      <span
        v-if="currentValue.data.length < maxLine"
        :class="prefixCls + '-add-line'"
        @click="handlerAddLine">
        添加行
      </span>

      <!-- 是否显示数据筛选方式 -->
      <template
        v-if="
          showIndexIsUnion &&
          currentValue.data.length > 1 &&
          currentValue.selectData.length > 1 &&
          currentValue.data[1].symbol
        ">
        <div :class="prefixCls + '-index-is-union'">
          <Checkbox
            v-model="formData.indexIsUnion.check"
            :disabled="formData.indexIsUnion.disabled"></Checkbox>
          <rd-filter-list-select
            v-model="formData.indexIsUnion.indexIsUnion"
            :input-width="240"
            :width="200"
            :option-width="200"
            label="数据筛选方式 :"
            :multiple="false"
            name="indexIsUnion"
            :data="filterItemsValue"
            @on-change="changeIndexIsUnion"></rd-filter-list-select>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'form-select-indicator'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
export default {
  name: prefixCls,
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          data: [],
          selectData: []
        }
      }
    },
    styles: {
      type: Object,
      default: () => {}
    },
    formStyle: {
      type: Object,
      default: () => {
        return {
          width: '350px'
        }
      }
    },
    // 添加最大行数10条
    maxLine: {
      type: Number,
      default: 10
    },
    minLine: {
      type: Number,
      default: 1
    },
    // 指标选择数据
    dataList: {
      type: Array,
      default: () => []
    },
    showIndexIsUnion: {
      type: Boolean,
      defualt: false
    },
    indicatorRule: {
      type: Array,
      default: () => [
        {
          value: '=',
          label: '等于'
        },
        {
          value: '!=',
          label: '不等于'
        },
        {
          value: '<',
          label: '小于'
        },
        {
          value: '>',
          label: '大于'
        },
        {
          value: '>=',
          label: '大于等于'
        },
        {
          value: '<=',
          label: '小于等于'
        },
        {
          value: 'BETWEEN',
          label: '介于',
          ruleType: 'number-input-between'
        }
      ]
    },
    hasSwitch: {
      type: Boolean,
      defualt: true
    }
  },
  data() {
    return {
      prefixCls,
      showDeleteIcon: null,
      currentValue: this.value,
      dataFilteringChecked: false,
      isChangingDataFilter: false,
      formData: {
        indexIsUnion: {
          check: true,
          disabled: true,
          indexIsUnion: 0
        }
      },
      params: {
        label: '',
        type: '',
        symbol: '', // symbol 进入不选中为'',symbol和ruleType若有值需要同有
        symbolLabel: '',
        ruleType: '',
        startValue: 0,
        endValue: 0,
        value: 0,
        dataType: ''
      },
      filterItemsValue: [
        { label: '交集', value: 0, description: '须同时满足数据筛选所设条件。' },
        { label: '并集', value: 1, description: '须满足任一数据筛选所设条件。' }
      ]
    }
  },
  computed: {
    classes() {
      return [`${this.prefixCls}`]
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (_isEmpty(val.selectData)) {
          this.currentValue = {
            data: [_cloneDeep(this.params)],
            selectData: []
          }
          if (!this.hasSwitch) {
            this.dataFilteringChecked = true
          }
        } else {
          this.currentValue = val
          this.dataFilteringChecked = true
        }
      },
      deep: true
    }
  },
  methods: {
    getFilteredDataList(index) {
      const selectedValues = this.currentValue.selectData.slice(0, index)
      const filteredDataList = this.dataList.filter(item => {
        return !selectedValues.includes(item.value)
      })
      return filteredDataList
    },
    changeData(index) {
      if (!_isEmpty(this.dataList)) {
        let { label = '', dataType = '' } =
          this.dataList.find(val => val.value === this.currentValue.selectData[index]) || {}
        let params = _cloneDeep(this.params)
        if (
          this.currentValue &&
          this.currentValue.data[index] &&
          !this.currentValue.data[index].symbol
        ) {
          params.label = label
          params.dataType = dataType
          params.type = this.currentValue.selectData[index]
          this.currentValue.data[index] = params
        } else {
          this.currentValue.data[index].label = label
          this.currentValue.data[index].dataType = dataType
          this.currentValue.data[index].type = this.currentValue.selectData[index]
        }
      }
      this.$emit('input', _cloneDeep(this.currentValue))
      this.$emit('on-change', _cloneDeep(this.currentValue), this.formData)
    },
    changeIndicator() {
      this.$emit('input', _cloneDeep(this.currentValue))
      this.$emit('on-change', _cloneDeep(this.currentValue), this.formData)
    },
    // 更改数据筛选方式
    changeIndexIsUnion() {
      this.$emit('on-change', _cloneDeep(this.currentValue), this.formData)
    },
    handleStop() {
      this.currentValue.data.forEach((item, index) => {
        this.$refs[`rdFormIndicator-${index}`][0].clickOutside()
      })
    },
    handlerAddLine() {
      this.currentValue.data.push(_cloneDeep(this.params))
      this.currentValue.selectData.push('')
    },
    handlerDelete(index) {
      this.currentValue.data.splice(index, 1)
      this.currentValue.selectData.splice(index, 1)
      this.$emit('input', _cloneDeep(this.currentValue))
      this.$emit('on-change', _cloneDeep(this.currentValue), this.formData)
    },
    handleMouseOver(index) {
      this.showDeleteIcon = index
    },
    handleMouseLeave() {
      this.showDeleteIcon = null
    },
    getUnit(index) {
      if (
        this.currentValue &&
        this.currentValue.data[index] &&
        this.currentValue.data[index].dataType === 'TYPE_PERCENTAGE'
      ) {
        return '%'
      }
      return ''
    },
    changeDataFilterStatus(val) {
      this.dataFilteringChecked = val
      if (!val) {
        this.$nextTick(() => {
          this.currentValue = {
            data: [],
            selectData: []
          }
          this.formData.indexIsUnion.indexIsUnion = 0
          this.$emit('input', _cloneDeep(this.currentValue))
          this.$emit('on-change', _cloneDeep(this.currentValue), this.formData)
        })
      }
    }
  }
}
</script>
