<template>
  <div
    :class="prefixCls"
    :style="mainStyles">
    <div
      ref="filter-list-option-header"
      :class="prefixCls + '-header'">
      <label
        for=""
        :class="prefixCls + '-header-title'">
        已选 {{ current.length }} 个
      </label>
      <div
        :class="prefixCls + '-header-operate'"
        @click="handleClearAll">
        清空
      </div>
    </div>
    <div
      :class="prefixCls + '-body'"
      class="small-scroll-y"
      :style="bodyStyles">
      <div
        v-for="item in data"
        :key="item.value"
        :class="prefixCls + '-body-item'">
        <p :title="item.label">{{ item.label }}</p>
        <rd-icon
          color="rgba(87, 91, 101, 1)"
          type="ry-icon-text-delete"
          :class="prefixCls + '-body-clear'"
          @click.native.stop="handleDelete(item)"></rd-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-option'
export default {
  name: prefixCls,
  components: {},
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    width: {
      type: [String, Number],
      default: 180
    },
    height: [Number, String],
    maxHeight: [Number, String],
    minHeight: [Number, String],
    headerHeight: {
      type: [Number, String],
      default: 40
    }
  },
  data() {
    return {
      prefixCls,
      current: this.value
    }
  },
  computed: {
    mainStyles() {
      let style = {}
      if (this.width) {
        const width = parseInt(this.width)
        style.width = `${width}px`
      }
      return style
    },
    bodyStyles() {
      let style = {}
      if (this.height) {
        const height = parseInt(this.height)
        style.height = `${height}px`
      }
      if (this.maxHeight) {
        const maxHeight = parseInt(this.maxHeight)
        style.maxHeight = `${maxHeight}px`
      }
      if (this.minHeight) {
        const minHeight = parseInt(this.minHeight)
        style.minHeight = `${minHeight}px`
      }
      return style
    }
  },
  watch: {
    value(val) {
      this.current = val
    }
  },
  methods: {
    handleDelete(items) {
      this.current = this.current.filter(val => {
        return val !== items.value
      })
      this.$emit('input', this.current)
      this.$emit('on-change', this.current)
    },
    handleClearAll() {
      this.current = []
      this.$emit('input', this.current)
      this.$emit('on-change', this.current)
    },
    getHeaderHeight() {
      return this.$refs['filter-list-option-header'].offsetHeight
    }
  }
}
</script>
