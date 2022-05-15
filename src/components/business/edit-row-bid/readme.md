**Select Attributes**

| 参数                | 说明                                                         | 类型     | 可选值                                                       | 默认值   |
| ------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | -------- |
| type | 输入类型 | string | text 输入文本、 number 输入数字、radio 单选选择、custom 自定义内容             | text |
| value | 需要编辑的数据(必填) | number\| string | -                                         | - |
| iconType | 显示的按钮类型 Icon type。 | string\|slot | 显示的按钮类型 Icon type http://v1.iviewui.com/components/icon | md-create |
| title | 显示标题 | string \|slot | - | - |
| rules | 校验规则（数据同 iview Form Rules）,校验字段只有 value | array | - | - |
| placement | 单个标题的副标题。关闭 isTabs 时有效 | string | 提示框出现的位置，可选值为`top``top-start``top-end``bottom``bottom-start``bottom-end``left``left-start``left-end``right``right-start``right-end` | bottom |
| poptipDisabled | 浮层是否禁用 | boolean | - | false |
| poptipWidth | 浮层宽度 | string \| number | - | 320 |
| showFooter      | 是否显示尾部按钮区域 | boolean | - | true |
| showTextLimit   | 显示文本的长度 | boolean | - | false |
| maxTextNum      | 最大的文本长度 | number | - | - |
| calcTextNumFunc | 文本长度的计算函数(回调传入，当前的文本内容，返回计算后的文本长度) | function | - | - |
| precision       | 数字精度 | number | - | - |
| numberMin       | 数字最小值，设置了最小值，失去校验规则的最小值校验 | number | - | - |
| numberMax       | 数字最大值，设置了最大值，失去校验规则的最大值校验 | number | - | - |
| numberStep      | 数字步长 | number | - | - |
| radioList       | radio 类型时（必填），枚举项。数据只有 name 描述文本、 value 数值、disabled 禁用 | array | - | - |
| confirmFunc     | 点击确定后调用的函数，在没有是用footer slot时，点击确定按钮会触发。返回值为 Promise | function | - | - |
| beforeShowFunc  | 显示浮层之前触发的函数 | function | - | - |
| poptipShowFunc  | 显示浮层触发 | function | - | - |
| poptipHideFunc  | 隐藏浮层触发 | function | - | - |

| radioList 字段参数 | 说明                   | 类型                     |
| ------------------ | ---------------------- | ------------------------ |
| value              | 数值                   | string \| number         |
| name               | 描述文本。支持渲染函数 | string\| render function |
| disabled           | 禁用                   | boolean                  |

