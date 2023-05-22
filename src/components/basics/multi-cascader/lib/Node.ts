import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
let nodeIdSeed = 0
export default class Node {
  constructor(options) {
    // 节点id
    this.id = nodeIdSeed++
    // 根组件用到的数据项
    this.data = null
    // 节点的父节点数据
    this.parent = null
    // 是否能翻页还有下一级
    // 用于展示下一级面板
    // false为可以展示 true不展示
    this.isLeaf = true
    // 是否被选中
    this.checked = false
    // 是否被半选
    this.indeterminate = false
    // 是否在loading请求下一级数据
    this.loading = false
    // 显示下级的箭头
    this.showExpIcon = true
    // 其他额外的参数
    this.nodeSyncSetData(options)

    // 数据存储
    let store = this.store
    // 加入value字段
    this[store.valueKey] = options[store.valueKey] || null
    // 是否显示checkBox 默认显示
    this.showCheck =
      typeof options[store.checkKey] === 'undefined' || Boolean(options[store.checkKey])
    // 当前节点的层级
    this.level = 0
    // 节点下面的子节点
    this.childNodes = []
    if (this.parent) {
      this.level = this.parent.level + 1
      store.maxLevel = Math.max(store.maxLevel, this.level)
      this.showLabel = this.parent.showLabel ? `${this[store.labelKey]}` : this[store.labelKey]
    }

    this.setData(this.data)
  }
  // 异步完成点击
  nodeSyncClick(children) {
    this.isLeaf = false
    this.loading = false
    this.children = children
  }
  // 异步点击设置node状态
  nodeSyncSetData(options = {}) {
    for (let option in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(option)) {
        this[option] = options[option]
      }
    }
  }
  setData(data) {
    let store = this.store
    this.data = data
    this.childNodes = []
    let children
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data
    } else {
      children = _get(this, store.childrenKey) || []
      this.isLeaf = children.length === 0
      this.store.nodesMap[this.id] = this
      this.store.nodeList.push(this)
      // eslint-disable-next-line no-self-assign
      this[store.valueKey] = this[store.valueKey]
    }
    children.forEach(child => {
      this.insertChild(child)
    })
  }

  insertChild(child) {
    child = Object.assign(child, {
      parent: this,
      store: this.store
    })
    child = new Node(child)
    this.childNodes.push(child)
  }

  check(checked) {
    const { selectChildren } = this.store
    if (this.disabled) {
      return false
    }
    this.checked = checked
    this.updateSelectIds(checked, this.id)
    if (this.childNodes && selectChildren) {
      this.childNodes.forEach(child => {
        child.check(checked)
      })
    }
    if (this.parent && selectChildren) {
      this.parent.checkedAll()
    }
  }

  checkedAll() {
    if (this.childNodes) {
      this.checked = this.childNodes.every(child => child.checked)
      if (this.store.isShowIndeterminate && this.store.selectChildren) {
        this.indeterminate = this.childNodes.some(child => child.checked || child.indeterminate)
        if (this.checked) {
          this.indeterminate = false
        }
      }
      this.updateSelectIds(this.checked, this.id)
    }
    if (this.parent) {
      this.parent.checkedAll()
    }
  }

  updateSelectIds(checked, id) {
    let store = this.store
    if (checked) {
      if (this.isLeaf || !store.selectChildren) {
        let tempList = _cloneDeep(store.selectedIds)
        tempList.push(id)
        tempList = _uniq(tempList)
        store.selectedIds = tempList
      }
    } else {
      let tempList = _cloneDeep(store.selectedIds)
      let index = tempList.findIndex(o => o === id)
      if (index >= 0) {
        tempList.splice(index, 1)
      }
      tempList = _uniq(tempList)
      store.selectedIds = tempList
    }
  }
}
