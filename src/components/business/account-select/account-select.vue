<template>
  <div :class="classes">
    <Select
      ref="select"
      v-model="current"
      filterable
      :multiple="multiple"
      :max-tag-count="maxTagCount"
      :placeholder="placeholder"
      :max-tag-placeholder="maxTagPlaceholder"
      :disabled="disabled"
      :clearable="clearable"
      @on-select="handleSelect"
      @on-open-change="handleOpenChange"
      @on-query-change="handleQueryChange"
      @on-clear="onClear">
      <template v-if="grouping">
        <OptionGroup
          v-for="item in accountList"
          :key="item.label"
          :label="item.label">
          <Option
            v-for="el in item.children"
            :key="el.value"
            :disabled="item.disabled || el.disabled"
            :value="el.value"
            :label="el.label"></Option>
        </OptionGroup>
      </template>
      <template v-else>
        <Option
          v-for="el in accountList"
          :key="el.value"
          :disabled="el.disabled"
          :value="el.value"
          :label="el.label"></Option>
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
      type: [Array, String],
      default: () => []
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // 组形态
    grouping: {
      type: Boolean,
      default: false
    },
    maxTagCount: {
      type: Number,
      default: 1
    },
    // 跨主体
    crossSubject: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请搜索或选择媒体账户'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const accountList = this.getFilterAccountList()
    return {
      accountQueryInfo: {
        isAfterSelect: false,
        queryKey: ''
      },
      accountList,
      accountListClone: _cloneDeep(accountList),
      current: this.value,
      prefixCls
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`, { [`${prefixCls}-multiple`]: this.multiple }]
    }
  },
  watch: {
    value(value) {
      this.current = value
    },
    data: {
      deep: true,
      handler() {
        const accountList = this.getFilterAccountList()
        this.accountList = accountList
        this.accountListClone = _cloneDeep(accountList)
      }
    },
    current(value, oldVal) {
      // 数据一样不执行更新
      if (JSON.stringify(value) === JSON.stringify(oldVal)) {
        return
      }
      if (this.multiple && this.grouping && !this.crossSubject) {
        this.handleChangeAccount(value)
      }
      this.$emit('input', value)
      this.$emit('on-change', value)
    }
  },
  methods: {
    // 设置账号disabled
    getFilterAccountList() {
      if (!this.multiple) {
        return this.data
      }
      let _data = _cloneDeep(this.data)
      if (this.grouping && !this.crossSubject) {
        const first = this.value[0]
        _data.forEach(val => {
          val.disabled = first ? !val.children.some(item => item.value === first) : false
        })
      }
      return _data
    },
    handleSelect() {
      if (this.multiple) {
        this.accountQueryInfo.isAfterSelect = true
      }
    },
    handleQueryChange(data) {
      this.$emit('on-query-change', data)
      if (!this.multiple) {
        return
      }
      if (data) {
        this.accountQueryInfo.queryKey = data
      }
      if (!this.accountQueryInfo.isAfterSelect) {
        this.accountFilterMethod(data)
      } else {
        this.accountQueryInfo.isAfterSelect = false
        setTimeout(() => {
          this.$refs.select.setQuery(this.accountQueryInfo.queryKey)
        }, 20)
      }
    },
    handleOpenChange(val) {
      if (this.multiple && !val) {
        this.$refs.select.query = ''
      }
      this.$emit('on-open-change', val)
    },
    accountFilterMethod(query) {
      if (!query) {
        this.accountList = this.accountListClone
        return
      }
      if (!this.grouping) {
        this.accountList = this.accountListClone.filter(
          item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      } else {
        this.accountList = _cloneDeep(this.accountListClone).reduce((list, current) => {
          let filter = current.children.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          )
          current.children = filter
          if (filter.length) {
            list.push(current)
          }
          return list
        }, [])
      }
    },
    maxTagPlaceholder(value) {
      return value + this.maxTagCount
    },
    // 选择账号
    handleChangeAccount(newValue) {
      const first = newValue[0]
      this.accountList.forEach(val => {
        val.disabled = first ? !val.children.some(item => item.value === first) : false
      })
      this.accountListClone.forEach(val => {
        val.disabled = first ? !val.children.some(item => item.value === first) : false
      })
      let find = this.accountList.find(val => {
        return val.children.some(item => item.value === first)
      })
      if (find) {
        this.current = newValue.map(item => {
          // 保障顺序
          return find.children.find(val => item === val.value)
        })
      }
    },
    onClear() {
      this.$emit('on-clear')
    }
  }
}
</script>
