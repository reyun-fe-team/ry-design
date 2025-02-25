const $placeholder = Symbol()
const $fakeParent = Symbol()
const $nextSiblingPatched = Symbol()
const $childNodesPatched = Symbol()

const isFrag = node => 'frag' in node

const parentNodeDescriptor = {
  get() {
    return this[$fakeParent] || this.parentElement
  },
  configurable: true
}

const patchParentNode = (node, fakeParent) => {
  if ($fakeParent in node) {
    return
  }

  node[$fakeParent] = fakeParent

  Object.defineProperty(node, 'parentNode', parentNodeDescriptor)
}

const nextSiblingDescriptor = {
  get() {
    const { childNodes } = this.parentNode
    const index = childNodes.indexOf(this)
    if (index > -1) {
      return childNodes[index + 1] || null
    }

    return null
  }
}

const patchNextSibling = node => {
  if ($nextSiblingPatched in node) {
    return
  }

  node[$nextSiblingPatched] = true

  Object.defineProperty(node, 'nextSibling', nextSiblingDescriptor)
}

const getTopFragment = (node, fromParent) => {
  while (node.parentNode !== fromParent) {
    const { parentNode } = node
    if (parentNode) {
      node = parentNode
    }
  }

  return node
}

let getChildNodes

// 对于一个父级来说，获取假的孩子
const getChildNodesWithFragments = node => {
  // 在SSR中，获取子节点
  if (!getChildNodes) {
    const childNodesDescriptor = Object.getOwnPropertyDescriptor(Node.prototype, 'childNodes')
    getChildNodes = childNodesDescriptor.get
  }

  const realChildNodes = getChildNodes.apply(node)
  const childNodes = Array.from(realChildNodes).map(childNode => getTopFragment(childNode, node))

  // 去重子节点，指向同一个片段
  return childNodes.filter((childNode, index) => childNode !== childNodes[index - 1])
}

const childNodesDescriptor = {
  get() {
    return this.frag || getChildNodesWithFragments(this)
  }
}

const firstChildDescriptor = {
  get() {
    return this.childNodes[0] || null
  }
}

function hasChildNodes() {
  return this.childNodes.length > 0
}

const patchChildNodes = node => {
  if ($childNodesPatched in node) {
    return
  }

  node[$childNodesPatched] = true

  Object.defineProperties(node, {
    childNodes: childNodesDescriptor,
    firstChild: firstChildDescriptor
  })

  node.hasChildNodes = hasChildNodes
}

// 为 vue-frag 内部使用重写的方法
// 这是递归工作的。如果孩子也是一个碎片，它会自动下降一个级别
function before(...nodes) {
  this.frag[0].before(...nodes)
}

function remove() {
  // 如果要删除片段，则应删除所有子项，包括占位符
  const { frag } = this
  const removed = frag.splice(0, frag.length)
  removed.forEach(node => {
    node.remove()
  })
}

// FlatMap polyfill
const getFragmentLeafNodes = children =>
  Array.prototype.concat(
    ...children.map(childNode =>
      isFrag(childNode) ? getFragmentLeafNodes(childNode.frag) : childNode
    )
  )

const addPlaceholder = (node, insertBeforeNode) => {
  const placeholder = node[$placeholder]

  insertBeforeNode.before(placeholder)
  patchParentNode(placeholder, node)
  node.frag.unshift(placeholder)
}

function removeChild(node) {
  if (isFrag(this)) {
    // If this is a fragment element
    const hasChildInFragment = this.frag.indexOf(node)
    if (hasChildInFragment > -1) {
      const [removedNode] = this.frag.splice(hasChildInFragment, 1)

      // If last node, insert placeholder
      if (this.frag.length === 0) {
        addPlaceholder(this, removedNode)
      }

      node.remove()
    }
  } else {
    // For frag parent
    const children = getChildNodesWithFragments(this)
    const hasChild = children.indexOf(node)

    if (hasChild > -1) {
      node.remove()
    }
  }

  return node
}

