**AccountList props**

| 参数             | 说明              | 类型            | 可选值        | 默认值                 |
|----------------|-----------------|---------------|------------|---------------------|
| width          | 组件宽度            | string        | -          | 100%                |
| height         | 组件高度            | string        | -          | 438px               |
| dataList       | 左侧列表数据          | array         | -          | []                  |
| id             | 左侧列表项id的别       | string        | -          | -                   |
| itemName       | 左侧列表项名称的key     | string        |            | adsMediaAccountName |
| itemId         | 左侧列表项id的key     | string        |            | adsMediaAccountId   |
| itemNum        | 左侧列表项已选提示的key   | string        | -          | string              |
| itemIconCustom | 左侧列表项的自定义字体图标   | string        | -          | iconCustom          |
| itemIconIview  | 左侧列表项的iview字体图标 | string        | -          | iconIview           |
| iconSize       | 字体图标大小          | number        | -          | 12                  |
| iconColor      | 字体图标颜色          | string        | -          | #277ff3             |
| isEvent        | 是否点击返回新项        | boolean       | true/false | true                |
| leftTitle      | 左侧列顶部标题         | string        | -          | 账户                  |
| showLeft       | 是否展示左侧列         | boolean       | true/false | true                |
| defaultActive  | 默认选择项           | string/number | -          | -                   |
| rightBoxStyle  | 右侧盒子样式          | string/object | -          | null                |

| dataList 字段参数       | 说明        | 类型            |
|---------------------|-----------|---------------|
| adsMediaAccountName | 当前项展示的名称  | string        |
| adsMediaAccountId   | 每一项的唯一标识  | string/number |
| num                 | 选中的提示文案   | string        |
| iconCustom          | 自定义字体图标   | string        |
| iconIview           | iview字体图标 | string        |

**AccountList events**

| 参数        | 说明        | 类型          | 默认值        |
|-----------|-----------|-------------|------------|
| on-change | 点击左侧项时的回调 | function(e) | 每一项的itemId |

