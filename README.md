# Vue Component Template

## 介绍

ads组件库 https://github.com/reyun-fe-team/ry-design

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
