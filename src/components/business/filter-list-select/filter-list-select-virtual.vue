<template>
  <div>
    <div
      v-if="groupNameList && groupNameList[source.value]"
      :class="prefixCls + '-group-name'"
      :title="groupNameList[source.value]">
      {{ groupNameList[source.value] }}
    </div>
    <div
      :key="source.value"
      :class="[
        prefixCls + '-item',
        {
          [prefixCls + '-item-selected']: current.includes(source.value)
        }
      ]"
      :disabled="source.disabled"
      @click="handleClick(source)">
      <Checkbox
        v-if="multiple"
        style="margin: 0 0 0 10px"
        :value="current.includes(source.value)"
        @click="handleClick(source)"></Checkbox>
      <div :class="prefixCls + '-item-contain'">
        <slot
          name="select-item"
          :src="source.src"
          :row="source"
          :index="index">
          <rd-filter-list-describe
            style="width: 100%"
            :height="source.description || source.src ? inputHeight || 48 : inputHeight || 32"
            :src="source.src"
            :text="source.label"
            :description="source.description"></rd-filter-list-describe>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
import rdFilterListDescribe from '../filter-list/filter-list-describe'
const prefixCls = prefix + 'filter-list-select-virtual'
export default {
  name: prefixCls,
  components: { rdFilterListDescribe },
  props: {
    source: {
      type: Object,
      default: () => {}
    },
    index: Number,
    groupNameList: Object,
    current: {
      type: Array,
      default: () => {
        return []
      }
    },
    multiple: Boolean,
    inputHeight: [String, Number]
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    handleClick(val) {
      this.$parent.$parent.$emit('on-click', val)
    }
  }
}
</script>
