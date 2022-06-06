<template>
  <main>
    <div :class="[prefixCls]">
      <div v-show="!isSubmitAdvance && !reportAdvanceTo && !isTautology">
        <Upload
          ref="up-data-file"
          :show-upload-list="false"
          :action="action"
          :headers="headers"
          :data="uploadData"
          :accept="accept"
          :type="type"
          :before-upload="beforeUploads"
          :on-progress="handleProgress"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-remove="onRemove">
          <div :class="prefixCls + '-container'">
            <div :class="prefixCls + '-container-info'">
              <!--直接slot能替换 -->
              <slot name="upDateImage">
                <img
                  src="../../../images/upload-particulars/upload-particulars.png"
                  alt=""
                  :class="prefixCls + '-container-info-image'" />
              </slot>
            </div>
            <div :class="prefixCls + '-container-text'">{{ typeText }}</div>
          </div>
        </Upload>
        <p :class="[prefixCls + '-text-p', prefixCls + '-gray']">
          <slot name="acceptText">仅支持{{ accept }}文件上传。</slot>
        </p>
      </div>
      <!-- 显示上传完成时的东西 -->
      <div v-show="isSubmitAdvance || reportAdvanceTo || isTautology">
        <div :class="prefixCls + '-upload-file'">
          <div :class="prefixCls + '-upload-file-icon-model'">
            <slot name="iconFont">
              <span
                style="font-size: 32px"
                class="icon iconfont icon-xingzhuang1"></span>
            </slot>
          </div>
          <div :class="prefixCls + '-upload-file-content'">
            <div
              :class="[
                fileSize ? '' : 'active',
                prefixCls + '-upload-file-content-file-name',
                prefixCls + '-float-l'
              ]">
              <Tooltip
                :delay="500"
                :content="fileName ? fileName : `${accept}文件`">
                <p
                  class="overflow-ellipsis line-clamp-two"
                  :class="[prefixCls + '-upload-file-content-file-name-text']">
                  {{ fileName ? fileName : `${accept}文件` }}
                </p>
              </Tooltip>
            </div>
            <Progress
              v-if="reportAdvanceTo"
              :class="prefixCls + '-float-r'"
              :percent="Number(percentage)"
              :stroke-width="6"></Progress>
            <div
              v-if="isSubmitAdvance || isTautology"
              :class="[prefixCls + '-upload-file-content-state', prefixCls + '-float-r']">
              {{ upDateState }}
            </div>
            <div
              v-if="fileSize"
              :class="[prefixCls + '-upload-file-content-file-size', prefixCls + '-float-r']">
              {{ fileSize }}
            </div>
          </div>
          <div :class="prefixCls + '-upload-file-operation'">
            <span
              v-if="isTautology"
              class="display-flex"
              :class="[prefixCls + '-upload-file-operation-span', prefixCls + '-float-l']">
              <span @click="tautology">
                {{ tautologyText }}
              </span>
              <slot name="tautologyTooltip">
                <Tooltip
                  v-if="isTautologyTooltip"
                  placement="top"
                  max-width="500"
                  :transfer="true"
                  :content="tautologyTooltipContent">
                  <Icon
                    type="ios-help-circle-outline"
                    size="14"></Icon>
                </Tooltip>
              </slot>
            </span>
            <span
              class="display-flex"
              :class="[
                prefixCls + '-upload-file-operation-span',
                prefixCls + '-float-r',
                prefixCls + '-delete-button'
              ]">
              <span @click="clearFile">
                {{ clearFileText }}
              </span>
              <slot name="clearFileTooltip">
                <Tooltip
                  v-if="isClearFileTooltip"
                  placement="top"
                  max-width="500"
                  :transfer="true"
                  :content="clearFileTooltipContent">
                  <Icon
                    type="ios-help-circle-outline"
                    size="14"></Icon>
                </Tooltip>
              </slot>
            </span>
          </div>
        </div>
        <p
          :class="[
            errorNumber === 0 ? prefixCls + '-black' : prefixCls + '-red',
            prefixCls + '-hint-p'
          ]">
          <slot name="hintText">{{ hintText }}</slot>
        </p>
        <div
          v-if="errorTable.length"
          :class="prefixCls + '-error-tables'">
          <Table
            :columns="columnsHeader"
            :data="errorTable"></Table>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
