<template>
  <DropdownMenu>
    <div
      v-for="(group, index) in list"
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
          <slot name="item">
            <template v-if="item.tooltip">
              <Tooltip
                transfer
                theme="light"
                placement="top"
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
      prefixCls,
      list: [
        {
          title: '我是分类一',
          items: [
            {
              label: '1111',
              value: '1111',
              disabled: false,
              tooltip: '1111111111111111111111111111'
            },
            {
              label: '2222',
              value: '2222',
              disabled: true,
              tooltip: '222222222222222222222222'
            },
            {
              label: '3333',
              value: '3333'
            },
            {
              label: '444',
              value: '4444'
            },
            {
              label: '5555',
              value: '5555'
            }
          ]
        },
        {
          title: '我是分类一',
          items: [
            {
              label: '11111111111111111111111111111111111111111111111111111111',
              value: '1111',
              disabled: false,
              tooltip: '1111111111111111111111111111'
            },
            {
              label: '222222222222222222222222222222222222222222222222',
              value: '2222',
              disabled: true,
              tooltip: '222222222222222222222222'
            },
            {
              label: '333333333333333333333333',
              value: '3333'
            },
            {
              label: '444',
              value: '4444'
            },
            {
              label: '5555',
              value: '5555'
            }
          ]
        },
        {
          title: '我是分类一',
          items: [
            {
              label: '1111',
              value: '1111',
              disabled: false,
              tooltip: '1111111111111111111111111111'
            },
            {
              label: '2222',
              value: '2222',
              disabled: true,
              tooltip: '222222222222222222222222'
            },
            {
              label: '3333',
              value: '3333'
            },
            {
              label: '444',
              value: '4444'
            },
            {
              label: '5555',
              value: '5555'
            }
          ]
        },
        {
          title: '我是分类一',
          items: [
            {
              label: '1111',
              value: '1111',
              disabled: false,
              tooltip: '1111111111111111111111111111'
            },
            {
              label: '2222',
              value: '2222',
              disabled: true,
              tooltip: '222222222222222222222222'
            },
            {
              label: '3333',
              value: '3333'
            },
            {
              label: '444',
              value: '4444'
            },
            {
              label: '5555',
              value: '5555'
            }
          ]
        }
      ]
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