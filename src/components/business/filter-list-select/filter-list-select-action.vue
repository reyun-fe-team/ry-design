<template>
  <div :class="prefixCls">
    <div
      v-if="!status"
      :class="prefixCls + '-start'">
      <div
        :class="prefixCls + '-start-text'"
        :title="actionText">
        {{ actionText }}
        <span
          :class="prefixCls + '-start-botton'"
          @click="handleAdd">
          {{ actionButtonText }}
        </span>
      </div>
    </div>

    <div
      v-if="status"
      :class="classBody">
      <Form
        ref="formValidate"
        inline
        :model="formValidate">
        <FormItem
          ref="formItem"
          prop="value"
          :rules="actionRuleValidate">
          <Input
            v-model="formValidate.value"
            :placeholder="placeholder"
            :class="prefixCls + '-body-input'" />
          <div
            :class="prefixCls + '-body-cancel'"
            @click="handleCancel">
            取消
          </div>
          <div
            :class="prefixCls + '-body-save'"
            @click="handleOk">
            确认
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-select-action'

export default {
  name: prefixCls,
  props: {
    actionText: {
      type: String,
      default: ''
    },
    actionButtonText: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    beforeActionOk: Function,
    actionRuleValidate: Object,
    updateDropdown: Function
  },
  data() {
    return {
      prefixCls,
      formValidate: {
        value: ''
      },
      status: false,
      validateState: 'success'
    }
  },
  computed: {
    classBody() {
      return [
        `${this.prefixCls}-body`,
        {
          [`${this.prefixCls}-error`]: this.validateState === 'error'
        }
      ]
    }
  },
  watch: {
    'formValidate.value'() {
      setTimeout(() => {
        this.setValidateState()
      })
    }
  },
  methods: {
    setValidateState() {
      if (this.$refs.formItem) {
        this.validateState = this.$refs.formItem.validateState === 'error' ? 'error' : 'success'
      } else {
        this.validateState = 'success'
      }
      this.updateDropdown()
    },
    handleAdd() {
      this.status = true
    },
    handleCancel() {
      this.status = false
      this.formValidate.value = ''
      this.validateState = 'success'
    },
    handleOk() {
      this.$refs.formValidate.validate(valid => {
        this.setValidateState()
        if (valid) {
          if (!this.beforeActionOk) {
            this.$emit('on-ok', this.formValidate.value)
            this.handleCancel()
            return
          }
          const before = this.beforeActionOk(this.formValidate.value)
          if (before && before.then) {
            before.then(() => {
              this.$emit('on-ok', this.formValidate.value)
              this.handleCancel()
            })
          } else if (before !== false) {
            this.$emit('on-ok', this.formValidate.value)
            this.handleCancel()
          }
        }
      })
    }
  }
}
</script>
