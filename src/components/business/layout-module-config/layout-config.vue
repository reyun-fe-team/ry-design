<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-22 16:50:21
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-26 15:13:10
 * @FilePath: /ry-design/src/components/basics/layout-module-config/layout-module-config.vue
 * @Description: 极速创建第一步模块布局组件
-->
<template>
  <div
    :class="[prefixCls]"
    :style="wrapStyle">
    <div
      v-for="(row, rowIndex) in slotList"
      :key="getKey(row)"
      :class="[prefixCls + '-row', { [prefixCls + '-row-line']: rowIndex !== slotList.length - 1 }]"
      :style="getRowStyle(rowIndex)">
      <div
        v-for="(col, colIndex) in row"
        :key="getKey(col)"
        :class="[prefixCls + '-col', { [prefixCls + '-col-line']: colIndex !== row.length - 1 }]"
        :style="getColStyle(row.length)">
        <template v-if="col in renderSlots">
          <Render :render="renderSlots[col]"></Render>
        </template>
        <div
          v-else
          :class="prefixCls + '-empty-item'">
          组件没有传入
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'layout-module-config'
const margin = 1

import { valideSlotList } from '../../../util/layout-module-config'
import { getKey } from '../../../util/assist'
import Render from './../../base/render'

export default {
  name: prefixCls,
  components: {
    Render
  },
  props: {
    // 是否使用自定义的每一列宽度
    cloWidthList: {
      type: Array,
      default: () => []
    },
    // 每一项最小宽度
    itemMinWidth: {
      type: Number,
      default: 288
    },
    // 适应区域的宽度 设置为0，继承父级的宽度（不设置width属性）
    width: {
      type: Number,
      default: 0
    },
    // 适应区域的高度
    height: {
      type: Number,
      default: 480
    },
    // 插槽顺序配置，唯一id
    slotList: {
      require: true,
      type: Array,
      default: () => [],
      validator: function (list) {
        const { pass, msg } = valideSlotList(list)
        if (!pass) {
          console.error(`slotList：${msg}`)
        }
        return pass
      }
    },
    // 根据配置的id，获取到的render函数列表
    slotRenders: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    // 最小宽度
    minWidth() {
      const counts = this.slotList.length
      return counts * +this.itemMinWidth
    },
    // 每一项的宽度
    itemWidth() {
      const { minWidth, width, slotList } = this
      // 一共几个列数
      const counts = slotList.length
      // 需要增加的 margin-right:1px 的个数
      const marginRights = (counts - 1) * margin
      let iw = ''
      if (+width > 0) {
        // 最小宽度设置
        let newWidth = +width < +minWidth ? +minWidth : +width
        newWidth -= marginRights
        iw = newWidth / counts + 'px'
      } else {
        iw = 100 / counts + '%'
      }
      return iw
    },
    // wrap样式
    wrapStyle() {
      const { width } = this
      const styleObj = {}
      if (+width > 0) {
        styleObj.width = width + 'px'
      }
      return styleObj
    },
    // 配置的可以渲染的插槽的熏染行数(插槽和渲染函数混合用，渲染函数覆盖插槽)
    renderSlots() {
      const { slotRenders = {}, $scopedSlots } = this
      const obj = Object.assign({}, $scopedSlots, slotRenders)
      // 过滤出是函数的值
      let newObj = {}
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const func = obj[key]
          if (typeof func === 'function') {
            newObj[key] = func
          }
        }
      }
      return newObj
    }
  },
  methods: {
    // 获取key值
    getKey,
    // 获取行的样式
    getColStyle(closNum) {
      const { height } = this
      // 需要增加的 margin-bottom:1px 的个数
      const marginBottoms = (closNum - 1) * margin
      const newHeight = +height - marginBottoms
      const itemHeight = newHeight / closNum + 'px'
      const obj = { height: itemHeight }
      return obj
    },
    // 每一行的样式
    getRowStyle(rowIndex) {
      const { itemWidth, itemMinWidth, cloWidthList } = this
      const inputWidth = cloWidthList[rowIndex]
      let width = itemWidth
      if (inputWidth) {
        width = inputWidth + '%'
      }
      const obj = { width, minWidth: itemMinWidth + 'px' }
      return obj
    }
  }
}
</script>