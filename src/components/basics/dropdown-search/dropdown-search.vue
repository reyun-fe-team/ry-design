<!--
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2023-02-21 16:41:33
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2023-02-22 11:36:34
 * @FilePath: /ry-design/src/components/basics/dropdown-search/dropdown-search.vue
 * @Description: 搜索下拉组件
-->
<template>
  <div :class="prefixCls">
    <Dropdown
      ref="Dropdown"
      transfer
      :transfer-class-name="`${prefixCls}-transfer small-scroll-y`"
      trigger="custom"
      :visible="newVisible"
      stop-propagation
      @on-visible-change="visibleChange"
      @on-clickoutside="handleClickoutside">
      <!-- 搜索输入框 -->
      <div :class="prefixCls + '-search-input'">
        <Input
          ref="SearchInput"
          v-model="searchText"
          v-click-outside:true="handleClickInputOutside"
          :class="newVisible ? prefixCls + '-input-focus' : ''"
          :style="{ width: width + 'px' }"
          :placeholder="placeholder"
          @on-focus="handleFocus"
          @on-change="isRealTime && handleSearch">
          <template
            v-if="!isRealTime"
            #append>
            <Button
              icon="ios-search"
              @click="handleSearch"></Button>
          </template>
        </Input>
      </div>
      <!-- 下拉展示的内容 -->
      <template #list>
        <div
          ref="Results"
          :style="{ width: width + 'px', maxHeight: maxHeight + 'px' }"
          :class="[prefixCls + '-search-list']">
          <!-- 暂无数据 -->
          <div
            v-if="isEmpty"
            :class="[prefixCls + '-search-not-data']">
            {{ emptyText }}
          </div>
          <!-- 有数据 -->
          <div
            v-else
            :class="[prefixCls + '-search-data']">
            <slot></slot>
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script>
import { prefix } from '@src/config'
const prefixCls = prefix + 'dropdown-search'
import _debounce from 'lodash/debounce'

export default {
  name: prefixCls,
  props: {
    // 展示出下拉内容
    visible: {
      type: Boolean,
      default: false
    },
    // 当前是否为空的转态
    isEmpty: {
      type: Boolean,
      default: true
    },
    // 数据为空时的提示文案
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 组件宽度
    width: {
      type: [Number, String],
      default: 360
    },
    // 内容区域的最大高度
    maxHeight: {
      type: [Number, String],
      default: 200
    },
    // 搜索框的占位内容
    placeholder: {
      type: String,
      default: '请输入'
    },
    // 是否实时触发搜索
    isRealTime: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls,
      // 展示出下拉内容
      newVisible: this.visible,
      // 搜索词
      searchText: ''
    }
  },
  watch: {
    // 搜索词变化触发搜索操作
    searchText() {
      this.isRealTime && this.handleSearch()
    },
    visible() {
      this.newVisible = this.visible
    }
  },
  methods: {
    // 点击输入框的外部
    handleClickInputOutside(event) {
      if (!this.newVisible) {
        return
      }
      let targetArea = this.$refs.Results
      // 在组件内
      if (targetArea.contains(event.target) || targetArea === event.target) {
        this.setFocus()
      }
    },
    // 设置输入框聚焦
    setFocus: _debounce(function () {
      const input = this.$refs.SearchInput
      input.focus()
    }, 250),
    // 面板数据更新 -> 更新位置
    updateDropPosition() {
      this.$nextTick(() => {
        const ref = this.$refs.Dropdown
        const dropRef = ref.$refs.drop
        dropRef && dropRef.update()
      })
    },
    // 执行搜索的方法
    handleSearch() {
      this.$emit('on-search', this.searchText)
    },
    // 弹出层的展示和取消（清空搜索词）
    visibleChange(visible) {
      if (!visible) {
        this.searchText = ''
      }
      this.$emit('on-visible-change', this.newVisible)
      this.$emit('update:visible', this.newVisible)
    },
    // 聚焦输入框（展示面板）
    handleFocus() {
      this.newVisible = true
      this.$emit('update:visible', this.newVisible)
    },
    // 点击弹出框的其他区域（隐藏面板）
    handleClickoutside(event) {
      let elem = event.target
      let targetArea = this.$refs.Results
      // 在组件内
      if (targetArea.contains(elem) || targetArea === elem) {
        return
      }

      this.newVisible = false
      this.$emit('update:visible', this.newVisible)
      this.$emit('on-clickoutside', event)
    }
  }
}
</script>
