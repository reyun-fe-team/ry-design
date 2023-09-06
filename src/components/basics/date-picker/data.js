export const shortcutsList = [
  '0day',
  '-1day',
  '-7day',
  '-30day',
  '0week',
  '-1week',
  '0month',
  '-1month'
]

export const getShortcutsOptionsList = (start, self) => [
  {
    id: '-1day',
    text: '昨天',
    value() {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return [date, date]
    }
  },
  {
    id: '0day',
    text: '今天',
    value() {
      return [new Date(), new Date()]
    }
  },
  {
    id: '-1week',
    text: '上周',
    value() {
      // 获取当前时间
      var currentDate = new Date()
      // 返回date是一周中的某一天
      var week = currentDate.getDay()
      // 一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24
      // 减去的天数
      var minusDay = week !== 0 ? week - 1 : 6
      // 获得当前周的第一天
      var currentWeekDayOne = new Date(currentDate.getTime() - millisecond * minusDay)
      // 上周最后一天即本周开始的前一天
      var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond)
      // 上周的第一天
      var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - millisecond * 6)
      return [priorWeekFirstDay, priorWeekLastDay]
    }
  },
  {
    id: '0week',
    text: '本周',
    value() {
      // 获取当前时间
      var currentDate = new Date()
      // 返回date是一周中的某一天
      var week = currentDate.getDay()
      // 一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24
      // 减去的天数
      var minusDay = week !== 0 ? week - 1 : 6
      // 本周 周一
      var monday = new Date(currentDate.getTime() - minusDay * millisecond)
      // 本周 周日
      var sunday = new Date(monday.getTime() + minusDay * millisecond)
      return [monday, sunday]
    }
  },
  {
    id: '-1month',
    text: '上月',
    value() {
      // 获取当前时间
      var currentDate = new Date()
      // 获得当前月份0-11
      var currentMonth = currentDate.getMonth()
      // 获得当前年份4位年
      var currentYear = currentDate.getFullYear()
      // 获得上一个月的第一天
      var priorMonthFirstDay = self.getPriorMonthFirstDay(currentYear, currentMonth)
      // 获得上一月的最后一天
      var priorMonthLastDay = new Date(
        priorMonthFirstDay.getFullYear(),
        priorMonthFirstDay.getMonth(),
        self.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth())
      )
      // 返回
      return [priorMonthFirstDay, priorMonthLastDay]
    }
  },
  {
    id: '0month',
    text: '本月',
    value() {
      // 起止日期数组
      // 获取当前时间
      var currentDate = new Date()
      // 获得当前月份0-11
      var currentMonth = currentDate.getMonth()
      // 获得当前年份4位年
      var currentYear = currentDate.getFullYear()
      // 求出本月第一天
      var firstDay = new Date(currentYear, currentMonth, 1)
      return [firstDay, new Date()]
    }
  },
  {
    id: '-1quarter',
    text: '上季度',
    value() {
      // 起止日期数组
      // 获取当前时间
      var currentDate = new Date()
      // 获得当前月份0-11
      var currentMonth = currentDate.getMonth()
      // 获得当前年份4位年
      var currentYear = currentDate.getFullYear()
      // 获得本月对应的季度
      var quarterSeasonStartMonth = self.getQuarterSeasonStartMonth(currentMonth)
      // 上季度的第一天
      var priorSeasonFirstDay = self.getPriorSeasonFirstDay(currentYear, quarterSeasonStartMonth)
      // 上季度的最后一天
      var priorSeasonLastDay = new Date(
        priorSeasonFirstDay.getFullYear(),
        priorSeasonFirstDay.getMonth() + 2,
        self.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2)
      )
      return [priorSeasonFirstDay, priorSeasonLastDay]
    }
  },
  {
    id: '0quarter',
    text: '本季度',
    value() {
      // 起止日期数组
      // 获取当前时间
      var currentDate = new Date()
      // 获得当前月份0-11
      var currentMonth = currentDate.getMonth()
      // 获得当前年份4位年
      var currentYear = currentDate.getFullYear()
      // 获得本季度开始月份
      var quarterSeasonStartMonth = self.getQuarterSeasonStartMonth(currentMonth)

      // 获得本季度开始的日期
      var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1)
      // 添加至数组
      return [quarterSeasonStartDate, new Date()]
    }
  },
  {
    id: '-1year',
    text: '去年',
    value() {
      // 获取当前时间
      var currentDate = new Date()
      // 获得当前年份4位年
      var currentYear = currentDate.getFullYear()
      currentYear--
      var priorYearFirstDay = new Date(currentYear, 0, 1)
      var priorYearLastDay = new Date(currentYear, 11, 31)
      return [priorYearFirstDay, priorYearLastDay]
    }
  },
  {
    id: '0year',
    text: '今年',
    value() {
      // 获取当前时间
      var currentDate = new Date()
      // 获得当前年份4位年
      var currentYear = currentDate.getFullYear()
      // 本年第一天
      var currentYearFirstDate = new Date(currentYear, 0, 1)
      // 添加至数组
      return [currentYearFirstDate, new Date()]
    }
  },
  {
    id: '-3day',
    text: '过去3天',
    value() {
      let date1 = new Date()
      date1.setTime(date1.getTime() - 2 * 3600 * 1000 * 24)
      if (start && new Date(start) > date1) {
        date1 = new Date(new Date(start).getTime() + 3600 * 1000 * 24)
      }
      const date = new Date()
      return [date1, date]
    }
  },
  {
    id: '-7day',
    text: '过去7天',
    value() {
      let date1 = new Date()
      date1.setTime(date1.getTime() - 6 * 3600 * 1000 * 24)
      if (start && new Date(start) > date1) {
        date1 = new Date(new Date(start).getTime() + 3600 * 1000 * 24)
      }
      const date = new Date()
      return [date1, date]
    }
  },
  {
    id: '-14day',
    text: '过去14天',
    value() {
      let date1 = new Date()
      date1.setTime(date1.getTime() - 13 * 3600 * 1000 * 24)
      if (start && new Date(start) > date1) {
        date1 = new Date(new Date(start).getTime() + 3600 * 1000 * 24)
      }
      const date = new Date()
      return [date1, date]
    }
  },
  {
    id: '-30day',
    text: '过去30天',
    value() {
      const date = new Date()
      let date1 = new Date()
      date1.setTime(date1.getTime() - 29 * 3600 * 1000 * 24)
      if (start && new Date(start) > date1) {
        date1 = new Date(new Date(start).getTime() + 3600 * 1000 * 24)
      }
      return [date1, date]
    }
  },
  {
    id: '-93day',
    text: '过去93天',
    value() {
      const date = new Date()
      let date1 = new Date()
      date1.setTime(date1.getTime() - 92 * 3600 * 1000 * 24)
      if (start && new Date(start) > date1) {
        date1 = new Date(new Date(start).getTime() + 3600 * 1000 * 24)
      }
      return [date1, date]
    }
  }
]
