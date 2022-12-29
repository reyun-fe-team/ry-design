<template>
  <div :class="[prefixCls]">
    <div class="thead">
      <!-- 索引 -->
      <div class="order"></div>
      <div
        v-for="col in columns"
        :key="col.key"
        class="col"
        :style="{ width: col.width ? col.width + 'px' : `${100 / columns.length}%` }">
        {{ col.title }}
      </div>
    </div>
    <div class="small-scroll-y tbody">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="row">
        <!-- 索引 -->
        <div class="order">{{ index + 1 }}</div>
        <div
          v-for="col in columns"
          :key="col.key"
          class="row-item"
          :style="{ width: col.width ? col.width + 'px' : `${100 / columns.length}%` }">
          {{ item[col.key] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'digital-details-table'

export default {
  name: 'TableDigitalDetails',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    // 列信息  [key title width]
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      prefixCls
    }
  }
}
</script>
