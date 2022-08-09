<template>
  <div style="padding: 20px">
    <rd-single-header
      @on-reset="handleReset"
      @on-query="handleQuery">
      <div
        slot="content"
        class="abc">
        <div
          style="
            background: #00ffff;
            height: 32px;
            width: 500px;
            text-align: center;
            line-height: 32px;
          ">
          slot
        </div>
      </div>
    </rd-single-header>
  </div>
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
    }
  },
  methods: {
    handleReset() {},
    handleQuery() {}
  }
}
</script>
