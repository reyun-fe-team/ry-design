<template>
  <main>
    <ul :class="[prefixCls]">
      <li v-for="item in buttonList"
          :key="item.value"
          :class="disabled(item) ? 'disabled' : className(item.value)"
          @click="disabled(item) ? null : handleTabChange(item, 'multi')">
        {{ item.label }}
        <div :class="allTriangle ? 'all-top-right-triangle' : 'top-right-triangle'"></div>
      </li>
    </ul>
  </main>
</template>

<script>
const { prefix } = require('../../../config.js');
const prefixCls = prefix + 'multi-radio-button';
export default {
  name: prefixCls,
  props: {
    buttonList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    // 所有button都可多选：true
    // button有不限，不限和其他选项互斥
    allTriangle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      prefixCls
    };
  },
  methods: {
    className(val) {
      // 不限的处理
      if (this.value && !this.value.length && !this.allTriangle) {
        if (!val) {
          return 'active';
        }
      }
      return this.value.includes(val) ? 'active' : '';
    },
    // 处理Tab切换事件
    handleTabChange(item, muliti, disabled) {
      if (disabled) {
        return;
      }
      let valueArr = _.cloneDeep(this.value);
      if (this.value.includes(item.value)) {
        if (valueArr.length > 1 || this.allTriangle) {
          valueArr = valueArr.filter(list => list !== item.value);
        }
      } else {
        if (item.value) {
          valueArr.push(item.value);
        } else {
          // 不限
          valueArr = [];
        }
      }
      // 返回全部数据
      const selection = this.buttonList.filter(item =>
        valueArr.includes(item.value)
      );
      this.$emit('input', valueArr);
      this.$emit('on-change', { valueArr, selection });
    }
  }
};
</script>
