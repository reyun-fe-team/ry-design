<template>
  <div :class="classes">
    指标选择
    <div
      v-for="(item, index) of formData"
      :key="index"
      @mouseover="handleMouseOver(index)"
      @mouseleave="handleMouseLeave">
      <div
        :style="formStyle"
        :class="prefixCls + '-form'">
        <rd-filter-list-select
          v-model="item['selectRadio']"
          :max-height="256"
          :input-width="160"
          filterable
          :data="groupList"
          @on-click="handleStop"
          @on-change="changeData(item, index)"></rd-filter-list-select>
        <div :class="prefixCls + '-form-line'"></div>
        <rd-form-indicator
          :ref="`rdFormIndicator-${index}`"
          v-model="item['indicatorData']"
          :show-clear-icon="false"
          :unit="item.indicatorData.dataType === 'TYPE_PERCENTAGE' ? '%' : ''"
          :width="182"
          :styles="{ width: '240px' }"
          @on-change="changeData" />
        <span
          v-if="formData.length > 1 && showDeleteIcon === index"
          :class="prefixCls + '-icon-delete'">
          <Icon
            custom="iconfont ry-icon-guanbi"
            @click="handlerDelete(item, index)"></Icon>
        </span>
      </div>
    </div>
    <div
      v-if="formData.length < maxLine"
      :class="prefixCls + '-add-line'"
      @click="handlerAddLine">
      添加行
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'form-select-indicator'
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: prefixCls,
  props: {
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
    currentData: {
      type: Object,
      default: () => {
        return {
          selectRadio: '',
          indicatorData: {
            type: 'TYPE_NUM',
            symbol: '',
            symbolLabel: '',
            ruleType: '',
            startValue: 0,
            endValue: 0,
            value: 0,
            dataType: 'TYPE_NUM'
          }
        }
      }
    },
    // 指标选择数据
    groupList: {
      type: Array,
      default: () => [
        {
          label: '消耗',
          value: 'cost',
          dataType: 'TYPE_NUM'
        },
        {
          label: '展示数',
          value: 'show',
          dataType: 'TYPE_NUM'
        },
        {
          label: '点击数',
          value: 'click',
          dataType: 'TYPE_NUM'
        },
        {
          label: '转化数',
          value: 'convert',
          dataType: 'TYPE_NUM'
        }
      ]
    }
  },
  data() {
    return {
      prefixCls,
      showDeleteIcon: null,
      formData: []
    }
  },
  computed: {
    classes() {
      return [`${this.prefixCls}`]
    }
  },
  created() {
    this.formData.push(_cloneDeep(this.currentData))
  },
  methods: {
    handleStop() {
      this.formData.forEach((item, index) => {
        this.$refs[`rdFormIndicator-${index}`][0].clickOutside()
      })
    },
    handlerAddLine() {
      this.formData.push(_cloneDeep(this.currentData))
      this.$emit('on-select', this.formData)
    },
    handlerDelete(item, index) {
      this.formData.splice(index, 1)
      this.$emit('on-select', this.formData)
    },
    changeData(item, index) {
      if (item.selectRadio) {
        this.groupList.forEach(val => {
          if (val.value === item.selectRadio) {
            this.formData[index].indicatorData.type = val.dataType
            this.formData[index].indicatorData.dataType = val.dataType
          }
        })
      }
      this.$emit('on-select', this.formData)
    },
    handleMouseOver(index) {
      this.showDeleteIcon = index
    },
    handleMouseLeave() {
      this.showDeleteIcon = null
    }
  }
}
</script>
