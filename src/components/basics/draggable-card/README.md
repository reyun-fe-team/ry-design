### 参数说明

data Array [] 原数据
    label: 标题
    key: 唯一ID
    disabled: 禁用
dataConfig Object { lable: 'label', key: 'key' } 配置原数据键值
height Number 400 内容的高
isClear Boolean true 清空按钮
isUpdate Boolean true 是否修改原数据
disabledOnTop Boolean false 禁用项置顶
beforeRemove Function () => true 删除(清空)之前,接受一个promise
clearAllFunc Function res => res.disabled 保留禁用项  
   参考一下：this.list = this.list.filter(item => this.clearAllFunc(item))

### 事件
@on-change 拖拽改变事件
