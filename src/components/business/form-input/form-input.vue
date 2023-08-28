<template>
  <div
    :class="classes"
    :width="width"
    :style="styles">
    <div
      v-if="label && label.trim()"
      ref="prefixRef"
      :class="prefixCls + '-label'">
      <span>{{ `${label}` }}</span>
    </div>
    <div :class="prefixCls + '-body'">
      <Input
        v-model="current"
        v-bind="$attrs"
        :border="false"
        :placeholder="placeholder"
        v-on="$listeners" />
    </div>
    <div
      v-if="clearable && current"
      :class="[prefixCls + '-operate', prefixCls + '-operate-clearable']">
      <rd-icon
        :class="prefixCls + '-operate-clear'"
        color="#757a8a"
        type="ry-icon-guanbi"
        @click.native.stop="handleClear"></rd-icon>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'form-input'

export default {
  name: prefixCls,
  props: {
    value: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String]
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      current: this.value
    }
  },
  computed: {
    classes() {
      return [`${this.prefixCls}`]
    }
  },
  watch: {
    value: {
      handler() {
        this.current = this.value
      }
    }
  },
  methods: {
    handleClear() {
      this.current = ''
      this.$emit('on-change', this.current)
      this.$emit('on-clear', this.current)
    }
  }
}
</script>
