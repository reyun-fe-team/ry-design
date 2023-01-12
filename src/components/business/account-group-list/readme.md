**AccountList props**

| 参数             | 说明               | 类型            | 可选值           | 默认值                 |
|----------------|------------------|---------------|---------------|---------------------|
| width          | 组件宽度             | string        | -             | 100%                |
| height         | 组件高度             | string        | -             | 438px               |
| data           | 左侧列表数据           | array         | -             | []                  |
| groupName      | 左侧列表组名称的key      | string        |   -             | groupName           |
| groupId        | 左侧列表组id的key      | string        |         -       | groupId             |
| id             | 左侧列表每项id的别       | string        | -             | -                   |
| itemName       | 左侧列表每项名称的key     | string        |        -        | adsMediaAccountName |
| itemId         | 左侧列表每项id的key     | string        |      -          | adsMediaAccountId   |
| itemNum        | 左侧列表每项已选提示的key   | string        | -             | string              |
| itemIconCustom | 左侧列表每项的自定义字体图标   | string        | -             | iconCustom          |
| itemIconIview  | 左侧列表每项的iview字体图标 | string        | -             | iconIview           |
| iconSize       | 字体图标大小           | number        | -             | 12                  |
| iconColor      | 字体图标颜色           | string        | -             | #277ff3             |
| maxWidth      | 气泡延迟最大宽度         | number        | -             | 320                 |
| delay      | 气泡延迟时间           | number        | -             | 1000                |
| leftTitle      | 左侧列顶部标题          | string        | -             | 账户                  |
| defaultActive  | 默认选择项            | string/number | -             | -                   |
| rightBoxStyle  | 右侧盒子样式           | string/object | -             | null                |

| dataList 字段参数       | 说明  | 类型            |
|---------------------|-----|---------------|
| groupName | 组名称 | string        |
| groupId   | 组id | string/number |
| children       | 组集合 | array         |

| children 字段参数    | 说明        | 类型            |
|------------------|-----------|---------------|
| mediaAccountName | 当前项展示的名称  | string        |
| mediaAccountId   | 每一项的唯一标识  | string/number        |
| num              | 选中的提示文案   | string |
| iconCustom       | 自定义字体图标   | string       |
| iconIview        | iview字体图标 | string       |

**AccountList events**

| 参数         | 说明        | 类型        | 默认值                      |
| ------------ |-----------| ----------- |--------------------------|
| on-change | 点击左侧项时的回调 | function(child, parent) | child: 选中项id/parent: 组id |

