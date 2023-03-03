import moment from 'moment/moment'

let util = {
  $_moment(value, formatString = 'YYYY-MM-DD') {
    return !value ? '-' : moment(value).format(formatString)
  },
  $_GetYearStr(AddYearCount) {
    var dd = new Date()
    dd.setYear(dd.getFullYear() + AddYearCount) // 获取AddMonthCount月后的日期
    var y = dd.getFullYear()
    var nowMonth = dd.getMonth() + 1 // 获取当前月份的日期
    var strDate = dd.getDate()
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
export default util
