<!--
 * @Date: 2022-12-09 10:43:53
 * @LastEditTime: 2022-12-09 15:01:41
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
      <div :class="[prefixCls + '-icon']">
        <ryIcon
          type="ry-icon-more"
          size="16" />
      </div>
      <!-- 内容 -->
      <template #content>
        <!-- 列表详情 -->
        <list-digital-details
          v-if="type === 'list'"
          :data="listDetailData"></list-digital-details>
      </template>
    </Poptip>
  </span>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'digital-details-tooltip'

import ryIcon from '../icon/icon'
import listDigitalDetails from './list-digital-details'

export default {
  name: prefixCls,
  components: {
    ryIcon,
    listDigitalDetails
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
    listDetailData: {
      type: Array,
      default: () => []
    },
    // 传入的数据
    data: {
      type: [Object, Array],
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
