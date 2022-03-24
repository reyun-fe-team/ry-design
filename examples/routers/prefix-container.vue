<template>
  <main>
    <rd-prefix-container>
      <span slot="prepend">投放账户</span>
      <Select class="select"
              v-model="accountIds"
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
      <span slot="append">后缀</span>
    </rd-prefix-container>

    <rd-prefix-container style="margin-top:16px">
      <Select v-model="select1"
              slot="prepend"
              style="width: 80px">
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
      <InputNumber :max="10"
                   :min="1"
                   v-model="value1"
                   class="prefix-container-basic-number"></InputNumber>
      <Button slot="append"
              icon="ios-search"></Button>
    </rd-prefix-container>

    <rd-prefix-container style="margin-top:16px">
      <Select v-model="select1"
              slot="prepend"
              style="width: 80px">
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
      <InputNumber :max="10"
                   :min="1"
                   v-model="value1"
                   class="prefix-container-basic-number"></InputNumber>
      <Select v-model="select1"
              slot="append"
              style="width: 80px">
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
    </rd-prefix-container>

    <rd-prefix-container style="margin-top:16px">
      <Button slot="prepend"
              icon="ios-search"></Button>
      <InputNumber :max="10"
                   :min="1"
                   v-model="value1"
                   class="prefix-container-basic-number"></InputNumber>
      <Button slot="append"
              icon="ios-search">test</Button>
    </rd-prefix-container>

  </main>
</template>

<script>
export default {
  data() {
    return {
      value1: 1,
      select1: 'http',
      accountIds: [],
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
  }
};
</script>
<style lang="less" scoped>
.select {
  /deep/.ivu-select-selection {
    border-radius: 0;
  }
}
.prefix-container-basic-number {
  border-radius: 0;
}
</style>
