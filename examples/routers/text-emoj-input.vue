<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:34:14
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2022-12-21 15:29:42
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
      is-edit
      style="width: 500px"
      :transform-html2-text="transformHtml2Text"
      :transform-text2-html="transformText2Html"></rd-text-emoj-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '我是表情文字[酷]，现在很酷⇨表情文字[酷]，现在很酷⇨表情文字[酷]，现在很酷⇨',
      faceIcon: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xz4zmu9vi5c26a.png',
      enterIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAEFCu8CAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABkvfSiAAADe0lEQVRIDd1WTUhUURS+Z/50dMJaZKEVVBq1amFBq4SiFrWoqHScH8RgxlwUSLqsBqxNBAYVlgMyOPN0XARBormJQqLAgmgjNeIi0CQKLadRZ+bN7dw3c17je+OM5kZ6oOfc737fPXfuOe+8y1i+p97lbTcIQr3Tw9NEfl2xf4E0rP/vaGw+qkcJAXLsTs8z8ovNlRcDAd8ijXVWRDUJVBce2PxAyK+uqlMKQJnFeE/RNwqAM/g0IHW3CT/nQ2GUM9AywGzcLbD0Abk8EbvT+5lIPCFPCt/kcjUfTPBUFcdotFxZKViIyJqarmzNVqoT/+qoh8A5B7vLm8q3EDAYDkvdp/Jxcs7hOXbR79EdD0Ydrnd6P+ZSGk3GEOFKLsUAyfOYDxtuWeRporW11To7W6bUXILP1CST8ij+wYHqyiLBV4VmYLUJzt4LEDjwzs7OBeFnntdodbujScX6fD5Tg/vysWXghhioeWxwehuxfC5od8UBogaAvv7gY/UVEhxViGl4iSdaqxVmj02suEyS7v/Kxgr6WK9fKPkFyVqCEDrcHrvA8+dGq8SxzJlbJ3S720oLbwemlwkdl1r2xFM/ozmCKBD1L6uppF0AyqlinZ7EOh0hUUW5rUT4olaXLNM2HmO38cS9AGw0HPIrDVCpVQQGRW3TM/0tGkv7uIFE2gOAG+FQdwdx/ubR6ZlB7TYxMSAV6HLIUU81LPm3M4AxWnHNtsHtvbZm0X8pUJNBv0707YXE0gymWz1vmluNxc77HTPVsX9vxQNsQrourQtIi4rAi0aDLmhRMqHTxJm8KSWnjjAOx1HvztrsyPkzJ07X1dXJtK5OTBPrsU6n57AM8FYJDGyu1LJlV0/PHWz2WWW6ngBarST5x/BFOqvgnG2OxefuEkf9ahCgteJjMD7x9Sp21Q/9wUcvtPMrjq38DfudmeVsJ/FWDJgpnqHxyNQhQcYvdQTNPhIWsqkYu6VyDLyffF1AR2NLTUqWh2LxxXIircWKLogFJGH+dmR0N8NBf5DWUItG3HOSjI8h0UyT67Gig1oMlnO9vQ9/ZK+jBhRguh2zJ+LqkE1K+7AAwN/pcUQ4RDmwKQOHV0Vm62AgcG8uJw/BZQGJJD4ecjw5gpe6KsLwhY7gVWrVOSSd1upebEHo6+maxAtutcVQZsPyfq6IgGffdbTrbNzxHxfUNnVHIFh5AAAAAElFTkSuQmCC'
    }
  },
  methods: {
    transformHtml2Text(html) {
      // 过滤 😭 符号
      // let emoji1 = /[^\x00-\xff]/g;
      const face = this.getFaceHtml(this.faceIcon)
      let enter = this.getFaceHtml(this.enterIcon)
      enter += '<br>'
      const text1 = '[酷]'
      const text2 = '⇨'
      html = html.replaceAll(face, text1)
      html = html.replaceAll(enter, text2)
      return html
    },
    transformText2Html(text) {
      const face = this.getFaceHtml(this.faceIcon)
      let enter = this.getFaceHtml(this.enterIcon)
      enter += '<br>'
      const text1 = '[酷]'
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
<style
  lang="less"
  scoped>
/deep/ .rd-text-emoj-input-rich {
  font-size: 20px;
}
</style>
