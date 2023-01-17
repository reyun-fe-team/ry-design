<template>
  <div :class="[prefixCls, 'small-scroll-y']">
    <div
      v-for="(item, i) in data"
      :key="i"
      class="title-group">
      <!-- 头部 -->
      <h3
        v-if="item.showTitle && item.title"
        class="title-head">
        {{ item.title }}
      </h3>
      <!-- 列表 -->
      <ul class="title-list">
        <li
          v-for="(titleItem, titleIndex) in item.children"
          :key="titleIndex"
          class="title-item">
          <span
            v-if="item.showOrder"
            class="title-order">
            {{ titleIndex + 1 }}、
          </span>
          <span class="title-text">{{ titleItem.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'digital-details-list'

export default {
  name: 'ListDigitalDetails',
  props: {
    data: {
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
