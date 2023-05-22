<template>
  <main :class="prefixCls">
    <div :class="prefixCls + '-img'">
      <div
        :class="prefixCls + '-img-element'"
        :style="{ 'background-image': 'url(' + imgPath + ')' }"></div>
    </div>
    <div :class="prefixCls + '-content'">
      <h1>
        <slot name="title">{{ titleText }}</slot>
      </h1>
      <div :class="prefixCls + '-content-desc'">
        <slot name="desc">{{ descText }}</slot>
      </div>
      <div :class="prefixCls + '-content-actions'">
        <slot name="actions">
          <Button
            :to="redirect"
            type="primary"
            size="large">
            <span class="btn">{{ backText }}</span>
          </Button>
        </slot>
      </div>
    </div>
  </main>
</template>

<script>
import { prefix } from '@src/config'
import { oneOf } from '@src/util/assist'
import typeConfig from './typeConfig'
const prefixCls = prefix + 'exception'
export default {
  name: prefixCls,
  props: {
    type: {
      validator(value) {
        return oneOf(value, ['403', '404', '500', 403, 404, 500])
      },
      default: '404'
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    backText: {
      type: String,
      default: '返回首页'
    },
    redirect: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    imgPath() {
      return this.img ? this.img : typeConfig[this.type].img
    },
    titleText() {
      return this.title ? this.title : typeConfig[this.type].title
    },
    descText() {
      return this.desc ? this.desc : typeConfig[this.type].desc
    }
  }
}
</script>
