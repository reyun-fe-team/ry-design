<template>
  <div>
    <div
      v-if="showGroupName"
      :class="classGroupName"
      @click="handleGroupClick(source)">
      <Checkbox
        v-if="showGroupCheckbox"
        :indeterminate="groupCheckObj[source.value].indeterminate"
        :disabled="groupCheckObj[source.value].disabled"
        :value="groupCheckObj[source.value].check"
        @click="handleGroupClick(source)"></Checkbox>
      <div
        :title="groupCheckObj[source.value].groupName"
        :class="prefixCls + '-group-name-item-text'">
        {{ groupCheckObj[source.value].groupName }}
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
        :style="checkboxItemStyle"
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
      return this.groupCheckObj[this.source.value]
    },
    showGroupCheckbox() {
      return this.multiple && this.groupCheckbox
    },
    classGroupName() {
      return [
        this.prefixCls + '-group-name-item',
        { [this.prefixCls + '-group-name-item-cursor']: this.showGroupCheckbox }
      ]
    },
    checkboxItemStyle() {
      return {
        margin:
          this.groupCheckObj && Object.keys(this.groupCheckObj).length && this.showGroupCheckbox
            ? '0 0 0 24px'
            : '0 0 0 10px'
      }
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
