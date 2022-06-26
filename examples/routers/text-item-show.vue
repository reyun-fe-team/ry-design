<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:53:40
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-06-24 19:16:41
 * @FilePath: /ry-design/examples/routers/text-item-show.vue
 * @Description: 极速创建基础信息，单项显示控件 示例
-->
<template>
  <div style="margin: 20px">
    <rd-text-item-show
      two-line-display
      :data="basic">
      <template #btnGroup>
        <Icon
          style="width: 50px"
          type="md-create" />
      </template>
    </rd-text-item-show>

    <rd-text-item-show
      type="title"
      :data="title">
      <template #btnGroup>
        <Icon
          style="width: 50px"
          type="md-create" />
      </template>
    </rd-text-item-show>

    <rd-text-item-show
      type="classify"
      :data="classify">
      <template #btnGroup>
        <Icon
          style="width: 50px"
          type="md-create" />
      </template>
    </rd-text-item-show>
  </div>
</template>
<script>
export default {
  data() {
    return {
      basic: {
        text: '极速创建基础信息，单项显示控件 示例极速创建基础信息，单项显示控件 示例极速创建基础信息，单项显示控件 示例'
      },
      title: {
        title: '极速创建基础信息',
        subTitle: '单项显示控件 示例极速创建基础信息，单项显示控件 示例'
      },
      classify: {
        classify: {
          name: '商品库名称',
          id: '5533567'
        },
        info: {
          name: '商品名称',
          id: '5533567'
        },
        thumbnail:
          'https://t7.baidu.com/it/u=138126325,1485620701&fm=218&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=7FAB2EC3909A35D01E299C1A030010D2&sec=1656176400&t=2db15a0e3ebd7bde9bff89d831d1633f'
      }
    }
  }
}
</script>