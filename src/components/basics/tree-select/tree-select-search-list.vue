<template>
  <div :class="classes">
    <ul v-show="querySelections.length">
      <li
        v-for="(item, index) in querySelections"
        :key="index"
        @click="handleSelectItem(index)">
        <Checkbox
          v-model="item.item.checked"
          style="margin-right: 10px"
          :disabled="item.disabled"
          @change="handleSelectItem(index)" />
        <p v-html="item.display"></p>
      </li>
    </ul>
    <div
      v-show="!querySelections.length"
      :class="[prefixCls + '-not-found-tip']">
      {{ notFoundText }}
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'tree-select-search-list'
export default {
  name: prefixCls,
  components: {},
  props: {
    querySelections: {
      type: Array,
      default: () => []
    },
    notFoundText: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    }
  },
  methods: {
    handleSelectItem(index) {
      this.$emit('search-item-change', index)
    }
  }
}
</script>