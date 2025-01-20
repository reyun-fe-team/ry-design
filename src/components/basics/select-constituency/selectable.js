export function objectAssignSimple(target) {
  if (arguments.length > 1) {
    for (let i = 1; i < arguments.length; i++) {
      if (typeof arguments[i] !== 'object' || arguments[i] === null) {
        continue
      }
      let keys = Object.keys(arguments[i])
      for (let j = 0; j < keys.length; j++) {
        target[keys[j]] = arguments[i][keys[j]]
      }
    }
  }

  return target
}

export default class Constituency {
  /**
   * @type {HTMLElement}
   */
  el = null

  selectBox = null
  selectBoxSelector = '.selection'

  /**
   * @type {HTMLDocument}
   */
  rootElement = document

  /**
   * @type {HTMLDocument}
   */
  boundingBox = document

  /**
   * 元素的CSS选择器，它限制了可以进行选择的位置（优先级高于boundingBox）
   * @type {HTMLDocument}
   */
  boundingBoxSelector = null
  dragging = false
  startX = null
  startY = null
  endX = null
  endY = null
  selectTables = []
  selected = []

  /**
   * 调用以分发选定项的列表
   * @type {Function | null}
   */
  selectedSetter = null

  /**
   * 调用以获取所选项目的列表
   * @type {Function | null}
   */
  selectedGetter = null

  /**
   * 调用以设置选择框下的项目列表
   * @type {Function | null}
   */
  selectingSetter = null

  selecting = []
  addMode = false
  // -在选择框处于活动状态时禁用浏览器文本选择（默认情况下处于启用状态）
  disableTextSelection = true

  handlers = {
    mousedown: null,
    mouseup: null,
    mousemove: null
  }

  /**
   * 包含的滚动元素
   * @type {HTMLElement|null}
   */
  // （DOM节点）-带有滚动条的元素，其中包含可选项目的列表
  scrollingFrame = null

  /**
   * Speed of scroll (in px per 16ms)
   * @type {number}
   */
  // （int）-滚动速度（以每16ms像素为单位，默认为10px）
  scrollSpeed = 10

  /**
   * 滚动开始起作用时与边框的距离（以px为单位，默认为10px）
   * @type {number}
   */
  scrollDistance = 10

  /**
   *在选择项目时启用（默认）/禁用文档滚动，在配置scrollingFrame时忽略
   * @type {boolean}
   */
  scrollDocumentEnabled = true

  /**
   *  Timeout ID (from setInterval() call)
   * @type {null|object}
   */
  scrollRepeater = null

  /**
   * 将CSS selectedClass添加到当前选定的元素中
   * @type {boolean}
   */

  renderSelected = false

  /**
   * 将CSS selectedClass添加到当前在选择框下方的元素
   * @type {boolean}
   */

  renderSelecting = false

  /**
   *
   * 选择框始终在此标志为true时向选择添加项目，尽管按下了“ Ctrl”或“ Meta”键（默认为false）
   * @type {boolean}
   */
  overrideAddMode = false

  // 字符串）-CSS类，用于标记选择框下的项目（默认为“ .selecting”）
  selectingClass = 'selecting'
  // 字符串）-用于标记所选项目的CSS类（默认情况下为“ .selected”）
  selectedClass = 'selected'

  firstRun = true

  onMouseUp = null

  /**
   * Initializes selection component
   * @param {Object} options misc selection options
   */
  constructor(options = {}) {
    this.handlers.mousedown = this.mouseDown.bind(this)
    this.handlers.mouseup = this.mouseUp.bind(this)
    this.handlers.mousemove = this.mouseMove.bind(this)
    const objectAssign = Object.assign || objectAssignSimple
    objectAssign(this, options)
    this.attach()
  }

  /**
   * 禁用文本选择（作为默认浏览器操作）
   * @param {Event} e
   * @return {boolean}
   */
  static disableTextSelection(e) {
    e.preventDefault()
    return false
  }

