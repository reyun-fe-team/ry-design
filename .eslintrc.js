/* eslint-disable */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
    'eslint:recommended'
  ],
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
    'no-prototype-builtins': 1
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
