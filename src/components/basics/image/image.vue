<template>
  <div
    ref="image"
    :class="prefixCls"
    :style="imageStyles">
    <div
      v-if="loading"
      :class="prefixCls + '-placeholder'">
      <slot name="placeholder">
        <Spin fix>
          <Icon
            type="ios-loading"
            size="18"
            :class="prefixCls + '-placeholder-spin'"></Icon>
        </Spin>
      </slot>
    </div>
    <div
      v-else-if="imageError"
      :class="prefixCls + '-error'">
      <slot name="error">
        <img :src="imageErrorImge" />
      </slot>
    </div>
    <!-- 预览 -->
    <div
      v-if="loadingImage"
      :class="innerClasses">
      <img
        :class="imgClasses"
        :style="fitStyle"
        :alt="alt"
        :src="src"
        :loading="loadingType"
        :referrerPolicy="referrerPolicy"
        @load="handleImageLoad"
        @error="handleImageError" />
      <slot
        v-if="previewTip && !loading"
        name="preview">
        <div
          :class="prefixCls + '-tip'"
          :style="previewTipStyles"
          @click.stop="handlePreview">
          <img :src="previewTipSrc" />
        </div>
      </slot>
    </div>
    <!-- 脚标 -->
    <template v-if="currentVideoSign">
      <img
        :src="videoSignImg"
        :class="prefixCls + '-video-sign'"
        :style="videoSignStyle" />
    </template>

    <template v-if="lowQuality">
      <img
        :src="lowQualityImg"
        :class="prefixCls + '-low-quality'"
        :style="lowQualityStyle" />
    </template>

    <template v-if="preview">
      <rd-carousel-previewer
        v-model="imagePreviewModal"
        :type="type.toUpperCase()"
        :data="previewData"
        :audio-url="audioUrl"
        thumbnail-key="src"
        :url-key="urlKey"
        :auto-play="autoPlay"
        :video-auto-play="videoAutoPlay"
        poster-key="src"></rd-carousel-previewer>
    </template>
  </div>
</template>
<script>
import { isClient } from '@src/util/assist.js'
import videoPlay from '@src/images/image-preview/video-play.svg'
import imageAmplify from '@src/images/image/amplify.png'
import videoSignImg from '@src/images/image/video-sign.svg'
import imageErrorImge from '@src/images/image/image-error.svg'
import lowQualityImg from '@src/images/image/low-quality.svg'

import { oneOf } from '@src/util/assist.js'

// is Element
const isElement = el => {
  return typeof HTMLElement === 'object' && el instanceof HTMLElement
}
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'image'

