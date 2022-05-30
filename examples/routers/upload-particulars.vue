<template>
  <main class="upload-particulars">
    <div>
      <span>上传文件成功事例</span>
      <rd-upload-particulars
        ref="upDataFiles"
        :action="action"
        :accept="accept"
        :type="type"
        :up-date-state="upDateState"
        :error-number="errorNumber"
        :hint-text="hintText"
        :error-table="errorTable"
        :columns-header="columnsHeader"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        @tautology="clearData"
        @clearFile="clearFile"></rd-upload-particulars>
      <span>上传文件失败事例</span>
      <rd-upload-particulars
        ref="upDataFilesError"
        :action="actionError"
        :accept="acceptError"
        :type="typeError"
        :up-date-state="upDateStateError"
        :error-number="errorNumberError"
        :hint-text="hintTextError"
        :error-table="errorTableError"
        :columns-header="columnsHeaderError"
        :before-upload="beforeUpload"
        :on-success="handleSuccessError"
        :on-error="handleErrorError"
        @tautology="clearDataError"
        @clearFile="clearFileError"></rd-upload-particulars>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      action: '', // 上传地址
      actionError: '', // 上传失败地址
      accept: '.xls',
      acceptError: '.xls',
      type: 'drag', // 上传方式
      typeError: 'drag', // 上传方式 失败
      upDateState: '', // 上传状态
      upDateStateError: '', // 上传状态 失败
      errorNumber: 0, // 失败条数
      errorNumberError: 0, // 失败条数 失败
      totalNumber: 0, // 总条数
      totalNumberError: 0, // 总条数 失败
      hintText: '', // 成功提示文字
      hintTextError: '', // 成功提示文字
      errorTable: [], // 错误的列表
      errorTableError: [], // 错误的列表 失败
      columnsHeader: [
        // 错误列表表头
        {
          title: '错误原因',
          key: 'title',
          width: 200
        },
        {
          title: '错误所在行数',
          key: 'content'
        }
      ],
      columnsHeaderError: [
        // 错误列表表头 失败
        {
          title: '错误原因',
          key: 'title',
          width: 200
        },
        {
          title: '错误所在行数',
          key: 'content'
        }
      ]
    }
  },
  methods: {
    // 上传文件 成功
    beforeUpload() {},
    // 上传文件 失败
    beforeUploadError() {},
    // 上传完成操作 成功
    handleSuccess() {},
    // 上传完成操作 失败
    handleSuccessError() {},
    // 上传错误回调 成功
    handleError() {
      this.resetData()
    },
    // 上传错误回调 失败
    handleErrorError() {
      this.resetDataError()
    },
    // 重置上传及删除也用同样的方法 成功
    clearFile() {
      this.clearData()
    },
    // 重置上传及删除也用同样的方法 失败
    clearFileError() {
      this.clearDataError()
    },
    // 重置部分参数 成功
    clearData() {
      this.upDateState = ''
      this.totalNumber = 0
      this.errorNumber = 0
      this.hintText = ''
      this.errorTable = []
    },
    // 重置部分参数 失败
    clearDataError() {
      this.upDateStateError = ''
      this.totalNumberError = 0
      this.errorNumberError = 0
      this.hintTextError = ''
      this.errorTableError = []
    },
    // 重置参数
    resetData() {
      this.errorTable = []
      this.upDateState = '成功'
      this.hintText = '上传成功'
      this.$refs['upDataFiles'].succeedData()
    },
    // 重置参数
    resetDataError() {
      this.errorTableError = [
        {
          title: '上传条目错误',
          content: '错误条数1，2，3'
        }
      ]
      this.totalNumberError = 1
      this.errorNumberError = 1
      this.upDateStateErrorS = '失败'
      this.hintTextError = '上传失败'
    }
  }
}
</script>