// prettier 编辑器格式化配置
module.exports = {
    // tab缩进大小,默认为2
    tabWidth: 2,
    // 使用tab缩进，默认false
    // 使用分号, 默认 true
    semi: true,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    singleQuote: true,
    // 行尾逗号,默认none,可选 none|es5|all
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    arrowParens: 'avoid',
    // 借助 eslint 格式化
    eslintIntegration: true
}
