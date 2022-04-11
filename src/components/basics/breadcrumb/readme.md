**Select Attributes**

| 参数                | 说明                                                         | 类型     | 可选值                                                       | 默认值   |
| ------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | -------- |
| data                | 组件数据 | array    | -                                                            | []   |
| separator      | 自定义分隔符                                       | String \|Element String | -                                             | /      |

data参数说明：

| 参数            | 说明                                                 | 类型              | 默认值 |
| --------------- | ---------------------------------------------------- | ----------------- | ------ |
| data[n].to      | 链接，不传则没有链接，支持 vue-router 对象           | String  \| Object | -      |
| data[n].replace | 路由跳转时，开启 replace 将不会向 history 添加新记录 | Boolean           | false  |
| data[n].target  | 相当于 a 链接的 target 属性                          | String            | _self  |
| data[n].append  | 同 vue-router append  (iview 3.4.0支持)              | Boolean           | false  |