export default {
  name: prefixCls,
  props: {
    src: {
      type: String,
      default: ''
    },
    // https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
    fit: {
      type: String, // 'fill' | 'contain' | 'cover' | 'none' | 'scale'-down'
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['image', 'video'])
      },
      default: 'image'
    },
    referrerPolicy: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    // 懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    scrollContainer: {
      type: [String],
      default: ''
    },
    // 预览
    preview: {
      type: Boolean,
      default: false
    },
    previewSrc: {
      type: String,
      default: ''
    },
    previewTip: {
      type: Boolean,
      default: false
    },
    previewTipWidth: {
      type: [String, Number],
      default: 32
    },
    // 角标
    videoSign: {
      type: Boolean,
      default: false
    },
    videoSignWidth: {
      type: [String, Number],
      default: 12
    },
    lowQualityWidth: {
      type: [String, Number],
      default: 16
    },
    isCursor: {
      type: Boolean,
      default: false
    },
    imageName: {
      type: String,
      default: ''
    },
    // 音频地址
    audioUrl: {
      type: String,
      default: ''
    },
    autoPlay: Boolean,
    videoAutoPlay: Boolean,
    // 低质图标
    lowQuality: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingImage: false,
      loading: false,
      imageError: false,
      scrollElement: null,
      observer: null,
      prefixCls,
      videoPlay,
      imagePreviewModal: false,
      imageAmplify,
      videoSignImg,
      imageErrorImge,
      lowQualityImg
    }
  },
  computed: {
    innerClasses() {
      return [`${this.prefixCls}-inner`]
    },
    imgClasses() {
      return [
        `${prefixCls}-img`,
        {
          [`${prefixCls}-img-hidden`]: this.loading || this.imageError
        }
      ]
    },
    fitStyle() {
      const fitContains = ['fill', 'contain', 'cover', 'none', 'scale-down']
      const { fit } = this
      return fitContains.includes(fit) ? `object-fit:${fit};` : ''
    },
    imageStyles() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
        cursor: this.isCursor ? 'pointer' : 'auto'
      }
    },
    previewTipStyles() {
      return {
        width:
          typeof this.previewTipWidth === 'number'
            ? `${this.previewTipWidth}px`
            : this.previewTipWidth,
        height:
          typeof this.previewTipWidth === 'number'
            ? `${this.previewTipWidth}px`
            : this.previewTipWidth
      }
    },
    loadingType() {
      return this.lazy ? 'lazy' : 'eager'
    },
    previewTipSrc() {
      return this.type === 'video' ? videoPlay : imageAmplify
    },
    currentVideoSign() {
      return this.videoSign && !this.previewTip && !this.loading && !this.imageError
    },
    videoSignStyle() {
      return {
        width:
          typeof this.videoSignWidth === 'number' ? `${this.videoSignWidth}px` : this.videoSignWidth
      }
    },
    lowQualityStyle() {
      return {
        width:
          typeof this.lowQualityWidth === 'number'
            ? `${this.lowQualityWidth}px`
            : this.lowQualityWidth
      }
    },
    previewData() {
      if (this.type === 'image') {
        return [
          {
            src: this.src,
            previewSrc: this.previewSrc || this.src,
            fileName: this.imageName
          }
        ]
      }
      return [
        {
          src: this.src,
          previewSrc: this.previewSrc || this.src,
          fileName: this.imageName,
          poster: this.src
        }
      ]
    },
    urlKey() {
      if (this.previewSrc) {
        return 'previewSrc'
      }
      return 'src'
    }
  },
  mounted() {
    isClient && this.handleImageEvent()
  },
  created() {
    this.offObserver()
  },
  methods: {
    handleLazy() {
      const $el = this.$refs.image
      const observer = (this.observer = new IntersectionObserver(this.handlerObserveImage, {
        root: this.scrollElement,
        rootMargin: '0px',
        threshold: 0
      }))
      observer.observe($el)
    },
    handlerObserveImage(entries) {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          // destory new IntersectionObserver
          this.offObserver()
          // run image onload
          this.loadImage()
        }
      }
    },
    addLazyImageListener() {
      const { scrollContainer } = this
      this.scrollElement = null
      if (isElement(scrollContainer)) {
        this.scrollElement = scrollContainer
      } else if (scrollContainer && typeof scrollContainer === 'string') {
        this.scrollElement = document.querySelector(scrollContainer)
      }
      // on scrollElement scroll
      this.handleLazy()
    },
    handleImageLoad() {
      this.loading = false
      this.imageError = false
      this.$emit('on-load')
    },
    handleImageError() {
      this.loading = false
      this.imageError = true
      this.loadingImage = false
      this.$emit('on-error')
    },
    loadImage() {
      this.loading = true
      this.imageError = false
      this.loadingImage = true
    },
    handleImageEvent() {
      const { lazy } = this
      lazy ? this.addLazyImageListener() : this.loadImage()
    },
    offObserver() {
      const { observer } = this
      observer && observer.disconnect()
    },
    handlePreview() {
      const { preview } = this
      if (preview) {
        this.imagePreviewModal = true
      }
      this.$emit('on-preview-click')
    }
  }
}
</script>