const { prefix } = require('../../../config.js')
const prefixCls = `${prefix}upload-particulars`
export default {
  name: prefixCls,
  props: {
    // 上传地址(String 必填),完整上传地址 必穿
    action: {
      type: String,
      default: '',
      required: true
    },
    // 设置上传的请求头部(Object 非必填),一般业务组件放请求token
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 上传的附带额外参数(Object 非必填)
    uploadData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 上传的文件类型(String 根据所需业务传输类型)
    accept: {
      type: String,
      default: ''
    },
    // 上传方式(String 非必填默认点击)
    type: {
      type: String,
      default: 'select'
    },
    // 上传文件之前的钩子(Function 非必填)验证拖拽格式很有用
    beforeUpload: {
      type: Function,
      default() {
        return {}
      }
    },
    // 文件移除钩子(Function 非必填)
    onRemove: {
      type: Function,
      default() {
        return {}
      }
    },
    // 文件上传成功的钩子(Function 非必穿)
    onSuccess: {
      type: Function,
      default() {
        return {}
      }
    },
    // 文件上传失败的钩子(Function 非必穿)
    onError: {
      type: Function,
      default() {
        return {}
      }
    },
    // 上传文件状态文字提示（String 非必填）
    upDateState: {
      type: String,
      default: ''
    },
    // 失败总条数(Number 非必填)
    errorNumber: {
      type: Number,
      default: 0
    },
    // 上传文件后下方提示文字(String 非必填, 上传成功之后的提示)
    hintText: {
      type: String,
      default: ''
    },
    // 错误显示列表头部（Array 必填, 格式可以参照iview的table）
    columnsHeader: {
      type: Array,
      default: () => [],
      required: true
    },
    // 显示错误信息列表 （Array 非必穿，有就传没有就算了）
    errorTable: {
      type: Array,
      default: () => []
    },
    // 重试文字 (String 非必穿，有就传没有就算了,默认为“重试”）
    tautologyText: {
      type: String,
      default: '重试'
    },
    // 删除文字 (String 非必穿，有就传没有就算了,默认为“删除”）
    clearFileText: {
      type: String,
      default: '删除'
    },
    // 重试后面问号的提示文字 （String 非必穿，默认为无）
    tautologyTooltipContent: {
      type: String,
      default: ''
    },
    // 是否显示重试后面的问号是否显示（String 非必穿，默认为false）
    isTautologyTooltip: {
      type: Boolean,
      default: false
    },
    // 是否显示删除后面的问号是否显示（String 非必穿，默认为false）
    isClearFileTooltip: {
      type: Boolean,
      default: false
    },
    // 删除后面问号的提示文字 （String 非必穿，默认为无）
    clearFileTooltipContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      isSubmitAdvance: false, // 是否预提交了
      reportAdvanceTo: false, // 是否预上传中
      isTautology: false, // 是否重试
      fileName: '', // 上传文件名称
      fileSize: '', // 上传文件大小
      percentage: 0 // 上传进度
    }
  },
  computed: {
    // 显示点击或者拖拽文字信息
    typeText() {
      return this.type === 'drag' ? '点击或拖拽上传' : '点击上传'
    }
  },
  methods: {
    // 上传之前调用
    beforeUploads(file) {
      let beforeUpload = this.beforeUpload(file)
      if (beforeUpload !== undefined && beforeUpload === false) {
        return false
      }
      let sizes = file.size
      if (!sizes) {
        this.fileSize = ''
      }
      var num = 1024 // byte
      if (sizes < num) {
        this.fileSize = sizes + 'B'
      }
      if (sizes < Math.pow(num, 2)) {
        this.fileSize = (sizes / num).toFixed(2) + 'KB'
      } // kb
      if (sizes < Math.pow(num, 3)) {
        this.fileSize = (sizes / Math.pow(num, 2)).toFixed(2) + 'MB'
      }
      let { name } = file
      if (this.accept) {
        let isCheckFile = this.checkFile(name)
        if (!isCheckFile) {
          return false
        }
      }
      if (name) {
        this.fileName = name
      }
      this.reportAdvanceTo = true
      return true
    },
    // 上传成功回调
    handleSuccess(data, file) {
      this.percentage = data.percentage
      this.onSuccess(data, file)
    },
    // 上传进度大小
    handleProgress(data) {
      this.percentage = data.percentage
    },
    /**
     * 重新上传触发，显示(需要重制, percentage: 上传进度 upDateState: 上传状态 totalNumber: 总条数 errorNumber: 失败条数 hintText: 成功提示文字)
     */
    tautology() {
      this.$emit('tautology')
      this.clearFile()
    },
    // 重置部分参数(重新上传重制部分参数)
    clearData() {
      this.percentage = 0
      this.isSubmitAdvance = false
      this.isTautology = false
    },
    // 清除上传文件的内容
    clearFileData() {
      if (this.reportAdvanceTo) {
        setTimeout(() => {
          this.$refs['up-data-file'].clearFiles()
        }, 30)
      }
    },
    // 预提交变成true
    isSubmitAdvanceTrue() {
      this.isSubmitAdvance = true
    },
    // 预提交变成false
    isSubmitAdvanceFalse() {
      this.isSubmitAdvance = false
    },
    // 是否重试true
    isTautologyTrue() {
      this.isTautology = true
    },
    // 是否重试false
    isTautologyFalse() {
      this.isTautology = false
    },
    // 预上传变成true(文件上传成功调用一下)
    ReportAdvanceToTrue() {
      this.reportAdvanceTo = true
    },
    // 预上传变成false(初始化调用一下)
    reportAdvanceToFalse() {
      this.reportAdvanceTo = false
    },
    /**
     * 可调用方法有四个验证、清除、上传失败、上传成功的方法
     * 上传之前的验证方法
     */
    validateData() {
      if (!this.isSubmitAdvance) {
        this.$Message.error('选择要上传的文件!')
        return true
      }
      if (this.isTautology) {
        this.$Message.error('请重新上传文件!')
        return true
      }
      return false
    },
    // 删除或者上传成功之后调用的文件清空方法
    clearFile() {
      this.clearFileData()
      this.reportAdvanceTo = false
      this.fileName = ''
      this.fileSize = ''
      this.clearData()
      this.$emit('clearFile')
    },

    // 验证文件格式
    checkFile(val) {
      var array = [this.accept]
      if (!val) {
        this.$Message.error('选择要上传的文件!')
        return false
      } else {
        var fileContentType = val.match(/^(.*)(\.)(.{1,8})$/)[3]
        let fileContentTypes = '.' + fileContentType
        let isExists = false
        for (let i in array) {
          if (fileContentTypes.toLowerCase() === array[i].toLowerCase()) {
            isExists = true
            return true
          }
        }
        if (isExists === false) {
          this.$Message.error('选择文件的格式不符合要求。')
          return false
        }
        return false
      }
    },
    /**
     * 重制参数 (上传回调失败或者上传完成之后重制 errorTable: 错误列表 upDateState: 提示文字'失败')
     */
    resetData() {
      this.reportAdvanceTo = false
      this.isSubmitAdvance = false
      this.isTautology = true
    },
    // 上传成功显示
    succeedData() {
      this.reportAdvanceTo = false
      this.isSubmitAdvance = true
      this.isTautology = false
    },
    // 上传错误回调
    handleError(data, file) {
      this.resetData()
      this.onError(data, file)
    }
  }
}
</script>