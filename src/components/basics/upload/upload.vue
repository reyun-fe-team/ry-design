<template>
  <div :class="[prefixCls]">
    <div
      :class="classes"
      @paste="handlePaste"
      @drop="dragOver = false"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false">
      <input
        ref="input"
        type="file"
        :class="[prefixCls + '-input']"
        :multiple="multiple"
        :webkitdirectory="webkitdirectory"
        :accept="accept"
        title=""
        @change="handleChange" />
      <slot></slot>
    </div>
    <slot name="tip"></slot>
    <upload-list
      v-if="showUploadList"
      :files="fileList"
      @on-file-remove="handleRemove"
      @on-file-preview="handlePreview"></upload-list>
  </div>
</template>
<script>
import UploadList from './upload-list.vue'
import ajax from './ajax'
import { oneOf } from '@src/util/assist.js'
import Emitter from './mixins/emitter'
import mixinsForm from './mixins/form'
import Upload from './upload.js'

import { prefix } from '@src/config.js'
let prefixCls = prefix + 'upload'

export default {
  name: prefixCls,
  components: { UploadList },
  mixins: [Emitter, mixinsForm],
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {}
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    },
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['select', 'drag'])
      },
      default: 'select'
    },
    format: {
      type: Array,
      default() {
        return []
      }
    },
    accept: {
      type: String
    },
    maxSize: {
      type: Number
    },
    beforeUpload: Function,
    createdUpload: Function,
    onProgress: {
      type: Function,
      default() {
        return {}
      }
    },
    onSuccess: {
      type: Function,
      default() {
        return {}
      }
    },
    onError: {
      type: Function,
      default() {
        return {}
      }
    },
    onRemove: {
      type: Function,
      default() {
        return {}
      }
    },
    onPreview: {
      type: Function,
      default() {
        return {}
      }
    },
    onExceededSize: {
      type: Function,
      default() {
        return {}
      }
    },
    onFormatError: {
      type: Function,
      default() {
        return {}
      }
    },
    defaultFileList: {
      type: Array,
      default() {
        return []
      }
    },
    paste: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    webkitdirectory: {
      type: Boolean,
      default: false
    },
    thread: {
      type: Number,
      default: 3
    },
    // 获取文件夹结构
    getFolderStructure: {
      type: Function,
      default() {
        return {}
      }
    },
    // 创建文件夹的方法
    onCreateFolder: {
      type: Function,
      default() {
        return {}
      }
    },
    httpRequest: {
      type: Function,
      default: ajax
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 获取第一层文件夹信息
    getFirstFolder: Function
  },
  data() {
    let storage = {}
    return {
      prefixCls: prefixCls,
      dragOver: false,
      fileList: [],
      tempIndex: 1,
      reqs: {},
      getStorageData: () => {
        return storage
      }
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-select`]: this.type === 'select',
          [`${prefixCls}-drag`]: this.type === 'drag',
          [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
        }
      ]
    }
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler(fileList) {
        this.fileList = fileList.map(item => {
          item.status = 'finished'
          item.percentage = 100
          item.uid = Date.now() + this.tempIndex++
          return item
        })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // let storage = this.getStorageData()
      this.getStorageData().upload = new Upload({
        getWebkitdirectory: this.getWebkitdirectory,
        thread: this.thread,
        post: this.post,
        beforeUpload: this.beforeUpload,
        getFolderStructure: this.getFolderStructure,
        onCreateFolder: this.onCreateFolder,
        onMessage: this.onMessage,
        getFirstFolder: this.getFirstFolder
      })
    })
  },
  beforeDestroy() {
    this.detach()
  },
  methods: {
    submit() {
      let storage = this.getStorageData()
      storage.upload.readyFile()
    },
    onMessage(value) {
      this.$Message.info(value)
    },
    getWebkitdirectory() {
      return this.webkitdirectory
    },
    handleClick() {
      if (this.itemDisabled) {
        return
      }
      this.$refs.input.click()
    },
    handleChange(e) {
      const files = e.target.files
      if (!files) {
        return
      }
      this.uploadFiles(files)
      this.$refs.input.value = null
    },
    handlePaste(e) {
      if (this.itemDisabled) {
        return
      }
      if (this.paste) {
        this.uploadFiles(e.clipboardData.files)
      }
    },
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files)
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1)
      }
      if (postFiles.length === 0) {
        return
      }
      if (!this.createdUpload) {
        this.nextUplaod(postFiles, this.webkitdirectory)
        return
      }
      const created = this.createdUpload(postFiles, this.webkitdirectory)
      if (created && created.then) {
        created.then(processedFile => {
          if (Object.prototype.toString.call(processedFile) === '[object Array]') {
            this.nextUplaod(processedFile, this.webkitdirectory)
          } else {
            this.nextUplaod(postFiles, this.webkitdirectory)
          }
        })
      } else if (created !== false) {
        this.nextUplaod(postFiles, this.webkitdirectory)
      } else {
        // this.$emit('cancel', file);
      }
    },
    nextUplaod(files, webkitdirectory) {
      files.forEach(file => {
        // 文件id
        if (!file.uid) {
          file.uid = Date.now() + this.tempIndex++
        }
        file.status = 'uploading'
        file.percentage = 0
        file.showProgress = true
      })
      // let storage = this.getStorageData()
      this.getStorageData().upload.uploadFiles(files, webkitdirectory, this.autoUpload)
    },
    post(file) {
      return new Promise((resolve, reject) => {
        if (this.format.length) {
          const _file_format = file.name.split('.').pop().toLocaleLowerCase()

          const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format)
          if (!checked) {
            this.onFormatError(file, this.fileList)
            reject(new Error())
            return
          }
        }

        // check maxSize
        if (this.maxSize) {
          if (file.size > this.maxSize * 1024) {
            this.onExceededSize(file, this.fileList)
            reject(new Error())
            return
          }
        }
        this.handleStart(file)

        let data = this.data
        if (Object.prototype.toString.call(file.mergeData) === '[object Object]') {
          Object.assign(data, file.mergeData)
        }
        file.status = 'pending'
        const { uid } = file
        let options = {
          headers: this.headers,
          withCredentials: this.withCredentials,
          file: file,
          data,
          filename: this.name,
          action: this.action,
          onProgress: e => {
            this.handleProgress(e, file)
          },
          onSuccess: res => {
            resolve()
            this.handleSuccess(res, file)
            delete this.reqs[uid]
          },
          onError: (err, response) => {
            reject(new Error())
            this.handleError(err, response, file)
            // delete this.reqs[uid]
          }
        }
        const req = this.httpRequest(options)
        this.reqs[uid] = req
        if (req && req.then) {
          req.then(options.onSuccess, options.onError)
        }
      })
    },
    handleStart(file) {
      const _file = {
        status: 'uploading',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        showProgress: true
      }
      let contain = this.fileList.every(option => {
        return option.uid !== file.uid
      })

      if (contain) {
        this.fileList.push(_file)
      }
    },
    onAgainUpload(file) {
      const _file = this.getFile(file)
      _file.status = 'uploading'
      // _file.name = file.name
      // _file.size = file.size
      _file.percentage = 0
      // _file.uid = file.uid
      _file.showProgress = true
      this.nextUplaod([_file], false)
    },
    getFile(file) {
      // let storage = this.getStorageData()
      const fileList = this.getStorageData().upload.all
      let target
      fileList.every(item => {
        target = file.uid === item.uid ? item : null
        return !target
      })
      return target
    },
    handleProgress(e, file) {
      const _file = this.getFile(file)
      if (_file) {
        this.onProgress(e, _file, this.fileList)
        _file.percentage = e.percent || 0
      }
    },
    handleSuccess(res, file) {
      const _file = this.getFile(file)

      if (_file) {
        _file.status = 'finished'
        _file.response = res

        this.onSuccess(res, _file, this.fileList)
        this.dispatch('FormItem', 'on-form-change', _file)

        setTimeout(() => {
          _file.showProgress = false
        }, 1000)
      }
    },
    handleError(err, response, file) {
      const _file = this.getFile(file)
      if (_file) {
        const fileList = this.fileList

        _file.status = 'fail'

        fileList.splice(fileList.indexOf(_file), 1)

        this.onError(err, response, file)
      }
    },
    handleRemove(file) {
      const fileList = this.fileList
      fileList.splice(fileList.indexOf(file), 1)
      this.abort(file)
      this.onRemove(file, fileList)
    },
    handlePreview(file) {
      if (file.status === 'finished') {
        this.onPreview(file)
      }
    },
    clearFiles() {
      this.fileList = []
    },
    abort(file) {
      const { reqs } = this
      if (file) {
        let uid = file
        if (file.uid) {
          uid = file.uid
        }
        if (reqs[uid]) {
          reqs[uid].abort()
        }
      } else {
        Object.keys(reqs).forEach(uid => {
          if (reqs[uid]) {
            reqs[uid].abort()
          }
          delete reqs[uid]
        })
      }
    },
    detach() {
      let storage = this.getStorageData()
      storage.upload.detach()
    }
  }
}
</script>