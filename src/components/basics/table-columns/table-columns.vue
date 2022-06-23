<template>
  <main :class="classes">
    <div :class="prefixCls + '-header'">
      <span>可添加的指标</span>
      <Input
        v-model="keyword"
        search
        clearable
        suffix="ios-search"
        style="width: 200px"
        placeholder="请输入列名称搜索"
        @on-change="keywordChange"
        @on-clear="keywordClear"></Input>
    </div>
    <div :class="prefixCls + '-content'">
      <Spin
        v-if="loading"
        fix></Spin>
      <ul
        class="mini-scroll-y"
        :class="prefixCls + '-nav-area-wrap'">
        <li
          v-for="item1 in data"
          :key="item1.key"
          :class="prefixCls + '-nav-area-list'">
          <div :class="prefixCls + '-nav-area-list-label'">{{ item1.title }}</div>
          <div
            v-for="item2 in item1.children"
            :key="item2.key"
            :class="[
              [prefixCls + '-nav-area-list-item'],
              { [prefixCls + '-nav-area-list-item-checked']: currentNav === item2.key }
            ]"
            :title="item2.title"
            @click="handleNavJump(item2.key)">
            {{ item2.title }}
          </div>
        </li>
      </ul>
      <div
        class="mini-scroll-y"
        :class="prefixCls + '-view'">
        <template v-if="hasSearchResult">
          <div
            v-for="item1 in data"
            :key="item1.key">
            <div
              v-for="item2 in item1.children"
              :id="item2.key"
              :key="item2.key"
              :class="[[prefixCls + '-view-list'], { [prefixCls + 'hide']: item2.hide }]">
              <div :class="prefixCls + '-view-list-checked-all'">
                <Checkbox
                  v-model="item2.check"
                  @click.prevent.native="handleCheckAll(item2)">
                  {{ item2.title }}
                </Checkbox>
              </div>
              <div :class="prefixCls + '-view-list-content'">
                <Checkbox
                  v-for="item3 in item2.children"
                  :key="item3.key"
                  v-model="item3.check"
                  :disabled="item3.disabled"
                  :class="[
                    [prefixCls + '-view-list-content-item'],
                    { hide: item3.hide, 'modify-title': modifyList.includes(item3.key) }
                  ]"
                  @on-change="handleCheck(item2, item3)">
                  <!-- 前缀 -->
                  <template v-if="item3.prefix">
                    <Tooltip
                      v-if="item3.prefix.content"
                      theme="light"
                      placement="top"
                      :content="item3.prefix.content">
                      <!-- ali-icon 暂时不能上传，先使用图片 -->
                      <!-- <Icon  v-if="item.disabled" :type="item3.prefix.icon"></Icon> -->
                      <img
                        v-if="item.disabled"
                        src="../../../images/draggable-card/unlock.png"
                        :class="prefixCls + '-icon-unlock'" />
                    </Tooltip>
                    <img
                      v-else
                      src="../../../images/draggable-card/unlock.png"
                      :class="prefixCls + '-icon-unlock'" />
                    <!-- ali-icon 暂时不能上传，先使用图片 -->
                    <!-- <Icon v-else :type="item3.prefix.icon"></Icon> -->
                  </template>
                  <!-- 名称 -->
                  <Tooltip
                    theme="light"
                    placement="top"
                    :content="item3.title">
                    <span :class="prefixCls + '-view-list-content-item-title'">
                      {{ item3.title }}
                    </span>
                  </Tooltip>
                  <!-- 后缀 -->
                  <template v-if="item3.suffix">
                    <Tooltip
                      v-if="item3.suffix.content"
                      theme="light"
                      placement="top"
                      :content="item3.suffix.content">
                      <Icon :type="item3.suffix.icon"></Icon>
                    </Tooltip>
                    <Icon
                      v-else
                      :type="item3.suffix.icon"></Icon>
                  </template>
                  <!-- 编辑 -->
                  <template v-if="item3.edit">
                    <edit-title
                      :item-data="item3"
                      :edit-call-back="editCallBack"
                      @success="item3.title = $event"></edit-title>
                  </template>
                </Checkbox>
              </div>
            </div>
          </div>
        </template>
        <div
          v-else
          :class="prefixCls + '-not-data'">
          没有检索到数据
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'table-columns'
import editTitle from './components/edit-title.vue'
let dataflat = []
export default {
  name: prefixCls,
  components: {
    editTitle
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    editCallBack: {
      type: Function
    }
  },
  data() {
    return {
      // 前缀
      prefixCls,
      loading: false,
      // 关键字
      keyword: '',
      currentNav: '',
      modifyList: [],
      sortsList: [],
      timer: null
    }
  },
  computed: {
    // 类名class集合
    classes() {
      const classList = [`${prefixCls}`, 'mini-scroll-y']
      return classList
    },
    // 包含搜索数据
    hasSearchResult() {
      return !dataflat.every(e => e.hide)
    }
  },
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      dataflat = this.flatArray(this.data)
      this.hookMap(this.data, item => {
        item.check = false
      })
      this.setItemCheck()
    },
    keywordChange() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hookMap(this.data, item => {
          if (item.children && item.children.length) {
            item['hide'] = item.children.filter(f => f.hide).length === item.children.length
          } else {
            item['hide'] = !item.title.includes(this.keyword)
          }
        })
      }, 500)
    },
    keywordClear() {
      this.keyword = ''
      this.keywordChange()
    },
    // 导航跳转
    handleNavJump(key) {
      this.currentNav = key
      const anchorEle = document.getElementById(key)
      if (anchorEle) {
        anchorEle.scrollIntoView({
          behavior: 'smooth'
        })
      }
    },
    // 点击全选
    handleCheckAll(list) {
      list.check = !list.check
      list.children.forEach(item => {
        if (!item.disabled) {
          this.$set(item, 'check', list.check)
        }
      })
      this.emitData()
    },
    handleCheck(parent) {
      let checkAll = parent.children.every(({ check }) => check)
      parent.check = checkAll
      this.emitData()
      /**
       * 注：
       * 如果全选有三个状态(未选、已选、全选)
       * let result =  可以修改成filter
       * result.length > 1 已选
       * result.length <= 0 未选
       * result.length === parent.children 全选
       * */
    },
    // 程序调用
    emitData() {
      let checkList = this.flatArray(this.data).filter(item => item.check)
      checkList = JSON.parse(JSON.stringify(checkList))
      // 处理tkio字段(添加额外参数)
      checkList.forEach(item => {
        // 排重数
        if (item.key.indexOf('dupnumEvent') === 0 && !item.title.includes('排重数')) {
          item.title = `${item.title}（排重数）`
        }
        // 总次数
        if (item.key.indexOf('numEvent') === 0 && !item.title.includes('总次数')) {
          item.title = `${item.title}（总次数）`
        }
      })
      // 讲带锁的数据排在最前面
      let result = Array.concat(
        checkList.filter(item => item.unlock),
        checkList.filter(item => !item.unlock)
      )
      let value = checkList.map(item => item.key)
      this.$emit('input', value)
      this.$emit('on-change', value)
      this.$emit('on-sort-data', result)
    },
    // 设置选中状态
    setItemCheck() {
      this.hookMap(this.data, item => {
        // v-model || 带锁的
        item.check = this.value.includes(item.key) || item.unlock
      })
      this.emitData()
    },
    // 发生编辑后数据
    onEdit(data) {
      this.$emit('on-edit', data)
    },
    // utils
    // 拉平数据
    flatArray(list) {
      let _list = list.map(item => {
        if (item.children) {
          return this.flatArray(item.children)
        } else {
          return item
        }
      })
      return _list.flat()
    },
    // 递归
    hookMap(list, callback) {
      return list.map(item => {
        if (item.children && item.children.length) {
          this.hookMap(item.children, callback)
        }
        callback && callback(item)
        return item
      })
    }

    // 对外暴露方法
    // ...
  }
}
</script>
