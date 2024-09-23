// 格式化日期为 YYYY-MM-DD
export const formatDate = (date, format = 'yyyy-MM-dd') => {
  const year = date.getFullYear()
  // 月份从0开始，所以+1
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 替换格式中的标记
  format = format.replace(/YYYY|yyyy/g, year)
  format = format.replace(/MM/g, month)
  format = format.replace(/DD|mm/g, day)
  format = format.replace(/HH|hh/g, hours)
  format = format.replace(/mm/g, minutes)
  format = format.replace(/SS|ss/g, seconds)

  return format
}

const date = {
  getMoment(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD'
    return !value ? '-' : formatDate(value, formatString)
  },
  getYearStr(AddYearCount) {
    let dd = new Date()
    dd.setYear(dd.getFullYear() + AddYearCount) // 获取AddMonthCount月后的日期
    let y = dd.getFullYear()
    let nowMonth = dd.getMonth() + 1 // 获取当前月份的日期
    let strDate = dd.getDate()
    // 判断 月
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = '0' + nowMonth
    }
    // 判断 日
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    return y + '-' + nowMonth + '-' + strDate
  }
}

export default date
