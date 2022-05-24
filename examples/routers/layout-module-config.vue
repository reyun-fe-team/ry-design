<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-22 16:49:35
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-24 17:48:13
 * @FilePath: /ry-design/examples/routers/layout-module-config.vue
 * @Description: layout-module-config 组件示例
-->
<template>
  <div>
    <p>我是layout-module-config 组件示例</p>
    <rd-layout-module-config :slotList="slotList"
                             :slotRenders="slotRenders">
      <template #a>a</template>
      <template #b>b</template>
      <template #c>c</template>
    </rd-layout-module-config>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      slotList: [['a'], ['b', 'c'], ['d']]
    }
  },
  computed: {
    slotRenders() {
      return {
        d: h => {
          return h('div', 'd')
        }
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
