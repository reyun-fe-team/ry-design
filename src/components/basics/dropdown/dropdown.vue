<template>
  <div :class="classes">
    {{ $apis }}
    {{ classes }}
    <Dropdown v-bind="$apis">
      <Button>
        <span>批量操作</span>
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <template #list>
        <dropdown-list
          v-if="type === 'list'"
          :data="list"></dropdown-list>

        <dropdown-group
          v-if="type === 'group'"
          :data="list"></dropdown-group>
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
    }
  },
  data() {
    return {
      prefixCls,
      list: [
        { label: 'label1', value: 'value1', disabled: false },
        { label: 'label2', value: 'value2', disabled: false },
        { label: 'label3', value: 'value3', disabled: true, tooltip: '123123123123123123' },
        { label: 'label4', value: 'value4', disabled: false, tooltip: '222222222222222222' },
        { label: 'label5', value: 'value5', disabled: false },
        { label: 'label6', value: 'value6', disabled: false },
        { label: 'label7', value: 'value7', disabled: false },
        { label: 'label8', value: 'value8', disabled: false },
        { label: 'label9', value: 'value9', disabled: false },
        {
          label:
            'label10label10label10label10label10label10label10label10label10label10label10label10',
          value: 'value10',
          disabled: false
        }
      ]
    }
  },
  computed: {
    $apis() {
      return Object.assign({}, this.$attrs, {
        placement: this.placement
      })
      // return  On
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
