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
          [prefixCls + '-item-selected']: !multiple && current.includes(source.value)
        },
        {
          [prefixCls + '-item-disabled']: source.disabled
        }
      ]"
      :disabled="source.disabled"
      @click="handleClick(source)">
      <Checkbox
        v-if="multiple"
        :disabled="source.disabled"
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
            :height="getHeight(source)"
            :src="source.src"
            :text="getLabel"
            show-image
            show-description
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
    inputHeight: [String, Number],
    labelMethod: {
      type: Function,
      default(data) {
        return 'label' in data ? data.label : ''
      }
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    getLabel() {
      return this.labelMethod(this.source)
    }
  },
  methods: {
    handleClick(val) {
      if (val.disabled) {
        return
      }
      this.$parent.$parent.$emit('on-click', val)
    },
    getHeight({ description, src }) {
      const { inputHeight } = this
      if (description || src) {
        return inputHeight > 48 ? inputHeight : 48
      }
      return inputHeight > 32 ? inputHeight : 32
    }
  }
}
</script>
