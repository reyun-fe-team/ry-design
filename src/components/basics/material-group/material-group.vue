
<template>
  <div
    :class="classes"
    :style="imageGroupStyles">
    <rd-image
      v-for="(option, index) in currenData"
      :key="index"
      :src="option.src"
      :preview-src="option.previewSrc"
      fit="contain"
      :preview="preview"
      :preview-tip="previewTip"
      :class="classImage"
      :type="currentType(index)"
      :alt="option.src"
      :preview-tip-width="previewTipWidth"
      :video-sign="videoSign"
      @on-preview-click="onPreviewClick(option)"></rd-image>
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
  </div>
</template>
<script>
// import { getCurrentInstance } from 'vue'
import { oneOf } from '@src/util/assist.js'
// import mixinsForm from '../../mixins/form'
import videoPlay from '@src/images/image-preview/video-play.svg'
import imageAmplify from '@src/images/image/amplify.png'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'material-group'

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
    width: {
      type: [String, Number],
      default: ''
    },
    imageWidth: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    padding: {
      type: Number,
      default: 0
    },
    positionType: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return oneOf(value, ['horizontal', 'vertical'])
      }
    },
    openCover: {
      type: Boolean,
      default: false
    },
    previewTip: {
      type: Boolean,
      default: false
    },
    previewGroupTip: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['image', 'video'])
      },
      default: 'image'
    },
    previewTipWidth: {
      type: [String, Number],
      default: 32
    },
    previewGroupTipWidth: {
      type: [String, Number],
      default: 32
    },
    preview: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    videoSign: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: '#eef0f3ff'
    },
    selected: {
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
      return [`${prefixCls}`, `${prefixCls}-flex`, { [`${prefixCls}-selected`]: this.selected }]
    },
    classImage() {
      let { size } = this
      const groupSize = size === 3 ? `${this.positionType}-3` : size
      return [`${prefixCls}-pic`, `${prefixCls}-pic-${groupSize}`]
    },
    imageGroupStyles() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
        padding: this.padding + 'px',
        background: this.background
      }
    },
    // imageStyles() {
    //   return {}
    //   let { size } = this
    //   let width = 100
    //   let height = [1, 2].includes(size) ? 100 : 50
    //   if ([2, 3].includes(size)) {
    //     width = 100 / size
    //   } else if ([4, 6].includes(size)) {
    //     width = 100 / (size / 2)
    //   }
    //   return {
    //     width: width + '%',
    //     height: height + '%'
    //   }
    // },
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
      if (this.openCover && index === 1) {
        return 'image'
      }
      return this.type
    },
    onPreviewClick(data) {
      this.$emit('on-preview-click', data)
    },
    handlePreview() {
      this.$emit('on-preview-group-click', this.currenData)
    },
    handleDelete() {
      this.$emit('on-delete')
    }
  }
}
</script>
