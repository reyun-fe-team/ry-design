# Ry Design

## 介绍


热云 ads 组件库 github
官网地址 https://web.adsdesk.cn

Npm 地址
https://www.npmjs.com/package/ry-design 
## 版本

<img src="https://img.shields.io/npm/v/ry-design" alt="" />

## 引入方式

    import ryDesign from "ry-design"
    import 'ry-design/dist/styles/main.css'
    Vue.use(ryDesign)

## 开发

1. 申请加入 reyun-fe-team 团队，拉取代码
2. 和 ui 设计师沟通，决策通用设计
3. 创建分支（根据组件名称, 名称要和功能相结合，可提前沟通）
4. 组件在 src/component 中开发（打包入口）
5. 样式在 src/style 下开发

## 实时预览

1. 运行 `npm run dev` 可开启实时预览
2. 预览文件在 `examples/routers/index.vue` 中开发

## 编译 发布

1.运行 npm run build 可打包, 编译后的文件在 dist 目录，dist 需要提交到 gitlab 

2.发布 npm :

	1. package.json 中 version 版本 +1
	2. 运行 npm login npm publish

## 文件目录

**style**

|-- animation (动画)

    1.关于动画的集合

|-- common (全局样式)

    1. view-design文件夹下，根据每个组件命名，做iview的单组件样式覆盖
    2. view-design.less 负责对iview组件font-size设置12px

|-- mixins (混入)

    1. clearfix
    2. display

|-- components (组件样式)

    basics      基础组件
    business  业务组件

    定义：@组件名称:  ~"@{css-prefix} 组件名称:"
    例：  @multi-transfer: ~"@{css-prefix}transfer"

    custom.less :定义基础通用样式
    例：
    1. @css-prefix : rd-                 // 定义组件命名前缀
    2. @primary-color : #3989fa
    3. @font-size-base : 12px

**components 组件**

    basics     基础组件
    business 业务组件

    1. 组件命名 rd-'组件' ,可参考transfe组件, 'rd-transfer'
    2. 组件最外层 class命名 ：rd-'组件'
    3. class命名：前缀+拼接，所有class都是由prefixCls开头
      例：:class="prefixCls + '-content'"            prefixCls 代表 'rd-'

**组件命名**

    组件文件名为 pascal-case 格式
    page-header.vue

    组件来源：
    1. 对ADS来说，更多来源于已开发的组件
    2. 来源ui设计师

**examples 事例**

用于组件内部开发调试，可以直接调用 src/components 下的组件
