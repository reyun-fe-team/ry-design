<!--
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2022-12-13 16:50:46
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2022-12-13 19:03:19
 * @FilePath: /ry-design/src/components/business/submission-rule/submission-rule.vue
 * @Description: 提交规则
-->
<template>
  <div :class="[prefixCls]">
    <Form
      ref="formData"
      :class="[prefixCls + '-form']"
      :model="formData">
      <!-- 提交方式 -->
      <FormItem label="提交方式">
        <rd-radio-group
          v-model="formData.submitRule"
          :default-list="submitRulesList"
          @on-change="handleSubmitRule"></rd-radio-group>
      </FormItem>

      <!-- 设置 -->
      <FormItem v-if="['DELAY', 'BATCH', 'REPEAT'].includes(formData.submitRule)">
        <!-- 提示 -->
        <span slot="label">
          设置
          <Tooltip
            :content="ruleTipsList[formData.submitRule]"
            theme="light"
            max-width="240"
            placement="left-top">
            <Icon
              type="ios-help-circle-outline"
              size="16"
              color="#575865"></Icon>
          </Tooltip>
        </span>

        <!-- 开始时间 -->
        <DatePicker
          ref="StartTimePicker"
          style="width: 200px; margin-right: 8px"
          type="datetime"
          :editable="false"
          format="yyyy-MM-dd HH:mm"
          :value="formData.startTime"
          :options="dateOptions"
          :clearable="false"
          placeholder="请选择定时提交日期时间"
          @on-ok="handleStartTime"
          @on-clickoutside="handleStartTime"></DatePicker>

        <!-- 时间间隔 -->
        <template v-if="['BATCH', 'REPEAT'].includes(formData.submitRule)">
          <ryExplain text="时间间隔"></ryExplain>
          <Select
            v-model="formData.timeInterval"
            filterable
            style="width: 80px; margin-right: 8px">
            <Option
              v-for="item in timeList[formData.submitRule]"
              :key="item.value"
              :value="item.value"
              :label="item.label"></Option>
          </Select>
        </template>

        <!-- 广告数量 -->
        <template v-if="['BATCH'].includes(formData.submitRule)">
          <ryExplain text="广告数量"></ryExplain>
          <InputNumber
            v-model="formData.batchAdNum"
            :min="1"
            :max="100"
            :active-change="false"
            :precision="0"></InputNumber>
        </template>

        <!-- 重复次数 -->
        <template v-if="['REPEAT'].includes(formData.submitRule)">
          <ryExplain text="重复次数"></ryExplain>
          <InputNumber
            v-model="formData.repeatTimes"
            :min="2"
            :max="10"
            :precision="0"
            :active-change="false"></InputNumber>
        </template>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import moment from 'moment'
import ryExplain from './explain'
import { prefix } from '../../../config.js'
import _cloneDeep from 'lodash/cloneDeep'
import _assign from 'lodash/assign'
const prefixCls = prefix + 'submission-rule'
export default {
  name: prefixCls,
  components: {
    ryExplain
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          // 规则
          submitRule: '',
          // 开始时间
          startTime: '',
          // 时间间隔
          timeInterval: '',
          // 分批提交 广告数
          batchAdNum: '',
          // 重复提交 重复次数
          repeatTimes: ''
        }
      }
    },
    // 提交规则提示的枚举值
    ruleTipsList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      prefixCls,
      formData: _cloneDeep(this.value),
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
    submitRulesList() {
      return [
        { label: '立即提交', value: 'NOW' },
        { label: '定时提交', value: 'DELAY' },
        { label: '分批提交', value: 'BATCH' },
        { label: '重复提交', value: 'REPEAT' }
      ]
    },
    batchTimeList() {
      return [
        { value: 'FIVE_MINUTE', label: '05分钟' },
        { value: 'TEN_MINUTE', label: '10分钟' },
        { value: 'FIFTEEN_MINUTE', label: '15分钟' },
        { value: 'THIRTY_MINUTE', label: '30分钟' },
        { value: 'FORTY_FIVE_MINUTE', label: '45分钟' },
        { value: 'ONE_HOUR', label: '60分钟' },
        { value: 'TWO_HOUR', label: '120分钟' }
      ]
    },
    repeatTimeList() {
      return [
        { value: 'FIVE_MINUTE', label: '05分钟' },
        { value: 'TEN_MINUTE', label: '10分钟' },
        { value: 'FIFTEEN_MINUTE', label: '15分钟' },
        { value: 'THIRTY_MINUTE', label: '30分钟' },
        { value: 'FORTY_FIVE_MINUTE', label: '45分钟' },
        { value: 'ONE_HOUR', label: '01小时' },
        { value: 'THREE_HOUR', label: '03小时' },
        { value: 'SIX_HOUR', label: '06小时' },
        { value: 'TWELVE_HOUR', label: '12小时' },
        { value: 'TWENTY_FOUR_HOUR', label: '24小时' }
      ]
    },
    timeList() {
      return {
        BATCH: this.batchTimeList,
        REPEAT: this.repeatTimeList
      }
    }
  },
  created() {
    const nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm')
    this.formData.startTime = nowTime
  },
  methods: {
    handleStartTime() {
      let visualValue = ''
      const ref = this.$refs['StartTimePicker']
      if (ref) {
        visualValue = ref.visualValue
      }

      // 选择时间小于当前时间，不能提交
      const visualtime = new Date(visualValue).getTime()
      const nowtime = new Date().getTime()
      let value = moment(new Date(visualtime)).format('YYYY-MM-DD HH:mm')
      if (visualtime < nowtime) {
        value = moment(new Date()).format('YYYY-MM-DD HH:mm')
      }
      this.formData.startTime = value
    },
    handleSubmitRule(val) {
      let newData = {
        submitRule: val,
        // 时间间隔
        timeInterval: 'FIVE_MINUTE'
      }
      this.formData = _assign({}, this.formData, newData)
    }
  }
}
</script>