<template>
  <main :class="classes">
    <List
      v-model="item.selected"
      v-for="(item, index) in current"
      :key="index"
      :title="item.title"
      :data="item.data"
      :filterable="filterable"
      :bth-opened="index != current.length - 1"
      :leftActive="item.leftActive"
      :operations="operations"
      :filter-placeholder="filterPlaceholder"
      :not-found-text="notFoundText"
      :filterMethod="filterMethod"
      :render-format="renderFormat"
      :parent-left-key="getParentKey(index, 'left')"
      :parent-right-key="getParentKey(index, 'right')"
      @move-to="moveTo($event, index)"
      @to-left-disabled="onLeftButtonDisabled($event, index)"
    ></List>
  </main>
</template>
<script>
import List from './list.vue';
import { deepCopy } from '../../../util/assist';
const { prefix } = require('../../../config.js');
let prefixCls = prefix + 'transfer';
export default {
  name: prefixCls,
  components: { List },
  props: {
    // 数据源
    data: {
      type: Array,
      validator(value) {
        return value.length >= 2;
      },
      default() {
        return [];
      }
    },
    // 按钮
    operations: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否显示搜索框
    filterable: Boolean,
    // 自定义搜索函数，入参为 data 和 query，data 为项，query 为当前输入的搜索词
    filterMethod: Function,
    // 每行数据渲染函数，该函数的入参为 data 中的项
    renderFormat: Function,
    // 搜索框的占位
    filterPlaceholder: String,
    // 当列表为空时显示的内容
    notFoundText: String
  },
  data() {
    return {
      prefixCls: prefixCls,
      current: this.setCurrent(this.data)
    };
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    }
  },
  watch: {
    data: function(newVal) {
      this.current = this.setCurrent(newVal);
    },
    current: {
      deep: true,
      immediate: true,
      handler: function(newVal) {
        let { keys, attributes } = this.getSelected(newVal);
        this.$emit('on-keys-change', keys);
        this.$emit('on-data-change', attributes);
      }
    }
  },
  methods: {
    moveTo(type, index) {
      let currentIndex = type === 'left' ? index + 1 : index;
      let toIndex = type === 'left' ? index : index + 1;
      let obj = this.isReduce(
        this.current[currentIndex].data,
        this.current[currentIndex].selected
      );
      // 当前option
      let currentOption = this.current[currentIndex];
      currentOption.data = [...obj.surplusData];
      currentOption.selected = obj.selecteds;
      // to option
      let toOption = this.current[toIndex];
      toOption.data = [...this.current[toIndex].data, ...obj.selectedData];
      this.$set(this.current, toIndex, toOption);
      this.$set(this.current, currentIndex, currentOption);
    },
    onLeftButtonDisabled(active, index) {
      if (!index) return;
      let data = this.current[index - 1];
      data.leftActive = active;
      this.$set(this.current, index - 1, data);
    },
    isReduce(data, selected) {
      let surplusData = [];
      let selecteds = selected;
      let selectedData = data.reduce(function(accumulator, current) {
        if (selected.indexOf(current.key) !== -1) {
          accumulator.push(current);
          selecteds = selecteds.filter(item => {
            return item !== current.key;
          });
        } else {
          surplusData.push(current);
        }
        return accumulator;
      }, []);
      return {
        selectedData,
        surplusData,
        selecteds
      };
    },
    setCurrent(value) {
      let _data = deepCopy(value);
      _data.forEach((option, index) => {
        let {
          data = [],
          selected = [],
          title = '标题',
          key = Date.now() + index
        } = option;
        option = {
          data,
          selected,
          title,
          key,
          leftActive: false
        };
      });
      return _data;
    },
    getSelected(data) {
      let keys = [];
      let attributes = [];
      data.forEach(item => {
        let desk = [];
        item.data.forEach(option => {
          desk.push(option.key);
        });
        keys.push(desk);
        attributes.push({
          title: item.title,
          data: item.data
        });
      });
      return { keys, attributes };
    },
    getParentKey(index, type) {
      let toIndex = type === 'left' ? index - 1 : index + 1;
      if (toIndex < 0 || toIndex > this.current.length - 1) {
        return null;
      }
      return this.current[toIndex].key;
    }
  }
};
</script>
