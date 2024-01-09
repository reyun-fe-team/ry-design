
<template>
  <div
    :class="classes"
    :style="imageGroupStyles">
    <rd-image
      v-for="(option, initialIndex) in currentData"
      :key="option.src + '_' + initialIndex"
      :src="option.src"
      fit="contain"
      :preview-src="option.previewSrc || option.src"
      :preview="openCover"
      :preview-tip="previewTip || option.previewTip"
      :class="classImage"
      :style="imageStyles"
      :type="option._type"
      :alt="option.src"
      :preview-tip-width="previewTipWidth"
      :video-sign="videoSign"
      :is-cursor="isCursor"
      :lazy="lazy"
      @on-preview-click="onPreviewClick(option, initialIndex, option._type)"
      @click.native="handleClick(option, initialIndex)"></rd-image>
    <div
      v-if="showDelete"
      :class="prefixCls + '-delete'"
      @click="handleDelete">
      <Icon
        size="16"
        type="md-close-circle" />
    </div>

    <div
      v-if="previewGroupTip"
      :class="prefixCls + '-tip'"
      :style="previewGroupTipStyle"
      @click.stop="handlePreview">
      <img :src="previewTipSrc" />
    </div>
    <div
      v-if="showNum"
      :class="prefixCls + '-num'">
      {{ num || currentSize }}
    </div>
    <slot></slot>
    <template v-if="preview">
      <rd-carousel-previewer
        v-model="imagePreviewModal"
        :type="previewType.toUpperCase()"
        :data="previewData"
        :url-key="urlKey"
        poster-key="src"
        :current="currentImage"
        thumbnail-key="src"
        :audio-url="audioUrl"></rd-carousel-previewer>
    </template>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
import { oneOf } from '@src/util/assist.js'
import videoPlay from '@src/images/image-preview/video-play.svg'
import imageAmplify from '@src/images/image/amplify.png'
const prefixCls = prefix + 'image-group'

export default {
  name: prefixCls,
  props: {
    size: {
      validator(value) {
        return oneOf(value, [1, 2, 3, 4, 6])
      },
      default: 1
    },
    data: {
      type: Array,
      default: () => []
    },
    positionType: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return oneOf(value, ['horizontal', 'vertical'])
      }
    },
    previewGroupTip: {
      type: Boolean,
      default: false
    },
    previewGroupTipWidth: {
      type: [String, Number],
      default: 32
    },
    openCover: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    borderHover: {
      type: Boolean,
      default: false
    },
    // Style
    background: {
      type: String,
      default: '#EEF0F3'
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    styles: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['image', 'video'])
      },
      default: 'image'
    },
    // 图片组件参数
    videoSign: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    previewTip: {
      type: Boolean,
      default: false
    },
    previewTipWidth: {
      type: [String, Number],
      default: 32
    },
    isCursor: {
      type: Boolean,
      default: false
    },
    // 懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number,
      default: 0
    },
    showNum: {
      type: Boolean,
      default: false
    },
    // 音频地址
    audioUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      videoPlay,
      imageAmplify,
      imagePreviewModal: false,
      currentImage: null,
      previewType: this.type
    }
  },
  computed: {
    urlKey() {
      if (this.previewSrc) {
        return 'previewSrc'
      }
      return 'src'
    },
    currentSize() {
      return this.size > 6 ? 6 : this.size
    },
    currentData() {
      return this.data.slice(0, this.currentSize).map((val, index) => {
        const _type = this.currentType(index)
        return {
          uuid: index,
          ...val,
          _type
        }
      })
    },
    previewData() {
      return this.data.map((val, index) => {
        const _type = this.currentType(index)
        return {
          uuid: index,
          ...val,
          _type
        }
      })
    },
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-flex`,
        {
          [`${prefixCls}-selected`]: this.selected,
          [`${prefixCls}-border-hover`]: this.borderHover
        }
      ]
    },
    classImage() {
      let { currentSize } = this
      const groupSize = currentSize === 3 ? `${this.positionType}-3` : currentSize
      return [`${prefixCls}-pic`, `${prefixCls}-pic-${groupSize}`]
    },
    imageGroupStyles() {
      return {
        ...{
          width: typeof this.width === 'number' ? `${this.width}px` : this.width,
          height: typeof this.height === 'number' ? `${this.height}px` : this.height
        },
        ...this.styles
      }
    },
    imageStyles() {
      return {
        background: this.background
      }
    },
    previewGroupTipStyle() {
      return {
        width:
          typeof this.previewGroupTipWidth === 'number'
            ? `${this.previewGroupTipWidth}px`
            : this.previewGroupTipWidth,
        height:
          typeof this.previewGroupTipWidth === 'number'
            ? `${this.previewGroupTipWidth}px`
            : this.previewGroupTipWidth
      }
    },
    previewTipSrc() {
      return this.type === 'video' ? videoPlay : imageAmplify
    }
  },
  methods: {
    currentType(index) {
      return this.openCover && index === 1 ? 'image' : this.type
    },
    onPreviewClick(data, initialIndex, type) {
      const { preview } = this
      if (preview && !this.openCover) {
        this.imagePreviewModal = true
        this.currentImage = this.currentData[initialIndex]
        this.previewType = type
      }
      this.$emit('on-preview-click', data, initialIndex)
    },
    handlePreview() {
      const { preview } = this
      if (preview) {
        this.imagePreviewModal = true
        this.previewType = this.type
      }
      this.$emit('on-preview-group-click', this.currentData)
    },
    handleDelete() {
      this.$emit('on-delete')
    },
    handleClick(data, initialIndex) {
      this.$emit('on-click', data, initialIndex)
    }
  }
}
</script>
