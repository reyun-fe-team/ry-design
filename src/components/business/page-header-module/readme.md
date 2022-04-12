**Select Attributes**

| 参数                | 说明                                                         | 类型     | 可选值                                                       | 默认值   |
| ------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | -------- |
| isTabs    | 是否开启【Tabs】组件 | boolean | -                                                            | false |
| isRoute | 是否开启 【Tabs】组件的路由关联。开启时必须开启”isTabs“ | boolean | -                                         | false |
| tabsList | 【Tabs】组件的配置。支持”label  name  disabled“三个字段 | array | - | [] |
| activeValue | 当前选中的”tab“页的值 | string | - | - |
| singleTitle | 单个标题。关闭 isTabs 时有效 | string \|slot | - | - |
| subTitle | 单个标题的副标题。关闭 isTabs 时有效 | string \| slot | - | - |
| extra | 右侧区域 | slot | - | - |

| tabsList 字段参数 | 说明                                         | 类型               |
| ----------------- | -------------------------------------------- | ------------------ |
| label             | 选项卡头显示文字，支持 Render 函数           | string \| function |
| name              | 用于标识当前面板，对应 value，默认为其索引值 | string             |
| disabled          | 是否禁用该选项卡。默认不禁用                 | boolean            |

**Select Events**

| 参数         | 说明                          | 类型        | 默认值 |
| ------------ | ----------------------------- | ----------- | ------ |
| on-tab-click | 开启【Tabs】组件时，切换tab页 | function(e) | -      |

