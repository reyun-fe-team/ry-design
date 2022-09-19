<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-06-15 19:43:38
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-09-19 16:02:07
 * @FilePath: /ry-design/src/components/business/text-item-show/text-item-show.vue
 * @Description: 极速创建基础信息，单项显示控件
-->
<template>
  <div :class="[prefixCls]">
    <!-- basic -->
    <div
      v-if="type === 'basic'"
      :class="[
        prefixCls + '-basic',
        { 'two-lines': twoLineDisplay, 'single-line': !twoLineDisplay }
      ]">
      <div
        :class="[
          prefixCls + '-basic-text',
          { 'two-line-text': twoLineDisplay, 'single-line-text': !twoLineDisplay },
          'show-text'
        ]">
        <Tooltip
          v-if="tooltip"
          theme="light"
          max-width="300"
          transfer
          :transfer-class-name="prefixCls + '-tooltip'"
          :content="tooltip">
          {{ data.text }}
        </Tooltip>
        <template v-else>{{ data.text }}</template>
      </div>
      <!-- btnGroup -->
      <div :class="[prefixCls + '-btns']">
        <slot name="btnGroup"></slot>
      </div>
    </div>

    <!-- title -->
    <div
      v-if="type === 'title'"
      :class="[prefixCls + '-title']">
      <div :class="[prefixCls + '-title-text', 'show-text']">
        <div class="main-title">{{ data.title }}</div>
        <div class="sub-title">{{ data.subTitle }}</div>
      </div>
      <!-- btnGroup -->
      <div :class="[prefixCls + '-btns']">
        <slot name="btnGroup"></slot>
      </div>
    </div>

    <!-- classify -->
    <div
      v-if="type === 'classify'"
      :class="[prefixCls + '-classify']">
      <div :class="[prefixCls + '-classify-text', 'show-text']">
        <div class="classify-thumbnail">
          <img
            :src="data.thumbnail"
            :onerror="onerrorImgSrc" />
        </div>
        <div class="classify-infos">
          <div class="classify-info-item">
            <span class="classify-item-name">{{ data.classify.name }}</span>
            <span class="classify-item-id">（ID：{{ data.classify.id }}）</span>
          </div>
          <div class="classify-info-item">
            <span class="classify-item-name">{{ data.info.name }}</span>
            <span class="classify-item-id">（ID：{{ data.info.id }}）</span>
          </div>
        </div>
      </div>
      <!-- btnGroup -->
      <div :class="[prefixCls + '-btns']">
        <slot name="btnGroup"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
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
    // 显示的数据
    // basic
    // {
    //   text: '最短信息长度超过25个字—最短信息长度超过25个字'
    // }

    // title
    // {
    //   title: '标题&主要信息',
    //   subTitle: '次要信息、ID、出'
    // }

    // classify
    // {
    //   classify: {
    //     name: '商品库名称',
    //     id: '5533567'
    //   },
    //   info: {
    //     name: '商品名称',
    //     id: '5533567'
    //   },
    //   thumbnail: require('./product.png')
    // }
    data: {
      type: Object,
      default: () => ({})
    },
    tooltip: {
      type: String,
      default: ''
    }
    // 按钮组 slot
    // btnGroup
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    // 默认图地址
    onerrorImgSrc() {
      if (this.type !== 'classify') {
        return ''
      }
      return 'this.src="' + require('./error.jpg') + '"'
    }
  }
}
</script>