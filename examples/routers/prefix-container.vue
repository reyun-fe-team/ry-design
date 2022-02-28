<template>
  <main>
    <rd-prefix-container>
      <span slot="prepend">前缀</span>
      <Select
        class="select"
        v-model="accountIds"
        filterable
        multiple
        style="width: 400px"
        :max-tag-count="2"
        placeholder="请搜索或选择媒体账号"
      >
        <OptionGroup
          v-for="item in accountList"
          :key="item.label"
          :label="item.label"
        >
          <Option
            v-for="(el,index) in item.children"
            :disabled="item.disabled"
            :key="index"
            :value="el.accountId"
            >{{ el.name }}</Option
          >
        </OptionGroup>
      </Select>
      <span slot="append">后缀</span>
    </rd-prefix-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      accountIds:[],
      accountList: [
        {
          label: "西瓜科技有限公司",
          disabled: false,
          children: [
            {
              accountId: "a-1",
              name: "账户a-1",
            },
            {
              accountId: "a-2",
              name: "账户a-2",
            },
          ],
        },
        {
          label: "芒果科技有限公司",
          disabled: false,
          children: [
            {
              accountId: "b-1",
              name: "账户a-1",
            },
            {
              accountId: "b-2",
              name: "账户a-2",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang='less' scoped>
.select {
  /deep/.ivu-select-selection {
    border-radius: 0;
  }
}
</style>