<template>
  <Dropdown
    :class="prefixCls"
    placement="bottom-start"
    trigger="click"
    @on-click="onClick">
    <span
      :class="prefixCls + '-screen'"
      @click="handlerClick">
      筛选
      <Icon
        size="12"
        custom="iconfont ry-icon-shaixuan1"></Icon>
    </span>
    <DropdownMenu
      v-if="data.length"
      slot="list"
      style="width: 320px">
      <DropdownItem
        v-for="item in data"
        :key="item.value"
        :name="item.value">
        <div :class="['dropdown-item', activeName === item.value ? 'active' : '']">
          <div
            class="dropdown-item-label"
            :title="item.label">
            {{ item.label }}
          </div>
          <Icon
            custom="iconfont ry-icon-jisu-edit"
            size="12"
            style="margin-right: 10px"
            @click.stop="onUpdate(item.value)"></Icon>
          <Icon
            custom="iconfont ry-icon-text-delete"
            size="12"
            @click.stop="onDelete(item)"></Icon>
        </div>
      </DropdownItem>
      <div :class="prefixCls + '-dropdown-footer'">
        <span
          :class="prefixCls + '-dropdown-footer-text'"
          @click="handerAllClick">
          所有筛选项
        </span>
      </div>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'select-filter-area-template-list'
export default {
  name: prefixCls,
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    handlerClick() {
      if (!this.data.length) {
        this.onClick('select-template')
      }
    },
    handerAllClick() {
      this.$emit('on-all-filter')
    },
    onClick(value) {
      this.$emit('update:activevalue', value)
      if (value === 'select-template') {
        this.$emit('on-all-filter')
      } else {
        this.$emit('on-change', value)
      }
    },
    onDelete(val) {
      this.$emit('on-delete', val)
    },
    onUpdate(value) {
      let label = this.data.find(val => val.value === value).label
      this.$emit('on-update', {
        label,
        value
      })
    }
  }
}
</script>