  /**
   * 返回元素的绝对位置（在页面上）和大小
   * @param {Element} element
   * @return {{top: number, left: number, width: Number, height: Number}}
   */
  static absBox(element) {
    // 矩形的集合，就是该元素的 CSS 边框大小。
    let box = element.getBoundingClientRect()
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset,
      width: box.width,
      height: box.height,
      bottom: box.bottom + window.pageYOffset
    }
  }

  /**
   * 向根元素添加事件处理程序
   * Adds event handlers to the root element
   */
  attach() {
    if (this.rootElement) {
      Object.keys(this.handlers).forEach(event =>
        this.rootElement.addEventListener(event, this.handlers[event])
      )
    }
  }

  /**
   * 删除所有注册的事件处理程序并清除对DOM节点的引用
   */
  detach() {
    Object.keys(this.handlers).forEach(event =>
      this.rootElement.removeEventListener(event, this.handlers[event])
    )
    if (this.disableTextSelection && this.dragging) {
      this.rootElement.removeEventListener('selectstart', Constituency.disableTextSelection)
    }
    if (this.scrollRepeater) {
      clearInterval(this.scrollRepeater)
    }
    this.selectTables = []
    this.selectBox = null
    this.boundingBox = null
    this.rootElement = null
    this.scrollingFrame = null
    this.element = null
  }

  /**
   * 更新可选项目列表
   * @param {Element[]} elements
   */
  setSelectTables(elements) {
    this.selectTables = elements
    this.selected = elements.map(() => false)
    if (typeof this.selectedSetter === 'function') {
      this.selectedSetter(this.selected, this.selected)
    }
  }

  /**
   * 鼠标键按下处理程序
   * @param {MouseEvent} e
   */
  mouseDown(e) {
    // 给定的节点是不是另一个节点的后代
    const isSrcDescendant = this.el === e.target || this.el.contains(e.target)
    // 鼠标左键为0
    if (e.button !== 0 || !isSrcDescendant) {
      return
    }
    if (this.boundingBoxSelector) {
      this.boundingBox = document.querySelector(this.boundingBoxSelector)
    }
    let bb = Constituency.absBox(this.boundingBox)
    if (
      e.pageX < bb.left ||
      e.pageX > bb.width + bb.left ||
      e.pageY < bb.top ||
      e.pageY > bb.height + bb.top
    ) {
      return
    }
    // 禁止选中文字
    if (this.disableTextSelection) {
      this.rootElement.addEventListener('selectstart', Constituency.disableTextSelection)
    }
    // Timeout ID
    if (this.scrollRepeater) {
      clearInterval(this.scrollRepeater)
      this.scrollRepeater = null
    }
    let [x, y] = this.bound(e)
    // 画布
    this.selectBox = document.querySelector(this.selectBoxSelector)
    if (this.scrollingFrame) {
      y += this.scrollingFrame.scrollTop
    }
    this.startX = x
    this.startY = y
    this.endX = x
    this.endY = y
    this.dragging = true
    this.selecting = this.selectTables.map(() => false) // reset all selection
    if (typeof this.selectingSetter === 'function') {
      this.selectingSetter(this.selecting)
    }
    this.addMode = this.overrideAddMode || e.ctrlKey || e.metaKey
    if (!this.addMode) {
      this.selected = this.selecting
      if (typeof this.selectedSetter === 'function') {
        this.selectedSetter(this.selected, this.selecting)
      }
    } else if (typeof this.selectedGetter === 'function') {
      let gotSelection = this.selectedGetter() || []
      this.selected = this.selectTables.map((v, i) => !!gotSelection[i])
    }
    this.updateSelection()
    this.render()
  }

  /**
   * 鼠标键向上处理程序
   * @param {MouseEvent} e
   */
  mouseUp(e) {
    if (this.dragging) {
      if (e.button !== 0) {
        return
      }
      if (this.disableTextSelection) {
        this.rootElement.removeEventListener('selectstart', Constituency.disableTextSelection)
      }
      let [x, y] = this.bound(e)
      this.endX = x
      this.endY = y
      if (this.scrollingFrame) {
        this.endY += this.scrollingFrame.scrollTop
      }
      if (this.scrollRepeater) {
        clearInterval(this.scrollRepeater)
        this.scrollRepeater = null
      }
      this.dragging = false
      this.updateSelection()
      if (typeof this.selectedGetter === 'function') {
        let gotSelection = this.selectedGetter() || []
        this.selected = this.selectTables.map((v, i) => !!gotSelection[i])
      }
      if (this.addMode) {
        let selectingItemsQty = this.selecting.reduce((a, i) => (a + i ? 1 : 0), 0)
        let idx = this.selecting.findIndex(v => !!v)
        if (selectingItemsQty === 1 && this.selected[idx]) {
          this.selected[idx] = false
        } else {
          this.selected = this.selected.map((v, i) => v || this.selecting[i])
        }
      } else {
        this.selected = this.selecting
      }
      if (typeof this.selectedSetter === 'function') {
        this.selectedSetter(this.selected, this.selecting)
      }
      this.selecting = []
      if (this.selectingSetter) {
        this.selectingSetter(this.selecting)
      }
      if (this.onMouseUp && typeof this.onMouseUp === 'function') {
        this.onMouseUp()
      }
      this.render()
    }
  }

  /**
   * Mouse move handler
   * @param {MouseEvent} e
   */
  mouseMove(e) {
    if (this.dragging) {
      let [x, y] = this.bound(e)
      this.endX = x
      this.endY = y
      if (this.scrollRepeater) {
        clearInterval(this.scrollRepeater)
        this.scrollRepeater = null
      }
      if (this.scrollingFrame) {
        this.endY += this.scrollFrame(e)
      } else if (this.scrollDocumentEnabled) {
        this.scrollDocument(e)
      }
      this.updateSelection()
      this.render()
    }
  }

  /**
   * 当鼠标到达其中一个边时，滚动带有可选项的框
   * @param {MouseEvent} e
   * @return {int}
   */
  scrollFrame(e) {
    let sf = this.scrollingFrame
    let frame = Constituency.absBox(sf) // sf.getBoundingClientRect();
    let diff = 0
    if (e.pageY >= frame.bottom - this.scrollDistance) {
      diff = this.scrollSpeed
    } else if (e.pageY <= frame.top + this.scrollDistance) {
      diff = -this.scrollSpeed
    }
    sf.scrollTop += diff
    // console.log(e.pageY, '--', frame.bottom)
    // 如果鼠标靠近边界，则重复鼠标移动事件
    if (e.pageY >= frame.bottom || e.pageY <= frame.top) {
      if (this.scrollRepeater) {
        clearInterval(this.scrollRepeater)
      }
      this.scrollRepeater = setInterval(() => this.mouseMove(e), 16)
    }

    return sf.scrollTop
  }

  /**
   * 当鼠标到达其中一个边缘时，用可选择的项目滚动文档
   * @param {MouseEvent} e
   */
  scrollDocument(e) {
    let diff = 0
    if (this.endY <= window.pageYOffset) {
      diff = -this.scrollSpeed
    } else if (this.endY >= window.pageYOffset + window.innerHeight) {
      diff = this.scrollSpeed
    }

    if (diff !== 0) {
      window.scrollBy(0, diff)
      if (this.scrollRepeater) {
        clearInterval(this.scrollRepeater)
      }
      this.scrollRepeater = setInterval(() => this.mouseMove(e), 16)
    }
  }

  /**
   * 将鼠标事件的[x，y]坐标返回到选择区域
   * @param {MouseEvent} e
   * @return {[int, int]}
   */
  bound(e) {
    let bb = Constituency.absBox(this.boundingBox)
    return [
      Math.min(Math.max(bb.left, e.pageX), bb.width + bb.left),
      Math.min(Math.max(bb.top, e.pageY), bb.height + bb.top)
    ]
  }

  /**
   * 更新所选项目的列表（在当前选择框下）
   */
  updateSelection() {
    let s = this.getSelectionBox()
    s.top -= this.scrollingFrame ? this.scrollingFrame.scrollTop : 0
    this.selecting = this.selectTables
      .map(Constituency.absBox)
      .map(
        b =>
          Math.abs((s.left - b.left) * 2 + s.width - b.width) < s.width + b.width &&
          Math.abs((s.top - b.top) * 2 + s.height - b.height) < s.height + b.height
      )
    if (this.selectingSetter) {
      this.selectingSetter(this.selecting)
    }
  }

  /**
   * 获取选择框的大小和相对位置
   * @return {{left: number, top: number, width: number, height: number}}
   */
  getSelectionBox() {
    return {
      left: Math.min(this.startX, this.endX),
      top: Math.min(this.startY, this.endY),
      width: Math.abs(this.startX - this.endX),
      height: Math.abs(this.startY - this.endY)
    }
  }

  /**
   * 呈现可选项目的可见状态
   */
  renderSelection() {
    if (!this.renderSelected && !this.renderSelecting) {
      return
    }
    this.selectTables.forEach((e, i) => {
      if (this.renderSelecting) {
        if (this.dragging && !!this.selecting[i]) {
          e.classList.add(this.selectingClass)
        } else {
          e.classList.remove(this.selectingClass)
        }
      }
      if (this.renderSelected) {
        if (!this.selected[i]) {
          e.classList.remove(this.selectedClass)
        } else {
          e.classList.add(this.selectedClass)
        }
      }
    })
  }

  /**
   * 呈现当前选择状态
   */
  render() {
    // 画布
    let elStyle = this.selectBox.style
    if (this.dragging) {
      let box = this.getSelectionBox()
      let bb = Constituency.absBox(this.boundingBox)
      elStyle.display = 'block'
      if (this.firstRun) {
        let selectBoxStart = Constituency.absBox(this.selectBox)
        this.selectBoxStartX = bb.left - selectBoxStart.left
        this.selectBoxStartY = bb.top - selectBoxStart.top
        this.firstRun = false
      }
      elStyle.left = box.left - bb.left + this.selectBoxStartX + 'px'
      elStyle.top =
        box.top -
        bb.top +
        this.selectBoxStartY -
        (this.scrollingFrame ? this.scrollingFrame.scrollTop : 0) +
        'px'
      elStyle.width = box.width + 'px'
      elStyle.height = box.height + 'px'
    } else {
      elStyle.left = 0
      elStyle.top = 0
      elStyle.width = 0
      elStyle.height = 0
      elStyle.display = 'none'
    }
    this.renderSelection()
  }
}
