**RadioGroup props**

| 参数                | 说明                               | 类型                    | 可选值        | 默认值                   |
|-------------------|----------------------------------|-----------------------|------------|-----------------------|
| value             | 指定当前选中的项目数据。可以使用 v-model 双向绑定数据  | string/number/boolean | -          | null                  |
| type              | 可选值为 button 或不填，为 button 时使用按钮样式 | string                | -          | button                |
| defaultList       | radio数据                          | array                 | -          | []                    |
| isDisabledAll     | 是否禁用全部项                          | boolean               | true/false | false                 |
| isDisabledItemFun | 当前项是否禁用                          | function              | -          | -                     |
| iconIview         | iview字体图标                        | string                | -          | ios-help-circle-outline |
| maxWidth         | 气泡最大宽度，超出最大值后，文本将自动换行，并两端对齐      | string/number         | -          | 300                   |
| placement         | 气泡提示框出现的位置                         | string                | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-star/tright-end          | top                   |
| delay         | 气泡延迟显示，单位毫秒                        | number                | -          | 1000                  |

| defaultList 字段参数 | 说明   | 类型                    |
|--------|------|-----------------------|
| label  | 当前项对应的name | string/number         |
| value  | 当前项的label | string/number/boolean |
| tooltip | 气泡文案 | string/array          |
| disabled | 是否禁用    | boolean               |

**RadioGroup events**

| 参数         | 说明        | 类型        | 默认值       |
| ------------ |-----------| ----------- |-----------|
| on-change | 在选项状态发生改变时触发，返回当前选中的项 | function(e) | 每一项的value |

