**DatePicker props**

| 参数            | 说明                                                                         | 类型            | 可选值                                                                                                       | 默认值        |
|---------------|----------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------------|------------|
| value         | v-model                                                                    | array         | -                                                                                                         | []         |
| transfer      | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | boolean       | -                                                                                                         | false      |
| clearable     | 是否显示清除按钮	                                                                  | boolean       | -                                                                                                         | false      |
| confirm       | 是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭                                   | boolean       | -                                                                                                         | false      |
| shortcuts     | 左侧快捷方式                                                                     | array         | -                                                                                                         | []         |
| showShortcuts | 是否展示左侧快捷方式                                                                 | boolean       | -                                                                                                         | true       |
| disabledDate  | 禁止选择日期                                                                     | function      | -                                                                                                         | -          |
| format        | 格式化日期展现形式                                                                  | string        | yyyy-MM-dd HH:mm:ss                                                                                       | yyyy-MM-dd |
| placement     | 弹窗出现位置                                                                     | string        | top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end | bottom-end |
| placeholder   | 提示文案                                                                       | string        | -                                                                                                         | 选择日期       |
| size          | 尺寸                                                                         | string        | large、small、default                                                                                       | -          |
| start         | 可选开始日期                                                                     | string        | -                                                                                                         | -          |
| end           | 可选结束日期                                                                     | string        | -                                                                                                         | -          |
| limit         | 选择限制                                                                       | string        | -                                                                                                         | -          |
| options       | 扩展配置                                                                       | object        | -                                                                                                         | -          |
| startRange    | 前置可选范围                                                                     | string/number | -                                                                                                         | -          |
| endRange      | 后置可选范围                                                                     | string/number | -                                                                                                         | -          |
| width         | 选择器宽度                                                                      | string/number | -                                                                                                         | -          |


**DatePicker options**

| 属性           | 说明                                     | 类型       | 可选值 | 默认值 |
|--------------|----------------------------------------|----------|-----|-----|
| shortcuts    | 设置快捷选项，每项内容                            | array    | -   | []  |
| disabledDate | 设置不可选择的日期，参数为当前的日期，需要返回 Boolean 是否禁用这天 | function | -   | -   |



**DatePicker events**

| 参数               | 说明                                          | 返回值        |
|------------------|---------------------------------------------|------------|
| on-click         | 点击触发                                        | -          |
| on-ok            | 在 confirm 模式下有效，点击确定按钮时触发                   | -          |
| on-clear         | 在 confirm 模式或 clearable = true 时有效，在清空日期时触发 | -          |
| on-click-outside | 点击外部关闭下拉菜单时触发                               | -          |
| on-open-change   | 弹出日历和关闭日历时触发	                               | true、false |

