<template>
  <div
    v-if="total"
    :class="prefixCls">
    <Page
      :class="[prefixCls + '-' + type]"
      :total="total"
      :page-size="localSize"
      :current="localCurrent"
      :page-size-opts="localSizeOptions"
      size="small"
      :show-total="isShowTotal"
      :show-elevator="isShowElevator"
      show-sizer
      transfer
      @on-change="pageChange"
      @on-page-size-change="sizeChange" />
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'page'
export default {
  name: prefixCls,
  props: {
    // 类型：[默认default、弹框m-large、弹框m-middle、弹框m-small]
    type: { type: String, default: 'default' },
    total: {
      required: true,
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 50
    },
    current: {
      type: Number,
      default: 1
    },
    sizeOptons: {
      type: Array,
      default: () => [10, 20, 50, 100, 150, 200]
    },
    // localStorage存储size的key
    localStorageSizeKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      localSize: this.size,
      localCurrent: this.current,
      localSizeOptions: this.sizeOptons
    }
  },
  computed: {
    isShowTotal() {
      return ['default', 'm-large', 'm-middle'].includes(this.type)
    },
    isShowElevator() {
      return ['default', 'm-large'].includes(this.type)
    }
  },
  watch: {
    size: {
      immediate: true,
      handler(newVal) {
        if (this.localStorageSizeKey && localStorage.getItem(this.localStorageSizeKey)) {
          this.localSize = Number(localStorage.getItem(this.localStorageSizeKey))
        } else {
          this.localSize = newVal
        }
      }
    },
    current: {
      immediate: true,
      handler(newVal) {
        this.localCurrent = newVal
      }
    },
    sizeOptons: {
      immediate: true,
      handler(newVal) {
        if (newVal.length) {
          this.localSizeOptions = newVal
        }
      }
    }
  },
  methods: {
    pageChange(val) {
      this.localCurrent = val
      this.emitChange()
    },
    sizeChange(val) {
      if (this.localStorageSizeKey) {
        localStorage.setItem(this.localStorageSizeKey, val)
      }

      this.localSize = val
      if (this.localCurrent === 1) {
        this.emitChange()
      }
    },
    emitChange() {
      this.$emit('pageChange', { current: this.localCurrent, size: this.localSize })
    }
  }
}
</script>