<!--
 * @Author: your name
 * @Date: 2022-04-07 14:24:25
 * @LastEditTime: 2022-04-08 19:43:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ry-design/examples/routers/page-header.vue
-->
<template>
  <main style="padding: 20px">
    <rd-page-header
      :subTitle="2222"
      :avatar="'https://fc1tn.baidu.com/it/u=71082386,3879241788&fm=202&src=801&mola=new&crop=v1'"
      backIcon
      @back="back"
    >
    <template #title>
      3232323
    </template>
    </rd-page-header>
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
    back(e) {
      console.log('e: ', e);
    },
  }
};
</script>
