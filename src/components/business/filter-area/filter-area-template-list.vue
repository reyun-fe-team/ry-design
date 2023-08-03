<template>
  <Dropdown
    :class="prefixCls"
    placement="bottom-start"
    trigger="click"
    @on-click="handlerDropClick">
    <span
      :class="prefixCls + '-screen'"
      @click="dropBtnClick">
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
        <div :class="[prefixCls + '-dropdown-item', activeName === item.value ? 'active' : '']">
          <div
            :class="prefixCls + '-dropdown-item-label'"
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
    dropBtnClick() {
      if (!this.data.length) {
        this.handlerDropClick('select-template')
      }
    },
    handerAllClick() {
      this.$emit('on-all-filter')
    },
    handlerDropClick(value) {
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
