/*
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-16 13:40:18
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-16 13:44:28
 * @FilePath: /ry-design/src/util/text-emoj-input.js
 * @Description: text-emoj-input 组件用到的工具方法
 */
// 转义符换成普通字符
const convertIdeogramToNormalCharacter = (val = '') => {
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
  return val.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
    return arrEntities[t]
  })
}

// 获取富文本的纯文字内容
export const getPlainText = (richCont = '') => {
  let value = richCont
  if (richCont) {
    // 去掉空格
    value = value.replace(/\s*/g, '')
    // 去掉所有的html标记
    value = value.replace(/<[^>]+>/g, '')
    // 去掉所有的↵符号
    value = value.replace(/↵/g, '')
    // 去掉回车换行
    value = value.replace(/[\r\n]/g, '')
    // 去掉空格
    value = value.replace(/&nbsp;/g, '')
    // 转义符换成普通字符
    value = convertIdeogramToNormalCharacter(value)

    // value = value.replace(/(\n)/g, '')
    // value = value.replace(/(\t)/g, '')
    // value = value.replace(/(\r)/g, '')
    // value = value.replace(/<\/?[^>]*>/g, '')
    // value = value.replace(/\s*/g, '')
    // value = convertIdeogramToNormalCharacter(value)

    return value
  }
  return ''
}
