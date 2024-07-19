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
        :title="showTitle ? text : ''"
        :class="prefixCls + '-body-text'">
        {{ text }}
      </div>
      <p
        v-if="showDescription && description"
        :class="prefixCls + '-body-description'"
        :title="showTitle ? description : ''">
        {{ description }}
      </p>
      <p
        v-if="showSubtitle && subtitle"
        :title="showTitle ? subtitle : ''"
        :class="prefixCls + '-body-description'">
        {{ subtitle }}
      </p>
    </section>
    <slot></slot>
    <rd-icon
      v-if="showDelete"
      color="rgba(87, 91, 101, 1)"
      type="ry-icon-text-delete"
      :class="prefixCls + '-clear'"
      @click.native.stop="handleDelete"></rd-icon>
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
      type: [String, Number],
      default: '-'
    },
    src: {
      type: [String, Number],
      default: ''
    },
    description: {
      type: [String, Number],
      default: ''
    },
    showImage: {
      type: Boolean,
      default: false
    },
    showDescription: {
      type: Boolean,
      default: false
    },
    showSubtitle: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: [String, Number],
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    showDelete: {
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
  },
  methods: {
    handleDelete() {
      this.$emit('on-delete')
    }
  }
}
</script>
