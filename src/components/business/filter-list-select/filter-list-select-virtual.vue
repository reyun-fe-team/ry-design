<template>
  <div>
    <div
      v-if="groupNameList && groupNameList[source.value]"
      v-tooltip="{ maxWidth: 200, content: groupNameList[source.value], delay: 1000 }"
      :class="prefixCls + '-group-name'">
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
          [prefixCls + '-item-hover-color']: !multiple
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
        <Render
          :row="source"
          :index="index"
          :render="renderItem"></Render>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-select-virtual'
import Render from './render'

export default {
  name: prefixCls,
  components: { Render },
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
    renderItem: Function
    // beforeChange: Function
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    handleClick(val) {
      if (val.disabled) {
        return
      }
      this.$parent.$parent.$emit('on-click', val)
      // if (!this.beforeChange) {
      //   this.$parent.$parent.$emit('on-click', val)
      // }
      // const before = this.beforeChange([val])
      // if (before && before.then) {
      //   before.then(() => {
      //     this.$parent.$parent.$emit('on-click', val)
      //   })
      // } else if (before !== false) {
      //   this.$parent.$parent.$emit('on-click', val)
      // }
    }
  }
}
</script>
