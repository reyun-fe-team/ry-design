<!--
 * @Author: yangyufeng
 * @Date: 2022-04-11 15:11:12
 * @LastEditTime: 2022-04-11 18:22:55
 * @LastEditors: Please set LastEditors
 * @Description: 模块头部组件
 * @FilePath: /ry-design/src/components/basics/module-header/module-header.vue
-->
<template>
  <div :class="classes">
    <!-- 左侧 -->
    <div :class="[prefixCls + '-head-left']">
      <!-- 显示名称 -->
      <template v-if="!isTabs">
        <!-- 模块名称 -->
        <div v-if="isPropModuleName"
             :class="[prefixCls + '-module-name']">
          <span :class="[prefixCls + '-text']">{{moduleName}}</span>
        </div>
        <!-- 插槽模块名称 -->
        <template v-else-if="isHasSolt('moduleName')">
          <div :class="[prefixCls + '-module-name']">
            <slot name="moduleName"></slot>
          </div>
        </template>
      </template>
      <!-- 显示tabs -->
      <template v-if="isTabs">
        <div :class="[prefixCls + '-module-tabs']">
          <Tabs :value="_activeValue"
                :animated="false"
                @on-click="handleTabClick">
            <TabPane v-for="(item,index) in tabsList"
                     :key="index"
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
const prefixCls = prefix + 'module-header';
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
    // 模块名称
    moduleName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 前缀
      prefixCls,
      // 选中的tab
      _activeValue: this.isTabs ? this.activeValue : null,
      // 是不是路由
      _isRoute: false
    };
  },
  created() {
    if (this.isRoute) {
      if (!this.isTabs) {
        throw new Error(
          '使用路由关联 【isRoute === true】，必须开启“tabs”功能，【isTabs === true】'
        );
      } else {
        this._isRoute = true;
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
    isPropModuleName() {
      const { moduleName, isTabs } = this;
      if (isTabs) return false;
      if (moduleName) return true;
      return false;
    }
  },
  methods: {
    // 路由关联初始化
    tabInit() {
      if (this._isRoute) {
        let { name } = this.$route;
        this._activeValue = name;
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
      if (this._isRoute) {
        this._activeValue = e;
        this.$router.push({ name: e });
      }
    }
  }
};
</script>