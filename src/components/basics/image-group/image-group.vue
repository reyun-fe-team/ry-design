
<template>
  <div
    :class="classes"
    :style="imageGroupStyles">
    <rd-image
      v-for="(option, initialIndex) in currenData"
      :key="option.src + '_' + initialIndex"
      :src="option.src"
      :preview-src="option.previewSrc"
      fit="contain"
      :preview="preview"
      :preview-tip="previewTip || option.previewTip"
      :class="classImage"
      :style="imageStyles"
      :type="currentType(initialIndex)"
      :alt="option.src"
      :preview-tip-width="previewTipWidth"
      :video-sign="videoSign"
      :is-cursor="isCursor"
      :lazy="lazy"
      @on-preview-click="onPreviewClick(option, initialIndex)"
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
    <slot></slot>
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
    }
  },
  data() {
    return {
      prefixCls,
      videoPlay,
      imageAmplify
    }
  },
  computed: {
    currenData() {
      return this.data.slice(0, this.size)
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
      let { size } = this
      const groupSize = size === 3 ? `${this.positionType}-3` : size
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
  created() {
    console.log('image-group')
  },
  methods: {
    currentType(index) {
      return this.openCover && index === 1 ? 'image' : this.type
    },
    onPreviewClick(data, initialIndex) {
      this.$emit('on-preview-click', data, initialIndex)
    },
    handlePreview() {
      this.$emit('on-preview-group-click', this.currenData)
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
