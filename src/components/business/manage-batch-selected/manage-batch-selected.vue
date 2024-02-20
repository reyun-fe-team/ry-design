<template>
  <div :class="prefixCls">
    <Poptip
      transfer
      :width="width"
      word-wrap
      title=""
      trigger="hover"
      padding="0px">
      <div :class="prefixCls + '-select-value'">已选{{ data.length }}个</div>
      <div
        slot="content"
        :class="[prefixCls + '-list-wrapper', 'small-scroll-y']">
        <div
          v-for="(item, index) in data"
          :key="index"
          :class="prefixCls + '-list-wrapper-item'">
          <span :class="prefixCls + '-list-wrapper-item-index'">{{ index + 1 }}</span>
          <span
            :class="prefixCls + '-list-wrapper-item-title'"
            :title="item">
            {{ item }}
          </span>
        </div>
      </div>
    </Poptip>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'manage-batch-selected'
export default {
  name: prefixCls,
  props: {
    width: {
      type: Number,
      default: 330
    },
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
