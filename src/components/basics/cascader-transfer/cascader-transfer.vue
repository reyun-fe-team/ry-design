<template>
  <main :class="prefixCls">
    <div :class="prefixCls + '-content'">
      <div :class="prefixCls + '-content-massage'">
        <div :class="[prefixCls + '-content-massage-header', 'font-main', 'font-1']">
          {{ title }}
        </div>
        <cascader-content
          ref="muti"
          :class="prefixCls + '-cascader-content'"
          :title="title"
          :datas="mutiDatas"
          :only-bottom="onlyBottom"
          :is-show-check-all="isShowCheckAll"
          :select-datas="selectDatas"
          :max="max"
          :label="labelName"
          :value="valueName"
          :is-query="isQuery"
          @update="reciveDatas"
          @onSearch="onSearch" />
      </div>
      <div
        v-show="isShowMuitCascader"
        :class="prefixCls + '-select-wrapper'">
        <div :class="prefixCls + '-select-wrapper-header'">
          <span
            v-if="max"
            class="font-main font-1">
            已选（
            <span :class="goBeyondMaxLen ? 'error' : ''">{{ selectDatas.length }}</span>
            /{{ max }}）
          </span>
          <span
            v-else
            class="font-main font-1">
            已选
          </span>
          <span
            v-show="selectDatas.length"
            class="font-1-normal">
            <a
              href="javascript:void(0);"
              @click="clearAll">
              清空
            </a>
          </span>
        </div>
        <template v-if="!selectDatas.length">
          <div :class="prefixCls + '-select-wrapper-content-none'">
            <img
              :src="svg"
              alt />
            <span>暂未选择</span>
          </div>
        </template>
        <ul
          v-else
          :class="prefixCls + '-select-wrapper-content'">
          <li
            v-for="(item, index) in selectDatas"
            :key="`selected${index}`"
            :class="prefixCls + '-select-wrapper-content-item-wrapper'">
            <span
              :class="prefixCls + '-select-wrapper-content-item-wrapper-item-label'"
              class="font-main text-overflow">
              {{ item[selectedLabel] }}
            </span>
            <span
              :class="prefixCls + '-select-wrapper-content-item-wrapper-remove-btn'"
              @click="handleRemove(item)">
              <Icon
                color="#b8b9bb"
                size="16"
                type="md-close-circle" />
            </span>
          </li>
        </ul>
      </div>
    </div>
    <p
      v-if="goBeyondMaxLen && max"
      class="error">
      {{ title }}选择不能超过{{ max }}
    </p>
  </main>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'cascader-transfer'
