<template>
  <ul class="render-list">
    <li v-if="!useMax && showCheckBox"
        class="li-style">
      <Checkbox ref="CheckAllRef"
                style="margin-right: 5px"
                @on-change="handleCheckAll"
                :indeterminate="indeterminateAll"
                @click.native.stop
                :value="checkedAll"
                :disabled="disabledAll || notUseAble"></Checkbox>
      <p class="li-label-style">
        <span style="margin-left: 5px">全选</span>
      </p>
    </li>
    <li class="li-style"
        v-for="(node, nodeIndex) in list"
        :key="getKey(node)"
        :class="{ 'active-li': activeList[level - 1] === node.id }"
        @mouseover="handleMouseEnter(node, nodeIndex, level)"
        @mouseout="allowEmit = true">
      <Checkbox v-if="showCheckBox"
                style="margin-right: 5px"
                @on-change="handleCheck($event, node)"
                :indeterminate="node.indeterminate"
                @click.native.stop
                v-model="node.checked"
                :disabled="node.disabled || notUseAble"></Checkbox>
      <p class="li-label-style"
         @click="handleClick(node, nodeIndex, level)">
        <span :title="node[labelKey]"
              style="margin-left: 5px">
          {{node[labelKey]}}
        </span>
        <Icon v-if="node.loading"
              class="li-label-icon turn"
              type="ios-sync" />
        <Icon v-if="showNextIcon(node)"
              class="li-label-icon"
              type="ios-arrow-forward" />
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      allowEmit: true
    }
  },
  props: {
    // 最大的请求层级 0 为不限制
    maxRequest: {
      type: Number,
      default: 0
    },
    // 是否使用了最大选择个数
    useMax: {
      type: Boolean,
      default: false
    },
    // 显示层级列表
    activeList: {
      type: Array,
      default: () => []
    },
    // 显示的数据
    list: {
      type: Array,
      default: () => []
    },
    // 当前层级
    level: {
      type: [Number, String]
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    expandTrigger: {
      type: String,
      default: 'click'
    },
    // 禁用复选框
    notUseAble: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 是否显示选择框
    showCheckBox() {
      const show = this.list.every(v => Boolean(v.showCheck))
      return show
    },
    indeterminateAll() {
      const falseAll = this.list.every(v => !v.checked)
      return !(this.checkedAll || falseAll)
    },
    checkedAll() {
      const trueAll = this.list.every(v => v.checked)
      return trueAll
    },
    disabledAll() {
      const disableAll = this.list.every(v => v.disabled)
      return disableAll
    }
  },
  methods: {
    // 显示下一级的箭头
    showNextIcon(node) {
      let show = true
      // 是不是最大层级了
      const canMax = this.maxRequest ? this.level >= this.maxRequest : false
      // 加载不显示 没有下一级不显示 最大层级了不显示
      if (node.loading || !node.showExpIcon || canMax) {
        show = false
      }
      return show
    },
    handleCheckAll(val) {
      this.$emit('handle-checkAll', val, this.list)
    },
    handleMouseEnter(node, levelIndex, level) {
      if (this.expandTrigger === 'hover' && this.allowEmit) {
        this.$emit('handle-click', node, levelIndex, level)
        this.allowEmit = false
      }
    },
    handleClick(node, levelIndex, level) {
      if (this.expandTrigger === 'click') {
        this.$emit('handle-click', node, levelIndex, level)
      }
    },
    handleCheck(v, node) {
      node.checked = v
      this.$emit('handle-check', node)
    },
    // 唯一key v-for
    getKey() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0
        let v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
  }
}
</script>
<style lang="less" scoped>
// loading旋转动画
@keyframes turn {
  0% {
    transform: translate(0, -50%) rotate(0deg);
  }
  100% {
    transform: translate(0, -50%) rotate(360deg);
  }
}
.turn {
  animation: turn 1s linear infinite;
}
.render-list {
  padding-left: 0;
  max-height: 224px;
  overflow-x: hidden;
  overflow-y: auto;
  .li-style {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    padding: 0 10px;
    box-sizing: border-box;
    list-style: none;
    width: 160px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    &:hover,
    &.selected,
    &.active-li {
      background: #f3f3f3;
      color: #3989fa;
    }
    .li-label-style {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      box-sizing: border-box;
      margin-top: 0;
      margin-bottom: 0;
      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex: 1;
        height: 100%;
      }
      .li-label-icon {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>
