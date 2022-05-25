**Select Attributes**

| 参数                | 说明                                                         | 类型     | 可选值                                                       | 默认值   |
| ------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | -------- |
| minWidth | 容器最小宽度 | String, Number | -      | 1152 |
| width | 适应区域的宽度 设置为0，有内容撑开（自适应宽度，等分宽度） | String, Number | -                                         | 0 |
| height | 适应区域的高度 | String, Number | - | 480 |
| slotList | 配置的组件Id列表，必填项，控制顺序和位置 | Array | - | - |
| slotRenders | 根据配置的id，获取到的render函数列表 | Object | - | {} |



**组件 layout-module-view 的属性**


| 参数         | 说明                 | 类型            |
| ------------ | -------------------- | --------------- |
| title        | 名称                 | string          |
| showFooter   | 显示尾部。默认不显示 | Boolean         |
| headerRender | 头部渲染函数         | render function |
| footerRender | 尾部渲染函数         | render function |
| mainRender   | 中间内容渲染函数     | render function |
