<template>
  <main>
    <Form
      :model="formData"
      :rules="ruleValidate"
      :label-width="240">
      <FormItem label="不展示默认solt">
        <rd-word-limit
          :is-input-slot="false"
          :current-len="5"></rd-word-limit>
      </FormItem>
      <FormItem
        label="不区分中英文"
        prop="value2">
        <rd-word-limit
          v-model="formData.value2"
          :max-len="maxLen"
          :is-differ-word="false"
          @on-validate="onValidate2"></rd-word-limit>
      </FormItem>
      <FormItem
        label="区分中英文,最大输入数量为英文字符"
        prop="value3">
        <rd-word-limit
          v-model="formData.value3"
          :max-len="maxLen"
          @on-validate="onValidate3"></rd-word-limit>
      </FormItem>
      <FormItem
        label="区分中英文,最大输入数量为汉字"
        prop="value4">
        <rd-word-limit
          v-model="formData.value4"
          :max-len="maxLen"
          count-type="cn"
          @on-validate="onValidate4"></rd-word-limit>
      </FormItem>
      <FormItem
        label="不显示input边框"
        prop="value5">
        <rd-word-limit
          v-model="formData.value5"
          :max-len="maxLen"
          :input-border="false"
          @on-validate="onValidate5"></rd-word-limit>
      </FormItem>
      <FormItem
        label="disabled"
        prop="value6">
        <rd-word-limit
          v-model="formData.value6"
          :max-len="maxLen"
          :input-disabled="true"></rd-word-limit>
      </FormItem>
    </Form>
  </main>
</template>
<script>
const maxLen = 10
export default {
  data() {
    return {
      formData: {
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '不可用'
      },
      rules2: null,
      rules3: null,
      rules4: null,
      rules5: null,
      maxLen,
      ruleValidate: {
        value2: [
          {
            message: `长度不能超过${maxLen}个字符，请正确输入`,
            validator: (rule, value, cb) => {
              this.$nextTick(() => {
                if (this.rules2) {
                  cb(new Error())
                } else {
                  cb()
                }
              })
            }
          }
        ],
        value3: [
          {
            message: `长度不能超过${maxLen}个字符，请正确输入`,
            validator: (rule, value, cb) => {
              this.$nextTick(() => {
                if (this.rules3) {
                  cb(new Error())
                } else {
                  cb()
                }
              })
            }
          }
        ],
        value4: [
          {
            message: `长度不能超过${maxLen}个汉字，请正确输入`,
            validator: (rule, value, cb) => {
              this.$nextTick(() => {
                if (this.rules4) {
                  cb(new Error())
                } else {
                  cb()
                }
              })
            }
          }
        ],
        value5: [
          {
            message: `长度不能超过${maxLen}个字符，请正确输入`,
            validator: (rule, value, cb) => {
              this.$nextTick(() => {
                if (this.rules5) {
                  cb(new Error())
                } else {
                  cb()
                }
              })
            }
          }
        ]
      }
    }
  },
  methods: {
    onValidate2(bool) {
      this.rules2 = bool
    },
    onValidate3(bool) {
      this.rules3 = bool
    },
    onValidate4(bool) {
      this.rules4 = bool
    },
    onValidate5(bool) {
      this.rules5 = bool
    }
  }
}
</script>