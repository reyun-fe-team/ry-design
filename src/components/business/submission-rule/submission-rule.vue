<template>
  <div :class="[prefixCls]">
    <Form
      ref="formData"
      label-position="left"
      :label-width="110"
      :class="[prefixCls + '-form']"
      :model="formData">
      <FormItem
        label="提交方式"
        :class="[prefixCls + '-rule']">
        <rd-radio-group
          v-model="formData.adsSubmitRule"
          :class="[prefixCls + '-rule-group']"
          :default-list="submitRuleList"></rd-radio-group>
      </FormItem>

      <template v-if="formData.adsSubmitRule === 'DELAY'">
        <FormItem
          v-if="hasDelaySubmitTime"
          label="执行时间">
          <DatePicker
            v-model="formData.adsDelaySubmitTime"
            :class="[prefixCls + '-date-picker']"
            style="width: 200px"
            type="datetime"
            :editable="false"
            format="yyyy-MM-dd HH:mm"
            :options="dateOptions"
            :clearable="false"
            placeholder="请选择定时提交日期时间"
            @on-ok="handleStartTime('adsDelaySubmitTime')"
            @on-clickoutside="handleStartTime('adsDelaySubmitTime')"></DatePicker>
        </FormItem>
      </template>
      <template v-if="formData.adsSubmitRule === 'BATCH'">
        <FormItem
          v-if="hasDelaySubmitTime"
          label="执行时间">
          <DatePicker
            v-model="formData.adsBatchStartTime"
            :class="[prefixCls + '-date-picker']"
            style="width: 200px"
            type="datetime"
            :editable="false"
            format="yyyy-MM-dd HH:mm"
            :options="dateOptions"
            :clearable="false"
            placeholder="请选择定时提交日期时间"
            @on-ok="handleStartTime('adsBatchStartTime')"
            @on-clickoutside="handleStartTime('adsBatchStartTime')"></DatePicker>
        </FormItem>
        <FormItem label="时间间隔">
          <div :class="[prefixCls + '-setting-item']">
            <Select
              v-model="formData.adsSubmitInterval1"
              style="width: 200px"
              :class="[prefixCls + '-interval-select']">
              <Option
                v-for="item in timeList"
                :key="item.value"
                :value="item.value"
                :label="item.label"></Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="提交维度">
          <rd-radio-group
            v-model="formData.adsSubmitDimension"
            :class="[prefixCls + '-rule-group']"
            :default-list="submitDimensionList"
            @on-change="handelDimensionChange"></rd-radio-group>
        </FormItem>
        <FormItem label="多账户同时提交">
          <rd-radio-group
            v-model="formData.adsMoreAccount"
            :class="[prefixCls + '-rule-group']"
            :default-list="adsMoreAccountList"></rd-radio-group>
        </FormItem>
        <FormItem>
          <label slot="label">
            {{ '每次提交' + dimensionLabel }}
            <Tooltip
              placement="top"
              max-width="200"
              theme="light"
              content="多账户同时提交开启时，设置数量为每个账户每次提交数量；多账户同时提交关闭时，设置数量为每次提交数量。">
              <Icon
                type="ios-help-circle-outline"
                size="16"
                class="cursor-pointer icon-question tip-icon"></Icon>
            </Tooltip>
          </label>
          <div :class="[prefixCls + '-setting-item']">
            <InputNumber
              v-model="formData.adsSubmitNum1"
              style="width: 200px"
              :class="[prefixCls + '-adnum']"
              :min="1"
              :max="maxLimit"
              :active-change="false"
              :precision="0"></InputNumber>
          </div>
        </FormItem>
      </template>
      <template v-if="formData.adsSubmitRule === 'REPEAT'">
        <FormItem
          v-if="hasDelaySubmitTime"
          label="执行时间">
          <DatePicker
            v-model="formData.adsRepeatSubmitTime"
            :class="[prefixCls + '-date-picker']"
            style="width: 200px"
            type="datetime"
            :editable="false"
            format="yyyy-MM-dd HH:mm"
            :options="dateOptions"
            :clearable="false"
            placeholder="请选择定时提交日期时间"
            @on-ok="handleStartTime('adsRepeatSubmitTime')"
            @on-clickoutside="handleStartTime('adsRepeatSubmitTime')"></DatePicker>
        </FormItem>
        <FormItem label="时间间隔">
          <div :class="[prefixCls + '-setting-item']">
            <Select
              v-model="formData.adsSubmitInterval2"
              style="width: 200px"
              :class="[prefixCls + '-interval-select']">
              <Option
                v-for="item in timeList"
                :key="item.value"
                :value="item.value"
                :label="item.label"></Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="重复次数">
          <div :class="[prefixCls + '-setting-item']">
            <InputNumber
              v-model="formData.adsSubmitNum2"
              style="width: 200px"
              :class="[prefixCls + '-ad-num']"
              :min="1"
              :max="10"
              :active-change="false"
              :precision="0"></InputNumber>
          </div>
        </FormItem>
      </template>
    </Form>
  </div>
