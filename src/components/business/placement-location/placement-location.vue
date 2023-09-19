<template>
  <div :class="prefixCls">
    <div
      v-for="option in data"
      :key="option.label">
      <placement-location-node
        v-model="option.checked"
        :label="option.label"
        :show-checkbox="showCheckbox"
        :disabled="option.disabled"
        :multiple="multiple"
        @on-change="handlTitleChange(option)"></placement-location-node>
      <div
        v-if="option.children && option.children.length"
        :class="prefixCls + '-body'">
        <placement-location-node
          v-for="(item, childrenIndex) in option.children"
          :key="item.value"
          v-model="item.checked"
          :label="item.label"
          show-checkbox
          :disabled="item.disabled"
          :multiple="getChildrenMultiple(option)"
          @on-change="handleChildrenChange(option, childrenIndex)"></placement-location-node>
      </div>
    </div>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'placement-location'
import placementLocationNode from './placement-location-node'
export default {
  name: prefixCls,
  components: { placementLocationNode },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  methods: {
    getChildrenMultiple(data) {
      if (!data.childrenRule) {
        return this.multiple
      }
      return data.childrenRule.multiple || false
    },
    handlTitleChange(data) {
      // console.log(data)
      if (!this.showCheckbox || !data.children || !data.children.length) {
        return
      }
      const multiple = this.getChildrenMultiple(data)
      // 更新子集
      data.children.forEach((val, index) => {
        if (multiple) {
          val.checked = data.checked
        } else if (!multiple && !data.checked) {
          // 单选也需要全部取消
          val.checked = false
        } else if (!multiple) {
          // 单选默认选中第一个
          val.checked = index === 0
        }
      })
    },
    handleChildrenChange(data, childrenIndex) {
      const multiple = this.getChildrenMultiple(data)
      if (multiple) {
        // 更新父节点
        data.checked = data.children.every(val => val.checked)
      } else {
        // 更新兄弟节点
        data.children.forEach((val, index) => {
          val.checked = childrenIndex === index
        })

        // 更新父节点
        data.checked = data.children.some(val => val.checked)
      }
    }
  }
}
</script>