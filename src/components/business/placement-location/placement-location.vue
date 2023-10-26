<template>
  <div :class="classes">
    <placement-location-node
      v-if="showAll && !showEmpty"
      :value="checkedAll"
      label="全选"
      :disabled="disabledCheckedAll"
      show-checkbox
      multiple
      @on-change="toggleSelectAll"></placement-location-node>
    <div
      v-for="(option, titleIndex) in data"
      :key="option.label">
      <placement-location-node
        v-model="option.checked"
        :label="option.label"
        :show-checkbox="showCheckbox"
        :disabled="option._disabled || option.disabled"
        multiple
        :class="classesTitle(titleIndex)"
        @on-change="handlTitleChange(option)"></placement-location-node>
      <div
        v-if="option.expand && option.children && option.children.length"
        :class="prefixCls + '-children'">
        <placement-location-node
          v-for="item in option.children"
          :key="item.value"
          v-model="item.checked"
          :label="item.label"
          show-checkbox
          :disabled="item._disabled || item.disabled"
          :multiple="getChildrenMultiple(option)"
          @on-change="handleChildrenChange(option, item, titleIndex)"></placement-location-node>
      </div>
    </div>
    <div
      v-if="showEmpty"
      :class="prefixCls + '-empty'">
      {{ emptyText }}
    </div>
    <Spin
      v-if="loading"
      fix>
      <Icon
        type="ios-loading"
        size="18"
        :class="prefixCls + '-loading'"></Icon>
    </Spin>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'placement-location'
import placementLocationNode from './placement-location-node'
import Emitter from '@src/mixins/emitter'

