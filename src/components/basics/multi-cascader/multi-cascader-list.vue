<template>
  <ul :class="[prefixCls]">
    <li v-if="!useMax && showCheckBox" :class="[prefixCls + '-li']">
      <Checkbox
        ref="CheckAllRef"
        style="margin-right: 5px"
        :indeterminate="indeterminateAll"
        :value="checkedAll"
        :disabled="disabledAll || notUseAble"
        @on-change="handleCheckAll"
        @click.native.stop
      ></Checkbox>
      <p :class="[prefixCls + '-li-label']">
        <span style="margin-left: 5px">全选</span>
      </p>
    </li>
    <li
      v-for="(node, nodeIndex) in list"
      :key="getKey(node)"
      :class="[
        prefixCls + '-li',
        { [prefixCls + '-li-active']: activeList[level - 1] === node.id }
      ]"
      @mouseover="handleMouseEnter(node, nodeIndex, level)"
      @mouseout="allowEmit = true"
    >
      <Checkbox
        v-if="showCheckBox"
        v-model="node.checked"
        style="margin-right: 5px"
        :indeterminate="node.indeterminate"
        :disabled="node.disabled || notUseAble"
        @on-change="handleCheck($event, node)"
        @click.native.stop
      ></Checkbox>
      <p
        :class="[prefixCls + '-li-label']"
        @click="handleClick(node, nodeIndex, level)"
      >
        <span :title="node[labelKey]" style="margin-left: 5px">
          {{ node[labelKey] }}
        </span>
        <Icon
          v-if="node.loading"
          :class="[prefixCls + '-li-label-icon', prefixCls + '-turn']"
          type="ios-sync"
        />
        <Icon
          v-if="showNextIcon(node)"
          :class="[prefixCls + '-li-label-icon']"
          type="ios-arrow-forward"
        />
      </p>
    </li>
  </ul>
</template>

<script>
const { prefix } = require('../../../config.js');
const prefixCls = prefix + 'multi-cascader-list';
export default {
  name: prefixCls,
  props: {
    // 最大的请求层级 0 为不限制
    maxRequest: {
      type: Number,
      default: 0
    },
    // 是否使用了最大选择个数
    useMax: {
      type: Boolean,
      default: false
    },
    // 显示层级列表
    activeList: {
      type: Array,
      default: () => []
    },
    // 显示的数据
    list: {
      type: Array,
      default: () => []
    },
    // 当前层级
    level: {
      type: [Number, String]
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    expandTrigger: {
      type: String,
      default: 'click'
    },
    // 禁用复选框
    notUseAble: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      allowEmit: true
    };
  },
  computed: {
    // 是否显示选择框
    showCheckBox() {
      return this.list.every(v => Boolean(v.showCheck));
    },
    indeterminateAll() {
      const falseAll = this.list.every(v => !v.checked);
      return !(this.checkedAll || falseAll);
    },
    checkedAll() {
      return this.list.every(v => v.checked);
    },
    disabledAll() {
      return this.list.every(v => v.disabled);
    }
  },
  methods: {
    // 显示下一级的箭头
    showNextIcon(node) {
      let show = true;
      // 是不是最大层级了
      const canMax = this.maxRequest ? this.level >= this.maxRequest : false;
      // 加载不显示 没有下一级不显示 最大层级了不显示
      if (node.loading || !node.showExpIcon || canMax) {
        show = false;
      }
      return show;
    },
    handleCheckAll(val) {
      this.$emit('handle-checkAll', val, this.list);
    },
    handleMouseEnter(node, levelIndex, level) {
      if (this.expandTrigger === 'hover' && this.allowEmit) {
        this.$emit('handle-click', node, levelIndex, level);
        this.allowEmit = false;
      }
    },
    handleClick(node, levelIndex, level) {
      if (this.expandTrigger === 'click') {
        this.$emit('handle-click', node, levelIndex, level);
      }
    },
    handleCheck(v, node) {
      node.checked = v;
      this.$emit('handle-check', node);
    },
    // 唯一key v-for
    getKey() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0;
        let v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }
};
</script>
