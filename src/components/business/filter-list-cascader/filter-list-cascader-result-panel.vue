<template>
  <div
    :class="prefixCls"
    :style="styles">
    <ul :class="`${prefixCls}-list`">
      <li
        v-for="item in flattenedData"
        :key="item.value"
        :class="[
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-selected`]: isSelected(item.value)
          }
        ]"
        @click="handleSelect(item)">
        <Checkbox
          :value="isSelected(item.value)"
          style="margin-right: 8px"
          @on-change="checked => handleCheckboxChange(checked, item)" />
        <span :class="`${prefixCls}-label`">
          <!-- Show full path in search results -->
          <template v-if="item.path">
            <div
              v-for="(pathItem, pathIndex) in item.path"
              :key="pathIndex">
              <span
                :class="`${prefixCls}-path-item`"
                v-html="highlightMatch(pathItem)"></span>
              <span
                v-if="pathIndex < item.path.length - 1"
                :class="`${prefixCls}-path-separator`">
                /
              </span>
            </div>
          </template>
          <template v-else>
            <span v-html="highlightMatch(item.label)"></span>
          </template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-cascader-result'

export default {
  name: 'FilterListCascaderResultPanel',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    searchValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    flattenedData() {
      return this.flattenData(this.data)
    }
  },
  methods: {
    // 高亮匹配的文本
    highlightMatch(text) {
      if (!this.searchValue) {
        return text
      }
      const regex = new RegExp(`(${this.searchValue})`, 'gi')
      return text.toString().replace(regex, '<span class="highlight-match">$1</span>')
    },
    // 扁平化数据
    flattenData(data, parentPath = []) {
      return data.reduce((acc, item) => {
        const currentPath = [...parentPath, item.label]

        // 检查是否已存在相同的 value
        const isDuplicate = acc.some(existingItem => existingItem.value === item.value)

        if (isDuplicate) {
          return acc
        }

        if (item.children && item.children.length) {
          // If item has children, recursively flatten them
          const flattenedChildren = this.flattenData(item.children, currentPath)
          return [...acc, ...flattenedChildren]
        } else {
          // If item is a leaf node, add it with its full path
          return [
            ...acc,
            {
              ...item,
              path: currentPath
            }
          ]
        }
      }, [])
    },
    // 是否选中
    isSelected(value) {
      return this.value.includes(value)
    },
    // 选择
    handleSelect(item) {
      if (Array.isArray(this.value)) {
        if (this.value.includes(item.value)) {
          // 如果已选中，则移除
          this.$emit(
            'input',
            this.value.filter(val => val !== item.value)
          )
        } else {
          // 如果未选中，则添加
          this.$emit('input', [...this.value, item.value])
        }
      } else {
        // 单选模式
        this.$emit('input', [item.value])
      }
    },
    // 复选框改变
    handleCheckboxChange(checked, item) {
      // 根据复选框的实际状态来触发选择
      if (checked && !this.value.includes(item.value)) {
        this.$emit('input', [...this.value, item.value])
      } else if (!checked && this.value.includes(item.value)) {
        this.$emit(
          'input',
          this.value.filter(val => val !== item.value)
        )
      }
    }
  }
}
</script>

