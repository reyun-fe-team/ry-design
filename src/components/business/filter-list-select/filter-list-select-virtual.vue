<template>
  <div>
    <div
      v-if="showGroupName"
      :class="classGroupName"
      @click="handleGroupClick(source)">
      <Checkbox
        v-if="showGroupCheckbox"
        :disabled="groupCheckObj[source.value].disabled"
        :value="groupCheckObj[source.value].check"
        @click="handleGroupClick(source)"></Checkbox>
      <div
        :title="groupNameList[source.value]"
        :class="prefixCls + '-group-name-item-text'">
        {{ groupNameList[source.value] }}
      </div>
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
    renderItem: Function,
    groupCheckObj: {
      type: Object,
      default: () => {}
    },
    groupCheckbox: Boolean
    // beforeChange: Function
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    showGroupName() {
      return this.groupNameList[this.source.value]
    },
    showGroupCheckbox() {
      return this.multiple && this.groupCheckbox
    },
    classGroupName() {
      return [
        this.prefixCls + '-group-name-item',
        { [this.prefixCls + '-group-name-item-cursor']: this.showGroupCheckbox }
      ]
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
    },
    handleGroupClick(val) {
      if (!this.showGroupCheckbox) {
        return
      }
      this.$parent.$parent.$emit('on-group-click', val)
    }
  }
}
</script>
