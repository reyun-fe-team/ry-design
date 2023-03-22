<!--
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2023-02-23 13:57:53
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2023-03-01 13:54:28
 * @FilePath: /ry-design/src/components/basics/image-preview/image-preview.vue
 * @Description: 预览图片
-->
<!-- https://adsdesk.yuque.com/znb2iu/uqhtkg/cee1qnpk2fn4mwpk -->
<template>
  <div :class="prefixCls">
    <div
      v-show="value"
      ref="transfer-body"
      v-transfer-dom
      :data-transfer="transfer"
      :transfer="transfer"
      :class="[prefixCls + '-body']">
      <!-- 内容展示区 -->
      <transition name="fade">
        <div :class="[prefixCls + '-body-content']">
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
              :class="[isImageError ? prefixCls + '-image-error' : '']"
              :src="src"
              @error="handleImgError" />
          </div>
          <!-- 视频 -->
          <preview-video
            v-if="type === 'VIDEO'"
            :value="value"
            :class="[prefixCls + '-video']"
            :poster="poster"
            :src="src"></preview-video>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import imageError from '@src/images/image-preview/image-error.png'
import previewVideo from './preview-video'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'image-preview'
export default {
  name: prefixCls,
  components: {
    previewVideo
  },
  props: {
    // 是否将弹层放置于 body 内
    transfer: {
      type: Boolean,
      default: true
    },
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
      prefixCls,
      isImageError: false
    }
  },
  watch: {
    // 开启后，动态设置层级
    value: async function () {
      await this.$nextTick()
      let zIndex = this.getMaxZIndex()
      this.$refs['transfer-body'].style.zIndex = this.value ? zIndex : ''
    }
  },
  methods: {
    // 获取最大的z-index， 记住要在页面渲染完毕执行
    getMaxZIndex() {
      let allEles = document.getElementsByTagName('*')
      let arr = [...allEles].map(e => +window.getComputedStyle(e).zIndex || 0)
      return arr.length ? Math.max(...arr) + 1 : 0
    },
    // 图片加载失败
    handleImgError(e) {
      this.isImageError = true
      e.target.src = imageError
    },
    // 关闭
    handleClose() {
      this.$emit('input', false)
    }
  }
}
</script>
