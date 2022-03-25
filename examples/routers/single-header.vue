<template>
  <main style="padding: 20px">
    <rd-single-header @on-reset="handleReset" @on-query="handleQuery">
      <div slot="content">
        <Form
          :label-width="72"
          class="form-content"
          inline
          @submit.native.prevent
        >
          <FormItem label="账号">
            <Select
              v-model="formData.accountIds"
              :max-tag-count="2"
              class="select"
              filterable
              multiple
              placeholder="请搜索或选择媒体账号"
              style="width: 400px"
            >
              <OptionGroup
                v-for="item in accountList"
                :key="item.label"
                :label="item.label"
              >
                <Option
                  v-for="(el, index) in item.children"
                  :key="index"
                  :disabled="item.disabled"
                  :value="el.accountId"
                  >{{ el.name }}
                </Option>
              </OptionGroup>
            </Select>
          </FormItem>
          <FormItem label="搜索">
            <Input
              v-model="formData.search"
              clearable
              placeholder="输入名称"
              style="width: 184px"
            />
          </FormItem>
        </Form>
      </div>
    </rd-single-header>
  </main>
</template>
<script>
export default {
  data() {
    return {
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
    };
  },
  methods: {
    handleReset() {},
    handleQuery() {}
  }
};
</script>
