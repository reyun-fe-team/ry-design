
<template>
  <div
    :class="classes"
    :style="imageGroupStyles">
    <rd-image
      v-for="(option, index) in currenData"
      :key="index"
      :src="option.src"
      fit="contain"
      :preview-tip="previewTip"
      :style="imageStyles"
      :class="classImage"
      :type="currentType(index)"
      :alt="option.src"
      @on-preview-click="onPreviewClick(option)"></rd-image>
    <div :class="prefixCls + '-delete'">
      <Icon
        size="16"
        type="md-close-circle" />
    </div>
  </div>
</template>
<script>
// import { getCurrentInstance } from 'vue'
import { oneOf } from '@src/util/assist.js'
// import mixinsForm from '../../mixins/form'

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
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['image', 'video'])
      },
      default: 'image'
    }
    // vertical: {
    //   type: Boolean,
    //   default: false
    // },
    // name: {
    //   type: String,
    //   default: getUuid
    // },
    // 4.5.0
    // buttonStyle: {
    //   validator(value) {
    //     return oneOf(value, ['default', 'solid'])
    //   },
    //   default: 'default'
    // }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    currenData() {
      return this.data.slice(0, this.size)
    },
    classes() {
      return [`${prefixCls}`, `${prefixCls}-flex`]
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
        padding: this.padding + 'px'
      }
    },
    imageStyles() {
      return {}
      // let { size } = this
      // let width = 100
      // let height = [1, 2].includes(size) ? 100 : 50
      // if ([2, 3].includes(size)) {
      //   width = 100 / size
      // } else if ([4, 6].includes(size)) {
      //   width = 100 / (size / 2)
      // }
      // return {
      //   width: width + '%',
      //   height: height + '%'
      // }
    }
  },
  watch: {
    // modelValue() {
    //   if (this.currentValue !== this.modelValue) {
    //     this.currentValue = this.modelValue
    //   }
    // }
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
    }
    // openPreviewIcon() {
    //   return this.previewTip
    //   // return !(
    //   //   !this.previewTip ||
    //   //   (this.previewTip && this.openCover && index == 1 && this.size === 2)
    //   // )
    //   // if (!this.previewTip || (this.previewTip && this.openCover && index == 1)) {
    //   //   return false
    //   // }
    //   // return true
    // }
    // change(data) {
    //   this.currentValue = data.value
    //   this.$emit('update:modelValue', data.value)
    //   this.$emit('on-change', data.value)
    //   this.handleFormItemChange('change', data.value)
    // }
  }
}
</script>
