<template>
  <div>
    <h1>简单例子</h1>
    <Form
      ref="form"
      :model="formInline"
      :rules="ruleInline"
      @submit.prevent>
      <rd-wildcard
        v-model="formInline.campaignName"
        :option="{ prop: 'campaignName', label: '计划' }"
        :data="data"
        :save-rule="true"></rd-wildcard>
    </Form>
    <Button
      type="primary"
      @click="handleSubmit('formCustom')">
      Submit
    </Button>
    <p>
      {{ formInline.campaignName }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      data: [
        { label: '+投放方式', id: 'a', title: '{投放方式}', tooltip: 'tooltip' },
        { label: '+序号', id: 'b', title: '{序号}' },
        { label: '+日期', id: 'c', title: '{日期}' },
        { label: '+定向包名称', id: 'd', title: '{定向包名称}' },
        {
          label:
            '+定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称',
          id: 'e',
          title:
            '{定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称}'
        },
        {
          label:
            '+定向包名称定向包名称定向包名包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称',
          id: 'f',
          title:
            '{定向包名称定向包名称定向包名包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称定向包名称}'
        }
      ],
      formInline: {
        campaignName: ''
      },
      ruleInline: {
        campaignName: [
          { required: true, message: '不能为空', trigger: 'change' },
          {
            max: 50,
            message: '超出最大'
          }
        ]
      }
    }
  },
  methods: {
    getStrLen(str) {
      if (typeof str === 'string' && str) {
        return str.split('').reduce((total, cur) => {
          return (total += /^[\u4e00-\u9fa5。？！，、；：“”（）《》￥——……【】‘’]$/.test(cur)
            ? 2
            : 1)
        }, 0)
      }
      return 0
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style>

</style>