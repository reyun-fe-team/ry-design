<template>
  <div :class="classes">
    <!-- 面包屑 -->
    <div v-if="isPropBreadcrumb"
         :class="[prefixCls + '-breadcrumb']">
      <rd-breadcrumb :data="breadcrumb">
      </rd-breadcrumb>
    </div>
    <!-- 插槽面包屑 -->
    <template v-else-if="isHasSolt('breadcrumb')">
      <div :class="[prefixCls + '-breadcrumb']">
        <slot name="breadcrumb"></slot>
      </div>
    </template>
    <!-- 头部 -->
    <div :class="[prefixCls + '-heading']">
      <!-- 左侧 -->
      <div :class="[prefixCls + '-heading-left']">
        <!-- 返回按钮 -->
        <div v-if="backIcon"
             :class="prefixCls + '-back'">
          <span class="back-icon"
                @click="back($event)">
            <svg focusable="false"
                 class="back-icon-img"
                 data-icon="arrow-left"
                 width="1em"
                 height="1em"
                 fill="currentColor"
                 aria-hidden="true"
                 viewBox="64 64 896 896">
              <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </span>
        </div>
        <!-- 插槽返回按钮 -->
        <template v-else-if="isHasSolt('backIcon')">
          <div :class="prefixCls + '-back'">
            <span class="back-icon">
              <slot name="backIcon"></slot>
            </span>
          </div>
        </template>
        <!-- 头像 -->
        <span v-if="isPropAvatar"
              :class="[prefixCls + '-avatar']">
          <img :src="avatar" />
        </span>
        <!-- 插槽头像 -->
        <template v-else-if="isHasSolt('avatar')">
          <span :class="[prefixCls + '-avatar']">
            <slot name="avatar"></slot>
          </span>
        </template>
        <!-- 标题 -->
        <span v-if="title"
              :class="[prefixCls + '-heading-title']">
          {{ title }}
        </span>
        <!-- 插槽标题 -->
        <template v-else-if="isHasSolt('title')">
          <span :class="[prefixCls + '-heading-title']">
            <slot name="title"></slot>
          </span>
        </template>
        <!-- 副标题 -->
        <span v-if="subTitle"
              :class="[prefixCls + '-heading-sub-title']">
          {{ subTitle }}
        </span>
        <!-- 插槽副标题 -->
        <template v-else-if="isHasSolt('subTitle')">
          <span :class="[prefixCls + '-heading-sub-title']">
            <slot name="subTitle"></slot>
          </span>
        </template>
        <!-- 插槽标签 -->
        <span v-if="isHasSolt('tags')"
              :class="[prefixCls + '-heading-tags']">
          <slot name="tags"></slot>
        </span>
      </div>
      <!-- 右侧扩展 -->
      <span v-if="isHasSolt('extra')"
            :class="[prefixCls + '-heading-extra']">
        <slot name="extra"></slot>
      </span>
    </div>
    <!-- 内容(默认插槽) -->
    <div v-if="isHasSolt()"
         :class="prefixCls + '-content'">
      <slot></slot>
    </div>
    <!-- 头部 -->
    <div v-if="isHasSolt('footer')"
         :class="prefixCls + '-footer'">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
const { prefix } = require('../../../config.js');
const prefixCls = prefix + 'page-header';
export default {
  name: prefixCls,
  props: {
    // 自定义 back icon ，如果为 false 不渲染 back icon
    backIcon: {
      type: Boolean,
      default: false
    },
    // 标题栏旁的头像
    avatar: {
      type: String,
      default: ''
    },
    // 面包屑的配置
    breadcrumb: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // pageHeader 的类型，将会改变背景颜色
    ghost: {
      type: Boolean,
      default: true
    },
    // 自定义的二级标题文字
    subTitle: {
      type: [String, Number],
      default: ''
    },
    // 自定义标题文字
    title: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      // 前缀
      prefixCls
    };
  },
  computed: {
    // 类名class集合
    classes() {
      const classList = [
        `${prefixCls}`,
        this.ghost ? `` : `${prefixCls}-white`
      ];
      return classList;
    },
    // 是否传入了面包屑
    isPropBreadcrumb() {
      const { breadcrumb } = this;
      return Array.isArray(breadcrumb) && breadcrumb.length > 0;
    },
    // 是否传入了头像
    isPropAvatar() {
      const { avatar } = this;
      return avatar && typeof avatar === 'string';
    }
  },
  methods: {
    // 获取插槽
    isHasSolt(soltName = 'default') {
      const { $scopedSlots } = this;
      const soltRef = $scopedSlots[soltName];
      return typeof soltRef === 'function';
    },
    // 返回
    back(e) {
      this.$emit('back', e);
    }
  }
};
</script>
