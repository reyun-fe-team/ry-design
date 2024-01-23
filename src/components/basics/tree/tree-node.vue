<template>
  <div
    v-show="node.visible"
    ref="node"
    :class="{
      [prefixCls]: true,
      'is-expanded': expanded,
      'is-current': node.isCurrent,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.draggable"
    @click.stop="handleClick"
    @contextmenu="$event => handleContextMenu($event)"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop">
    <div
      :class="prefixCls + '-content'"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }">
      <Icon
        :type="tree.iconClass ? tree.iconClass : 'ios-arrow-forward'"
        :class="[
          { 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded },
          prefixCls + '-expand-icon'
        ]"
        @click.stop="handleExpandIconClick" />
      <Checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @on-change="handleCheckChange"></Checkbox>
      <span
        v-if="node.loading"
        :class="[prefixCls + '-loading-icon', prefixCls + '-icon-loading']"></span>
      <rd-tree-node-content :node="node"></rd-tree-node-content>
    </div>
    <rd-collapse-transition>
      <div
        v-if="!renderAfterExpand || childNodeRendered"
        v-show="expanded"
        :class="prefixCls + '-children'"
        role="group"
        :aria-expanded="expanded">
        <rd-tree-node
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :render-content="renderContent"
          :render-after-expand="renderAfterExpand"
          :show-checkbox="showCheckbox"
          :node="child"
          @node-expand="handleChildNodeExpand"></rd-tree-node>
      </div>
    </rd-collapse-transition>
  </div>
</template>

<script>
import emitter from '@src/mixins/emitter'
import { getNodeKey } from './model/util'
import rdTreeNodeContent from './tree-node-content'
import { prefix } from '@src/config.js'
let prefixCls = prefix + 'tree-node'
export default {
  name: prefixCls,
  componentName: prefixCls,
  components: {
    rdTreeNodeContent
  },
  mixins: [emitter],
  props: {
    node: {
      default() {
        return {}
      }
    },
    props: {},
    renderContent: Function,
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null
    }
  },
  watch: {
    'node.indeterminate'(val) {
      this.handleSelectChange(this.node.checked, val)
    },
    'node.checked'(val) {
      this.handleSelectChange(val, this.node.indeterminate)
    },
    'node.expanded'(val) {
      this.$nextTick(() => (this.expanded = val))
      if (val) {
        this.childNodeRendered = true
      }
    }
  },
  created() {
    const parent = this.$parent

    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }

    const tree = this.tree
    if (!tree) {
      console.warn("Can not find node's tree.")
    }
    const props = tree.props || {}
    const childrenKey = props['children'] || 'children'

    this.$watch(`node.data.${childrenKey}`, () => {
      this.node.updateChildren()
    })

    if (this.node.expanded) {
      this.expanded = true
      this.childNodeRendered = true
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', node => {
        if (this.node !== node) {
          this.node.collapse()
        }
      })
    }
  },
  methods: {
    getNodeKey(node) {
      return getNodeKey(this.tree.nodeKey, node.data)
    },
    handleSelectChange(checked, indeterminate) {
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', this.node.data, checked, indeterminate)
      }
      this.oldChecked = checked
      this.indeterminate = indeterminate
    },
    handleClick() {
      const store = this.tree.store
      store.setCurrentNode(this.node)
      this.tree.$emit(
        'current-change',
        store.currentNode ? store.currentNode.data : null,
        store.currentNode
      )
      this.tree.currentNode = this
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick()
      }
      if (this.tree.checkOnClickNode && !this.node.disabled) {
        this.handleCheckChange(!this.node.checked)
      }
      this.tree.$emit('node-click', this.node.data, this.node, this)
    },
    handleContextMenu(event) {
      if (
        this.tree._events['node-contextmenu'] &&
        this.tree._events['node-contextmenu'].length > 0
      ) {
        event.stopPropagation()
        event.preventDefault()
      }
      this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this)
    },
    handleExpandIconClick() {
      if (this.node.isLeaf) {
        return
      }
      if (this.expanded) {
        this.tree.$emit('node-collapse', this.node.data, this.node, this)
        this.node.collapse()
      } else {
        this.node.expand()
        this.$emit('node-expand', this.node.data, this.node, this)
      }
    },
    handleCheckChange(checked) {
      this.node.setChecked(checked, !this.tree.checkStrictly, this.tree.deepUpChecked)
      this.$nextTick(() => {
        const store = this.tree.store
        this.tree.$emit('check', this.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        })
      })
    },
    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('rdTreeNode', 'tree-node-expand', node)
      this.tree.$emit('node-expand', nodeData, node, instance)
    },

    handleDragStart(event) {
      if (!this.tree.draggable) {
        return
      }
      this.tree.$emit('tree-node-drag-start', event, this)
    },

    handleDragOver(event) {
      if (!this.tree.draggable) {
        return
      }
      this.tree.$emit('tree-node-drag-over', event, this)
      event.preventDefault()
    },

    handleDrop(event) {
      event.preventDefault()
    },

    handleDragEnd(event) {
      if (!this.tree.draggable) {
        return
      }
      this.tree.$emit('tree-node-drag-end', event, this)
    }
  }
}
</script>
