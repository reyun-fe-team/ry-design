/* eslint-disable */
module.exports = {
  root: true,
  extends: ['plugin:vue/recommended', 'plugin:prettier-vue/recommended', 'eslint:recommended'],
  globals: {
    _: 'readonly',
    $: 'readonly',
    require: 'readonly',
    process: 'readonly'
  },
  rules: {
    // vue组件名称
    'vue/multi-word-component-names': 0,
    // v-html指令
    'vue/no-v-html': 0,
    // vue template
    'vue/no-lone-template': 0,
    // console
    'no-console': [1, { allow: ['warn', 'error'] }],
    // 强制所有控制语句使用一致的括号风格
    curly: 2,
    // 禁止直接调用 Object.prototypes 的内置属性
    'no-prototype-builtins': 1,
    // 对象数组尾部不加逗号
    'comma-dangle': ['error', 'never'],
    // 不添加分号
    semi: ['error', 'never'],
    // 使用单引号
    quotes: ['error', 'single'],
    // html 标签闭合
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'never'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    // 单行html元素内容在新的一行
    'vue/singleline-html-element-content-newline': 0,
    // 多行html元素内容在新的一行
    'vue/multiline-html-element-content-newline': 0,
    // 控制 尾行 >
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
