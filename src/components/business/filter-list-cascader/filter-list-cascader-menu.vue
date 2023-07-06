<template>
  <div :class="classes">
    <filter-list-cascader-node
      v-for="(node, index) in nodes"
      :key="node.value + '-' + index"
      :selected="node.value === activePath && showSeleted"
      :node="node"
      @handle-expand="handleExpand"
      @check-change="checkChange"></filter-list-cascader-node>
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
    showSeleted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      activePath: ''
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`, 'small-scroll-y']
    }
  },
  methods: {
    handleExpand(val) {
      this.activePath = val.value
      this.$emit('handle-expand', val)
    },
    checkChange(val) {
      this.$emit('check-change', val)
    }
  }
}
</script>
