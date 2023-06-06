<template>
  <div
    :class="classes"
    :style="styles">
    <div
      v-if="label && label.trim()"
      ref="prefixRef"
      :class="prefixCls + '-label'">
      <span>{{ `${label}` }}</span>
    </div>
    <div :class="prefixCls + '-body'">
      <rd-date-picker
        v-model="time"
        width="164px"
        v-bind="$attrs"
        :confirm="false"
        v-on="$listeners"></rd-date-picker>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'form-date-picker'
export default {
  name: prefixCls,
  components: {},
  props: {
    value: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
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
      time: this.value
    }
  },
  computed: {
    classes() {
      return [`${this.prefixCls}`]
    }
  },
  watch: {}
}
</script>
