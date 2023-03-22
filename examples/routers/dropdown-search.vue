<!--
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2023-02-21 16:42:38
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2023-02-22 11:35:35
 * @FilePath: /ry-design/examples/routers/dropdown-search.vue
 * @Description: 下拉搜索组件
-->
<template>
  <div>
    <h4 style="margin-bottom: 10px">所有数据</h4>
    <div
      v-for="item in dataList"
      :key="item.groupId"
      style="padding: 0 10px; height: 30px; line-height: 30px">
      {{ item.groupName }}（{{ item.groupId }}）
    </div>
    <h4 style="margin-bottom: 10px">在下方搜索</h4>
    <rd-dropdown-search
      :visible="visible"
      :is-empty="isEmpty"
      placeholder="请输入名称或ID"
      @on-search="handleSearch"
      @on-visible-change="visibleChange">
      <div
        v-for="item in searchResults"
        :key="item.groupId"
        style="padding: 0 10px; height: 30px; line-height: 30px">
        <Checkbox
          :value="item._checked"
          @on-change="handleCheckRow($event, item)">
          {{ item.groupName }}（{{ item.groupId }}）
        </Checkbox>
      </div>
    </rd-dropdown-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      searchResults: [],
      dataList: [
        {
          groupName: '北京悠米悠米广告有限公司',
          groupId: 'bj12345'
        },
        {
          groupName: 'User_1576228589840(4732053)',
          groupId: '5566'
        },
        {
          groupName: '账户3',
          groupId: '7788'
        }
      ]
    }
  },
  computed: {
    isEmpty() {
      return this.searchResults.length === 0
    }
  },
  methods: {
    handleSearch(text) {
      if (!text) {
        this.searchResults = []
        return
      }
      let list = this.dataList.filter(item => {
        let { groupName, groupId } = item
        return groupName.includes(text) || groupId.includes(text)
      })
      list = list.map(item => Object.assign({}, item, { _checked: false }))
      this.searchResults = list
    },
    visibleChange(visible) {
      if (!visible) {
        this.searchResults = []
      }
    },
    handleCheckRow(e, item) {}
  }
}
</script>
<style
  lang="less"
  scoped></style>