export default {
  name: prefixCls,
  components: { placementLocationNode },
  mixins: [Emitter],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => []
    },
    showAll: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let value = this.value
    if (value === null) {
      value = []
    }
    return {
      prefixCls: prefixCls,
      selectAll: false,
      disabledCheckedAll: false,
      currentValue: value,
      isChangeValueInTree: false // 如果是点击 Tree 里改变的数据，临时置为 true，避免在 watch 的 value 中重复修改 Select 数据
    }
  },
  computed: {
    showEmpty() {
      return !this.data.length
    },
    classes() {
      return [`${this.prefixCls}`, { [`${prefixCls}-border`]: this.showBorder }]
    },
    checkedAll() {
      const valid = this.data.some(val => {
        if (this.showCheckbox && !val.checked) {
          return true
        } else if (val.expand && val.children && val.children.length) {
          return val.children.some(item => {
            return !item.checked
          })
        } else {
          return false
        }
      })
      return !valid
    }
  },
  watch: {
    value() {
      if (this.isChangeValueInTree) {
        this.isChangeValueInTree = false
      } else {
        this.currentValue = this.value
        this.handleUpdateNodes()
      }
      this.currentValue = this.value
    },
    data() {
      if (this.isChangeValueInTree) {
        this.isChangeValueInTree = false
      } else {
        this.handleUpdateNodes()
      }
    }
  },
  mounted() {
    this.handleUpdateNodes()
  },
  methods: {
    classesTitle(index) {
      const weight = this.data.some(val => val.children && val.children.length)
      return [
        { [`${prefixCls}-weight`]: weight, [`${prefixCls}-title`]: this.showAll || index !== 0 }
      ]
    },
    getChildrenMultiple(data) {
      if (data.childrenRule && 'multiple' in data.childrenRule) {
        return data.childrenRule.multiple
      }
      return this.multiple
    },
    handlTitleChange(data) {
      if (!this.showCheckbox) {
        return
      }
      if (data.children && data.children.length) {
        // 子集是判断||多选
        const multiple = this.getChildrenMultiple(data)
        // 更新子集
        data.children.forEach((val, index) => {
          if (val && !val.disabled && !val._disabled) {
            if (multiple) {
              val.checked = data.checked
            } else if (!multiple && !data.checked) {
              // 单选也需要全部取消
              val.checked = false
            } else if (!multiple) {
              // 单选默认选中第一个
              val.checked = index === 0
            }
          }
        })
      }
      this.handleUpdateSelectValue()
      this.$emit('on-title-click', this.currentValue, data)
    },
    handleChildrenChange(data, childData, titleIndex) {
      this.disabledCheckedAll = false
      // 处理特殊场景,选中一条指定置灰其他
      if (childData.disabledValues && childData.disabledValues.length && this.multiple) {
        this.data.forEach(val => {
          if (val.children && val.children.length) {
            val.children.forEach(item => {
              let disabled = false
              if (item.disabled) {
                disabled = true
              } else if (childData.checked) {
                disabled = childData.disabledValues.includes(item.value)
                if (disabled) {
                  this.disabledCheckedAll = true
                }
              }
              item._disabled = disabled
            })
          }
        })
      }
      const multiple = this.getChildrenMultiple(data)
      const isUpdateTitle = this.isUpdateTitle(data)
      if (multiple) {
        if (isUpdateTitle) {
          // 更新父节点
          data.checked = data.children.some(val => val.checked)
        }
      } else {
        this.data.forEach((item, index) => {
          // 处理全体单选和局部单选的场景
          if (!this.multiple || (item.value === data.value && index === titleIndex)) {
            // 二级节点单选场景-更新兄弟节点
            item.children.forEach(val => {
              if (!val.disabled && !val._disabled) {
                val.checked = val.value === childData.value
              }
            })
          }
        })
        if (isUpdateTitle) {
          // 更新父节点
          data.checked = data.children.some(val => val.checked)
        }
      }
      this.handleUpdateSelectValue()
      this.$emit('on-chillren-click', childData, this.currentValue, data)
    },
    // 是否更新父节点
    isUpdateTitle(data) {
      return !data.disabled && this.showCheckbox
    },
    // 更新value
    handleUpdateSelectValue() {
      let list = []
      this.data.forEach(item => {
        if (item.checked && item.value) {
          list.push(item.value)
        }
        if (item.children && item.children.length) {
          item.children.forEach(val => {
            if (val.checked) {
              list.push(val.value)
            }
          })
        }
      })
      this.currentValue = list
      this.isChangeValueInTree = true
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
      this.dispatch('FormItem', 'on-form-change', this.currentValue)
    },
    // 初始化数据源
    handleUpdateNodes() {
      let disabledValues = []
      this.data.forEach(item => {
        item.checked = this.showCheckbox && this.currentValue.includes(item.value)
        if (item.children && item.children.length) {
          item.children.forEach(val => {
            val.checked = this.currentValue.includes(val.value)
            if (val.checked && val.disabledValues) {
              disabledValues = [...disabledValues, ...val.disabledValues]
            }
          })
          if (!item.value && this.showCheckbox) {
            item.checked = item.children.some(val => val.checked)
          }
        }
      })
      // 初始化处理disabledValues
      if (disabledValues.length) {
        this.data.forEach(item => {
          item.checked = this.showCheckbox && this.currentValue.includes(item.value)
          if (item.children && item.children.length) {
            item.children.forEach(val => {
              val._disabled = val.disabled || disabledValues.includes(val.value)
            })
            if (!item.value && this.showCheckbox) {
              item.checked = item.children.some(val => val.checked)
            }
          }
        })
      }
    },
    toggleSelectAll(checked) {
      this.data.forEach(item => {
        if (this.showCheckbox) {
          if (checked && !item.disabled && !item._disabled) {
            item.checked = true
          } else if (!checked) {
            item.checked = false
          }
        }
        if (item.children && item.children.length) {
          item.children.forEach(val => {
            const multiple = this.getChildrenMultiple(val)
            if (!val.disabled && !val._disabled && multiple) {
              val.checked = checked
            }
          })
        }
      })
      this.handleUpdateSelectValue()
      if (this.showCheckbox) {
        this.$emit('on-on-select-all', this.currentValue)
      }
    }
  }
}
</script>