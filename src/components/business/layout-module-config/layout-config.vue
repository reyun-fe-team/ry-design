<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-22 16:50:21
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2022-12-19 18:26:08
 * @FilePath: /ry-design/src/components/basics/layout-module-config/layout-module-config.vue
 * @Description: 极速创建第一步模块布局组件
 * @Tips 提示
      @Option 1、保证列唯一性 使用 col 作为key
      @Option 2、slot 数据更新 需要通过 $slot 返会VNode实例，提供给RenderFunction
-->
<template>
  <div
    :class="[prefixCls]"
    :style="wrapStyle">
    <div
      v-for="slotName in flattenSlots"
      :key="slotName"
      :style="getItemStyle(slotName)">
      <template v-if="getRenderSlot(slotName)">
        <!-- slot -->
        <Render
          v-if="getRenderSlot(slotName).type === 'slot'"
          :render="() => getRenderSlot(slotName).slotVNode"></Render>
        <!-- function -->
        <Render
          v-if="getRenderSlot(slotName).type === 'function'"
          :render="getRenderSlot(slotName).render"></Render>
      </template>
      <div
        v-if="!getRenderSlot(slotName)"
        :class="prefixCls + '-empty-item'">
        组件没有传入
      </div>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'layout-module-config'
const LINE = '1px solid #e0e0e8'

import { valideSlotList } from '../../../util/layout-module-config'
import _cloneDeep from 'lodash/cloneDeep'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import _flattenDeep from 'lodash/flattenDeep'
import _intersection from 'lodash/intersection'
import _difference from 'lodash/difference'
import _isArray from 'lodash/isArray'
import { typeOf } from '../../../util/assist'
import Render from './../../base/render'

export default {
  name: prefixCls,
  components: {
    Render
  },
  props: {
    // 宽度的使用形式 等分 equalDivision 自定义比例 customScale
    widthType: {
      type: String,
      default: 'equalDivision'
    },
    // 自定义时的定义的每一列的宽度集合
    cloWidthList: {
      type: Array,
      default: () => []
    },
    // 每一项最小宽度
    itemMinWidth: {
      type: Number,
      default: 218
    },
    // 适应区域的宽度 设置为0，继承父级的宽度（不设置width属性）
    width: {
      type: Number,
      default: 0
    },
    // 适应区域的高度
    height: {
      type: Number,
      default: 477
    },
    // 插槽顺序配置，唯一id
    slotList: {
      require: true,
      type: Array,
      default: () => [],
      validator: function (list) {
        const { pass, msg } = valideSlotList(list)
        if (!pass) {
          console.error('无效的属性 slotList :' + msg)
        }
        return pass
      }
    },
    // 根据配置的id，获取到的render函数列表
    slotRenders: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      prefixCls,
      currentSlots: [],
      flattenSlots: []
    }
  },
  computed: {
    // 最小宽度
    minWidth() {
      return this.currentSlots.length * +this.itemMinWidth
    },
    // wrap样式
    wrapStyle() {
      const { width, height, widthType, currentSlots, cloWidthList } = this

      let templateColumns = ''
      // 等分
      if (widthType === 'equalDivision') {
        templateColumns = `repeat(${currentSlots.length}, ${100 / currentSlots.length}%)`
      }
      // 使用自定义比例
      if (widthType === 'customScale') {
        templateColumns = cloWidthList.map(val => `${val}%`).join(' ')
      }

      const styleObj = {
        'grid-template-columns': templateColumns,
        'grid-template-rows': `repeat(2, ${height / 2}px)`
      }
      if (+width > 0) {
        styleObj.width = width + 'px'
      }

      return styleObj
    }
  },
  watch: {
    // 监测变化复制，隔离外部
    slotList: {
      deep: true,
      immediate: true,
      handler(newSlots, oldSlots) {
        if (_isEmpty(newSlots) || !_isArray(newSlots) || _isEqual(newSlots, oldSlots)) {
          return
        }
        let flattenSlots = []
        const oldList = _flattenDeep(oldSlots)
        const newList = _flattenDeep(newSlots)
        // 一样的，拿到没有变化的列，放到最前面
        const intersection = _intersection(oldList, newList)
        // 将新增的列在放到后面
        const difference = _difference(newList, intersection)
        // 合并后v-for只渲染新增的
        flattenSlots = intersection.concat(difference)

        this.currentSlots = _cloneDeep(newSlots)
        this.flattenSlots = flattenSlots
      }
    }
  },
  methods: {
    // 每一个格子的样式
    getItemStyle(slotName) {
      // 位置
      let columnStart = 0
      let rowStart = 0
      let rowEnd = 0
      // 边框线
      let borderBottom = ''
      let borderRight = ''
      for (let col = 0; col < this.currentSlots.length; col++) {
        const rows = this.currentSlots[col]
        const isOnRow = rows.length === 1

        for (let row = 0; row < rows.length; row++) {
          const name = rows[row]
          if (name === slotName) {
            columnStart = col + 1
            rowStart = row + 1
            rowEnd = isOnRow ? rowStart + 2 : rowStart
            if (!isOnRow && row === 0) {
              borderBottom = LINE
            }
            if (col < this.currentSlots.length - 1) {
              borderRight = LINE
            }
            break
          }
        }
      }

      return {
        'border-bottom': borderBottom,
        'border-right': borderRight,
        'min-width': this.itemMinWidth + 'px',
        'grid-column-start': columnStart,
        'grid-row-start': rowStart,
        'grid-row-end': rowEnd
      }
    },
    // 配置的可以渲染的插槽的熏染行数(插槽和渲染函数混合用，渲染函数覆盖插槽)
    getRenderSlot(slotName) {
      let arr = []
      // render function
      for (const slotName in this.slotRenders) {
        const renderFunc = this.slotRenders[slotName]
        if (typeOf(renderFunc) === 'function') {
          arr.push({ slotName, type: 'function', render: renderFunc })
        }
      }

      // slot
      for (const slotName in this.$slots) {
        const slots = this.$slots[slotName]
        const slotVNode = slots[0]
        if (!_isEmpty(slotVNode)) {
          arr.push({ slotName, type: 'slot', slotVNode })
        }
      }

      return arr.find(val => slotName === val.slotName)
    }
  }
}
</script>
