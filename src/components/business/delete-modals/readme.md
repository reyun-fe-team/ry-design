**UploadParticulars props**

| 参数                | 说明                               | 类型                    | 可选值        | 默认值                   |
|-------------------|----------------------------------|-----------------------|------------|-----------------------|
| deleteContent              | 传入文字，需要显示提示的文字(必填) | String                | -          | ''                |
| deleteIconName       | 显示图片（现仅支持警告图片） | String                 |       warning    | warning                    |
| deleteHasClose | 是否显示右上角关闭差号按钮  | Boolean         | true/false       | false                     |

**UploadParticulars events**

| 参数         | 说明        | 类型        | 默认值       |
| ------------ |-----------| ----------- |-----------|
| deleteInput |    关闭差号触发事件 （true/false）||右上角关闭按钮点击触发false状态  | Boolean | false |

**UploadParticulars slot**

| 参数         | 说明   |
|----------- |-----------|
| delete-modal-img | 警告图片可替换 | 
| delete-modal-content | 删除弹框文字可替换 |