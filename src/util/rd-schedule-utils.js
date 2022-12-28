const hour = 24

const createTimeList = colspan => {
  let arr = []
  Array.from({ length: hour }).forEach((e, index) => {
    let i = String(index).padStart(2, '0')
    let next = String(index + 1).padStart(2, '0')
    if (colspan === 2) {
      arr.push(`${i}:00~${i}:30`)
      arr.push(`${i}:30~${next}:00`)
    } else {
      arr.push(`${i}:00~${next}:00`)
    }
  })
  return arr
}

const children = (ret, row, colspan) => {
  //   const timeList = [24 | 48]
  // 1. timeList.item = 00:00~00:30
  // 2. timeList.item = 00:00~01:00
  const timeList = createTimeList(colspan)
  return createArr(colspan * hour).map((t, col) => {
    return {
      week: ret,
      check: false,
      value: timeList[col],
      begin: timeList[col].split('~')[0],
      end: timeList[col].split('~')[1],
      row,
      col
    }
  })
}
export const createArr = len => {
  return Array.from(Array(len)).map((ret, id) => id)
}

export const createWeekData = (weekList, colspan) => {
  return weekList.map((ret, index) => {
    return {
      value: ret,
      row: index,
      child: children(ret, index, colspan)
    }
  })
}
export const createSheetStates = (value, colspan) => {
  return value ? value : ''.padStart(colspan * 7 * hour, '0')
}

export const splicing = list => {
  let same
  let i = -1
  const len = list.length
  const arr = []

  if (!len) {
    return
  }
  while (++i < len) {
    const item = list[i]
    if (item.check) {
      if (item.check !== Boolean(same)) {
        arr.push(...['、', item.begin, '~', item.end])
      } else if (arr.length) {
        arr.pop()
        arr.push(item.end)
      }
    }
    same = Boolean(item.check)
  }
  arr.shift()
  return arr.join('')
}

export const throttle = (fn, delay) => {
  let valid = true
  return function () {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay)
  }
}
