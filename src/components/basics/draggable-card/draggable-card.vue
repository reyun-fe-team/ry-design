<template>
  <div :class="classes">
    <div class="header">
      <span>{{ headerTxt }}</span>
      <span
        v-if="isClear && list.length"
        class="clear-class"
        @click="onClear">
        清空
      </span>
    </div>
    <template v-if="list.length">
      <transition-group
        name="drag"
        class="draggable-ui"
        tag="ul"
        :style="{ height: `${height}px` }">
        <li
          v-for="(item, index) in list"
          :key="item.title"
          :draggable="!item.disabled"
          class="draggable-li"
          :class="{ 'draggable-li-disabled': item.disabled }"
          @dragenter="dragenter($event, item, index)"
          @dragover="dragover($event)"
          @dragstart="dragstart(item, index)">
          <span class="move-icon">
            <Icon
              v-if="item.disabled"
              type="ios-unlock"></Icon>
            <Icon
              v-if="!item.disabled"
              type="md-reorder"></Icon>
          </span>
          <span class="title">{{ item.title }}</span>
          <span v-if="!item.disabled">
            <Icon
              v-if="setMoveUpward(index)"
              class="top-icon"
              type="md-download"
              style="transform: rotate(180deg)"
              @click="setMoveTop(index)"></Icon>
            <Icon
              class="remove-icon"
              type="md-close-circle"
              color="rgba(158,186,223,1)"
              @click="onRemove(index)"></Icon>
          </span>
        </li>
      </transition-group>
    </template>
    <template v-else>
      <div
        class="notData"
        :style="{ height: `${height}px` }">
        暂无选项
      </div>
    </template>
  </div>
</template>

<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'draggable-card'
import _findLastIndex from 'lodash/findIndex'

export default {
  name: prefixCls,
  props: {
    height: {
      type: Number,
      default: 400
    },
    isClear: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [
        { title: '列表1', disabled: false },
        { title: '列表2', disabled: false },
        { title: '列表3', disabled: false },
        { title: '列表4' },
        { title: '列表5' },
        { title: '列表6' }
      ],
      dragIndex: '',
      enterIndex: ''
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`, 'mini-scroll-y']
    },
    headerTxt() {
      return `已选${this.list.length}列`
    }
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.emitData()
      }
    }
  },
  methods: {
    dragstart(item, index) {
      if (!item.disabled) {
        this.dragIndex = index
      }
    },
    dragenter(e, item, index) {
      e.preventDefault()
      if (!item.disabled) {
        if (this.dragIndex !== index) {
          const moving = this.list[this.dragIndex]
          this.list.splice(this.dragIndex, 1)
          this.list.splice(index, 0, moving)
          this.dragIndex = index
        }
      }
    },
    dragover(e) {
      e.preventDefault()
    },
    // 置顶(最后一个disabled的元素下面)
    setMoveTop(index) {
      let copyData = JSON.parse(JSON.stringify(this.list[index]))
      let lastIndex = _findLastIndex(this.list, item => !item.disabled)

      this.list.splice(index, 1)
      this.list.splice(lastIndex, 0, copyData)
    },
    // 删除
    onRemove(index) {
      this.list.splice(index, 1)
    },
    // 控制置顶icon是否显示
    setMoveUpward(index) {
      let idx = index !== 0 ? index - 1 : index
      // 不是第一个 & 上一个不是禁用的
      return index !== 0 && !this.list[idx].disabled
    },
    // 清空
    onClear() {
      this.list = this.list.filter(item => item.disabled)
    },

    // 实例调用
    emitData() {
      this.$emit('on-change', this.list)
    }
  }
}
</script>
