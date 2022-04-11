**Select Attributes**

| 参数                | 说明                                                         | 类型     | 可选值                                                       | 默认值   |
| ------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | -------- |
| avatar          | 标题栏旁的头像 | sring \| slot | -                                                            | -  |
| backIcon | 自定义 back icon ，如果为 false 不渲染 back icon | string \| slot | -                                         | -     |
| breadcrumb | 面包屑的配置 | array \| slot | - | [] |
| extra | 操作区，位于 title 行的行尾 | slot | - | - |
| footer | PageHeader 的页脚，一般用于渲染 TabBar | slot | - | - |
| ghost | pageHeader 的类型，将会改变背景颜色 | boolean | - | true |
| subTitle | 自定义的二级标题文字 | string \|slot | - | - |
| tags | title 旁的 tag 列表 | slot | - | - |
| title | 自定义标题文字 | string \|slot | - | - |

**Select Events**

| 参数 | 说明               | 类型        | 默认值 |
| ---- | ------------------ | ----------- | ------ |
| back | 返回按钮的点击事件 | function(e) | -      |

