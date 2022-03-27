<template>
  <main :class="[prefixCls]">
    <div
      :class="prefixCls + '-body'"
      :style="`width: ${width};height: ${height};`"
    >
      <div v-show="showLeft" :class="prefixCls + '-body-left-box'">
        <div v-if="title" :class="prefixCls + '-body-left-box-title'">
          {{ title }}
        </div>
        <ul :class="prefixCls + '-body-left-box-content'">
          <li
            v-for="(item, index) in dataList"
            :key="item + index"
            :class="itemClasses(item)"
            @click="choose(item, false)"
          >
            <template v-if="!id">
              <Tooltip
                style="padding-top: 4px"
                :content="item[name]"
                max-width="200"
                transfer
                :delay="1000"
                theme="light"
              >
                <span :class="prefixCls + '-body-left-box-content-item-name'">{{
                  item[name]
                }}</span>
              </Tooltip>
            </template>
            <template v-else>
              <Tooltip
                style="padding-top: 4px"
                max-width="200"
                transfer
                :delay="1000"
                theme="light"
              >
                <span
                  :class="prefixCls + '-body-left-box-content-item-name'"
                  class="sign"
                  >{{ item[name] }}</span
                >
                <span
                  :class="prefixCls + '-body-left-box-content-item-name'"
                  class="sign id"
                  >ID:{{ item[id] }}</span
                >

                <div slot="content">
                  <p>{{ item[name] }}</p>
                  <p>ID:{{ item[id] }}</p>
                </div>
              </Tooltip>
            </template>
            <span
              v-if="item[nameNum] && !item[iconName]"
              :class="prefixCls + '-body-left-box-content-item-num'"
              >{{ item[nameNum] }}</span
            >
            <Icon
              v-if="iconName === 'icon' && item[iconName]"
              :custom="`${item[iconName]} icon iconfont`"
              :color="iconColor"
              :class="prefixCls + '-body-left-box-content-item-icon'"
              :size="iconSize"
            />
            <Icon
              v-if="iconName === 'iconType' && item[iconName]"
              :type="item[iconName]"
              :color="iconColor"
              :class="prefixCls + '-body-left-box-content-item-icon'"
              :size="iconSize"
            />
          </li>
        </ul>
      </div>
      <div
        v-if="isRenderRight"
        :class="prefixCls + '-body-right-box'"
        :style="rightBoxStyle"
      >
        <slot></slot>
      </div>
    </div>
  </main>
</template>
<script>
const { prefix } = require('../../../config.js');
const prefixCls = prefix + 'account-list';
export default {
  name: prefixCls,
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '438px'
    },
    dataList: {
      type: Array,
      default: () => [],
      require: true
    },
    id: {
      type: [String, Number],
      default: ''
    },
    name: {
      type: String,
      default: 'adsMediaAccountName'
    },
    nameValue: {
      type: String,
      default: 'adsMediaAccountId'
    },
    nameNum: {
      type: String,
      default: 'num'
    },
    iconName: {
      type: String,
      default: 'icon'
    },
    iconSize: {
      type: Number,
      default: 12
    },
    iconColor: {
      type: String,
      default: '#277ff3'
    },
    isEvent: {
      type: Boolean,
      default: true
    },
    title: {
      type: [String, Boolean],
      default: '账户'
    },
    defaultActive: {
      type: [String, Number],
      default: ''
    },
    rightBoxStyle: {
      type: [Object, String],
      default: null
    },
    showLeft: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      active: '',
      isRenderRight: true
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  mounted() {
    this.isRenderRight = this.$slots.default !== undefined;
  },
  methods: {
    itemClasses(item) {
      let { nameValue, active } = this;
      return [
        `${this.prefixCls}-body-left-box-content-item`,
        {
          [`${this.prefixCls}-body-left-box-content-item-active`]:
            item[nameValue] === active
        }
      ];
    },
    init() {
      this.$nextTick(() => {
        if (!this.dataList.length) {
          return;
        }
        this.active = this.defaultActive
          ? this.defaultActive
          : this.dataList[0][this.nameValue];
        const defaultActiveData = this.dataList.find(
          item => item[this.nameValue] === this.defaultActive
        );
        const item = this.defaultActive ? defaultActiveData : this.dataList[0];
        this.choose(item, true);
      });
    },
    choose(item, isFirst = true) {
      if (!this.showLeft) {
        return;
      }
      const { nameValue } = this;
      if (item[nameValue] === this.active && !isFirst) {
        return;
      }
      const active = this.isEvent ? item[nameValue] : this.active;
      this.active = active;
      this.$emit('on-change', active, isFirst);
    },
    reset() {
      this.init();
    }
  }
};
</script>

<style scoped lang="less">

</style>
