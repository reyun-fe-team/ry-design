
<template>
  <div
    :class="classes"
    :style="imageGroupStyles">
    <rd-image
      v-for="(url, index) in currenData"
      :key="index"
      :src="url"
      fit="contain"
      :style="imageStyles"
      :class="classImage"
      :alt="url"></rd-image>
  </div>
</template>
<script>
// import { getCurrentInstance } from 'vue'
import { oneOf } from '@src/util/assist.js'
// import mixinsForm from '../../mixins/form'

import { prefix } from '@src/config.js'
const prefixCls = prefix + 'image-group'

export default {
  name: prefixCls,
  // mixins: [mixinsForm],
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
    }
    // type: {
    //   validator(value) {
    //     return oneOf(value, ['button'])
    //   }
    // },
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
      return [
        `${prefixCls}`,
        { [`${prefixCls}-flex`]: true }
        // {
        //   [`${prefixCls}-${this.size}`]: !!this.size,
        //   [`ivu-radio-${this.size}`]: !!this.size,
        //   [`${prefixCls}-${this.type}`]: !!this.type,
        //   [`${prefixCls}-button-${this.buttonStyle}`]:
        //     this.type === 'button' && this.buttonStyle !== 'default',
        //   [`${prefixCls}-vertical`]: this.vertical
        // }
      ]
    },
    classImage() {
      let { size } = this
      return [`${prefixCls}-pic`, `${prefixCls}-pic-${size}`]
    },
    imageGroupStyles() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.height === 'number' ? `${this.height}px` : this.height
      }
    },
    imageStyles() {
      //let { size } = this
      // let width = 100
      //let height = [1, 2].includes(size) ? 100 : 50
      // if ([2, 3].includes(size)) {
      //   width = 100 / size
      // } else if ([4, 6].includes(size)) {
      //   width = 100 / (size / 2)
      // }
      return {
        // width: width + '%',
        //height: height + '%'
      }
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
    // change(data) {
    //   this.currentValue = data.value
    //   this.$emit('update:modelValue', data.value)
    //   this.$emit('on-change', data.value)
    //   this.handleFormItemChange('change', data.value)
    // }
  }
}
</script>
