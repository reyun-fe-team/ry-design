import Node from './Node'
export default class TreeStore {
  constructor(options) {
    for (let option in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(option)) {
        this[option] = options[option]
      }
    }
    this.nodesMap = {}
    this.nodeList = []
    this.selectedIds = []
    this.maxLevel = 0
    this.root = new Node({
      data: this.data,
      store: this
    })
  }
}
