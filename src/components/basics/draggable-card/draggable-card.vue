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
        :class="[[prefixCls + '-draggable-ui'], 'small-scroll-y']"
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
            <ry-icon
              v-if="item.disabled"
              type="ry-icon-suo"
              size="14"></ry-icon>
            <ry-icon
              v-if="!item.disabled"
              type="ry-icon-tuodong"
              size="14"></ry-icon>
          </span>
          <span
            :class="prefixCls + '-draggable-li-title'"
            :title="item.label">
            {{ item.label }}
          </span>
          <span v-if="!item.disabled">
            <ry-icon
              v-if="setMoveUpward(index)"
              :class="prefixCls + '-draggable-li-icon-cursor'"
              type="ry-icon-zhiding"
              size="14"
              @click.native="setMoveTop(index)"></ry-icon>
            <ry-icon
              :class="prefixCls + '-draggable-li-icon-cursor'"
              type="ry-icon-text-delete"
              size="15"
              @click.native="onRemove(index, item)"></ry-icon>
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
import { prefix } from '@src/config'
const prefixCls = prefix + 'draggable-card'
import _findLastIndex from 'lodash/findIndex'
import _cloneDeep from 'lodash/cloneDeep'
import _isEqual from 'lodash/isEqual'
import ryIcon from '../icon/icon.vue'

export default {
  name: prefixCls,
  components: {
    ryIcon
  },
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
      return [`${prefixCls}`]
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
        this.list = this.initData(now)
      }
    },
    ids: {
      handler(n, o) {
        if (!_isEqual(n, o)) {
          this.emitData()
        }
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
    initData(data) {
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
