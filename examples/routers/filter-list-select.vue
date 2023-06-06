<template>
  <div>
    <h2>filter-list-select事例</h2>
    <section>
      <rd-prefix-container>
        <span slot="prepend">投放账户</span>
        <rd-filter-list-select
          v-model="selectMultiple"
          :data="data"
          :height="200"
          :width="200"
          filterable
          multiple
          show-select-option></rd-filter-list-select>
      </rd-prefix-container>
      <div style="display: inline-block">
        多选-宽度自适应 {{ selectMultiple }} 事例：{{ selectMultiple }}
        <rd-filter-list-select
          v-model="selectMultiple"
          clearable
          :input-height="48"
          show-select-option
          :data="data"
          multiple
          show-image
          show-description
          :label-method="labelMethod">
          <div
            slot="select-item"
            slot-scope="{ row }"
            style="line-height: 40px">
            自定义item {{ row.label }}
          </div>
        </rd-filter-list-select>
      </div>

      <div style="display: inline-block; margin-left: 380px">
        多选组 事例：{{ selectMultiple }}
        <rd-filter-list-select
          v-model="selectMultiple"
          :input-width="400"
          :width="200"
          filterable
          show-select-option
          :data="data"
          :group-name-list="groupNameList"
          multiple
          save-type="leave-save"
          label="多选">
          <div slot="search-operate">
            <span style="color: #3989faff">刷新</span>
            <span style="margin-right: 10px; color: #3989faff">应用管理</span>
          </div>
        </rd-filter-list-select>
      </div>
    </section>

    <section style="margin-top: 400px">
      <div style="display: inline-block">
        单选{{ selectRadio }}--{{ typeof selectRadio }}==
        <rd-filter-list-select
          v-model="selectRadio"
          disabled
          :max-height="256"
          :width="200"
          :data="data"
          clearable
          filterable
          label="单选"
          show-image
          show-description>
          <div slot="search-operate">
            <span style="color: #3989faff">刷新</span>
            <span style="margin-right: 10px; color: #3989faff">应用管理</span>
          </div>
        </rd-filter-list-select>
      </div>
      <div style="display: inline-block; margin-left: 380px">
        单选{{ selectRadio }}
        <rd-filter-list-select
          v-model="selectRadio"
          :max-height="256"
          clearable
          :data="data"
          label="单选"></rd-filter-list-select>
      </div>

      <div style="display: inline-block; margin-left: 380px">
        单选组 selectRadio:{{ selectRadio }}
        <rd-filter-list-select
          v-model="selectRadio"
          :group-name-list="groupNameList"
          :data="data"
          label="单选"></rd-filter-list-select>
      </div>
    </section>

    <Form
      ref="formValidate"
      style="margin-top: 250px"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80">
      <FormItem
        label="City"
        prop="city">
        <Select
          v-model="formValidate.city"
          multiple
          placeholder="Select your city">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem
        label="应用"
        prop="app">
        <rd-filter-list-select
          v-model="formValidate.app"
          :width="400"
          clearable
          :data="data"></rd-filter-list-select>
      </FormItem>
      <FormItem
        label="应用多选"
        prop="app1">
        {{ formValidate.app1 }}
        <rd-filter-list-select
          v-model="formValidate.app1"
          :width="400"
          multiple
          clearable
          :data="data"></rd-filter-list-select>
      </FormItem>

      <FormItem>
        <Button
          type="primary"
          @click="handleSubmit('formValidate')">
          Submit
        </Button>
        <Button
          style="margin-left: 8px"
          @click="handleReset('formValidate')">
          Reset
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMultiple: [],
      selectRadio: '',
      groupList: [],
      formValidate: {
        city: [],
        app: '',
        app1: []
      },
      ruleValidate: {
        city: [
          { type: 'array', required: true, message: 'Please select the city', trigger: 'change' }
        ],
        app: [{ required: true, message: '请选择应用', trigger: 'change' }],
        app1: [{ required: true, type: 'array', message: '请选择应用1', trigger: 'change' }]
      }
    }
  },
  computed: {
    groupNameList() {
      let params = {}
      this.groupList.forEach(item => {
        const key = item.children[0].value
        params[key] = item.label
      })
      return params
    },
    data() {
      let list = []
      this.groupList.forEach(item => {
        list = [...list, ...item.children]
      })
      return list
    }
  },
  mounted() {
    for (let i = 0; i < 3; i++) {
      let children = []
      for (let j = 0; j < 20; j++) {
        const value = `${i.toString(36)}${j}`
        children.push({
          value: `${i + 1}-${value}-value`,
          label: `${i + 1}-${value} (beijin-description)`,
          newLabel: `${i + 1}-${value}`,
          disabled: [2, 4, 6, 7].includes(j) ? true : false,
          description: 'beijin-description',
          src: 'https://web.adsdesk.cn/img/lpf.f19b1cfc.png'
        })
      }
      this.groupList.push({
        label: i + 1 + '热云数据热云数据热云数据热云数据热云数据热云数据',
        children
      })
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    labelMethod(data) {
      return data.newLabel
    }
  }
}
</script>