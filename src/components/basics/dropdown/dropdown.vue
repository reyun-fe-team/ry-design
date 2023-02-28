<template>
  <div :class="classes">
    <Dropdown v-bind="$apis">
      <Button>
        <span>批量操作</span>
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <template #list>
        <dropdown-list
          v-if="type === 'list'"
          :data="data"></dropdown-list>
        <dropdown-group
          v-if="type === 'group'"
          :data="data"></dropdown-group>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'dropdown'
import dropdownList from './dropdown-list'
import dropdownGroup from './dropdown-group'

export default {
  name: prefixCls,
  components: {
    dropdownList,
    dropdownGroup
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
    }
  },
  data() {
    return {
      prefixCls
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
          [`${prefixCls}-${this.type}-wrap`]: this.type
        }
      ]
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>
