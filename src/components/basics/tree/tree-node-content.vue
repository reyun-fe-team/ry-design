<template>
  <div :class="prefixCls">
    <template v-if="parent.renderContent">
      <slot
        :_self="tree.$vnode.context"
        :node="node"
        :data="data"
        :store="store"></slot>
    </template>
    <template v-else-if="tree.$scopedSlots.default">
      <slot
        name="default"
        :node="node"
        :data="data"></slot>
    </template>
    <span
      v-else
      :title="node.label">
      {{ node.label }}
    </span>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
let prefixCls = prefix + 'tree-node-content'
export default {
  name: prefixCls,
  props: {
    node: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    parent() {
      return this.$parent.$parent
    },
    tree() {
      return this.$parent.tree
    },
    data() {
      return this.node.data
    },
    store() {
      return this.node.store
    }
  }
}
</script>