<template>
  <div
    ref="image"
    :class="prefixCls"
    :style="imageStyles">
    <div
      v-if="loading"
      :class="prefixCls + '-placeholder'">
      <slot name="placeholder">
        <span>{{ loadingLang }}</span>
      </slot>
    </div>
    <div
      v-else-if="imageError"
      :class="prefixCls + '-error'">
      <slot name="error">
        <span>{{ failLang }}</span>
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
        v-if="previewTip"
        name="preview">
        <div
          :class="prefixCls + '-tip'"
          :style="previewTipStyle"
          @click.stop="handlePreview">
          <img :src="previewTipSrc" />
        </div>
      </slot>
    </div>
    <!-- 脚标 -->
    <div
      v-if="currentVideoSign"
      :class="prefixCls + '-video-sign'">
      <img :src="videoSignImg" />
    </div>

    <template v-if="preview">
      <rd-image-preview
        v-model="imagePreviewModal"
        :type="type.toUpperCase()"
        :src="previewSrc || src"></rd-image-preview>
    </template>
  </div>
</template>
<script>
import { isClient } from '@src/util/assist.js'
import videoPlay from '@src/images/image-preview/video-play.svg'
import imageAmplify from '@src/images/image/amplify.png'
import videoSignImg from '@src/images/image/video-sign.svg'

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
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['image', 'video'])
      },
      default: 'image'
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
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
    // https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
    fit: {
      type: String, // 'fill' | 'contain' | 'cover' | 'none' | 'scale'-down'
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    },
    scrollContainer: {
      type: [String],
      default: ''
    },
    preview: {
      type: Boolean,
      default: false
    },
    previewSrc: {
      type: String,
      default: ''
    },
    videoSign: {
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
      imageAmplify,
      videoSignImg,
      imagePreviewModal: false
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
      console.log(fitContains.includes(fit), 'fit')
      return fitContains.includes(fit) ? `object-fit:${fit};` : ''
    },
    imageStyles() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.height === 'number' ? `${this.height}px` : this.height
      }
    },
    previewTipStyle() {
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
    loadingLang() {
      return '加载中'
    },
    failLang() {
      return '失败'
    },
    loadingType() {
      return this.lazy ? 'lazy' : 'eager'
    },
    previewTipSrc() {
      return this.type === 'video' ? videoPlay : imageAmplify
    },
    currentVideoSign() {
      return this.videoSign && this.type === 'video'
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
      // console.log('root', this.scrollElement)
      const observer = (this.observer = new IntersectionObserver(this.handlerObserveImage, {
        root: this.scrollElement,
        rootMargin: '0px',
        threshold: 0
      }))
      observer.observe($el)
    },
    handlerObserveImage(entries) {
      // console.log('callback', entries)
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
      // console.log('有lazy')
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
      debugger
      if (preview) {
        this.imagePreviewModal = true
        // // reslove click image get the currentIndex to do other thing
        // this.$emit('on-click', { initialIndex })
      }
      this.$emit('on-preview-click')
    }
  }
}
</script>
