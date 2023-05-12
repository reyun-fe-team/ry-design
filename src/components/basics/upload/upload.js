export default class Upload {
  constructor(options) {
    this.all = []
    this.num = 0
    this.uploadIng = 0
    this.handlers = {}
    /**
     * @type {HTMLDocument}
     */
    this.rootElement = document
    Object.assign(this, options)
    var vibchage = 'visibilitychange' || 'webkitvisibilitychange' || 'mozvisibilitychange'
    this.handlers[vibchage] = this.addFunction.bind(this)
    if (this.rootElement) {
      Object.keys(this.handlers).forEach(event =>
        this.rootElement.addEventListener(event, this.handlers[event])
      )
    }
  }

  addFunction() {
    var bowhidden =
      'hidden' in document
        ? 'hidden'
        : 'webkithidden' in document
        ? 'webkithidden'
        : 'mozhidden' in document
        ? 'mozhidden'
        : null

    if (!this.rootElement[bowhidden]) {
      this.addEvent()
    }
  }

  addEvent() {
    if (!this.all.length) {
      return
    }
    let isEnd = this.all.every(file => {
      return ['finished', 'fail'].includes(file.status)
    })
    if (isEnd) {
      return
    }
    let isPending = this.all.some(file => {
      return ['pending'].includes(file.status)
    })
    if (!isPending) {
      // this.onMessage('没有pending,错误了,需要自动触发', this.num, this.all.length)
      this.uploadIng = 0
      this.readyFile()
    }
  }

  uploadFiles(files, webkitdirectory = false, autoUpload) {
    if (webkitdirectory) {
      this.readyFolder(files)
    } else {
      this.all = this.all.concat(files)
      if (autoUpload) {
        this.readyFile()
      }
    }
  }

  readyFile() {
    this.all.slice(this.num, this.num + this.thread - this.uploadIng).forEach(file => {
      this.batches(file)
    })
  }

  batches(file) {
    this.num++
    this.uploadIng++
    const next = () => {
      this.uploadIng--
      if (this.all[this.num]) {
        this.readyFile()
      }
    }
    this.upload(file).then(
      _file => {
        this.post(_file)
          .then(() => {
            next()
          })
          .catch(() => {
            next()
          })
      },
      () => {
        file.status = 'fail'
        next()
      }
    )
  }

  upload(file) {
    return new Promise((resolve, reject) => {
      if (!this.beforeUpload) {
        resolve(file)
        return
      }
      const before = this.beforeUpload(file)
      if (before && before.then) {
        before.then(
          processedFile => {
            if (Object.prototype.toString.call(processedFile) === '[object File]') {
              resolve(processedFile)
            } else {
              resolve(file)
            }
          },
          err => {
            reject(err)
          }
        )
      } else if (before !== false) {
        resolve(file)
      }
    })
  }

  readyFolder(files) {
    let tree = this.folderStructure(files)

    if (this.getFolderStructure) {
      let before = this.getFolderStructure(tree)
      if (before === false) {
        return
      }
    }

    if (!this.onCreateFolder) {
      this.onMessage('上传文件夹需要传入 onCreateFolder')
      return
    }

    const next = (_tree, _response, first) => {
      _tree.forEach(option => {
        this.onCreateFolder(option, _response).then(({ response, mergeData }) => {
          if (option.files.length) {
            if (Object.prototype.toString.call(mergeData) === '[object Object]') {
              option.files.forEach(file => {
                Object.assign(file['mergeData'], mergeData)
              })
            }
            this.all = this.all.concat(option.files)
            this.readyFile()
          }
          if (first && this.getFirstFolder) {
            this.getFirstFolder(response)
          }
          next(option.children, response, false)
        })
      })
    }
    next(tree, {}, true)
  }

  // 获取目录树
  folderStructure(data) {
    const structure = (tree, item, file) => {
      let path = item.shift()
      let names = path.split('/')
      let folderName = names[names.length - 1]
      let index = -1
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].path === path) {
          index = i
          break
        }
      }
      if (index === -1) {
        tree.push({
          path,
          folderName,
          files: [],
          children: []
        })
      }
      let find = index === -1 ? tree.length - 1 : index
      if (item.length === 0) {
        tree[find].files.push(file)
      }
      if (item.length) {
        structure(tree[find].children, item, file)
      }
    }
    let tree = []
    data.forEach(file => {
      let list = []
      for (let i = 0; i < file.webkitRelativePath.length; i++) {
        if (file.webkitRelativePath[i] === '/') {
          let path = file.webkitRelativePath.slice(0, i)
          list.push(path)
        }
      }
      structure(tree, list, file)
    })
    return tree
  }

  /**
   * 删除所有注册的事件处理程序并清除对DOM节点的引用
   */
  detach() {
    Object.keys(this.handlers).forEach(event =>
      this.rootElement.removeEventListener(event, this.handlers[event])
    )
    this.all = []
    this.num = 0
    this.uploadIng = 0
  }
}
