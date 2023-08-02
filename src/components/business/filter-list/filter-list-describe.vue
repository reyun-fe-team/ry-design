<template>
  <div
    :class="prefixCls"
    :style="mainStyles">
    <div
      v-if="showImage && src"
      :class="prefixCls + '-image'">
      <rd-image
        width="34px"
        height="34px"
        fit="contain"
        :src="src"></rd-image>
    </div>
    <section :class="prefixCls + '-body'">
      <div
        v-tooltip="{ maxWidth: 200, content: text, delay: 1000 }"
        :class="prefixCls + '-body-text'">
        {{ text }}
      </div>
      <p
        v-if="showDescription && description"
        v-tooltip="{ maxWidth: 200, content: description, delay: 1000 }"
        :class="prefixCls + '-body-description'">
        {{ description }}
      </p>
    </section>
    <slot></slot>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-describe'

export default {
  name: prefixCls,
  props: {
    height: [Number, String],
    text: {
      type: String,
      default: '-'
    },
    src: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    showImage: {
      type: Boolean,
      default: false
    },
    showDescription: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    mainStyles() {
      let style = {}
      if (this.height) {
        const height = parseInt(this.height)
        style.height = `${height}px`
      }
      return style
    }
  }
}
</script>
