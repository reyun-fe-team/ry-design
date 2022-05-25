```
data[item] = {
    {
        title: '广告组名称', // 标题
        key: 'campaignName', // 唯一ID
        slot: 'campaignName', // iview-table-column
        sortable: 'custom', // iview-table-column
        minWidth: 180,  // iview-table-column
        fixed: 'left', 
        hide: false, // 是否隐藏
        check: true, // 是否选中
        disabled: true, // 禁用
        edit: true, // 可编辑
        // 前缀
        prefix: {
            icon: "unlock",
            content: ''
        },
        // 后缀
        suffix: {
            icon: 'ios-information-circle',
            content: ''
        }
    }
}

value | array | 已选数据
data | array | 回显数据
editCallBack | Function | 编辑方法接受一个promise
```