<!--
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2023-02-28 14:51:20
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2023-02-28 15:53:11
 * @FilePath: /ry-design/src/components/basics/image-preview/video-play.vue
 * @Description: 视频播放
-->
<template>
  <div
    :class="[prefixCls]"
    @click.stop
    @mouseleave="handleMouseLeave"
    @mouseenter="handlemouseEnter">
    <!-- 视频加载错误 -->
    <img
      v-if="isVideoLoadError"
      :class="[prefixCls + '-error']"
      :src="videoError" />
    <!-- 视频加载成功 -->
    <template v-if="!isVideoLoadError">
      <video
        v-if="!isVideoLoadError"
        ref="VIDEO"
        :src="src"
        muted
        preload="none"
        :poster="poster"
        @error="handleError"
        @ended="handleEnded"></video>
      <!-- 播放按钮 -->
      <div
        v-if="isPlay"
        :class="iconClassName"
        @click.stop="handleClickPlay">
        <img :src="isPlayIcon ? videoPlay : videoPause" />
      </div>
      <!-- 静音 -->
      <div
        v-if="!isPlayIcon"
        :class="[prefixCls + '-voice']">
        <Icon
          :type="isOpenVoice ? 'md-volume-up' : 'md-volume-off'"
          @click.stop="isOpenVoice ? handleOnMuted : handleOffMuted"></Icon>
      </div>
    </template>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'preview-video'

import videoError from '@src/images/image-preview/video-default.png'
import videoPlay from '@src/images/image-preview/video-play.svg'
import videoPause from '@src/images/image-preview/video-pause.svg'

export default {
  props: {
    src: {
      required: true,
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      videoError,
      videoPlay,
      videoPause,
      // 是否在播放
      isPlay: true,
      // 播放按钮图标
      isPlayIcon: true,
      // 是否开启音量
      isOpenVoice: false,
      // 视频加载错误
      isVideoLoadError: false
    }
  },
  computed: {
    iconClassName() {
      let list = [
        this.prefixCls + '-icon',
        this.isPlayIcon ? this.prefixCls + '-icon-play' : this.prefixCls + '-icon-pause'
      ]
      return list
    }
  },
  async mounted() {
    // 监听事件
    await this.$nextTick()
    this.init()
  },
  methods: {
    init() {
      this.isPlay = false
      this.playVideo()
    },
    // 视频播放
    playVideo() {
      this.isPlayIcon = false
      this.$refs['VIDEO'].play()
    },
    // 视频暂停
    pauseVideo() {
      this.isPlayIcon = true
      this.$refs['VIDEO'].pause()
    },
    // 加载失败
    handleError() {
      this.isVideoLoadError = true
      this.$emit('on-error')
    },
    // 播放完毕
    handleEnded() {
      this.isPlay = true
    },
    // 离开播放区域
    handleMouseLeave() {
      this.isPlay = true
    },
    // 进入播放区域
    handlemouseEnter() {
      this.isPlay = true
    },
    // 点击播放按钮
    handleClickPlay() {
      this.handleOnMuted()
      this.isPlayIcon ? this.playVideo() : this.pauseVideo()
    },
    // 关闭静音
    handleOffMuted() {
      this.isOpenVoice = true
      this.$refs['VIDEO'].muted = false
    },
    // 开启静音
    handleOnMuted() {
      this.isOpenVoice = false
      this.$refs['VIDEO'].muted = true
    }
  }
}
</script>
