<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-22 16:50:21
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-25 19:03:08
 * @FilePath: /ry-design/src/components/basics/layout-module-config/layout-module-config.vue
 * @Description: 极速创建第一步模块布局组件
-->
<template>
  <div :class="[prefixCls]"
       :style="wrapStyle">
    <div v-for="(row, rowIndex) in slotList"
         :key="getKey(row)"
         :class="[prefixCls + '-row', {[prefixCls + '-row-line']: rowIndex !== slotList.length - 1 }]"
         :style="getRowStyle(row.length)">
      <div v-for="(col, colIndex) in row"
           :key="getKey(col)"
           :class="[prefixCls + '-col', {[prefixCls + '-col-line']: colIndex !== row.length - 1 }]"
           :style="getColStyle(row.length)">
        <template v-if="col in renderSlots">
          <Render :render="renderSlots[col]"></Render>
        </template>
        <div v-else
             :class="prefixCls + '-empty-item'">组件没有传入</div>
      </div>
    </div>
  </div>
</template>
<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'layout-module-config'

import { valideSlotList, getKey } from './data'
import Render from './../../base/render'

export default {
  name: prefixCls,
  components: {
    Render
  },
  data() {
    return {
      prefixCls
    }
  },
  props: {
    // 最小宽度
    minWidth: {
      type: [String, Number],
      default: 1152
    },
    // 适应区域的宽度 设置为0，有内容撑开
    width: {
      type: [String, Number],
      default: 0
    },
    // 适应区域的高度
    height: {
      type: [String, Number],
      default: 480
    },
    // 插槽顺序配置，唯一id
    slotList: {
      require: true,
      type: Array,
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
  methods: {
    // 获取key值
    getKey,
    // 获取行的样式
    getColStyle(closNum) {
      const { height } = this
      const itemHeight = +height / closNum + 'px'
      const obj = { height: itemHeight }
      return obj
    },
    // 每一行的样式
    getRowStyle(closNum) {
      const { itemWidth } = this
      const obj = { width: itemWidth }
      return obj
    }
  },
  computed: {
    // 每一项的宽度
    itemWidth() {
      const { minWidth, width, slotList } = this
      // 一共几个列数
      const counts = slotList.length
      let iw = ''
      if (width) {
        // 最小宽度设置
        const newWidth = +width < +minWidth ? +minWidth : +width
        iw = newWidth / counts + 'px'
      } else {
        iw = 100 / counts + '%'
      }
      return iw
    },
    // wrap样式
    wrapStyle() {
      const { minWidth, width } = this
      const obj = { minWidth: minWidth + 'px' }
      if (width) {
        obj['width'] = width + 'px'
      }
      return obj
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
  }
}
</script>