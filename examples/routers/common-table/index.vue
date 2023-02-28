<template>
  <div>
    <Table
      class="table"
      border
      height="460"
      :max-height="maxHeight"
      :columns="tableColumns"
      :data="tableData"
      :loading="tableLoading"
      @on-selection-change="handleSelectionChange">
      <!-- 定向包名称 -->
      <template
        slot="targetName"
        slot-scope="{ row }">
        <div class="edit-row">
          <rd-ellipsis
            :text="row.targetName"
            :lines="2"
            :delay="600"
            enable-css
            theme="light"
            tooltip
            transfer></rd-ellipsis>
          <rd-edit-row-bid
            :value="row.targetName"
            :show-text-limit="false"
            title="定向包名称"
            :confirm-func="handleTargetNameUpdate(row)"></rd-edit-row-bid>
        </div>
      </template>
      <!-- 备注 -->
      <template
        slot="targetRemark"
        slot-scope="{ row }">
        <rd-ellipsis
          :text="row.targetRemark"
          :lines="2"
          :delay="600"
          enable-css
          theme="light"
          tooltip
          transfer></rd-ellipsis>

        <!-- <Tooltip
          :content="row.targetRemark"
          :transfer="true">
          {{ row.targetRemark }}
        </Tooltip> -->
      </template>
      <!-- 操作 -->
      <template
        slot="operation"
        slot-scope="{ row }">
        <div class="inline-row">
          <span
            class="operation-btn"
            @click="handleEdit(row)">
            编辑
          </span>
          <span
            class="operation-btn"
            @click="handleCopy(row)">
            复制
          </span>
          <span
            class="operation-btn"
            @click="handleDelete(row)">
            删除
          </span>
          <Dropdown
            transfer
            trigger="hover"
            placement="bottom">
            <Icon
              type="md-more"
              class="operation-btn-more"
              size="16"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem name="edit">新增</DropdownItem>
              <DropdownItem name="log">执行日志</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </template>
      <!-- 投放状态 -->
      <template
        slot="deliveryStatus"
        slot-scope="{ row }">
        <div class="inline-row">
          <Icon
            v-if="row.deliveryStatus.value === 'success'"
            color="#2FD7AB"
            custom="iconfont ry-icon-qust"
            size="16"></Icon>
          <Icon
            v-else-if="row.deliveryStatus.value === 'fail'"
            color="#F01C36"
            custom="iconfont ry-icon-qust"
            size="16"></Icon>
          <Icon
            v-else
            color="#777A8C"
            custom="iconfont ry-icon-qust"
            size="16"></Icon>
          <span class="icon-desc">{{ row.deliveryStatus.name }}</span>
        </div>
      </template>
      <!-- 关联广告组 -->
      <template
        slot="unitCount"
        slot-scope="{ row }">
        <div class="inline-row-right">
          <span>{{ row.unitCount || '--' }}</span>
          <Poptip
            v-if="row.unitCount"
            trigger="hover"
            transfer
            padding="8px 0px 8px 8px"
            width="320">
            <div
              slot="content"
              style="max-height: 240px; font-size: 12px">
              <p
                v-for="item in 15"
                :key="item"
                style="flex: 1; white-space: normal; text-indent: -20px; margin-left: 20px">
                {{ item }}、内容不重要，重要的是外表要的是外表要的是外表要的是外表
              </p>
            </div>
            <Icon
              custom="iconfont icon-more"
              size="16"></Icon>
          </Poptip>
        </div>
      </template>
    </Table>
    <Page
      class="page"
      :current="pageOption.current"
      :total="pageOption.total"
      :page-size="pageOption.size"
      :page-size-opts="[10, 20, 50, 100, 150, 200]"
      show-elevator
      show-sizer
      show-total
      size="small"
      @on-change="handlePageChange"
      @on-page-size-change="handlePageSizeChange"></Page>
  </div>
</template>
<script>
import { tableColumns, tableMockData } from './data'

export default {
  props: {
    maxHeight: {
      type: Number,
      default: 480
    }
  },
  data() {
    return {
      tableMockData,
      tableLoading: false,
      tableColumns,
      tableData: [],
      pageOption: { current: 1, size: 50, total: 0 }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 模拟分页
    mockPage() {
      return new Promise(resolve => {
        const { current, size } = this.pageOption
        setTimeout(() => {
          let list = this.tableMockData.slice((current - 1) * size, current * size)
          resolve(list)
        }, 1000)
      })
    },
    getTableData() {
      this.tableLoading = true
      this.mockPage().then(res => {
        this.tableData = res
        this.pageOption.total = this.tableMockData.length
        this.tableLoading = false
      })
    },
    handleEdit(row) {
      this.$Message.info(`编辑操作_${row.adsTargetId}`)
    },
    handleCopy(row) {
      this.$Message.info(`复制操作_${row.adsTargetId}`)
    },
    handleDelete(row) {
      this.$Message.info(`删除操作_${row.adsTargetId}`)
    },
    handlePageChange(val) {
      this.pageOption.current = val
      this.getTableData()
    },
    handlePageSizeChange(val) {
      this.pageOption.size = val
      this.getTableData()
    },
    handleSelectionChange(rows) {
      this.$Message.info(`已选_${rows.length}行`)
    },
    handleTargetNameUpdate(row) {
      return val => {
        row.targetName = val
        return Promise.resolve()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "index.less";
</style>

  