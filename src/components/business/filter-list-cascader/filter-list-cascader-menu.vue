<template>
  <div :class="classes">
    <div :class="prefixCls + '-list'">
      <filter-list-cascader-node
        v-for="(node, index) in nodes"
        :key="node.value + index"
        :selected="node.value === currentActivePath"
        :node="node"
        @handle-expand="handleExpand"
        @check-change="checkChange"></filter-list-cascader-node>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-cascader-menu'
import filterListCascaderNode from './filter-list-cascader-node'
export default {
  name: prefixCls,
  components: { filterListCascaderNode },
  props: {
    nodes: {
      type: Array,
      required: true
    },
    activePath: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      currentActivePath: this.activePath
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    }
  },
  watch: {
    activePath(val) {
      this.currentActivePath = val
    }
  },
  mounted() {},
  methods: {
    handleExpand(val) {
      this.currentActivePath = val.value
      this.$emit('handle-expand', val)
    },
    checkChange(val) {
      this.$emit('check-change', val)
    }
  }
}
</script>
