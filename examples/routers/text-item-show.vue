<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:53:40
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2022-10-28 16:10:17
 * @FilePath: /ry-design/examples/routers/text-item-show.vue
 * @Description: 极速创建基础信息，单项显示控件 示例
-->
<template>
  <div style="margin: 20px; width: 400px">
    <rd-text-item-show
      :tooltip="basic.text"
      :data="basic">
      <template #btnGroup>
        <Icon
          style="width: 50px"
          type="md-create" />
      </template>
    </rd-text-item-show>

    <rd-text-item-show
      two-line-display
      :tooltip="basic.text"
      :data="basic">
      <template #btnGroup>
        <Icon
          style="width: 50px"
          type="md-create" />
      </template>
    </rd-text-item-show>

    <rd-text-item-show
      :tooltip="basic.text"
      type="title"
      :data="title">
      <template #btnGroup>
        <Icon
          style="width: 50px"
          type="md-create" />
      </template>
    </rd-text-item-show>

    <rd-text-item-show
      type="title"
      :data="titleInfo">
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
        text: '极速创建基础信息，单项显示控件 示例极速创建基础信息，单项显示控件 示例极速创建基础信息，单项显示控件 示例,极速创建基础信息，单项显示控件 示例极速创建基础信息，单项显示控件 示例极速创建基础信息，单项显示控件 示例,极速创建基础信息，单项显示控件 示例极速创建基础信息，单项显示控件 示例极速创建基础信息，单项显示控件 示例'
      },
      title: {
        title: '极速创建基础信息',
        subTitle: '单项显示控件 示例极速创建基础信息，单项显示控件 示例',
        thumbnailInfo: {
          style: {
            'border-radius': '10%'
          },
          src: ''
        }
      },
      titleInfo: {
        title: '没有图片的标题',
        subTitle: '没有图片的子标题'
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
        thumbnail: ''
      }
    }
  }
}
</script>