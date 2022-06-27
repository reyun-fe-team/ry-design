**UploadParticulars props**

| 参数                | 说明                               | 类型                    | 可选值        | 默认值                   |
|-------------------|----------------------------------|-----------------------|------------|-----------------------|
| action             | 组件上传地址（必填）  | string | -          | ''                  |
| headers              | 设置上传请求的头部 | Object                | -          | {}                |
| uploadData       | 上传附带的额外参数 | Object                 | -          | {}                    |
| accept     | 上传的文件类型       | String               | - | ''                 |
| type | 上传方式  | String         | select（点击）/drag（拖拽）       | drag                     |
| beforeUpload         | 上传文件之前的钩子，验证拖拽格式很有用                        | Function                | -          | {} |
| onRemove         | 文件移除钩子      | Function         | -          | {}                  |
| onSuccess         | 文件上传成功的钩子                         | Function                | -         | {}                   |
| onError         | 文件上传失败的钩子                        | Function                | -          | {}                  | onFormatError         | 文件上传验证失败的钩子                        | Function                | -          | {}                  | 
hintText         | 上传文件后下方提示文字                        | String                | -          | ''                  | columnsHeader         | 错误显示列表头部（必穿）                       | Array                | -          | []                  | errorTable         | 显示错误信息列表                        | Array                | -          | []                  |
| tautologyText | 重试文字                      | String                | -          | ''                  |
| clearFileText | 删除文字                       | String                | -          | ''                  |
| tautologyTooltipContent | 重试后面问号的提示文字                       | String                | -          | ''                  |
| clearFileTooltipContent | 删除后面问号的提示文字           | String                | -          | ''                  |
| isTautologyTooltip | 重试后面的问号提示是否显示                       | Boolean                | false/true         | false                  |
| isClearFileTooltip | 删除后面的问号提示是否显示                   | Boolean                | false/true          | false                 |
| isClearFile | 是否显示删除按钮                   | Boolean                | false/true          | true                 |
| v-model | 成功状态                   | String                | none（第一步）/succeed（全部成功）/error（失败）/portionSucceed（部分成功）         | true                 |
| format | 支持文件类型                   | String                | 和iview上传一样支持数组验证         | true                 |

**UploadParticulars events**

| 参数         | 说明        | 类型        | 默认值       |
| ------------ |-----------| ----------- |-----------|
| tautology | 重新上传触发，显示(需要重制, percentage: 上传进度 totalNumber: 总条数 successPrompt: 成功提示文字) | - | - | 
| clearFile |    删除或者上传成功之后调用的文件清空方法（所有外部传入参数重置）   | - | - |



**UploadParticulars $refs**

| 参数         | 说明   |
|----------- |-----------|
｜validateData() | 上传之前的验证（包括是否要重新上传文件以及是否未选择上传文件）（可选调用）|

**UploadParticulars slot**

| 参数         | 说明   |
|----------- |-----------|
| upDateImage | 上传图片可替换，上传图片默认为小云朵的图片 | 
| acceptText | 支持文件上传文字可替换，目前为“仅支持xxxx文件上传。” | 
| iconFont | 上传完成过后icon显示的图标默认为excal | 
| clearFileTooltip | 删除按钮后面放提示文字或其他 | 
| tautologyTooltip | 重试按钮后面放提示文字或其他| 
| hintText | 第二步错误文字可替换，如使用可不穿hintText参数| 

