<template>
  <div>
    <FormItem
      :prop="formItemProp"
      :label="formItemLabel"
      :label-width="formItemLabelWidth">
      <rd-prefix-container>
        <span slot="prepend">formItemLabel</span>
        <Select
          ref="select"
          v-model="current"
          style="margin-bottom: 24px"
          :class="classes"
          filterable
          multiple
          :style="{ width: width + 'px' }"
          :max-tag-count="1"
          placeholder="请搜索或选择媒体账户"
          :max-tag-placeholder="maxTagPlaceholder"
          @on-select="handleSelect"
          @on-open-change="handleOpenChange"
          @on-query-change="handleQueryChange">
          <template v-if="grouping">
            <OptionGroup
              v-for="item in data"
              :key="item.label"
              :label="item.label">
              <Option
                v-for="el in item.children"
                :key="el.mediaAccountId"
                :disabled="item.disabled"
                :value="el.mediaAccountId"
                :label="el.nameWithAdverId"></Option>
            </OptionGroup>
          </template>
          <template v-else>
            <Option
              v-for="el in data"
              :key="el.mediaAccountId"
              :disabled="el.disabled"
              :value="el.mediaAccountId"
              :label="el.nameWithAdverId"></Option>
          </template>
        </Select>
      </rd-prefix-container>
    </FormItem>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'account-select'
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
    formItemProp: {
      type: String,
      default: ''
    },
    formItemLabel: {
      type: String,
      default: '投放账户'
    },
    formItemLabelWidth: {
      type: Number,
      default: 104
    }
  },
  data() {
    return {
      accountQueryInfo: {
        isAfterSelect: false,
        queryKey: ''
      },
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
    handleOpenChange(val) {
      if (!val) {
        this.$refs.select.query = ''
      }
    },
    handleQueryChange(data) {
      if (data) {
        this.accountQueryInfo.queryKey = data
      }
      if (this.accountQueryInfo.isAfterSelect) {
        this.accountQueryInfo.isAfterSelect = false
        setTimeout(() => {
          this.$refs.select.setQuery(this.accountQueryInfo.queryKey)
        }, 20)
      }
    },
    maxTagPlaceholder(value) {
      return value
    }
  }
}
</script>
