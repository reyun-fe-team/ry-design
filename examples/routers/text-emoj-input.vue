<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:34:14
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-27 17:24:23
 * @FilePath: /ry-design/examples/routers/text-emoj-input.vue
 * @Description: 文本-表情输入组件-示例
-->
<template>
  <div style="matgin: 20px">
    <p style="margin-bottom: 20px">
      <Button @click="insertFace">添加表情</Button>
      <Button @click="enter">换行</Button>
    </p>
    <rd-text-emoj-input
      ref="emojInput"
      v-model="value"
      style="width: 500px"
      :transform-html2-text="transformHtml2Text"
      :transform-text2-html="transformText2Html"></rd-text-emoj-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: `我是表情文字[苦]，现在很苦⇨
      表情文字[苦]，现在很苦⇨
      表情文字[苦]，现在很苦⇨
      `,
      faceIcon:
        'https://t8.baidu.com/it/u=2183276516,2712334297&fm=218&app=137&size=f242,150&n=0&f=JPEG&fmt=auto?s=79A635724D815A470ECA58740200F073&sec=1656435600&t=dac685add7d05c99c8eda9e4f97dac97',
      enterIcon:
        'https://img1.baidu.com/it/u=829518426,736216214&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1656435600&t=34bdab2bb54dbf32282647f195560aba'
    }
  },
  methods: {
    transformHtml2Text(html) {
      // 过滤 😭 符号
      // let emoji1 = /[^\x00-\xff]/g;
      const face = this.getFaceHtml(this.faceIcon)
      let enter = this.getFaceHtml(this.enterIcon)
      enter += '<br>'
      const text1 = '[苦]'
      const text2 = '⇨'
      html = html.replaceAll(face, text1)
      html = html.replaceAll(enter, text2)
      return html
    },
    transformText2Html(text) {
      const face = this.getFaceHtml(this.faceIcon)
      let enter = this.getFaceHtml(this.enterIcon)
      enter += '<br>'
      const text1 = '[苦]'
      const text2 = '⇨'
      text = text.replaceAll(text1, face)
      text = text.replaceAll(text2, enter)

      return text
    },
    getFaceHtml(icon) {
      const str = `<img src="${icon}" draggable="false" width="20" height="20">`
      return str
    },
    enter() {
      let html = this.getFaceHtml(this.enterIcon)
      html += '<div><br></div>'
      this.$refs.emojInput.insertHtmlMark(html)
    },
    insertFace() {
      let html = this.getFaceHtml(this.faceIcon)
      this.$refs.emojInput.insertHtmlMark(html)
    }
  }
}
</script>