<template>
  <DropdownMenu>
    <div
      v-for="(group, index) in data"
      :key="index"
      :class="prefixCls">
      <div :class="prefixCls + '-title'">
        <Icon
          slot="prefix"
          size="12"
          custom="iconfont ry-icon-chanpinx"></Icon>
        <span>{{ group.title }}</span>
      </div>
      <div :class="prefixCls + '-content'">
        <div
          v-for="item in group.items"
          :key="item.value"
          :class="itemsClass(item)">
          <template v-if="item.tooltip">
            <Tooltip
              transfer
              theme="light"
              placement="top"
              :max-width="300"
              :content="item.tooltip">
              {{ item.label }}
            </Tooltip>
          </template>
          <template v-else>{{ item.label }}</template>
        </div>
      </div>
    </div>
  </DropdownMenu>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'dropdown-group'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    itemsClass(item) {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-disabled`]: item.disabled
        }
      ]
      // return
    }
  }
}
</script>