<template>
  <main :class="[prefixCls]">
    <RadioGroup
      v-model="newValue"
      :type="type"
      @on-change="onChange">
      <Radio
        v-for="(e, i) in defaultList"
        :key="i"
        :disabled="isDisabledAll || e._disabled || isDisabledItemFun(e)"
        :label="e._value">
        <span>{{ e._label }}</span>
        <Tooltip
          v-if="e._tooltip"
          :transfer="true"
          max-width="300"
          placement="top"
          theme="light">
          <div slot="content">{{ e._tooltip }}</div>
          <Icon
            :type="iconIview"
            class="cursor-pointer icon-question tip-icon"
            size="16"></Icon>
        </Tooltip>
      </Radio>
    </RadioGroup>
  </main>
</template>

<script>
const {prefix} = require('../../../config.js')
const prefixCls = prefix + 'radio-group'
export default {
  name: prefixCls,
  props: {
    value: {
      type: [String, Number, Boolean]
    },
    defaultList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'button'
    },
    isDisabledAll: {
      type: Boolean,
      default: false
    },
    isDisabledItemFun: {
      type: Function,
      default: (e) => {
        return false
      }
    },
    iconIview: {
      type: String,
      default: 'ios-help-circle-outline'
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      newValue: null
    }
  },
  watch: {
    value: {
      handler(n, o) {
        if(!_.isEqual(n, o)) {
          let {
            defaultList
          } = this
          if(defaultList.map(e => e._value).includes(n)) {
            this.newValue = n
          } else {
            this.newValue = (defaultList && defaultList.length) ? defaultList.find(e => !e._disabled)._value : null
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onChange(val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  }
}
</script>

<style scoped>

</style>
