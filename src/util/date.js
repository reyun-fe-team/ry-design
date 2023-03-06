import moment from 'moment'

const date = {
  getMoment(value, formatString = 'YYYY-MM-DD') {
    return !value ? '-' : moment(value).format(formatString)
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
