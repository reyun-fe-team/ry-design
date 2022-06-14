**UploadParticulars props**

| 参数                | 说明                               | 类型                    | 可选值        | 默认值                   |
|-------------------|----------------------------------|-----------------------|------------|-----------------------|
| value     | v-model双向数据绑定删除弹弹框是否显示（必传）       | Boolean               | true/false | false                 |
| width             | 弹框宽度  | Number/String | -          | 440                  |
| content              | 传入文字，需要显示提示的文字(必填) | String                | -          | ''                |
| iconName       | 显示图片（现仅支持警告图片） | String                 |       warning    | warning                    |
| hasClose | 是否显示右上角关闭差号按钮  | Boolean         | true/false       | false                     |
| maskClosble         | 是否允许点击遮罩层关闭                        | true/false                | false          |

**UploadParticulars events**

| 参数         | 说明        | 类型        | 默认值       |
| ------------ |-----------| ----------- |-----------|
| on-ok | 点击上传触发 | - | - | 
| on-cancel |    点击取消触发   | - | - |
| input |    弹框变化返回现在弹框状态 （true/false）||右上角关闭按钮点击触发false状态  | Boolean | false |
| on-visible-change |    弹框变化触发状态  | - | - |

**UploadParticulars slot**

| 参数         | 说明   |
|----------- |-----------|
| delete-modal-img | 警告图片可替换 | 
| delete-modal-content | 删除弹框文字可替换 |