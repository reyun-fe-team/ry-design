<template>
  <div>
    <Select
      ref="select"
      v-model="current"
      :class="classes"
      filterable
      clearable
      multiple
      :style="{ width: width + 'px' }"
      :max-tag-count="maxTagCount"
      placeholder="请搜索或选择媒体账户"
      :max-tag-placeholder="maxTagPlaceholder"
      @on-select="handleSelect"
      @on-open-change="handleOpenChange"
      @on-query-change="handleQueryChange">
      <template v-if="grouping">
        <OptionGroup
          v-for="item in accountList"
          :key="item.label"
          :label="item.label">
          <Option
            v-for="el in item.children"
            :key="el.mediaAccountId"
            :disabled="item.disabled || el.disabled"
            :value="el.mediaAccountId"
            :label="el.nameWithAdverId"></Option>
        </OptionGroup>
      </template>
      <template v-else>
        <Option
          v-for="el in accountList"
          :key="el.mediaAccountId"
          :disabled="el.disabled"
          :value="el.mediaAccountId"
          :label="el.nameWithAdverId"></Option>
      </template>
    </Select>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'account-select'
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: prefixCls,
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: Number,
      default: 400
    },
    // 组形态
    grouping: {
      type: Boolean,
      default: false
    },
    maxTagCount: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      accountQueryInfo: {
        isAfterSelect: false,
        queryKey: ''
      },
      accountList: this.data,
      accountListClone: this.data,
      current: this.value,
      prefixCls: prefixCls
    }
  },
  computed: {
    classes() {
      return `${prefixCls}`
    }
  },
  watch: {
    value(value) {
      this.current = value
    },
    data: {
      deep: true,
      handler(newVal) {
        this.accountList = newVal
        this.accountListClone = _cloneDeep(newVal)
      }
    },
    current(value, oldVal) {
      // 数据一样不执行更新
      if (JSON.stringify(value) === JSON.stringify(oldVal)) {
        return
      }
      this.$emit('input', value)
      this.$emit('on-change', value)
    }
  },
  methods: {
    handleSelect() {
      this.accountQueryInfo.isAfterSelect = true
    },
    handleQueryChange(data) {
      if (data) {
        this.accountQueryInfo.queryKey = data
      }
      if (!this.accountQueryInfo.isAfterSelect) {
        this.accountFilterMethod(data)
      } else {
        this.accountQueryInfo.isAfterSelect = false
        setTimeout(() => {
          this.$refs.select.setQuery(this.accountQueryInfo.queryKey)
          this.accountFilterMethod(this.accountQueryInfo.queryKey)
        }, 20)
      }
    },
    handleOpenChange(val) {
      if (!val) {
        this.$refs.select.query = ''
      }
    },
    accountFilterMethod(query) {
      if (!query) {
        this.accountList = this.accountListClone
        return
      }
      if (!this.grouping) {
        this.accountList = this.accountListClone.filter(item => item.name.indexOf(query) > -1)
      } else {
        this.accountList = _cloneDeep(this.accountListClone).reduce((list, current) => {
          let filter = current.children.filter(item => item.name.indexOf(query) > -1)
          current.children = filter
          if (filter.length) {
            list.push(current)
          }
          return list
        }, [])
      }
    },
    maxTagPlaceholder(value) {
      return value
    }
  }
}
</script>
