# Vue Component Template

## 介绍

热云 ads 组件库 github 地址： https://github.com/reyun-fe-team/ry-design

## 开发

1. 组件在 `src/component/index.vue` 中编写（打包入口）
2. 其它依赖的 `.vue` 文件也可以在 `src/component` 目录中创建，或自定义其它路径
3. 样式在 `src/style/index.less`

## 实时预览

1. 运行 `npm run dev` 可开启实时预览
2. 预览文件在 `examples/routers/index.vue` 中开发

## 编译

1. 运行 `npm run build` 可打包，这个命令包含两个命令：`npm run build:style` 和 `npm run build:prod`，分别是 CSS 和组件
2. 编译后的文件在 `dist` 目录

## 发布

1. 可直接复制 dist 目录到业务中使用
2. npm 下载

## 文件目录

**style**

|-- animation (动画)

|-- common (全局样式)

|-- mixins (混入)

|-- components (组件样式)

    basics 基础组件
    business 业务组件

    用法：css 定义
    例子：
    @multi-transfer: ~"@{css-prefix}transfer";

    css-prefix 在custom.less文件中定义:
    @css-prefix    : rd-;

    用法 vue
    组件name: 'rd-transfer'; 可参考transfe组件, rd-组件

    组件最外层 class名称 ：'组件-wrapper'

**components**

    basics 基础组件
    business 业务组件
