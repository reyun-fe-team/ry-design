<!--
 * @Date: 2022-12-09 10:43:53
 * @LastEditTime: 2022-12-23 18:15:42
 * @Description: 数字详情
-->
<template>
  <span :class="[prefixCls]">
    <!-- 数量 -->
    <span
      v-if="count"
      :class="[prefixCls + '-count']">
      {{ count }}
    </span>
    <Poptip
      transfer
      trigger="hover"
      placement="bottom"
      :disabled="disabled"
      :transfer-class-name="prefixCls + '-transfer'">
      <!-- 图标 -->
      <slot>
        <div :class="[prefixCls + '-icon']">
          <ryIcon
            type="ry-icon-more"
            size="16" />
        </div>
      </slot>
      <!-- 内容 -->
      <template #content>
        <!-- 列表详情 -->
        <list-digital-details
          v-if="type === 'list'"
          :data="data"></list-digital-details>
        <!-- 表格详情 -->
        <table-digital-details
          v-if="type === 'table'"
          :data="tableDetailData"
          :columns="columns"></table-digital-details>
      </template>
    </Poptip>
  </span>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'digital-details-tooltip'

import ryIcon from '../icon/icon'
import listDigitalDetails from './list-digital-details'
import tableDigitalDetails from './table-digital-details'

export default {
  name: prefixCls,
  components: {
    ryIcon,
    listDigitalDetails,
    tableDigitalDetails
  },
  props: {
    // 显示个数
    // eslint-disable-next-line vue/require-default-prop
    count: {
      type: Number
    },
    // 悬浮内容的class name
    transferClassName: {
      type: String,
      default: ''
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // list 列表展示 table 表格展示
    type: {
      type: String,
      default: 'list'
    },
    // 列表展示数据
    data: {
      type: Array,
      default: () => []
    },
    // 表格展示数据
    tableDetailData: {
      type: [Array],
      default: () => []
    },
    // 列信息  [key title]
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {}
}
</script>
