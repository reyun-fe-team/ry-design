<template>
  <div
    :class="classes"
    :style="styles">
    <filter-list-cascader-menu
      show-seleted
      :nodes="menus"
      @handle-expand="handleExpand"
      @check-change="checkChange($event, 0)"></filter-list-cascader-menu>
    <filter-list-cascader-menu
      v-show="selectedMenus.length"
      :nodes="selectedMenus"
      @check-change="checkChange($event, 1)"></filter-list-cascader-menu>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-cascader-panel'
import filterListCascaderMenu from './filter-list-cascader-menu'
import { deepCopy } from '@src/util/assist'
export default {
  name: prefixCls,
  components: { filterListCascaderMenu },
  provide() {
    return {
      panel: this
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [Array, String, Number],
      default: () => {
        return []
      }
    },
    styles: Object,
    max: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      prefixCls,
      current: this.value,
      menus: [],
      selectedMenus: []
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    }
  },
  watch: {
    data(val, oldVal) {
      if (val && oldVal && JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.init()
        this.selectedMenus = []
      }
    },
    value(val, oldVal) {
      if (val && oldVal && JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.current = val
        this.init()
      }
    },
    current(val) {
      this.setDisabled()
      if (val.length > this.max && this.max > 0) {
        val = val.slice(0, this.max)
      }

      this.$emit('input', val)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let _data = deepCopy(this.data)
      this.menus = this.getNodes(_data)

      this.selectedMenus.forEach(val => {
        val.checked = this.current.includes(val.value)
      })
    },
    getNodes(data) {
      const { current } = this
      const list = data.map(option => {
        let { value, label, children = [] } = option
        let checked = false
        if (current.includes(value)) {
          checked = true
        } else if (children.length) {
          const a = children.every(val => {
            return current.includes(val.value)
          })
          if (a) {
            checked = true
          }
        }
        if (children.length) {
          children = this.getNodes(children)
        }
        let indeterminate = !children.every(val => val.checked) && children.some(val => val.checked)
        return {
          value,
          label,
          checked,
          disabled: false,
          indeterminate,
          children
        }
      })

      return list
    },
    checkChange({ data, selected }, index) {
      if (index === 0) {
        let findData = this.menus.find(val => val.value === data.value)
        findData.checked = selected
        if (findData.children.length) {
          const ids = findData.children.map(val => val.value)

          if (findData.children) {
            findData.children.forEach(item => {
              item.checked = findData.checked
            })
            findData.indeterminate = false
          }
          ids.forEach(val => {
            this.doCheck(selected, val)
          })
          this.selectedMenus.forEach(val => {
            val.checked = this.current.includes(val.value)
          })
        } else {
          this.doCheck(selected, data.value)
          this.selectedMenus = []
        }
      } else {
        this.menus.forEach((item, index) => {
          if (item.children.some(val => val.value === data.value)) {
            item.children.forEach(val => {
              if (val.value === data.value) {
                val.checked = selected
              }
            })
            item.checked = item.children.every(val => val.checked)

            item.indeterminate =
              !item.children.every(val => val.checked) && item.children.some(val => val.checked)
          }
          // 需要$set强制更新
          this.$set(this.menus, index, item)
        })
        this.doCheck(selected, data.value)
        this.selectedMenus.forEach(val => {
          val.checked = this.current.includes(val.value)
        })
      }
    },
    doCheck(selected, value) {
      if (selected && !this.current.includes(value)) {
        this.current.push(value)
      } else if (!selected) {
        this.current = this.current.filter(item => item !== value)
      }
    },
    handleExpand(data) {
      const item = this.menus.find(val => val.value === data.value)
      if (!item) {
        return
      }
      this.selectedMenus = item.children
      this.setDisabled()
    },
    setDisabled() {
      if (this.value.length >= this.max && this.max > 0) {
        this.selectedMenus.forEach(node => {
          if (!this.value.includes(node.value)) {
            node.disabled = true
          }
        })

        this.menus.forEach(node => {
          if (!this.value.includes(node.value)) {
            node.disabled = true
          }
        })
      } else {
        this.selectedMenus.forEach(node => {
          node.disabled = false
        })

        this.menus.forEach(node => {
          node.disabled = false
        })
      }
    }
  }
}
</script>
