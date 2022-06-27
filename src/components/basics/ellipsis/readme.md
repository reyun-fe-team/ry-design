### API

#### props

| 属性 | 说明 | 类型 | 默认值 |
|:-------|:---------|:--------|:--------|
| `text` |文本|String|-| 
|`height`|	限制的高度|Number|-| 
|`lines`|限制行数，将换算为 height。如果设置了 height，则直接使用 height 计算|Number|-| 
|`length`|按照指定长度截取|Number|-| 
|`full-width-recognition`|是否将全角字符的长度视为2来计算字符串长度，适用于 length|Boolean|false| 
|`disabled`|是否禁用|Boolean|false| 
|`tooltip`|是否开启 tooltip|Boolean|false| 
|`transfer`|tooltip 的 transfer 属性|Boolean|false| 
|`theme`|tooltip 的 theme 属性，可选值为 light 或 dark|String|dark| 
|`max-width`|tooltip 的 max-width 属性|	String, Number|250| 
|`placement`|tooltip 的 placement 属性|String|bottom| 

#### events

|事件名|说明|返回值|
|:-------|:---------|:--------|
|`on-show`|文本全部展示的时候触发|-|
|`on-hide`|文本省略的时候触发|-|

#### slots  
| 名称 | 说明 |
|------|------|
| `prefix` | 前缀 |
| `more` | 自定义结尾，默认`...` |
| `suffix` | 后缀 |

