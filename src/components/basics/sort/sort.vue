<template>
  <div :class="[prefixCls]">
    <Select
      v-model="option"
      :disabled="disabled"
      :class="`${prefixCls}-${type}`"
      :style="selectStyles"
      @on-change="handleSelect">
      <!--asc-->
      <Icon
        v-if="sort === 'asc'"
        slot="prefix"
        size="16"
        custom="iconfont ry-icon-shengxu"></Icon>
      <!--desc-->
      <Icon
        v-else
        slot="prefix"
        size="16"
        custom="iconfont ry-icon-jiangxu"></Icon>
      <Option
        v-for="(item, index) in data"
        :key="index"
        :value="item.value"
        :label="item.label"
        :style="panelStyles">
        <span :class="`${prefixCls}-text`">{{ item.label }}</span>
        <span :class="`${prefixCls}-type`">{{ formatterSubtitle(item) }}</span>
      </Option>
    </Select>
  </div>
</template>

<script>
import { prefix } from '@src/config'
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
    // default|text
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 102
    },
    panelWidth: {
      type: [Number, String],
      default: 200
    },
    renderFormat: {
      type: Function,
      default(item) {
        return item.subtitle || ''
      }
    }
  },
  data() {
    return {
      prefixCls,
      option: this.value,
      sort: 'desc'
    }
  },
  computed: {
    selectStyles() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width
      }
    },
    panelStyles() {
      return {
        width: typeof this.panelWidth === 'number' ? `${this.panelWidth}px` : this.panelWidth
      }
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
    },
    formatterSubtitle(item) {
      return this.renderFormat(item)
    }
  }
}
</script>