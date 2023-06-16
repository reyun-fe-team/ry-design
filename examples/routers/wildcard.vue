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
        clearable
        :option="{
          prop: 'campaignName',
          label: '计划',
          tooltip: '仅对新创建的广告组生效，不支持更新已有广告组。'
        }"
        :wildcard-label-config="{ label: '', width: 0 }"
        :data="data"
        join-symbol=""
        :save-rule="false"
        :show-save-rule="true"
        :show-word-limit="false"
        @on-name-programs="onNamePrograms"></rd-wildcard>
    </Form>
    <Button
      type="primary"
      @click="handleSubmit('formCustom')">
      Submit
    </Button>
    <p>
      {{ formInline.campaignName }}
      {{ formInline.ids }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      data: [
        {
          label: '+投放方式',
          id: 'a',
          title: '{投放方式}',
          tooltip: 'tooltiptooltiptooltiptooltiptooltiptooltiptooltiptooltiptooltiptooltip'
        },
        { label: '+序号', id: 'b', title: '{序号_01}', alias: '{序号' },
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
        campaignName: '',
        ids: []
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
    onNamePrograms(value) {
      this.formInline.ids = value
    },
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
