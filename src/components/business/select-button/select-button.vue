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
      {{ text }}
    </Button>
    <Button
      v-else-if="isLoading"
      loading
      type="default">
      {{ prefixEditText }}
    </Button>
    <div
      v-else
      :class="viewClasses"
      :loading="true"
      @click="handleClick">
      <!-- <Icon
        v-if="loading"
        class="ivu-load-loop"
        type="ios-loading"></Icon> -->
      <span>{{ prefixEditText }}</span>
      <span class="m-l-16">
        {{ suffixEditText }}
      </span>
    </div>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'select-button'
export default {
  name: prefixCls,
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: '请选择'
    },
    prefixEditText: {
      type: String,
      default: '已选择'
    },
    suffixEditText: {
      type: String,
      default: '编辑'
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
      default: 'icon-xinjian'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
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
    isLoading() {
      return this.status === 'loading'
    },
    selectClasses() {
      return `${prefixCls}-select`
    },
    viewClasses() {
      return `${prefixCls}-view  ivu-btn`
    }
  },
  methods: {
    handleClick() {
      this.$emit('on-click', this.status)
    }
  }
}
</script>