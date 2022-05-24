<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-22 16:50:21
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-24 18:33:32
 * @FilePath: /ry-design/src/components/basics/layout-module-config/layout-module-config.vue
 * @Description: 极速创建第一步模块布局组件
-->
<template>
  <div :class="[prefixCls]">
    <div v-for="row in slotList"
         :key="getKey(row)"
         :class="prefixCls + '-row'">
      <div :class="prefixCls + '-col'"
           v-for="col in row"
           :key="getKey(col)">
        <Render :render="renderSlots[col]"></Render>
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
    // 插槽顺序配置，唯一id
    slotList: {
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
    getKey
  },
  computed: {
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