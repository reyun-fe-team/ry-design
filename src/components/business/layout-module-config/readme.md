**Select Attributes**

| 参数         | 说明                                                        | 类型   | 可选值                                    | 默认值 |
| ------------ | ----------------------------------------------------------- | ------ | ----------------------------------------- | ------ |
| widthType    | 宽度的使用形式                                              | String | 等分 equalDivision 自定义比例 customScale | {}     |
| cloWidthList | 自定义时的定义的每一列的宽度集合                            | Array  | -                                         | []     |
| minWidth     | 容器最小宽度                                                | Number | -                                         | 1152   |
| width        | 适应区域的宽度 设置为 0，有内容撑开（自适应宽度，等分宽度） | Number | -                                         | 0      |
| height       | 适应区域的高度                                              | Number | -                                         | 480    |
| slotList     | 配置的组件 Id 列表，必填项，控制顺序和位置                  | Array  | -                                         | -      |
| slotRenders  | 根据配置的 id，获取到的 render 函数列表                     | Object | -                                         | {}     |

**组件 layout-module-view 的属性**

| 参数         | 说明                 | 类型            |
| ------------ | -------------------- | --------------- |
| title        | 名称                 | string          |
| showFooter   | 显示尾部。默认不显示 | Boolean         |
| headerRender | 头部渲染函数         | render function |
| footerRender | 尾部渲染函数         | render function |
| mainRender   | 中间内容渲染函数     | render function |
| header       | 头部渲染 slot        | slot            |
| footer       | 尾部渲染 slot        | slot            |
| main         | 中间内容渲染 slot    | slot            |
