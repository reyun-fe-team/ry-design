<!--
 * @Author: yangyufneg
 * @Date: 2022-04-02 11:53:02
 * @LastEditTime: 2022-12-02 17:49:46
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @Description: 下拉多选联动-list面板
 * @FilePath: /ry-design/src/components/basics/multi-cascader/multi-cascader-list.vue
-->
<template>
  <div :class="[prefixCls + '-wrap']">
    <ul :class="[prefixCls, 'small-scroll-y']">
      <li
        v-if="!useMax && showCheckBox"
        :class="[prefixCls + '-li']">
        <Checkbox
          ref="CheckAllRef"
          style="margin-right: 5px"
          :indeterminate="indeterminateAll"
          :value="checkedAll"
          :disabled="disabledAll || notUseAble"
          @on-change="handleCheckAll"
          @click.native.stop></Checkbox>
        <p :class="[prefixCls + '-li-label']">
          <span style="margin-left: 5px">全选</span>
        </p>
      </li>
      <li
        v-for="(node, nodeIndex) in list"
        :key="node.id"
        :class="[
          prefixCls + '-li',
          { [prefixCls + '-li-active']: activeList[level - 1] === node.id }
        ]"
        @mouseover="handleMouseEnter(node, nodeIndex, level)"
        @mouseout="allowEmit = true">
        <Checkbox
          v-if="showCheckBox"
          v-model="node.checked"
          style="margin-right: 5px"
          :indeterminate="node.indeterminate"
          :disabled="node.disabled || notUseAble"
          @on-change="handleCheck($event, node)"
          @click.native.stop></Checkbox>
        <p
          :class="[prefixCls + '-li-label']"
          @click="handleClick(node, nodeIndex, level)">
          <span style="margin-left: 5px">
            <Tooltip
              v-if="node[tooltipKey]"
              transfer
              max-width="300"
              :content="node[tooltipKey]"
              theme="light"
              placement="right-start">
              <span>{{ node[labelKey] }}</span>
            </Tooltip>
            <span v-else>{{ node[labelKey] }}</span>
          </span>
          <Icon
            v-if="node.loading"
            :class="[prefixCls + '-li-label-icon', prefixCls + '-turn']"
            type="ios-sync" />
          <Icon
            v-if="showNextIcon(node)"
            :class="[prefixCls + '-li-label-icon']"
            type="ios-arrow-forward" />
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import _isEmpty from 'lodash/isEmpty'
import _find from 'lodash/find'

import { prefix } from '@src/config.js'
const prefixCls = prefix + 'multi-cascader-list'

export default {
  name: prefixCls,
  props: {
    // 作为 tooltip 唯一标识的键名
    // 面板选项的tooltip字段key
    tooltipKey: {
      type: String,
      default: 'tooltip'
    },
    // 主动控制是否显示"暂无数据"面板项
    showEmptyWrapByNotSynced: {
      type: Boolean,
      default: true
    },
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
    // eslint-disable-next-line vue/require-default-prop
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
    },
    // 异步加载子元素 异步传入数据
    sync: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      allowEmit: true
    }
  },
  computed: {
    // 有没有下一级的数据
    showEmpty() {
      if (!this.sync && !this.showEmptyWrapByNotSynced) {
        return false
      }
      const lastId = this.activeList.at(-1) || ''

      // 层级一样
      // 当前的id是选中的最后一层的id
      const fidData = _find(this.list, val => val.id === lastId && this.level === val.level)

      // 找不到最后一个（这一列不是最后一列或层级不一样，不显示暂无数据）
      if (_isEmpty(fidData)) {
        return false
      }
      // 没有下一级的
      if (_isEmpty(fidData.childNodes)) {
        return true
      }
      return false
    },
    // 是否显示选择框
    showCheckBox() {
      return this.list.every(v => Boolean(v.showCheck))
    },
    indeterminateAll() {
      const falseAll = this.list.every(v => !v.checked)
      return !(this.checkedAll || falseAll)
    },
    checkedAll() {
      return this.list.every(v => v.checked)
    },
    disabledAll() {
      return this.list.every(v => v.disabled)
    }
  },
  watch: {
    showEmpty() {
      this.$emit('handle-show-empty-wrap', { show: this.showEmpty, level: this.level })
    }
  },
  methods: {
    // 显示下一级的箭头
    showNextIcon(node) {
      let show = true

      // 加载中
      if (node.loading) {
        show = false
        return show
      }

      // 异步的模式： 知道最大请求层级，当前层级为最大层级时不展示下级图标
      if (this.sync) {
        if (this.maxRequest && this.level >= this.maxRequest) {
          show = false
          return show
        }
      }

      // 不是异步的模式：知道了数据层级，没有下级数据了，不展示下级图标
      if (!this.sync) {
        if (node.childNodes.length <= 0) {
          show = false
          return show
        }
      }

      return show
    },
    handleCheckAll(val) {
      this.$emit('handle-checkAll', val, this.list)
    },
    handleMouseEnter(node, levelIndex, level) {
      if (this.expandTrigger === 'hover' && this.allowEmit) {
        this.$emit('handle-click', node, levelIndex, level)
        this.allowEmit = false
      }
    },
    handleClick(node, levelIndex, level) {
      if (this.expandTrigger === 'click') {
        this.$emit('handle-click', node, levelIndex, level)
      }
    },
    handleCheck(v, node) {
      node.checked = v
      this.$emit('handle-check', node)
    },
    // 唯一key v-for
    getKey() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0
        let v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
  }
}
</script>
