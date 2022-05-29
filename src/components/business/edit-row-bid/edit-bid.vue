<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-07 18:51:54
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-15 18:05:07
 * @FilePath: /ry-design/src/components/basics/edit-row-bid/edit-bid.vue
 * @Description: 编辑出价|名称|自定义内容
-->
<template>
  <div :class="[prefixCls]">
    <!-- 显示的按钮内容 -->
    <span :class="[prefixCls + '-icon', {disabled: poptipDisabled}]"
          @click="renderPoptip">
      <!-- 按钮类型 -->
      <slot name="iconType">
        <Icon :type="iconType"></Icon>
      </slot>
    </span>
    <!-- 悬浮的显示内容 -->
    <template v-if="showPoptip">
      <Poptip v-model="poptipModelValue"
              :placement="placement"
              :disabled="poptipDisabled"
              transfer
              :popper-class="prefixCls + '-popper'"
              @on-popper-show="show "
              @on-popper-hide="hide">
        <template #content>
          <div :class="prefixCls + '-poptip'">
            <!-- 显示名称 -->
            <div :class="prefixCls + '-poptip-name'">
              <slot name="title">
                <span>{{ title }}</span>
              </slot>
            </div>

            <!-- 显示内容 -->
            <div :class="prefixCls + '-poptip-wrap'">
              <!-- 输入文本 -->
              <div v-if="type === 'text'"
                   :class="prefixCls + '-poptip-wrap-' + type"
                   :style="{width: poptipWidth + 'px'}">
                <Form ref="Form"
                      :model="formData"
                      :rules="formRules">
                  <FormItem prop="value">
                    <div class="form-item">
                      <Input v-model="formData.value"
                             :class="{'show-max-count' : showTextLimit}"></Input>
                      <span v-if="showTextLimit"
                            class="text-limit">
                        <b :class="{ error: limitMaxText  }">{{ currentTextCount }}</b>
                        <b>/</b>
                        <b>{{ maxTextNum }}</b>
                      </span>
                    </div>

                  </FormItem>
                </Form>
              </div>

              <!-- 输入数字 -->
              <div v-if="type === 'number'"
                   :class="prefixCls + '-poptip-wrap-' + type"
                   :style="{width: poptipWidth + 'px'}">
                <Form ref="Form"
                      :model="formData"
                      :rules="formRules">
                  <FormItem prop="value">
                    <div class="form-item">
                      <InputNumber v-model="formData.value"
                                   v-bind="inputNumberProps"></InputNumber>
                    </div>
                  </FormItem>
                </Form>
              </div>

              <!-- 单选选择 -->
              <div v-if="type === 'radio'"
                   :class="prefixCls + '-poptip-wrap-' + type"
                   :style="{width: poptipWidth + 'px'}">
                <Form ref="Form"
                      :model="formData"
                      :rules="formRules">
                  <FormItem prop="value">
                    <RadioGroup v-model="formData.value"
                                type="button">
                      <Radio v-for="option in newRadioList"
                             :key="option.value"
                             :label="option.value"
                             :disabled="option.disabled">
                        <render v-if="typeof option.name === 'function'"
                                :render="option.name"></render>
                        <span v-else>{{option.name}} </span>
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </Form>
              </div>

              <!-- 自定义内容 -->
              <div v-if="type === 'custom'"
                   :class="prefixCls + '-poptip-wrap-' + type"
                   :style="{width: poptipWidth + 'px'}">
                <slot name="custom"></slot>
              </div>
            </div>

            <!-- 显示尾部按钮组区域 -->
            <div v-if="showFooter"
                 :class="prefixCls + '-poptip-footer'">
              <slot name="footer">
                <Button @click="cancel">取消</Button>
                <Button type="primary"
                        :loading="confrimLoading"
                        @click="confrim">确定</Button>
              </slot>
            </div>
          </div>
        </template>
      </Poptip>
    </template>
  </div>
