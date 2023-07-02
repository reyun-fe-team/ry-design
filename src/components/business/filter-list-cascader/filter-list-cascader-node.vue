<template>
  <div
    :class="classes"
    :disabled="node.disabled"
    @click="handleExpand">
    <Checkbox
      :disabled="node.disabled"
      style="margin: 0 0 0 10px"
      :value="current.includes(node.value)"
      @on-change="handleMultiCheckChange"></Checkbox>
    <div :class="prefixCls + '-contain'">
      <slot
        name="select-item"
        :row="node">
        <rd-filter-list-describe
          style="width: 100%"
          :src="node.src"
          :text="getLabel"
          :height="32"
          show-image
          show-description
          :description="node.description">
          <Icon
            v-if="node.children && !!node.children.length"
            type="ios-arrow-forward" />
        </rd-filter-list-describe>
      </slot>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-cascader-node'
import rdFilterListDescribe from '../filter-list/filter-list-describe'
export default {
  name: prefixCls,
  components: { rdFilterListDescribe },
  inject: ['panel'],
  props: {
    node: {
      type: Object,
      required: true
    },
    labelMethod: {
      type: Function,
      default(data) {
        return 'label' in data ? data.label : ''
      }
    },
    activePath: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    classes() {
      return [
        prefixCls,
        {
          [prefixCls + '-selected']: this.selected
        },
        {
          [prefixCls + '-disabled']: this.node.disabled
        }
      ]
    },
    current() {
      return this.panel.value
    },
    getLabel() {
      return this.labelMethod(this.node)
    },
    selected() {
      return this.current.includes(this.node.value)
    }
  },
  methods: {
    handleExpand() {
      this.$emit('handle-expand', this.node)
    },
    handleMultiCheckChange(val) {
      const { node } = this
      this.$emit('check-change', { data: node, selected: val })
    }
  }
}
</script>
