<template>
  <div>
    <rd-product-select
      :first-table-data="table.firstTableData"
      :level="level"
      :second-loading="table.secondLoading"
      :second-table-data="table.secondListData"
      :first-selected-data="table.firstSelectedData"
      :second-selected-data="table.secondSelectedData"
      :first-row-id="table.firstRowId"
      :first-table-title-field="table.firstTableTitleField"
      :delete-row="table.deleteRow"
      :first-table-row-height="32"
      second-title="广告"
      second-search-placeholder="请输入广告名称搜索"
      :second-table-title-field="table.secondTableTitleField"
      :second-row-id="table.secondRowId"
      :is-show-selected-parent="true"
      @on-first-search="handleFirstSearch"
      @on-second-search="handleSecondSearch"
      @on-clear="handleClear"
      @on-selected="handleSelected"
      @on-change-row="handleChangeAccountRow">
      <template
        slot="firstColumn"
        slot-scope="props">
        <p class="rd-product-select-row-first-title text-overflow">
          {{ props.row[table.firstTableTitleField] }}
        </p>
      </template>
      <template
        slot="firstSelectedColumn"
        slot-scope="props">
        <rd-text-item-show
          type="title"
          :data="{
            title: props.row[table.firstTableTitleField],
            subTitle: `ID：${props.row[table.firstRowId]}`
          }">
          <template #btnGroup>
            <Icon
              size="24"
              type="ios-close"
              @click="handleCancelRow(props.row)" />
          </template>
        </rd-text-item-show>
      </template>
    </rd-product-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      level: 'first',
      table: {
        firstRowId: 'advertiserId',
        firstTableTitleField: 'mediaAccountName',
        secondRowId: 'adPlanId',
        secondTableTitleField: 'adPlanName',
        deleteRow: null,
        firstTableData: [],
        secondLoading: false,
        secondListData: [],
        firstSelectedData: [],
        secondSelectedData: [
          {
            advertiserId: 0,
            mediaAccountName: '账号0',
            data: [
              {
                adPlanId: 0,
                adPlanName: '广告00'
              },
              {
                adPlanId: 1,
                adPlanName: '广告10'
              }
            ]
          },
          {
            advertiserId: 1,
            mediaAccountName: '账号1',
            data: [
              {
                adPlanId: 2,
                adPlanName: '广告11'
              }
            ]
          }
        ]
      },
      paramsInfo: {
        firstKeyword: '',
        secondKeyword: '',
        activeMediaAccountId: ''
      },
      data: [],
      activeSecondTableDataAll: []
    }
  },
  created() {
    setTimeout(() => {
      this.getFristList()
    }, 1000)
    setTimeout(() => {
      this.table.firstSelectedData = [
        { advertiserId: 0, mediaAccountName: '账号0' },
        { advertiserId: 2, mediaAccountName: '账号2' }
      ]
      // this.table.firstSelectedData = [
      //   {
      //     advertiserId: 0,
      //     mediaAccountName: '账号0',
      //     data: [
      //       {
      //         adPlanId: 0,
      //         adPlanName: '广告00'
      //       },
      //       {
      //         adPlanId: 1,
      //         adPlanName: '广告10'
      //       }
      //     ]
      //   },
      //   {
      //     advertiserId: 1,
      //     mediaAccountName: '账号1',
      //     data: [
      //       {
      //         adPlanId: 2,
      //         adPlanName: '广告11'
      //       }
      //     ]
      //   }
      //]
    }, 2000)
  },
  methods: {
    getFristList() {
      const arr = []
      for (let i = 0; i < 30; i++) {
        const obj = {
          advertiserId: i,
          mediaAccountName: '账号' + i,
          disabled: i === 1
        }
        arr.push(obj)
      }
      this.table.firstTableData = arr
      this.data = arr
    },
    getSecondList() {
      this.table.secondLoading = true
      setTimeout(() => {
        const arr = []
        for (let i = 0; i < 1000; i++) {
          const obj = {
            adPlanId: i + this.paramsInfo.activeMediaAccountId,
            adPlanName: '广告' + i + this.paramsInfo.activeMediaAccountId,
            disabled: i === 3 ? true : false
          }
          arr.push(obj)
        }
        this.table.secondListData = arr
        this.table.secondLoading = false
        this.activeSecondTableDataAll = arr
      }, 500)
    },
    handleFirstSearch(val) {
      this.paramsInfo.firstKeyword = val
      this.table.firstTableData = this.data.filter(item =>
        item[this.table.firstTableTitleField].includes(val)
      )
    },
    handleSecondSearch(val) {
      this.paramsInfo.secondKeyword = val
      this.table.secondListData = this.activeSecondTableDataAll.filter(item =>
        item[this.table.secondTableTitleField].includes(val)
      )
    },
    handleClear() {
      if (this.level === 'second') {
        this.table.secondSelectedData = this.table.secondSelectedData.map(item => {
          item.data = []
          return item
        })
      } else if (this.level === 'first') {
        this.table.firstSelectedData = []
      }
    },
    handleSelected(data) {
      if (this.level === 'second') {
        this.table.secondSelectedData = data
      } else if (this.level === 'first') {
        this.table.firstSelectedData = data
      }
    },
    handleChangeAccountRow(row) {
      if (this.level === 'second') {
        this.paramsInfo.activeMediaAccountId = row.advertiserId
        this.getSecondList()
      }
    },
    handleCancelRow(row) {
      this.table.deleteRow = row
    }
  }
}
</script>