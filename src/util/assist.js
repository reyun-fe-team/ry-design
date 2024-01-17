// 是否为前端浏览器环境
export const isClient = typeof window !== 'undefined'

// 类型判断
export function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

// 深度克隆
export function deepCopy(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

// 根据组件名称向上查找
export function findComponentUpward(context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.name
    }
  }
  return parent
}

// 根据组件名称向下查找
export function findComponentDownward(context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) {
          break
        }
      }
    }
  }
  return children
}

// 根据组件名称向下查找 多个
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child)
    }
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// 根据组件名称向上查找 多个
export function findComponentsUpward(context, componentName) {
  let parents = []
  const parent = context.$parent
  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent)
    }
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// 数组是否有重复的值
export function isArrRepeat(arr) {
  let hash = {}
  for (let i in arr) {
    if (hash[arr[i]]) {
      return true
    }
    hash[arr[i]] = true
  }
  return false
}

// 获取唯一ID
export function getKey() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0
    let v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 中英文计算字数
export function count({ value, type, isDifferWord }) {
  let len = 0
  // 输入内容不区分中英文，直接返回value的长度
  if (!isDifferWord) {
    len = value.length
    return len
  }
  // 区分中英文
  // type === 'en', 返回当前输入的字节数 （按英文展示输入数量）
  // type === 'cn', 如果字节数为奇数，则字节数加1（按中文展示输入数量）
  value &&
    value.split('').forEach(item => {
      const charCode = item.charCodeAt()
      if (charCode >= 0 && charCode <= 128) {
        len++
      } else {
        len += 2
      }
    })
  // 按英文展示输入数量
  if (type === 'en') {
    return len
  }
  // 按中文展示输入数量时
  if (type === 'cn') {
    // 如果字节数为奇数，则字节数加1
    if (len % 2 > 0) {
      len++
    }
    len = len / 2
  }
  return len
}

// 转成驼峰命名
export function camelCase(name) {
  // eslint-disable-next-line no-useless-escape
  const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
  const MOZ_HACK_REGEXP = /^moz([A-Z])/

  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

// 判断参数是否是其中之一
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

// 获取元素的样式属性
export function getStyle(element, styleName) {
  if (!isClient) {
    return
  }
  if (!element || !styleName) {
    return null
  }
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

// 去除字符串首尾 2 端的空字符
export function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

// 判断元素是否存在对应 class 类名
export function hasClass(el, cls) {
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

// 给元素添加对应 class 类名
export function addClass(el, cls) {
  if (!el) {
    return
  }
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

// 给元素去除对应 class 类名
export function removeClass(el, cls) {
  if (!el || !cls) {
    return
  }
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

// 获取是否为空元素
export function isEmptyElement(c) {
  return !(c.tag || (c.text && c.text.trim() !== ''))
}

// 过滤空元素
export function filterEmpty() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []

  return children.filter(function (c) {
    return !isEmptyElement(c)
  })
}

// 缓动函数
export function easeInOutQuad(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

// 获取唯一标识
export function genID(length = 4) {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  const getRandomArrayElements = (arr, count) => {
    // eslint-disable-next-line
    let shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(min)
  }
  let s = ''
  for (let index = 0; index < 10; index++) {
    s += S4()
  }
  if (length > s.length) {
    length = s.length
  }
  let gen = getRandomArrayElements(s.split(''), length).join('')
  return gen
}

// 保存当前光标的选区
export function saveSelection() {
  if (!isClient) {
    return
  }

  if (window.getSelection) {
    const selection = window.getSelection()
    if (selection.getRangeAt && selection.rangeCount) {
      return selection.getRangeAt(0)
    }
  }
  return null
}

// 恢复保存的光标的选区
export function restoreSelection(range) {
  if (!isClient) {
    return
  }

  if (range) {
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

// 在input, textarea 元素当前的光标位置添加一段文本
export function insertInputTextAtCursor(input, textToInsert = '', callback) {
  if (!isClient) {
    return
  }

  const isDomElement = input instanceof Element || input instanceof HTMLDocument
  const isInputOrTextarea = isDomElement && ['INPUT', 'TEXTAREA'].includes(input.tagName)
  if (!isInputOrTextarea || textToInsert.length < 1) {
    return
  }

  const selectionStart = input.selectionStart
  const selectionEnd = input.selectionEnd
  const inputValue = input.value
  const before = inputValue.substring(0, selectionStart)
  const after = inputValue.substring(selectionEnd)

  input.value = before + textToInsert + after
  callback && callback(input.value)

  // 使用 requestAnimationFrame 确保在下一帧渲染前执行
  window.requestAnimationFrame(() => {
    // 重新设置光标位置（将光标移动到插入文字的末尾）
    const position = selectionStart + textToInsert.length
    input.setSelectionRange(position, position)
  })
}
