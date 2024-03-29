/*
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-24 17:51:28
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-26 18:01:37
 * @FilePath: /ry-design/src/components/business/layout-module-config/data.js
 * @Description: 组件layout-module-config的一些工具
 */
import { isArrRepeat, typeOf } from './assist'
// 校验 prop slotList
export const valideSlotList = list => {
  // 数组并且必须有值
  if (!Array.isArray(list) || !list.length) {
    return { pass: false, msg: '数组并且必须有值' }
  }

  // 每一项也是数组且必须有值
  const hasNotArr = list.some(arr => {
    return !Array.isArray(arr) || !arr.length
  })
  if (hasNotArr) {
    return { pass: false, msg: '数组每一项也是数组且必须有值' }
  }

  // 第二层的结构每一项必须是字符串且有值
  let allData = []
  list.forEach(arr => (allData = allData.concat(arr)))
  const hasNotString = allData.some(val => {
    return !val || typeOf(val) !== 'string'
  })
  if (hasNotString) {
    return { pass: false, msg: '第二层的结构每一项必须是字符串且有值' }
  }

  // 不能有重复的id
  const repeat = isArrRepeat(allData)
  if (repeat) {
    return { pass: false, msg: '不能有重复的id' }
  }

  return { pass: true, msg: '' }
}
