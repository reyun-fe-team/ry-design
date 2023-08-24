<template>
  <div :class="[prefixCls]">
    <rd-table-columns
      v-model="columnsValue"
      :data="tableColumns"
      @on-change-data="onTableColumnsChange"></rd-table-columns>
    <rd-draggable-card
      :data="selectedList"
      :height="440"
      @on-change="onDraggableSortChange"></rd-draggable-card>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
import { data } from './data'
const prefixCls = prefix + 'table-columns-selector'
export default {
  name: prefixCls,
  data() {
    return {
      prefixCls,
      tableColumns: data || [],
      selectedList: [],
      columnsValue: [
        'accountName',
        'media',
        'appName',
        'advertiserId',
        'company',
        'productName',
        'budgetAmount'
      ]
    }
  },
  methods: {
    onTableColumnsChange(data) {
      const { list } = data
      this.selectedList = list.map(item => {
        const { title: label } = item
        return {
          ...item,
          label
        }
      })
    },
    onDraggableSortChange(data) {
      console.log(data)
    }
  }
}
</script>