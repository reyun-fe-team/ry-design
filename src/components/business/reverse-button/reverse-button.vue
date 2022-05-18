<template>
  <div :class="[prefixCls]">
    <Button
      v-if="isSelect"
      type="default"
      :custom-icon="`iconfont ${customIcon}`"
      @click="handleClick">
      {{ text }}
    </Button>
    <div
      v-else
      @click="handleClick">
      <span>{{ prefixEditText }}</span>
      <span>
        {{ suffixEditText }}
      </span>
    </div>
  </div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'reverse-button'
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
    }
  },
  methods: {
    handleClick() {
      this.$emit('on-click', this.status)
    }
  }
}
</script>