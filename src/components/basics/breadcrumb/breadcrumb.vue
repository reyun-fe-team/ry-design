<!--
 * @Author: yangyufeng
 * @Date: 2022-04-11 10:56:06
 * @LastEditTime: 2022-04-11 15:42:19
 * @LastEditors: Please set LastEditors
 * @Description: 面包屑导航组件
 * @FilePath: /ry-design/src/components/basics/breadcrumb/breadcrumb.vue
-->
<template>
  <div :class="classes">
    <Breadcrumb :separator="separator">
      <BreadcrumbItem
        v-for="(item, index) in breadcrumbItems"
        :key="index"
        :to="item.to"
        :replace="item.replace"
        :target="item.target"
        :append="item.append">
        {{ item.name }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'breadcrumb'
export default {
  name: prefixCls,
  props: {
    separator: {
      type: String,
      default: '/'
    },
    // [{ to replace target append name }]
    data: {
      required: true,
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    // 类名class集合
    classes() {
      const classList = [`${prefixCls}`]
      return classList
    },
    breadcrumbItems() {
      const { data } = this
      const arr = []
      const keys = ['to', 'replace', 'target', 'append', 'name']
      for (let index = 0; index < data.length; index++) {
        const ele = data[index]
        const obj = {}
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i]
          if (ele[k] !== undefined) {
            obj[k] = ele[k]
          }
        }
        arr.push(obj)
      }
      return arr
    }
  }
}
</script>