</template>
<script>
import moment from 'moment'
import { prefix } from '../../../config.js'
import _deepClone from 'lodash/cloneDeep'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'
const prefixCls = prefix + 'submission-rule'

import * as config from './data.js'
export default {
  name: prefixCls,
  props: {
    mediaCode: {
      required: true,
      type: String
    },
    maxConfig: {
      type: Object,
      default: () => ({ CAMPAIGN: 100, PLAN: 100 })
    },
    // 已选择数据
    selectForm: {
      type: Object,
      default: null
    },
    // 提交方式禁用函数
    submitRuleDisabledItemFun: {
      type: Function
    },
    // 是否包含执行时间
    hasDelaySubmitTime: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls,
      formData: {
        // 提交规则
        adsSubmitRule: 'NOW',
        // 定时提交的 开始时间
        adsDelaySubmitTime: moment(new Date()).format(config.TIME_FORMAT),
        // 分批提交的 开始时间
        adsBatchStartTime: moment(new Date()).format(config.TIME_FORMAT),
        // 分配提交的 间隔时间
        adsSubmitInterval1: 'FIVE_MINUTE',
        // 提交维度
        adsSubmitDimension: 'PLAN',
        // 多账户同时提交
        adsMoreAccount: 'OFF',
        // 分批提交 广告数
        adsSubmitNum1: 1,

        // 重复提交的 开始时间
        adsRepeatSubmitTime: moment(new Date()).format(config.TIME_FORMAT),
        // 重复提交的 间隔时间
        adsSubmitInterval2: 'FIVE_MINUTE',
        // 重复提交 广告数
        adsSubmitNum2: 2
      },
      dateOptions: {
        disabledDate(date) {
          // iview 时间控件 禁用30天后的日期
          const endDate = moment(new Date()).add(30, 'day')
          return (
            (date && date.valueOf() < Date.now() - 86400000) || (date && date.valueOf() > endDate)
          )
        }
      }
    }
  },
  computed: {
    dimensionLabel() {
      return config.getDimensionLabel(this.mediaCode, this.formData.adsSubmitDimension)
    },
    submitRuleList() {
      if (this.submitRuleDisabledItemFun) {
        return this.submitRuleDisabledItemFun(
          config.getSubmitRuleList(this.mediaCode, this.formData.adsSubmitDimension)
        )
      }

      return config.getSubmitRuleList(this.mediaCode, this.formData.adsSubmitDimension)
    },
    submitDimensionList() {
      return config.getSubmitDimensionList(this.mediaCode)
    },
    adsMoreAccountList() {
      return config.getAdsMoreAccountList(this.mediaCode, this.formData.adsSubmitDimension)
    },
    timeList() {
      return config.MapSubmitRule.get(this.formData.adsSubmitRule).timeList
    },
    maxLimit() {
      let adsSubmitDimension = this.formData.adsSubmitDimension

      if (this.formData.adsSubmitRule === 'REPEAT') {
        adsSubmitDimension = 'PLAN'
      }

      return this.maxConfig[adsSubmitDimension]
    },
    emitData() {
      return {
        formData: this.formData,
        labelData: this.getLabelData(),
        submitData: this.getSubmitData()
      }
    },
    emitDataString() {
      return JSON.stringify(this.emitData)
    }
  },
  watch: {
    emitDataString: {
      handler(n, o) {
        if (n !== o) {
          this.handleChange()
        }
      }
    }
  },
  created() {
    // 有值
    if (this.selectForm && !_isEmpty(this.selectForm)) {
      this.formData = _deepClone(this.selectForm)
    }
    this.handleChange()
  },
  methods: {
    // 防抖 更新最后一次结果
    handleChange: _debounce(function () {
      this.$emit('on-change', this.emitData)
    }, 20),
    handelDimensionChange() {
      this.formData.adsSubmitNum1 = 1
    },
    handleStartTime(type) {
      let visualValue = this.formData[type]
      // // 选择时间小于当前时间，不能提交
      const visualTime = new Date(visualValue).getTime()
      const nowTime = new Date().getTime()
      let value = moment(new Date(visualTime)).format(config.TIME_FORMAT)
      if (visualTime < nowTime) {
        value = moment(new Date()).format(config.TIME_FORMAT)
      }
      this.formData[type] = value
    },

    // utils
    validate() {
      return new Promise((resolve, reject) => {
        let {
          adsSubmitRule,
          adsSubmitNum1,
          adsSubmitNum2,
          adsDelaySubmitTime,
          adsBatchStartTime,
          adsRepeatSubmitTime
        } = this.formData
        if (adsSubmitRule === 'NOW') {
          resolve(true)
        }
        let nowTime = Date.parse(new Date())
        if (adsSubmitRule === 'DELAY') {
          let setTime = moment(adsDelaySubmitTime).valueOf()
          if (setTime <= nowTime) {
            reject(new Error('设定时间不可小于等于当前时间'))
          } else {
            resolve(true)
          }
        }
        // 分批提交
        if (adsSubmitRule === 'BATCH') {
          let setTime = moment(adsBatchStartTime).valueOf()
          if (setTime <= nowTime) {
            reject(new Error('设定时间不可小于等于当前时间'))
          } else if (adsSubmitNum1 < 1 || adsSubmitNum1 > this.maxLimit) {
            reject(new Error(`提交数量请输入1-${this.maxLimit}整数`))
          } else {
            resolve(true)
          }
        }
        // 重复提交
        if (adsSubmitRule === 'REPEAT') {
          let setTime = moment(adsRepeatSubmitTime).valueOf()
          if (setTime <= nowTime) {
            reject(new Error('设定时间不可小于等于当前时间'))
          } else if (adsSubmitNum2 < 2 || adsSubmitNum2 > 10) {
            reject(new Error('提交数量请输入2-10整数'))
          } else {
            resolve(true)
          }
        }
      })
    },
    getSubmitData() {
      let result = {
        adsSubmitRule: this.formData.adsSubmitRule
      }
      // 定时
      if (this.formData.adsSubmitRule === 'DELAY') {
        result.adsDelaySubmitTime = moment(this.formData.adsDelaySubmitTime).format(
          config.TIME_FORMAT
        )
      }
      // 分批
      else if (this.formData.adsSubmitRule === 'BATCH') {
        result.adsDelaySubmitTime = moment(this.formData.adsBatchStartTime).format(
          config.TIME_FORMAT
        )
        result.adsSubmitInterval = this.formData.adsSubmitInterval1
        result.adsSubmitDimension = this.formData.adsSubmitDimension
        result.adsMoreAccount = this.formData.adsMoreAccount
        result.adsSubmitNum = this.formData.adsSubmitNum1
      }
      // 重复
      else if (this.formData.adsSubmitRule === 'REPEAT') {
        result.adsDelaySubmitTime = moment(this.formData.adsRepeatSubmitTime).format(
          config.TIME_FORMAT
        )
        result.adsSubmitInterval = this.formData.adsSubmitInterval2
        result.adsSubmitNum = this.formData.adsSubmitNum2
      }

      //  如果不包含执行时间，那么删除该参数
      if (!this.hasDelaySubmitTime) {
        delete result.adsDelaySubmitTime
      }
      return result
    },
    getLabelData() {
      let result = {
        adsSubmitRule: this.submitRuleList.find(item => item.value === this.formData.adsSubmitRule)
          .label
      }

      return result
    }
  }
}
</script>
