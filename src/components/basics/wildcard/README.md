##props
v-model/value
saveRule 保存默认规则
data   通配符待选数据
dataConfig 数据配置
calculateLength 计划字符长度
maxlength 字符长度
disabled 禁用
prefix 前缀
joinSymbol 连接符
<!-- 通配符label配置 -->
wildcardLabelConfig: {
    label: '通配符:',
    width: 48,
    tooltip: ''
}
<!-- formItem配置 -->
option: {
    prop: '',
    label: '',
    labelWidth: 104
}
clearable  清空


Event
on-change     名称改变时, 返回名称
on-name-programs  名称改变时，返回item.id
on-save-rule  保持默认规则