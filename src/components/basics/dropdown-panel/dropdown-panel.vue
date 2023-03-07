<template>
  <div :class="classes">
    <Dropdown
      v-bind="$apis"
      @on-click="onClick"
      @on-visible-change="onVisibleChange"
      @on-clickoutside="onClickoutside">
      <slot name="content">
        <Button>
          <span>{{ content }}</span>
          <Icon type="ios-arrow-down"></Icon>
        </Button>
      </slot>
      <template #list>
        <dropdown-panel-list
          v-if="type === 'list'"
          :data="data">
          <template #item="{ data }">
            <slot
              name="item"
              :data="data"></slot>
          </template>
        </dropdown-panel-list>
        <dropdown-panel-group
          v-if="type === 'group'"
          :data="data">
          <template #groupItem="{ data }">
            <slot
              name="groupItem"
              :data="data"></slot>
          </template>
        </dropdown-panel-group>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'dropdown-panel'
import dropdownPanelList from './dropdown-panel-list'
import dropdownPanelGroup from './dropdown-panel-group'

export default {
  name: prefixCls,
  components: {
    dropdownPanelList,
    dropdownPanelGroup
  },
  props: {
    type: {
      type: String,
      default: 'list'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    data: {
      type: Array,
      default: () => []
    },
    content: {
      type: String,
      default: '批量操作'
    },
    labelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      isOpen: false
    }
  },
  computed: {
    $apis() {
      return Object.assign({}, this.$attrs, {
        placement: this.placement
      })
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}-wrap`]: this.type,
          [`${prefixCls}-panel-open`]: this.isOpen
        }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClick(name) {
      let result = this.labelValue ? this.data.find(e => e.value === name) : name
      this.$emit('on-click', result)
    },
    onVisibleChange(visible) {
      this.isOpen = visible
      this.$emit('on-visible-change', visible)
    },
    onClickoutside(event) {
      this.$emit('on-clickoutside', event)
    }
  }
}
</script>
