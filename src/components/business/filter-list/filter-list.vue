<template>
  <div :class="classes">
    <!-- trigger="custom" -->
    <filter-list-contan
      :trigger="trigger"
      @on-visible-change="handleVisibleChange">
      <filter-list-input
        v-model="current"
        :label="label"
        :placeholder="inputPlaceholder"
        :icon-state="visible"></filter-list-input>
      <div
        slot="list"
        :class="prefixCls + '-body'">
        list
        <filter-list-select v-model="current"></filter-list-select>
        <filter-list-option></filter-list-option>
      </div>
    </filter-list-contan>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list'
import filterListContan from './filter-list-contan'
import filterListSelect from './filter-list-select'
import filterListOption from './filter-list-option'
import filterListInput from './filter-list-input'
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: prefixCls,
  components: { filterListContan, filterListSelect, filterListOption, filterListInput },
  props: {
    value: {
      type: [Array, String, Number],
      default: () => []
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    trigger: String,
    placement: String,
    label: String,
    inputPlaceholder: String
  },
  data() {
    return {
      prefixCls,
      current: _cloneDeep(this.value),
      visible: false
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    }
  },
  watch: {
    value: {
      handler(val) {
        this.current = _cloneDeep(val)
      },
      deep: true
    },
    current: {
      handler(val) {
        this.$emit('input', val)
        this.$emit('on-change', val)
      },
      deep: true
    }
  },
  methods: {
    handleVisibleChange(val) {
      this.visible = val
    }
  }
}
</script>