import cascaderContent from './cascader'
import _cloneDeep from 'lodash/cloneDeep'
import svg from '@src/images/common/no-data.svg'
export default {
  name: prefixCls,
  components: {
    cascaderContent
  },
  props: {
    // 最底层才可以勾选
    onlyBottom: {
      type: Boolean,
      default: false
    },
    // 栏目 title
    title: {
      type: String,
      default: '省份'
    },
    // 数据数组 [{value,label,children:[{value,label,children:[]}]}] 嵌套
    datas: {
      type: Array,
      default: () => []
    },
    // 默认选中 - 对象 value
    value: {
      type: Array,
      default: () => []
    },
    // 是否有全选按钮
    isShowCheckAll: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 0
    },
    // 是否展示右侧已选
    isShowMuitCascader: {
      type: Boolean,
      default: true
    },
    labelName: {
      type: String,
      default: 'label'
    },
    valueName: {
      type: String,
      default: 'value'
    },
    // 是否有搜索（只支持一级搜索）
    isQuery: {
      type: Boolean,
      default: false
    },
    // 已选展示的名称（有层级关系的展示）
    selectedLabelName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      svg,
      mutiDatas: this.datas,
      selectDatas: []
    }
  },
  computed: {
    goBeyondMaxLen() {
      return this.selectDatas.length > this.max
    },
    selectedLabel() {
      return this.selectedLabelName || this.labelName
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(v) {
        if (v) {
          this.setDefaultDatas(v)
        }
      }
    },
    datas: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.mutiDatas = val
        })
      }
    }
    // mutiDatas: {
    //   handler() {
    //     this.$nextTick(() => {
    //       this.setDefaultDatas(this.value)
    //     })
    //   }
    // }
  },
  methods: {
    update() {
      let reciveDataArr = this.selectDatas.map(item => item[this.valueName])
      this.$emit('input', reciveDataArr)
      this.$emit('on-change', this.selectDatas)
    },
    reciveDatas(data) {
      // 记录之前选中的数据
      const selectDatas = _cloneDeep(this.selectDatas)
      // 左侧树当前的全部数据（搜索的时候树的值有变化）
      const dataIds = this.getLeftTreeData(data)
      this.selectDatas = []
      this.handleReciveCycle(data)
      // 搜索后，之前选中的数据，如果目前树中不存在，则要把之前选中的数据合并到新数组中 (就算树中的值为引用类型，String之后，仍可用includes找到 （广点通定向工作状态可测试）)
      const old = selectDatas.filter(
        item => !dataIds.includes(String(_cloneDeep(item[this.valueName])))
      )
      this.selectDatas = old.concat(this.selectDatas)
      this.update()
    },
    // 将左侧树的数据全部列出来
    getLeftTreeData(data) {
      let loopData = []
      this.getLoopData(data, loopData)
      return loopData
    },
    getLoopData(data, loopData) {
      data.forEach(item => {
        loopData.push(String(_cloneDeep(item[this.valueName])))
        if (item.children) {
          this.getLoopData(item.children, loopData)
        }
      })
    },
    handleReciveCycle(datas) {
      datas.map(item => {
        if (item.check) {
          if (this.onlyBottom) {
            // 如果只有最底层可选, 判断是否为最后一层数据，最后一层直接push，否则继续循环
            if (!item.children || !item.children.length) {
              this.selectDatas.push(item)
            } else {
              this.handleReciveCycle(item.children)
            }
          } else {
            this.selectDatas.push(item)
          }
        } else {
          if (item.children && item.children.length) {
            this.handleReciveCycle(item.children)
          }
        }
        return item
      })
    },
    checkArrayLittle(datas) {
      for (let i = 0; i < datas.length; i++) {
        let { little, check } = datas[i]
        if (little || check) {
          return true
        }
      }
      return false
    },
    checkArrayAll(datas) {
      for (let i = 0; i < datas.length; i++) {
        if (!datas[i].check) {
          return false
        }
      }
      return true
    },
    handleRemove(item) {
      this.selectDatas = this.selectDatas.filter(_item => {
        return _item[this.valueName] !== item[this.valueName]
      })
      this.update()
      this.handleRemoveCycle(this.mutiDatas, item[this.valueName])
    },
    handleRemoveCycle(datas, v) {
      return datas.map(item => {
        if (v === item[this.valueName]) {
          this.eventLoop(item)
        } else {
          if (item.children && item.children.length) {
            item.children = this.handleRemoveCycle(item.children, v)
            if (this.checkArrayAll(item.children)) {
              item.check = true
              item.little = false
            } else if (this.checkArrayLittle(item.children)) {
              item.check = false
              item.little = true
            } else {
              item.check = false
              item.little = false
            }
          }
        }
        return item
      })
    },
    eventLoop(item) {
      this.$set(item, 'check', false)
      this.$set(item, 'little', false)
      if (item.children && item.children.length) {
        item.children = item.children.map(_item => {
          this.eventLoop(_item)
          return _item
        })
      }
      return item
    },
    setDefaultDatas(datas) {
      this.selectDatas = []
      this.mutiDatas = this.datas
      this.handleDefaultCycle(this.mutiDatas, datas)
      this.$emit('on-change', this.selectDatas)
    },
    handleDefaultCycle(mutiDatas, datas) {
      return mutiDatas.map(item => {
        if (datas.includes(item[this.valueName])) {
          this.$set(item, 'check', true)
          this.$set(item, 'little', false)
          if (item.children && item.children.length) {
            item.children = this.handleChildrenCheck(item.children)
          }
          if (this.onlyBottom) {
            // 如果只有最底层可选, 判断是否为最后一层数据，最后一层直接push，否则继续循环
            if (!item.children || !item.children.length) {
              this.selectDatas.push(item)
            } else {
              this.handleDefaultCycle(item.children, datas)
            }
          } else {
            this.selectDatas.push(item)
          }
        } else {
          this.$set(item, 'check', false)
          this.$set(item, 'little', false)
          if (item.children && item.children.length) {
            item.children = this.handleDefaultCycle(item.children, datas)
            if (this.checkArrayLittle(item.children)) {
              item.little = true
            }
          }
        }
        return item
      })
    },
    handleChildrenCheck(data) {
      return data.map(item => {
        this.$set(item, 'check', true)
        this.$set(item, 'little', false)
        if (item.children && item.children.length) {
          this.handleChildrenCheck(item.children)
        }
        return item
      })
    },
    onSearch(e) {
      this.$emit('on-search', e)
    },
    // 取消全选
    clearAll() {
      // 调用子组件的清空实现
      this.$refs.muti.handleCheckAll(false)
    }
  }
}
</script>
