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
          <div :class="classInput">
            <Input
              ref="input"
              v-model="formValidate.value"
              :placeholder="placeholder" />
            <div
              v-if="!actionHideTotal"
              :class="prefixCls + '-body-input-limit'">
              {{ count }}/{{ actionTotal }}
            </div>
          </div>

          <div
            :class="prefixCls + '-body-cancel'"
            @click="handleCancel">
            取消
          </div>
          <div :class="prefixCls + '-body-save'">
            <div
              v-if="!loading"
              :class="prefixCls + '-body-save-text'"
              @click="handleOk">
              确认
            </div>
            <Spin
              v-if="loading"
              :class="prefixCls + '-body-loading'">
              <Icon
                type="ios-loading"
                size="18"
                :class="prefixCls + '-body-loading-icon'"></Icon>
            </Spin>
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
    updateDropdown: Function,
    actionCount: {
      type: Function,
      default: value => {
        return value.length
      }
    },
    actionTotal: {
      type: Number,
      default: 0
    },
    actionHideTotal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      formValidate: {
        value: ''
      },
      status: false,
      validateState: 'success',
      loading: false
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
    },
    count() {
      return this.actionCount(this.formValidate.value)
    },
    classInput() {
      return [
        `${this.prefixCls}-body-input`,
        {
          [`${this.prefixCls}-body-input-count`]: !this.actionHideTotal
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
      this.$nextTick(() => {
        this.$refs.input.focus({
          preventScroll: true
        })
      })

      this.updateDropdown()
    },
    handleCancel() {
      this.status = false
      this.formValidate.value = ''
      this.validateState = 'success'
      this.updateDropdown()
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
            this.loading = true
            before
              .then(() => {
                this.loading = false
                this.$emit('on-ok', this.formValidate.value)
                this.handleCancel()
              })
              .catch(() => {
                this.loading = false
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
