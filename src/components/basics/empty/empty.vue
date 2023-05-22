<template>
  <div :class="classes">
    <div :class="prefixCls + '-image'">
      <img
        :src="imageSrc"
        :style="notFoundImageStyle"
        :onerror="onerrorImgSrc"
        alt="empty" />
    </div>
    <p
      v-if="notFoundContent !== null"
      :class="prefixCls + '-description'">
      <slot name="notFoundContent">{{ notFoundContent ? notFoundContent : '暂无数据' }}</slot>
    </p>
    <div
      v-if="$slots.notFoundFooter"
      :class="prefixCls + '-footer'">
      <slot name="notFoundFooter"></slot>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config'
const prefixCls = prefix + 'empty'
export default {
  name: prefixCls,
  props: {
    size: {
      type: String,
      validator: value => ['default', 'small'].includes(value),
      default: 'default'
    },
    notFoundImage: {
      type: String,
      default: ''
    },
    notFoundImageStyle: {
      type: Object,
      default: () => {}
    },
    notFoundContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      // 默认图地址
      onerrorImgSrc: 'this.src="' + require('@src/images/empty/default-image.png') + '"'
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: this.size
        }
      ]
    },
    imageSrc() {
      let src = require('@src/images/empty/default-image.png')
      if (this.notFoundImage) {
        src = this.notFoundImage
      }
      if (this.notFoundImage === 'simpleImage') {
        src = require('@src/images/empty/simple-image.png')
      }
      return src
    }
  }
}
</script>
