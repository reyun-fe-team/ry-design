<template>
  <div>
    <ul :class="[prefixCls]">
      <li
        v-for="item in buttonList"
        :key="item.value"
        :class="disabled(item) ? 'disabled' : className(item.value)"
        @click="disabled(item) ? null : handleTabChange(item, 'multi')">
        {{ item.label }}
        <div
          v-if="item.isMulti"
          class="top-right-triangle"></div>
        <Tooltip
          v-if="item.tip && item.tip.length"
          :transfer="true"
          theme="light"
          :placement="tooltipPlacement"
          :max-width="tooltipMaxWidth">
          <div slot="content">
            <p
              v-for="(list, index) in item.tip"
              :key="list + index"
              class="font-1-normal">
              <span v-text="list"></span>
            </p>
          </div>
          <Icon
            type="ios-help-circle-outline"
            size="16"
            class="cursor-pointer icon-question tip-icon"></Icon>
        </Tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'multi-radio-button'
export default {
  name: prefixCls,
  props: {
    buttonList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Function,
      default: () => {}
    },
    tooltipMaxWidth: {
      type: String,
      default: '300'
    },
    tooltipPlacement: {
      type: String,
      default: 'top'
    },
    // 多选是否可以置空，默认不可置空（定向使用场景，多选只剩下最后一个选中的，不可取消）
    multiAbleReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    className(val) {
      return this.value.includes(val) ? 'active' : ''
    },
    // 处理Tab切换事件
    handleTabChange(item, muliti, disabled) {
      if (disabled) {
        return
      }
      let valueArr = _cloneDeep(this.value)
      // 当前选中式多选还是单选
      let currentIsMulti =
        valueArr.length && this.buttonList.find(list => list.value === valueArr[0]).isMulti
      // 点击取消
      if (this.value.includes(item.value)) {
        // 如果只剩下一个选中，multiAbleReset = false 无法取消；multiAbleReset = true && 多选，可以取消
        if (valueArr.length > 1) {
          valueArr = valueArr.filter(list => list !== item.value)
        } else {
          if (this.multiAbleReset && item.isMulti) {
            valueArr = valueArr.filter(list => list !== item.value)
          }
        }
      } else {
        // 点击选中
        if (item.value && item.isMulti && currentIsMulti) {
          // 多选
          valueArr.push(item.value)
        } else {
          // 单选
          valueArr = [item.value]
        }
      }
      // 返回全部数据
      const selection = this.buttonList.filter(item => valueArr.includes(item.value))
      this.$emit('input', valueArr)
      this.$emit('on-change', valueArr, selection)
    }
  }
}
</script>