function insertBefore(insertNode, insertBeforeNode) {
  // 应该这是叶子节点吗？
  const insertNodes = insertNode.frag || [insertNode]

  // 如果此元素是片段，请在虚拟片段中插入节点
  if (isFrag(this)) {
    if (
      // 父级已经修补
      insertNode[$fakeParent] === this &&
      // 之前插入（通过keep-alive重新插入）
      insertNode.parentElement
    ) {
      return insertNode
    }

    const { frag } = this

    if (insertBeforeNode) {
      const index = frag.indexOf(insertBeforeNode)
      if (index > -1) {
        frag.splice(index, 0, ...insertNodes)
        insertBeforeNode.before(...insertNodes)
      }
    } else {
      const lastNode = frag[frag.length - 1]
      frag.push(...insertNodes)
      lastNode.after(...insertNodes)
    }

    removePlaceholder(this)
  } else if (insertBeforeNode) {
    if (this.childNodes.includes(insertBeforeNode)) {
      insertBeforeNode.before(...insertNodes)
    }
  } else {
    this.append(...insertNodes)
  }

  insertNodes.forEach(node => {
    patchParentNode(node, this)
  })

  const lastNode = insertNodes[insertNodes.length - 1]
  patchNextSibling(lastNode)

  return insertNode
}

function appendChild(node) {
  if (
    // Parent already patched
    node[$fakeParent] === this &&
    // Previously inserted (reinserted via keep-alive)
    node.parentElement
  ) {
    return node
  }

  const { frag } = this
  const lastChild = frag[frag.length - 1]

  lastChild.after(node)
  patchParentNode(node, this)

  removePlaceholder(this)

  frag.push(node)

  return node
}

const removePlaceholder = node => {
  const placeholder = node[$placeholder]
  if (node.frag[0] === placeholder) {
    node.frag.shift()
    placeholder.remove()
  }
}

const innerHTMLDescriptor = {
  set(htmlString) {
    // 如果有子元素（非占位符），删除它们
    if (this.frag[0] !== this[$placeholder]) {
      this.frag.slice().forEach(child => this.removeChild(child))
    }

    if (htmlString) {
      const domify = document.createElement('div')
      domify.innerHTML = htmlString

      // Array.from会复制NodeList，当我们添加Child时，NodeList会实时更新
      Array.from(domify.childNodes).forEach(node => this.appendChild(node))
    }
  },
  get() {
    return ''
  }
}

export default {
  inserted(element) {
    const { parentNode, nextSibling, previousSibling } = element

    const childNodes = Array.from(element.childNodes)

    // 如果没有子项，请插入注释占位符以标记位置
    const placeholder = document.createComment('')

    if (childNodes.length === 0) {
      childNodes.push(placeholder)
    }

    element.frag = childNodes
    element[$placeholder] = placeholder

    // 带子元素（或占位符）的交换元素
    const fragment = document.createDocumentFragment()
    fragment.append(...getFragmentLeafNodes(childNodes))
    element.replaceWith(fragment)

    childNodes.forEach(node => {
      patchParentNode(node, element)
      patchNextSibling(node)
    })

    patchChildNodes(element)

    Object.assign(element, {
      remove,
      appendChild,
      insertBefore,
      removeChild,
      before
    })

    Object.defineProperty(element, 'innerHTML', innerHTMLDescriptor)

    if (parentNode) {
      Object.assign(parentNode, {
        removeChild,
        insertBefore
      })
      patchParentNode(element, parentNode)
      patchChildNodes(parentNode)
    }

    if (nextSibling) {
      patchNextSibling(element)
    }

    if (previousSibling) {
      patchNextSibling(previousSibling)
    }
  },
  unbind(element) {
    element.remove()
    // 无需清理.frag等，因为Node已报废
  }
}
