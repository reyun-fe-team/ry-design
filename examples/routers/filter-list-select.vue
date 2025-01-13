<template>
  <div>
    <h2>filter-list-select事例 {{ selectMultiple }}</h2>
    <section>
      <rd-prefix-container>
        <span slot="prepend">投放账户</span>
        <rd-filter-list-select
          v-model="selectMultiple"
          placement="bottom-end"
          :data="data"
          :height="200"
          width="200"
          filterable
          transfer
          show-select-option
          clearable
          multiple
          show-action
          action-text="若没找到您所投放的小游戏，可"
          action-button-text="添加小游戏"
          :action-rule-validate="actionRuleValidate"
          :action-count="actionCountFn"
          :action-total="actionTotal"
          show-item-delete
          :action-hide-total="false"
          :before-action-ok="beforeActionOk"
          @on-action-ok="handleActionOk"
          @on-change="handleChange"
          @on-item-delete="handleItemDelete">
          <!-- <div
            slot="footer"
            >
            自定义footer
          </div> -->
        </rd-filter-list-select>
      </rd-prefix-container>
      <div
        v-if="true"
        style="display: inline-block; width: 450px">
        多选-宽度自适应 {{ selectMultiple }} 事例：{{ selectMultiple }}
        <rd-filter-list-select
          v-model="selectMultiple"
          clearable
          show-select-option
          :data="data"
          multiple
          filterable
          :filter-by-custom="['label', 'newLabel']"
          :label-method="labelMethod"
          select-all
          @on-input-clear="handleInputClear"
          @on-change="handleChange">
          <!-- <div
            slot="select-item"
            slot-scope="{ row, index }"
            style="line-height: 40px">
            自定义item {{ index }} : {{ row.label }}
          </div> -->
          <div slot="search-operate">
            <span style="color: #3989faff">刷新</span>
            <span style="margin-right: 10px; color: #3989faff">应用管理</span>
          </div>

          <div
            v-if="!row.disabled"
            slot="describe-operate"
            slot-scope="{ row, index }">
            <div
              v-if="!row.isDefault"
              @click.stop="setDefault(row, index)">
              设为默认
            </div>
            <div v-if="row.isDefault">默认</div>
          </div>
        </rd-filter-list-select>
      </div>

      <div
        v-if="true"
        style="display: inline-block; margin-left: 380px">
        多选组 事例：{{ formData.selectMultiple }}
        <rd-filter-list-select
          v-model="formData.selectMultiple"
          :max="2"
          transfer
          clearable
          placement="bottom-start"
          select-all
          filterable
          show-select-option
          :data="data"
          :group-name-list="groupNameList"
          :group-checkbox="true"
          :is-select-entity="false"
          :filter-by-custom="['label']"
          filter-by-split=","
          multiple
          show-action
          action-button-text="添加小游戏"
          :action-rule-validate="actionRuleValidate"
          :action-count="actionCountFn"
          :action-total="actionTotal"
          @on-click="handleClick"
          @on-change="handleChange"
          @on-action-ok="handleActionOk">
          <template slot="input-label">
            <!-- 多选 -->
            <Icon type="md-cloud" />
          </template>
          <div slot="search-operate">
            <span style="color: #3989faff">刷新</span>
            <span style="margin-right: 10px; color: #3989faff">应用管理</span>
          </div>
        </rd-filter-list-select>
      </div>
    </section>

    <section
      v-if="true"
      style="margin-top: 400px">
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
          show-subtitle
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
          show-item-delete
          clearable
          filterable
          show-image
          :data="data"
          save-type="leave-save"
          label="单选-leave-save"
          @on-item-delete="handleItemDeleteRadio"></rd-filter-list-select>
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
      v-if="true"
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
          filterable
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
          filterable
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
      formData: {
        selectMultiple: []
      },
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
      },
      data: [],
      actionValue: '',
      actionRuleValidate: {
        required: true,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(
              new Error(
                '请填写请填写请填写请填写请填写请填写请填写请填写请填写请填写请填写请填写请填写请填写请填写请填写'
              )
            )
          } else if (this.actionCountFn(value) > this.actionTotal) {
            callback(new Error(`长度不可大于${this.actionTotal}`))
          } else {
            callback()
          }
        },
        trigger: 'change'
      },
      actionTotal: 120
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
    }
  },
  watch: {
    formData: {
      handler(n, o) {
        console.log(n, o)
      },
      deep: true
    }
  },
  mounted() {
    for (let i = 0; i < 2; i++) {
      let children = []
      for (let j = 0; j < 2; j++) {
        const value = `${i + 1}-${j + 1}`
        children.push({
          value: `${value}`,
          label: `${value}-天安门上太阳升`,
          newLabel: '自定义',
          disabled: j === 2,
          description: `天安门上太阳升beijin-description-${i}-${j}`,
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/e3b/a68/69c/e3ba6869c4593eaaa7984e0f555d9517-small.jpg',
          isDefault: false,
          subtitle: '天安门上太阳升beijin-subtitle'
        })
      }
      this.groupList.push({
        label: i + 1 + '热云数据热云数据热云数据热云数据热云数据热云数据',
        children
      })
    }
    let list = []
    this.groupList.forEach(item => {
      list = [...list, ...item.children]
    })
    this.data = list
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
    },
    setDefault(row, index) {
      console.log('设为默认', row, index, this.data)
      this.data.forEach(val => {
        val.isDefault = val.value === row.value
      })
    },
    beforeChange(data) {
      let lens = this.groupList.length
      let findIndex = -1
      for (let i = 0; i < lens; i++) {
        if (this.groupList[i].children.some(val => data.includes(val.value))) {
          findIndex = i
          break
        }
      }
      let list = []
      this.groupList.forEach((val, index) => {
        val.children.forEach(item => {
          item.disabled = findIndex === -1 ? false : findIndex !== index
        })
        list = [...list, ...val.children]
      })
      setTimeout(() => {
        this.data = list
      }, 1000)
    },
    handleClick() {},
    handleInputClear(val) {
      console.log(val)
    },
    handleChange(val) {
      console.log('接收到on-change', val)
    },
    handleActionOk(label) {
      this.actionValue = label
      const value = `${label}`
      this.data.unshift({
        value,
        label,
        newLabel: label,
        disabled: false,
        description: label,
        src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/e3b/a68/69c/e3ba6869c4593eaaa7984e0f555d9517-small.jpg',
        isDefault: false,
        subtitle: label
      })
      this.selectMultiple.unshift(value)
    },
    beforeActionOk(label) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('模拟接口', label, reject)
          resolve()
        }, 2000)
      })
      // return false
    },
    actionCountFn(value) {
      if (typeof value === 'string') {
        return value.split('').reduce((total, cur) => {
          return (total += /^[\u4e00-\u9fa5。？！，、；：“”（）《》￥——……【】‘’]$/.test(cur)
            ? 1
            : 0.5)
        }, 0)
      }
      return 0
    },
    handleItemDelete({ row, index }) {
      this.selectMultiple = this.selectMultiple.filter(val => val !== row.value)
      this.data.splice(index, 1)
    },
    handleItemDeleteRadio({ row, index }) {
      if (this.selectRadio === row.value) {
        this.selectRadio = ''
      }
      this.data.splice(index, 1)
    }
  }
}
</script>
