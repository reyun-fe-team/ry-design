<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:34:14
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-24 16:50:12
 * @FilePath: /ry-design/examples/routers/text-emoj-input.vue
 * @Description: 文本-表情输入组件-示例
-->
<template>
  <div style="matgin: 20px">
    <Button @click="insertFace">添加表情</Button>
    <rd-text-emoj-input
      ref="emojInput"
      v-model="value"></rd-text-emoj-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '111'
    }
  },
  methods: {
    insertFace() {
      const html =
        '<img type="face" src="https://fc1tn.baidu.com/it/u=374192452,302848637&fm=202&mola=new&crop=v1" width="20" height="20" /><br/><img type="face" src="https://fc1tn.baidu.com/it/u=374192452,302848637&fm=202&mola=new&crop=v1" width="20" height="20" />'
      this.$refs.emojInput.insertHtmlMark(html)
    }
  }
}
</script>