</template>
<script>
import Render from './../../base/render';
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'edit-row-bid'
export default {
  name: prefixCls,
  components: {
    Render
  },
  props: {
    // 输入类型
    // text 输入文本
    // number 输入数字
    // radio 单选选择
    // custom 自定义内容
    type: {
      type: String,
      default: 'text'
    },
    // 需要编辑的数据
    value: {
      require: true,
      type: [Number, String]
    },
    // 显示的按钮类型 Icon type
    // http://v1.iviewui.com/components/icon
    iconType: {
      type: String,
      default: 'md-create'
    },
    // 显示标题
    title: {
      type: String,
      default: ''
    },
    // 校验规则（数据同 iview Form Rules）
    // 校验字段只有 value
    rules: {
      type: Array
    },
    // 浮层显示方向
    placement: {
      type: String,
      default: 'bottom'
    },
    // 浮层是否禁用
    poptipDisabled: {
      type: Boolean,
      default: false
    },
    // 浮层宽度
    poptipWidth: {
      type: [String, Number],
      default: 320
    },
    // 是否显示尾部按钮区域
    showFooter: {
      type: Boolean,
      default: true
    },
    // --------text 输入文本-------
    // 显示文本的长度
    showTextLimit: {
      type: Boolean,
      default: false
    },
    // 最大的文本长度
    maxTextNum: {
      type: Number
    },
    // 文本长度的计算函数(回调传入，当前的文本内容，返回计算后的文本长度)
    calcTextNumFunc: {
      type: Function
    },
    // --------text 输入文本-------
    // --------number 输入数字-------
    // 数字精度
    precision: {
      type: Number
    },
    // 设置了最小值，失去校验规则的最小值校验
    // 数字最小值
    numberMin: {
      type: Number
    },
    // 数字最大值
    // 设置了最大值，失去校验规则的最大值校验
    numberMax: {
      type: Number
    },
    // 数字步长
    numberStep: {
      type: Number
    },
    // --------number 输入数字-------
    // --------radio 单选选择-------
    // radio item 数据只有 {name value disabled}
    radioList: {
      validator: function (list) {
        if (!Array.isArray(list) || !list.length) {
          return false
        }
        // 这个值必须包含'name', 'value'
        const keys = ['name', 'value']
        return list.every(val => {
          const has = keys.every(k => {
            const isUndefined = typeof val[k] === 'undefined'
            return !isUndefined
          })
          return has
        })
      }
    },
    // --------radio 单选选择-------
    // 点击确定后调用的函数，在没有是用footer slot时，点击确定按钮会触发
    // return promise
    confirmFunc: {
      type: Function
    },
    // 显示浮层之前触发的函数
    beforeShowFunc: {
      type: Function
    },
    // 显示浮层触发
    poptipShowFunc: {
      type: Function
    },
    // 隐藏浮层触发
    poptipHideFunc: {
      type: Function
    }
  },
  data() {
    return {
      // 前缀
      prefixCls: prefixCls,
      // poptip组件的 v-model 的值
      poptipModelValue: false,
      // 确定时loading
      confrimLoading: false,
      // 渲染poptip组件
      showPoptip: false,
      // 组件内部表单数据
      formData: {
        value: this.value
      }
    }
  },
  computed: {
    // 单选时的枚举值
    newRadioList() {
      let keys = ['name', 'value', 'disabled']
      const { radioList = [] } = this
      return radioList.map(val => {
        let obj = {}
        keys.forEach(k => (obj[k] = val[k]))
        return obj
      })
    },
    // 当前计算出来的文本长度
    currentTextCount() {
      const { showTextLimit, type, calcTextNumFunc } = this
      if (type === 'text' && showTextLimit && calcTextNumFunc) {
        return calcTextNumFunc(this.formData.value)
      }
      return 0
    },
    // 表单的校验rules
    formRules() {
      const { rules } = this
      if (!Array.isArray(rules) || !rules.length) {
        return {}
      }
      return { value: rules }
    },
    // 是不是超过了最大文本输入长度
    limitMaxText() {
      const { maxTextNum, currentTextCount } = this
      if (typeof maxTextNum !== 'number') {
        return false
      }
      return currentTextCount > maxTextNum
    },
    // 输入数字时组件的属性
    inputNumberProps() {
      const {
        // 数字精度
        precision,
        // 数字最小值
        numberMin: min,
        // 数字最大值
        numberMax: max,
        // 数字最大值
        numberStep: step
      } = this
      let data = {
        precision,
        min,
        max,
        step,
        // 是否实时响应数据，设置为 false 时，只会在失焦时更改数据
        activeChange: false
      }
      const newData = {}
      for (const key in data) {
        if (typeof data[key] !== 'undefined') {
          newData[key] = data[key]
        }
      }
      return newData
    }
  },
  methods: {
    // 显示悬浮
    renderPoptip() {
      if (this.poptipDisabled) {
        return
      }
      this.renderPoptipBefore()
      this.showPoptip = true
      this.poptipModelValue = false
      setTimeout(() => {
        this.poptipModelValue = true
      }, 16.7)
    },
    // 显示前触发一些方法
    renderPoptipBefore() {
      if (this.beforeShowFunc && typeof this.beforeShowFunc === 'function') {
        this.beforeShowFunc(this)
      }
    },
    // ok回调
    okCb() {
      // 有没有回调方法
      const hasOkFunc = this.confirmFunc && typeof this.confirmFunc === 'function'
      if (!hasOkFunc) {
        return
      }
      this.confrimLoading = true
      this.confirmFunc(this.formData.value)
        .then(() => {
          this.confrimLoading = false
          this.cancel()
        })
        .catch(() => {
          this.confrimLoading = false
        })
    },
    // 保存|确定
    confrim() {
      // 自定义
      if (this.type === 'custom') {
        this.okCb()
      }
      // 不是自定义
      if (this.type !== 'custom') {
        // 有无Form组件
        const _FormRef = this.$refs['Form']
        if (!_FormRef) {
          return
        }
        _FormRef.validate(valid => {
          valid && this.okCb()
        })
      }
    },
    // 取消
    cancel() {
      this.poptipModelValue = false
      this.showPoptip = false
    },
    // 浮层显示
    show() {
      if (this.poptipShowFunc && typeof this.poptipShowFunc === 'function') {
        this.poptipModelValue && this.poptipShowFunc()
      }
    },
    // 浮层隐藏
    hide() {
      this.cancel()
      if (this.poptipHideFunc && typeof this.poptipHideFunc === 'function') {
        this.poptipHideFunc()
      }
    }
  }
}
</script>
