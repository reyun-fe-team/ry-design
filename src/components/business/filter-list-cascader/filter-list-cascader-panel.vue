<template>
  <div
    :class="classes"
    :style="styles">
    <filter-list-cascader-menu
      :active-path="activePath"
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
    styles: Object
  },
  data() {
    return {
      prefixCls,
      current: this.value,
      menus: [],
      selectedMenus: [],
      activePath: ''
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    }
  },
  watch: {
    data() {
      this.init()
    },
    value(val) {
      this.current = val
    },
    current(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.menus = this.data
      this.selectedMenus = []
    },
    checkChange({ data, selected }, index) {
      if (index === 0) {
        const ids = this.menus.find(val => val.value === data.value).children.map(val => val.value)
        ids.forEach(val => {
          this.doCheck(selected, val)
        })
      } else {
        this.doCheck(selected, data.value)
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
      const item = this.data.find(val => val.value === data.value)
      if (item) {
        this.activePath = item.value
        this.selectedMenus = item.children
      }
    }
  }
}
</script>
