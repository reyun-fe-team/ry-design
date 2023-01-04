// .stylelintrc.js
module.exports = {
    files: ['**/*.{html,vue,css,less}',],
    // ignoreFiles: ["src/**/*.css"],// 忽略文件
    customSyntax: 'postcss-less', // 指定要在代码上使用的自定义语法。https://stylelint.io/user-guide/usage/options#customsyntax
    plugins: [
        'stylelint-order'  // 格式化css文件时对代码的属性进行排序
    ],
    extends: [
        "stylelint-config-standard",  // stylelint的推荐配置
    ],
    overrides: [
        {
            files: ["**/*.{htm,html,vue}"],
            customSyntax: "postcss-html"
        },
        {
            files: ["**/*.{css,less}"],
            customSyntax: "postcss-less"
        },
    ],
    rules: {
        "selector-class-pattern": [ // 命名class规范
            "^([a-z][a-z0-9]*)(-{1,2}[a-z0-9]+)*$",
            {
                "severity": "warning",
                "message": "不符合命名规范"
            }
        ],
        "selector-id-pattern": [ // 命名id规范
            "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            {
                "severity": "warning",
                "message": "不符合命名规范"
            }
        ],
        "number-max-precision": 3, // 限制数字中允许的小数位数
        "color-function-notation": 'legacy', // 颜色函数符号rgba\hsl
        "selector-pseudo-element-no-unknown": null, // 禁止未知选择器,要使用::v-deep
        "max-nesting-depth": [5, {
            "message": "嵌套层级最大支持5级"
        }], // 最大嵌套层数
        "string-quotes": "single", // 使用单引号
        "at-rule-empty-line-before": null, // 要求或禁止在@规则之前的空行（可自动修复）
        "no-duplicate-selectors": [true, { // 禁止样式表中的重复选择器
            "message": "禁止样式表中的重复选择器"
        }],
        "at-rule-no-unknown": true, // 禁止未知的@规则
        "at-rule-name-case": null,// 指定@规则名的大小写
        "length-zero-no-unit": true,  // 禁止零长度的单位（可自动修复）
        "shorthand-property-no-redundant-values": true, // 简写属性
        "number-leading-zero": "always", // 小数可以有一个前导零。与prettier冲突
        "declaration-block-no-duplicate-properties": true, // 禁止声明快重复属性
        "selector-max-id": null, // 限制一个选择器中 ID 选择器的数量
        "indentation": 2,
        "font-family-no-missing-generic-family-keyword": [true, {
            "message": "需要特殊指定字体请至少添加一个通用字体"
        }],
        "no-empty-source": [true, {
            "message": "禁止空源码"
        }],
        "declaration-block-no-redundant-longhand-properties": [true, {
            "message": "禁止可合并为一个简写属性的扩写属性"
        }], // 
        "no-eol-whitespace": null, // 禁止行尾空白符 [解决vue.styleInline换行问题]
        "no-extra-semicolons": null, // 禁止额外的分号（可自动修复）
        "declaration-block-trailing-semicolon": null, // 要求或禁止声明块的一个尾随分号
        "no-descending-specificity": null, // ? 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。
        "order/properties-order": [ // 规则顺序
            "position",
            "top",
            "right",
            "bottom",
            "left",
            "z-index",
            "display",
            "float",
            "width",
            "height",
            'max-width',
            'max-height',
            'min-width',
            'min-height',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'margin-collapse',
            'margin-top-collapse',
            'margin-right-collapse',
            'margin-bottom-collapse',
            'margin-left-collapse',
            'overflow',
            'overflow-x',
            'overflow-y',
            'clip',
            'clear',
            'font',
            'font-family',
            'font-size',
            'font-smoothing',
            'osx-font-smoothing',
            'font-style',
            'font-weight',
            "line-height",
            'letter-spacing',
            'word-spacing',
            "color",
            "text-align",
            'text-decoration',
            'text-indent',
            'text-overflow',
            'text-rendering',
            'text-size-adjust',
            'text-shadow',
            'text-transform',
            'word-break',
            'word-wrap',
            'white-space',
            'vertical-align',
            'list-style',
            'list-style-type',
            'list-style-position',
            'list-style-image',
            'pointer-events',
            'cursor',
            "background",
            "background-color",
            "border",
            "border-radius",
            'content',
            'outline',
            'outline-offset',
            'opacity',
            'filter',
            'visibility',
            'size',
            'transform',
        ]
    }
};