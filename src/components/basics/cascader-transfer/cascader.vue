<template>
  <main :class="prefixCls">
    <div :class="prefixCls + '-wrapper'">
      <ul :class="prefixCls + '-wrapper-content'">
        <Input
          v-if="isQuery"
          v-model="query"
          clearable
          search
          placeholder="请输入关键词搜索"
          @on-change="handleQuery" />
        <div v-if="entites.length">
          <li
            v-if="isShowCheckAll"
            :class="prefixCls + '-wrapper-content-item-wrapper'">
            <template v-if="!onlyBottom">
              <span :class="prefixCls + '-wrapper-content-check-box'">
                <Checkbox
                  :value="isCheckAll"
                  @on-change="handleCheckAll">
                  <span style="margin-left: 5px">全选</span>
                </Checkbox>
              </span>
            </template>
          </li>
          <li
            v-for="(item, index) in entites"
            :key="index + 'item-wrapper'"
            :class="prefixCls + '-wrapper-content-item-wrapper'">
            <span :class="prefixCls + '-wrapper-content-check-box'">
              <template v-if="onlyBottom">
                <Checkbox
                  v-if="!item.children"
                  v-model="item.check"
                  :disabled="(!item.check && getDisable) || item.disabled"
                  :indeterminate="item.little"
                  @on-change="handleSelect($event, item, index)"></Checkbox>
              </template>
              <template v-else>
                <Checkbox
                  v-model="item.check"
                  :disabled="(!item.check && getDisable) || item.disabled"
                  :indeterminate="item.little"
                  @on-change="handleSelect($event, item, index)"></Checkbox>
              </template>
              <span
                :class="prefixCls + '-wrapper-content-check-box-check-label'"
                @click="handleChildrenDatas(item, index, item.check)">
                {{ item[label] }}
                <span>
                  <Icon
                    v-show="item.children && item.children.length"
                    type="ios-arrow-forward"
                    :color="selectedValue === item[value] ? '#2b7df2' : ''"></Icon>
                </span>
              </span>
            </span>
          </li>
        </div>
        <template v-else>
          <div :class="prefixCls + '-content-none'">
            <Icon type="ios-folder-open-outline"></Icon>
            <p style="font-size: 14px">暂未选择</p>
          </div>
        </template>
      </ul>
    </div>
    <rd-cascader
      v-if="childrenDatas.length"
      ref="children"
      :title="childrenTitle"
      :datas="childrenDatas"
      :parent-id="hookParentId"
      :only-bottom="onlyBottom"
      :is-show-check-all="isShowCheckAll"
      :label="label"
      :value="value"
      @update="childUpdate"></rd-cascader>
  </main>
</template>

<script>
import { prefix } from '@src/config'
const prefixCls = prefix + 'cascader'
export default {
  name: prefixCls,
  props: {
    // 最底层才可以勾选
    onlyBottom: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '兴趣定向'
    },
    datas: {
      type: Array,
      default: () => []
    },
    parentId: {
      type: String,
      default: '0'
    },
    // 是否有全选的功能
    isShowCheckAll: {
      type: Boolean,
      default: true
    },
    selectDatas: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: 'label'
    },
    value: {
      type: String,
      default: 'value'
    },
    isQuery: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      hookParentId: this.parentId,
      entites: [],
      childrenDatas: [],
      selectedDatas: [],
      selectedIndex: -1,
      childrenCheck: false,
      getDisable: false,
      // 记录当前选中展开的Value
      selectedValue: '',
      query: ''
    }
  },
  computed: {
    isCheckAll() {
      return this.checkArrayAll(this.entites)
    }
  },
  watch: {
    datas: {
      deep: true,
      immediate: true,
      handler: function (v) {
        if (v) {
          this.$nextTick(() => {
            if (this.query) {
              return
            }
            this.entites = Object.assign([], v)
          })
        }
      }
    }
  },
  methods: {
    handleQuery() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.entites = this.datas.filter(item => item[this.label].includes(this.query))
      }, 500)
    },
    checkArrayAll(datas) {
      return Boolean(datas.length && datas.every(o => o.check))
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
    // 全选事件
    handleCheckAll(checked) {
      this.entites = this.entites.map(item => {
        item.check = checked
        item.little = false
        if (item.children && item.children.length) {
          this.childrenCheck = checked
          item.children = this.hookMapSelect(item.children, checked)
        }
        return item
      })
      this.updateToParent()
      this.maxCheck()
    },
    // 点击文字展开下一级
    handleChildrenDatas(item, index) {
      this.selectedIndex = index
      let value = item[this.value]
      this.selectedValue = value
      this.hookParentId = `${this.parentId}-${value}`
      // 点击父辈同级,如果没有子集则收缩
      if (this.$refs.children) {
        this.$refs.children.childrenDatas = []
        this.childrenDatas = []
      }

      if (item.children && item.children.length) {
        this.childrenDatas = item.children
        this.childrenTitle = item[this.label]
      }
    },
    // 点击checkbox事件
    handleSelect(checked, item, index) {
      this.maxCheck()
      if (checked) {
        item.little = false
      }
      this.selectedIndex = index
      let value = item[this.value]
      this.selectedValue = value
      // 点击父辈同级,如果没有子集则收缩
      if (this.$refs.children) {
        this.$refs.children.childrenDatas = []
        this.childrenDatas = []
      }
      if (item.children) {
        item.children = this.hookMapSelect(item.children, checked)
        this.childrenDatas = item.children
        this.childrenTitle = item[this.label]
      }
      this.updateToParent()
    },
    // 递归遍历 children & 赋值对应 checked
    hookMapSelect(list, checked) {
      return list.map(item => {
        if (checked) {
          item.little = false
        }
        item.check = checked
        if (item.children) {
          item.children = this.hookMapSelect(item.children, checked)
        }
        return item
      })
    },
    childUpdate(childDatas) {
      this.entites[this.selectedIndex].children = Object.assign([], childDatas)
      this.entites[this.selectedIndex].check = this.checkArrayAll(childDatas)
      if (this.entites[this.selectedIndex].check) {
        this.entites[this.selectedIndex].little = false
      } else {
        this.entites[this.selectedIndex].little = this.checkArrayLittle(childDatas)
      }
      this.updateToParent()
    },
    updateToParent() {
      this.$emit('update', this.entites)
    },
    // 选择不得超过限定数量
    maxCheck() {
      let selectArr = []
      this.entites.forEach(opt => {
        if (opt.check) {
          selectArr.push(opt)
        }
      })

      if (this.max && this.max <= selectArr.length) {
        this.getDisable = true
      } else {
        this.getDisable = false
      }
    }
  }
}
</script>
