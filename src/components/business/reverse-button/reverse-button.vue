<template>
  <div :class="[prefixCls]">
    <Button
      v-if="isSelect"
      type="default"
      :disabled="disabled"
      :class="selectClasses"
      @click="handleClick">
      <Icon
        :custom="`iconfont ${customIcon}`"
        size="12"></Icon>
      {{ selectText }}
    </Button>
    <Button
      v-else-if="isLoading"
      loading
      type="default"
      :class="loadingClasses">
      {{ prefixEditText }}
    </Button>
    <div
      v-else-if="isEdit"
      :class="editClasses"
      @click="handleClick">
      <span>{{ prefixEditText }}</span>
      <span :class="editBtnClasses">{{ suffixEditText }}</span>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config'
const prefixCls = prefix + 'reverse-button'
export default {
  name: prefixCls,
  inheritAttrs: false,
  props: {
    selectText: {
      type: String,
      default: '请选择'
    },
    prefixEditText: {
      type: String,
      default: '已选择'
    },
    suffixEditText: {
      type: String,
      default: '配置'
    },
    width: {
      type: [Number, String],
      default: 100
    },
    status: {
      type: String,
      default: 'select'
    },
    customIcon: {
      type: String,
      default: 'ry-icon-xinjian'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {
    isSelect() {
      return this.status === 'select'
    },
    isEdit() {
      return this.status === 'edit'
    },
    isLoading() {
      return this.status === 'loading'
    },
    selectClasses() {
      return `${prefixCls}-select`
    },
    editClasses() {
      if (this.disabled) {
        return `${prefixCls}-edit  ivu-btn disabled`
      } else {
        return `${prefixCls}-edit  ivu-btn`
      }
    },
    editBtnClasses() {
      if (!this.disabled) {
        return 'normal'
      } else {
        return ''
      }
    },
    loadingClasses() {
      return `${prefixCls}-loading`
    }
  },
  methods: {
    handleClick() {
      this.$emit('on-click', this.status)
    }
  }
}
</script>