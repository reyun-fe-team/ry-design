<template>
  <div :class="classes">
    <div :class="prefixCls + '-header'">
      <span>{{ headerTxt }}</span>
      <span
        v-if="isClear && list.length"
        :class="prefixCls + '-header-clear-class'"
        @click="onClear">
        清空
      </span>
    </div>
    <template v-if="list.length">
      <transition-group
        name="drag"
        tag="ul"
        :class="prefixCls + '-draggable-ui'"
        :style="{ height: `${height}px` }">
        <li
          v-for="(item, index) in list"
          :key="item.key"
          :draggable="!item.disabled"
          :class="[
            prefixCls + '-draggable-li',
            { [prefixCls + '-draggable-li-disabled']: item.disabled }
          ]"
          @dragenter="dragenter($event, item, index)"
          @dragover="dragover"
          @dragstart="dragstart(item, index)">
          <span :class="prefixCls + '-draggable-li-move-icon'">
            <img
              v-if="item.disabled"
              src="../../../images/draggable-card/unlock.png"
              :class="prefixCls + '-draggable-li-icon-unlock'" />
            <img
              v-if="!item.disabled"
              src="../../../images/draggable-card/reorder.png"
              :class="prefixCls + '-draggable-li-icon-reorder'" />
          </span>
          <span
            :class="prefixCls + '-draggable-li-title'"
            :title="item.label">
            {{ item.label }}
          </span>
          <span v-if="!item.disabled">
            <img
              v-if="setMoveUpward(index)"
              src="../../../images/draggable-card/top.png"
              :class="prefixCls + '-draggable-li-top-icon'"
              @click="setMoveTop(index)" />
            <img
              src="../../../images/draggable-card/close.png"
              :class="prefixCls + '-draggable-li-icon-remove'"
              @click="onRemove(index, item)" />
          </span>
        </li>
      </transition-group>
    </template>
    <template v-else>
      <div
        :class="prefixCls + '-notData'"
        :style="{ height: `${height}px` }">
        暂无选项
      </div>
    </template>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'draggable-card'
import _findLastIndex from 'lodash/findIndex'
import _cloneDeep from 'lodash/cloneDeep'

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
    },
    data: {
      type: Array,
      default: () => []
    },
    dataConfig: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          key: 'key'
        }
      }
    },
    isUpdate: {
      type: Boolean,
      default: true
    },
    disabledOnTop: {
      type: Boolean,
      default: false
    },
    beforeRemove: {
      type: Function,
      default: () => true
    },
    clearAllFunc: {
      type: Function,
      default: res => res.disabled
    }
  },
  data() {
    return {
      prefixCls,
      list: [],
      timer: null,
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
    },
    ids() {
      return this.list.map(item => item[this.dataConfig.key])
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(now) {
        this.list = this.initdata(now)
        this.emitData()
      }
    },
    ids: {
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
    async onRemove(index, item) {
      if (await this.beforeRemove([item])) {
        this.list.splice(index, 1)
      }
    },
    // 清空
    async onClear() {
      if (await this.beforeRemove(this.list)) {
        this.list = this.list.filter(item => this.clearAllFunc(item))
      }
    },

    // html
    // 控制置顶icon是否显示
    setMoveUpward(index) {
      let idx = index !== 0 ? index - 1 : index
      // 不是第一个 & 上一个不是禁用的
      return index !== 0 && !this.list[idx].disabled
    },

    // 实例调用
    initdata(data) {
      let arr = data.map(item => {
        return {
          ...item,
          label: item[this.dataConfig.label],
          key: item[this.dataConfig.key]
        }
      })
      if (this.disabledOnTop) {
        arr = [].concat(
          arr.filter(item => item.disabled),
          arr.filter(item => !item.disabled)
        )
      }
      return this.isUpdate ? arr : _cloneDeep(arr)
    },
    emitData() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('on-change', this.list)
      }, 500)
    }
  }
}
</script>
