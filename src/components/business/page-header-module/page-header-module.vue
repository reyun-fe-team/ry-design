<!--
 * @Author: yangyufeng
 * @Date: 2022-04-11 15:11:12
 * @LastEditTime: 2022-04-12 11:55:31
 * @LastEditors: Please set LastEditors
 * @Description: 模块头部组件
 * @FilePath: /ry-design/src/components/basics/module-header/module-header.vue
-->
<template>
  <div :class="classes">
    <!-- 左侧 -->
    <div :class="[prefixCls + '-head-left']">
      <!-- 单个标题 -->
      <template v-if="!isTabs">
        <div v-if="isPropSingleTitle"
             :class="[prefixCls + '-single-title']">
          <slot name="singleTitle">
            <span :class="[prefixCls + '-text']">{{singleTitle}}</span>
          </slot>
        </div>
      </template>
      <!-- 显示tabs -->
      <template v-if="isTabs">
        <div :class="[prefixCls + '-module-tabs']">
          <Tabs :value="newActiveValue"
                :animated="false"
                @on-click="handleTabClick">
            <TabPane v-for="item in tabsList"
                     :key="item.name"
                     :label="item.label"
                     :name="item.name" />
          </Tabs>
        </div>
      </template>
    </div>
    <!-- 右侧 -->
    <template v-if="isHasSolt('extra')">
      <div :class="[prefixCls + '-head-extra']">
        <slot name="extra"></slot>
      </div>
    </template>
  </div>
</template>
<script>
// import Render from './../../base/render';
const { prefix } = require('../../../config.js');
const prefixCls = prefix + 'page-header-module';
export default {
  name: prefixCls,
  // components: { Render },
  props: {
    // 是否要关联路由
    isRoute: {
      type: Boolean,
      default: false
    },
    // 使用的场景 是不是用的tabs
    isTabs: {
      type: Boolean,
      default: false
    },
    // tab数据
    // [{  label  name  disabled }]
    tabsList: {
      type: Array,
      default: () => []
    },
    // 选中的
    activeValue: {
      type: [String, Number],
      default: ''
    },
    // 单个标题
    singleTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 前缀
      prefixCls,
      // 选中的tab
      newActiveValue: this.isTabs ? this.activeValue : null,
      // 是不是路由
      newIsRoute: false
    };
  },
  created() {
    if (this.isRoute) {
      if (!this.isTabs) {
        const msg =
          '使用路由关联[isRoute === true],必须开启“Tabs”功能,[isTabs === true]';
        throw msg;
      } else {
        this.newIsRoute = true;
        this.$nextTick(() => {
          this.tabInit();
        });
      }
    }
  },
  watch: {
    $route: function (route) {
      // 不是匹配的路由
      if (this.activeValue !== route.name) {
        this.tabInit();
      }
    }
  },
  computed: {
    // 类名class集合
    classes() {
      const classList = [`${prefixCls}`];
      return classList;
    },
    // 是否传入了名称
    isPropSingleTitle() {
      const { singleTitle, isTabs } = this;
      if (isTabs) return false;
      if (singleTitle) return true;
      return false;
    }
  },
  methods: {
    // 路由关联初始化
    tabInit() {
      if (this.newIsRoute) {
        let { name = '' } = this.$route;
        this.newActiveValue = name;
      }
    },
    // 获取插槽
    isHasSolt(soltName = 'default') {
      const { $scopedSlots } = this;
      const soltRef = $scopedSlots[soltName];
      return typeof soltRef === 'function';
    },
    // 点击
    handleTabClick(e) {
      if (!this.isTabs) return;
      this.$emit('on-tab-click', e);
      if (this.newIsRoute) {
        this.newActiveValue = e;
        console.log('点击跳转路由 -> ' + e);
        this.$router.push({ name: e });
      }
    }
  }
};
</script>