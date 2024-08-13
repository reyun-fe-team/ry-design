<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:43:38
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2023-03-01 11:24:34
 * @FilePath: /ry-design/src/components/business/text-item-show/text-item-show.vue
 * @Description: 极速创建基础信息，单项显示控件
-->
<template>
  <div :class="[prefixCls]">
    <!-- basic -->
    <div
      v-if="type === 'basic'"
      :class="[prefixCls + '-basic']">
      <div
        v-line-clamp="twoLineDisplay ? 2 : 1"
        v-tooltip="tooltipOption"
        :class="[prefixCls + '-basic-text', prefixCls + '-text']">
        {{ data.text }}
      </div>
      <div :class="[prefixCls + '-btns']">
        <slot name="btnGroup"></slot>
      </div>
    </div>

    <!-- title -->
    <div
      v-if="type === 'title'"
      :class="[prefixCls + '-title']"
      :style="{ height: titleThumbnail.show ? '56px' : '' }">
      <div
        v-if="titleThumbnail.show"
        :class="prefixCls + '-title-thumbnail'">
        <img
          :style="titleThumbnail.style"
          :src="titleThumbnail.src"
          :onerror="onerrorImgSrc" />
      </div>
      <div
        v-tooltip="tooltipOption"
        :class="[prefixCls + '-title-text', prefixCls + '-text']">
        <div
          v-line-clamp="1"
          :class="prefixCls + '-title-text-main'">
          {{ data.title }}
        </div>
        <div
          v-line-clamp="1"
          :class="prefixCls + '-title-text-sub'">
          {{ data.subTitle }}
        </div>
      </div>
      <div :class="[prefixCls + '-btns']">
        <slot name="btnGroup"></slot>
      </div>
    </div>

    <!-- classify -->
    <div
      v-if="type === 'classify'"
      :class="[prefixCls + '-classify']">
      <div :class="[prefixCls + '-classify-text', prefixCls + '-text']">
        <div :class="prefixCls + '-classify-thumbnail'">
          <img
            :src="data.thumbnail"
            :onerror="onerrorImgSrc" />
        </div>
        <div
          v-tooltip="tooltipOption"
          :class="prefixCls + '-classify-infos'">
          <div
            v-line-clamp="1"
            class="classify-info-item">
            <span class="classify-item-name">
              {{ data.classify.name }}
            </span>
            <span class="classify-item-id">（ID：{{ data.classify.id }}）</span>
          </div>
          <div
            v-line-clamp="1"
            class="classify-info-item">
            <span class="classify-item-name">
              {{ data.info.name }}
            </span>
            <span class="classify-item-id">（ID：{{ data.info.id }}）</span>
          </div>
        </div>
      </div>
      <div :class="[prefixCls + '-btns']">
        <slot name="btnGroup"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
import _isEmpty from 'lodash/isEmpty'
const prefixCls = prefix + 'text-item-show'
export default {
  name: prefixCls,
  props: {
    // 显示的类型 basic 基础 title 带标题 classify 分类
    type: {
      type: String,
      default: 'basic'
    },
    // 双行显示
    twoLineDisplay: {
      type: Boolean,
      default: false
    },
    // 数据项
    data: {
      type: Object,
      default: () => ({})
    },
    // 提示文案
    tooltip: {
      type: String,
      default: ''
    },
    // 提示文案配置项 => placement 方向  maxWidth 最大宽度 delay 延迟时间（ms）
    tooltipOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    tooltipOption() {
      if (!this.tooltip) {
        return null
      }
      return {
        maxWidth: 300,
        transferClassName: this.prefixCls + '-tooltip',
        content: this.tooltip
      }
    },
    // 默认图地址
    onerrorImgSrc() {
      return 'this.src="' + require('./error.jpg') + '"'
    },
    // 获取title类型时的缩略图的数据信息
    titleThumbnail() {
      let { thumbnailInfo = {} } = this.data
      if (this.type !== 'title' || _isEmpty(thumbnailInfo)) {
        return { show: false }
      }
      const { style = {}, src = '' } = thumbnailInfo
      return { show: true, style, src }
    }
  }
}
</script>