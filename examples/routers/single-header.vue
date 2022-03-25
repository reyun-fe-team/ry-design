<template>
  <main style="padding: 20px;">
    <rd-single-header @on-reset="handleReset"
                      @on-query="handleQuery">
      <div slot="content">
        <Form :label-width="72"
              @submit.native.prevent
              class="form-content"
              inline>
          <FormItem label="账号">
            <Select class="select"
                    v-model="formData.accountIds"
                    filterable
                    multiple
                    style="width: 400px"
                    :max-tag-count="2"
                    placeholder="请搜索或选择媒体账号">
              <OptionGroup v-for="item in accountList"
                           :key="item.label"
                           :label="item.label">
                <Option v-for="(el, index) in item.children"
                        :disabled="item.disabled"
                        :key="index"
                        :value="el.accountId">{{ el.name }}</Option>
              </OptionGroup>
            </Select>
          </FormItem>
          <FormItem label="搜索">
            <Input style="width: 184px;"
                   v-model="formData.search"
                   clearable
                   placeholder="输入名称" />
          </FormItem>
        </Form>
      </div>
    </rd-single-header>
  </main>
</template>
<script>
export default {
  data() {
    return{
      formData: {
        accountIds: [],
        search: ''
      },
      accountList: [
        {
          label: '西瓜科技有限公司',
          disabled: false,
          children: [
            {
              accountId: 'a-1',
              name: '账户a-1'
            },
            {
              accountId: 'a-2',
              name: '账户a-2'
            }
          ]
        },
        {
          label: '芒果科技有限公司',
          disabled: false,
          children: [
            {
              accountId: 'b-1',
              name: '账户a-1'
            },
            {
              accountId: 'b-2',
              name: '账户a-2'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleReset() {},
    handleQuery() {},
  }
}
</script>
