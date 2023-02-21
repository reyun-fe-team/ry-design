<template>
  <div :class="[prefixCls]">
    <Select
      v-model="option"
      :disabled="disabled"
      :class="`${prefixCls}-${type}`"
      :style="{ width: `${width}px` }"
      @on-change="handleSelect">
      <!--asc-->
      <Icon
        v-if="sort === 'asc'"
        slot="prefix"
        size="16"
        custom="iconfont icon-shengxu"></Icon>
      <!--desc-->
      <Icon
        v-else
        slot="prefix"
        size="16"
        custom="iconfont icon-jiangxu"></Icon>
      <Option
        v-for="(item, index) in data"
        :key="index"
        :value="item.value"
        :label="item.label"
        :style="{ width: `${panelWidth}px` }">
        <span class="sort-label">{{ item.label }}</span>
        <span class="sort-type">{{ item.text }}</span>
      </Option>
    </Select>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'sort'
export default {
  name: prefixCls,
  props: {
    value: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    // button|label
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 102
    },
    panelWidth: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      prefixCls,
      option: this.value,
      sort: 'desc'
    }
  },
  watch: {
    option: {
      immediate: true,
      handler(newVal) {
        const { data } = this
        if (newVal) {
          const item = data.find(f => f.value === newVal)
          this.sort = item.sort
        }
      }
    }
  },
  methods: {
    handleSelect(option) {
      this.$emit('on-change', option)
    }
  }
}
</script>