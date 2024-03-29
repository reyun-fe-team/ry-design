<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:53:40
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2022-10-28 16:10:17
 * @FilePath: /ry-design/examples/routers/text-item-show.vue
 * @Description: 极速创建基础信息，单项显示控件 示例
-->
<template>
  <div style="width: 200px; margin: 20px">
    <rd-text-item-show
      :tooltip="basic.text"
      :data="basic">
      <Icon
        slot="btnGroup"
        type="md-create"
        style="padding: 0 5px" />
    </rd-text-item-show>

    <rd-text-item-show
      two-line-display
      :tooltip="basic.text"
      :data="{
        text: 'test2提升应用安装test2提升应用安装test2提升应用安装test2提升应用安装022111:19:2001'
      }">
      <Icon
        slot="btnGroup"
        type="md-create"
        style="padding: 0 5px" />
    </rd-text-item-show>

    <rd-text-item-show
      :tooltip="basic.text"
      type="title"
      :data="title">
      <Icon
        slot="btnGroup"
        type="md-create"
        style="padding: 0 5px" />
    </rd-text-item-show>

    <rd-text-item-show
      type="title"
      :data="titleInfo">
      <Icon
        slot="btnGroup"
        type="md-create"
        style="padding: 0 5px" />
    </rd-text-item-show>

    <rd-text-item-show
      type="classify"
      :data="classify">
      <Icon
        slot="btnGroup"
        type="md-create"
        style="padding: 0 5px" />
    </rd-text-item-show>
  </div>
</template>
<script>
export default {
  data() {
    return {
      basic: {
        text: 'test2提升应用安装022111:19:2001'
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