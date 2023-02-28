<!--
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2023-02-23 13:57:53
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2023-02-28 16:02:07
 * @FilePath: /ry-design/src/components/basics/image-preview/image-preview.vue
 * @Description: 预览图片
-->
<!-- https://adsdesk.yuque.com/znb2iu/uqhtkg/cee1qnpk2fn4mwpk -->
<template>
  <div :class="prefixCls">
    <div
      v-show="value"
      v-transfer-dom
      data-transfer="true"
      transfer="true"
      :class="[prefixCls + '-body']">
      <!-- 内容展示区 -->
      <div
        v-if="value"
        :class="[prefixCls + '-body-content']">
        <!-- 关闭按钮 -->
        <Icon
          type="md-close"
          :class="[prefixCls + '-close']"
          @click="handleClose"></Icon>
        <!-- 图片 -->
        <div
          v-if="type === 'IMAGE'"
          :class="[prefixCls + '-image']">
          <img
            :src="src"
            :onerror="onerrorImgSrc" />
        </div>
        <!-- 视频 -->
        <preview-video
          v-if="type === 'VIDEO'"
          :class="[prefixCls + '-video']"
          :poster="poster"
          :src="src"></preview-video>
      </div>
    </div>
  </div>
</template>
<script>
import previewVideo from './preview-video'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'image-preview'
export default {
  name: prefixCls,
  components: {
    previewVideo
  },
  props: {
    // 是否显示弹出层
    value: {
      required: true,
      type: Boolean,
      default: false
    },
    // 视频封面图
    poster: {
      type: String,
      default: ''
    },
    // 图或视频的地址
    src: {
      required: true,
      type: String,
      default: ''
    },
    // 文件类型 => 图片 IMAGE && 视频 VIDEO
    type: {
      type: String,
      default: 'IMAGE'
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    // 关闭
    handleClose() {
      this.$emit('input', false)
    }
  }
}
</script>
