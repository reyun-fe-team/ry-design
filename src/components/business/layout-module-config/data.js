/*
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-24 17:51:28
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-24 18:07:48
 * @FilePath: /ry-design/src/components/business/layout-module-config/data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 数组是否有重复的值
export const isArrRepeat = arr => {
  let hash = {}
  for (let i in arr) {
    if (hash[arr[i]]) {
      return true
    }
    hash[arr[i]] = true
  }
  return false
}

// 校验 prop slotList
export const valideSlotList = (list) => {
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
    return !val || typeof val !== 'string'
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

// 唯一key v-for
export const getKey = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  })
}