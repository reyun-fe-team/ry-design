<template>
  <DropdownMenu>
    <div
      v-for="(group, index) in data"
      :key="index"
      :class="prefixCls">
      <div :class="prefixCls + '-title'">
        <rd-icon
          :type="group.icon ? group.icon : 'ry-icon-chanpinx'"
          size="12"
          :class="prefixCls + '-title-icon'"></rd-icon>
        <span>{{ group.title }}</span>
        <template v-if="group.tooltip">
          <Tooltip
            transfer
            theme="light"
            placement="top"
            :max-width="300"
            :content="group.tooltip">
            <Icon
              type="ios-help-circle-outline"
              style="margin-left: 3px"
              size="16"
              color="#666"></Icon>
          </Tooltip>
        </template>
      </div>
      <div :class="prefixCls + '-content'">
        <div
          v-for="item in group.items"
          :key="item.value"
          :class="itemsClass(item)">
          <slot
            name="groupItem"
            :data="item">
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
          </slot>
        </div>
      </div>
    </div>
  </DropdownMenu>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'dropdown-panel-group'
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