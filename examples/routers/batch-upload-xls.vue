<template>
  <main class="batch-upload-xls">
    <div>
      <span>上传文件成功事例</span>
      <rd-batch-upload-xls
        ref="upDataFiles"
        :action="action"
        :accept="accept"
        :format="format"
        :is-succeed-type="isSucceedType"
        :type="type"
        :hint-text="hintText"
        :error-table="errorTable"
        :columns-header="columnsHeader"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        @tautology="clearData"
        @clearFile="clearFile"></rd-batch-upload-xls>
      <span>上传文件失败事例</span>
      {{ isSucceedType }}
      <rd-batch-upload-xls
        ref="upDataFilesError"
        :action="actionError"
        :accept="acceptError"
        :format="formatError"
        :is-succeed-type="isSucceedTypeError"
        :type="typeError"
        :is-tautology-tooltip="isTautologyTooltip"
        :tautology-tooltip-content="tautologyTooltipContent"
        :tautology-text="tautologyText"
        :error-table="errorTableError"
        :columns-header="columnsHeaderError"
        :before-upload="beforeUpload"
        :on-success="handleSuccessError"
        :on-error="handleErrorError"
        :is-clear-file="false"
        @tautology="clearDataError"
        @clearFile="clearFileError">
        <span slot="hintText">
          {{ hintTextError }}
          <i style="color: blue">下载失败数据</i>
        </span>
      </rd-batch-upload-xls>
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
      isSucceedType: 'none', // 成功状态状态驱动事件
      isSucceedTypeError: 'none', // 失败状态状态驱动事件
      format: ['xls'], // 支持文件类型
      formatError: ['xls'], // 支持文件类型
      type: 'drag', // 上传方式
      typeError: 'drag', // 上传方式 失败
      hintText: '', // 成功提示文字
      hintTextError: '', // 成功提示文字
      errorTable: [], // 错误的列表
      errorTableError: [], // 错误的列表 失败
      isTautologyTooltip: true, // 重试后面的问号是否显示 失败
      tautologyTooltipContent: '这是一段提示文字', // 重试后面问号的文字提示内容 失败
      tautologyText: '重新上传', // 重试按钮文字改变 失败
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
      this.isSucceedType = 'none'
      this.hintText = ''
      this.errorTable = []
    },
    // 重置部分参数 失败
    clearDataError() {
      this.isSucceedTypeError = 'none'
      this.hintTextError = ''
      this.errorTableError = []
    },
    // 重置参数
    resetData() {
      this.isSucceedType = 'succeed'
      this.errorTable = []
      this.hintText = '上传成功'
    },
    // 重置参数
    resetDataError() {
      this.errorTableError = [
        {
          title: '上传条目错误',
          content: '错误条数1，2，3'
        }
      ]
      this.isSucceedTypeError = 'portionSucceed'
      this.hintTextError = '上传失败'
    }
  }
}
</script>