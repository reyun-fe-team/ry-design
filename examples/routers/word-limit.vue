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
          ref="rd-word-limit2"
          v-model="formData.value2"
          :max-len="maxLen"
          :is-differ-word="false"></rd-word-limit>
      </FormItem>
      <FormItem
        label="区分中英文,最大输入数量为英文字符"
        prop="value3">
        <rd-word-limit
          ref="rd-word-limit3"
          v-model="formData.value3"
          :max-len="maxLen"></rd-word-limit>
      </FormItem>
      <FormItem
        label="区分中英文,最大输入数量为汉字"
        prop="value4">
        <rd-word-limit
          ref="rd-word-limit4"
          v-model="formData.value4"
          :max-len="maxLen"
          count-type="cn"></rd-word-limit>
      </FormItem>
      <FormItem
        label="不显示input边框"
        prop="value5">
        <rd-word-limit
          ref="rd-word-limit5"
          v-model="formData.value5"
          :max-len="maxLen"
          :input-border="false"></rd-word-limit>
      </FormItem>
      <FormItem
        label="disabled"
        prop="value6">
        <rd-word-limit
          ref="rd-word-limit6"
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
      maxLen,
      ruleValidate: {
        value2: [
          {
            message: `长度不能超过${maxLen}个字符，请正确输入`,
            validator: (rule, value, cb) => {
              this.$nextTick(() => {
                const len = this.$refs['rd-word-limit2'].countFn({
                  value: this.formData.value2,
                  type: 'en',
                  isDifferWord: false
                })
                const flag = len > maxLen
                if (flag) {
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
                const len = this.$refs['rd-word-limit3'].countFn({
                  value: this.formData.value3,
                  type: 'en',
                  isDifferWord: true
                })
                const flag = len > maxLen
                if (flag) {
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
                const len = this.$refs['rd-word-limit4'].countFn({
                  value: this.formData.value4,
                  type: 'cn',
                  isDifferWord: true
                })
                const flag = len > maxLen
                if (flag) {
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
                const len = this.$refs['rd-word-limit5'].countFn({
                  value: this.formData.value5,
                  type: 'en',
                  isDifferWord: true
                })
                const flag = len > maxLen
                if (flag) {
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
  }
}
</script>