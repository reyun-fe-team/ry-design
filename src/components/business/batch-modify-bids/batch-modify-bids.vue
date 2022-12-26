<template>
  <div
    v-if="show"
    :class="prefixCls">
    <rd-modals
      :value="show"
      :loading="loading"
      :class-name="prefixCls + '-modal'"
      :mask-closable="false"
      :width="width"
      :title="title"
      @on-cancel="handleCancel"
      @on-ok="handleChangeCallback">
      <template #content>
        <Form
          ref="formValidate"
          :model="formData"
          :class="prefixCls + '-form'"
          :label-width="104"
          :rules="ruleValidate">
          <FormItem label="出价方式">
            <rd-radio-group
              v-model="formData.type"
              :default-list="typeList"
              @on-change="handleTypeChange"></rd-radio-group>
          </FormItem>

          <FormItem
            label="出价范围"
            prop="range">
            <div
              v-if="!isRangeBidType"
              key="bid-fixed"
              :class="prefixCls + '-bid-fixed'">
              <InputNumber
                v-model="formData.num"
                :active-change="false"
                placeholder="请输入"
                :precision="precision"
                :max="max"
                :min="min" />
              <span class="unit">{{ unit }}</span>
            </div>
            <div
              v-if="isRangeBidType"
              key="bid-range"
              :class="prefixCls + '-bid-range'">
              <InputNumber
                v-model="formData.min"
                :active-change="false"
                placeholder="最低出价"
                :precision="precision"
                :max="max"
                :min="min" />
              <span class="connector">-</span>
              <InputNumber
                v-model="formData.max"
                :active-change="false"
                placeholder="最高出价"
                :precision="precision"
                :max="max"
                :min="min" />
              <span class="unit">{{ unit }}</span>
            </div>
          </FormItem>
        </Form>
      </template>
    </rd-modals>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'batch-modify-bids'

export default {
  name: prefixCls,
  props: {
    // 显示
    show: {
      type: Boolean,
      default: false
    },
    // modal宽度
    width: {
      type: [String, Number],
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 最大
    max: {
      type: Number,
      default: 99999.99
    },
    // 最小
    min: {
      type: Number,
      default: 0.01
    },
    // 精度
    precision: {
      type: Number,
      default: 2
    },
    // 单位
    unit: {
      type: String,
      default: '元'
    },
    // 是否设置为ROI系数
    isRoiRatio: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      loading: true,
      formData: { type: 'FIXED', num: null, min: null, max: null },
      ruleValidate: {
        range: [
          {
            validator: () => {
              return new Promise((resolve, reject) => {
                this.validte()
                  .then(() => resolve())
                  .catch(err => reject(err))
              })
            }
          }
        ]
      },
      typeList: [
        { label: '固定出价', value: 'FIXED' },
        { label: '阶梯出价', value: 'LADDER' },
        { label: '随机出价', value: 'RANDOM' }
      ]
    }
  },
  computed: {
    // 是否为范围出价
    isRangeBidType() {
      return this.formData.type !== 'FIXED'
    },
    // 其他数据
    modelData() {
      const { modelData = {} } = this.batchConfig || {}
      return modelData
    },
    // 最大|最小|精度
    inputConfig() {
      const { max, min, precision } = this.modelData
      return { max, min, precision }
    }
  },
  methods: {
    validte() {
      return new Promise((resolve, reject) => {
        try {
          const { max, min, num } = this.formData
          const { max: maxBidPrice, min: minBidPrice, isRoiRatio, isRangeBidType } = this
          if (!isRangeBidType) {
            if (!num) {
              let msg = '请填写出价'
              if (isRoiRatio) {
                msg = '请填写ROI系数'
              }
              reject(new Error(msg))
              return
            }
            if (num < minBidPrice || num > maxBidPrice) {
              let msg = `出价不少于${minBidPrice}元，不超过${maxBidPrice}元`
              if (isRoiRatio) {
                msg = `ROI系数不小于${minBidPrice}，不大于${maxBidPrice}`
              }
              reject(new Error(msg))
              return
            }
          }
          if (isRangeBidType) {
            if (!max || !min) {
              reject(new Error('请填写最低出价与最高出价'))
              return
            }
            if (min < minBidPrice || min > maxBidPrice) {
              reject(new Error(`最低出价不能小于${minBidPrice}元，不能大于${maxBidPrice}元`))
              return
            }
            if (max < minBidPrice || max > maxBidPrice) {
              reject(new Error(`最高出价不能小于${minBidPrice}元，不能大于${maxBidPrice}元`))
              return
            }
            if (min > max) {
              reject(new Error('最低出价不能大于最高出价'))
              return
            }
          }
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    handleTypeChange() {
      this.$refs['formValidate'].resetFields()
    },
    handleChangeCallback() {
      this.$refs['formValidate'].validate(valid => {
        if (valid) {
          const { precision } = this
          const { type, num, min, max } = this.formData
          this.$emit('on-ok', { type, num, min, max, precision })
        } else {
          this.loading = false
          setTimeout(() => (this.loading = true))
        }
      })
    },
    handleCancel() {
      this.$emit('on-cancel')
    }
  }
}
</script>
