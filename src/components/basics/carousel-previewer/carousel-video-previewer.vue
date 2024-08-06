<template>
  <div
    :class="[prefixCls]"
    @click.stop
    @mouseleave.stop="handleMouseLeave"
    @mouseenter.stop="handlemouseEnter">
    <!-- 静音 -->
    <!-- <div
      v-if="isPlay"
      :class="[prefixCls + '-voice']">
      <Icon
        :type="isOpenVoice ? 'md-volume-up' : 'md-volume-off'"
        @click.stop="isOpenVoice ? handleOnMuted() : handleOffMuted()"></Icon>
    </div> -->
    <!-- 内容 -->
    <transition name="fade-motion">
      <div :class="[prefixCls + '-content']">
        <!-- 插槽 -->
        <slot></slot>
        <!-- 视频加载错误 -->
        <img
          v-if="isVideoLoadError"
          :class="[prefixCls + '-error']"
          :src="videoError" />
        <!-- 视频加载成功 -->
        <template v-if="!isVideoLoadError">
          <!-- 视频播放区域 -->
          <video
            ref="video"
            :controls="videoControls"
            :src="src"
            :muted="true"
            :poster="poster"
            preload="auto"
            @click.stop="handleClickPlay"
            @error="handleError"
            @ended="handleEnded"
            @play="playVideo"
            @pause="pauseVideo"></video>
          <!-- 播放按钮 -->
          <div
            v-if="!isPlay"
            :class="[prefixCls + '-icon']"
            @click.stop="handleClickPlay">
            <img :src="videoPlay" />
          </div>
          <!-- 暂停按钮 -->
          <div
            v-if="isPlay && isEnter"
            :class="[prefixCls + '-icon']"
            @click.stop="handleClickPlay">
            <img :src="videoPause" />
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'carousel-video-previewer'
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
    },
    videoControls: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      videoError,
      videoPlay,
      videoPause,
      // 是否在播放
      isPlay: false,
      // 是否进入画面
      isEnter: false,
      // 是否开启音量
      isOpenVoice: false,
      // 视频加载错误
      isVideoLoadError: false
    }
  },
  watch: {
    async src() {
      await this.$nextTick()
      this.pauseVideo()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$nextTick()
      this.handleOnMuted()
      if (this.autoPlay) {
        this.playVideo()
      }
    },
    // 视频播放
    playVideo() {
      this.$refs.video.play()
      this.isPlay = true
    },
    // 视频暂停
    pauseVideo() {
      this.$refs.video.pause()
      this.isPlay = false
    },
    // 加载失败
    handleError() {
      this.isVideoLoadError = true
      this.$emit('on-error')
    },
    // 播放完毕,继续播放
    handleEnded() {
      this.playVideo()
    },
    // 离开播放区域
    handleMouseLeave() {
      this.isEnter = false
    },
    // 进入播放区域
    handlemouseEnter() {
      this.isEnter = true
    },
    // 点击播放按钮
    handleClickPlay() {
      !this.isPlay ? this.playVideo() : this.pauseVideo()
    },
    // 关闭静音
    handleOffMuted() {
      this.isOpenVoice = true
      this.$refs.video.muted = false
    },
    // 开启静音
    handleOnMuted() {
      this.isOpenVoice = false
      this.$refs.video.muted = true
    }
  }
}
</script>
