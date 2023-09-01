<template>
  <main :class="classes">
    <div :class="prefixCls + '-header'">
      <slot name="header">
        <div>
          <span>可添加的指标</span>
          <span
            v-if="showAddCustom"
            :class="prefixCls + '-header-add-custom'"
            @click="handlerAddCustom">
            + 添加自定义指标
          </span>
        </div>
      </slot>
    </div>

    <div>
      <Input
        v-model="keyword"
        search
        clearable
        :class="prefixCls + '-keyword-class'"
        suffix="ios-search"
        placeholder="请输入列名称搜索"
        @on-change="keywordChange"
        @on-clear="keywordClear"></Input>
    </div>

    <div :class="prefixCls + '-content'">
      <Spin
        v-if="loading"
        fix></Spin>
      <ul
        class="small-scroll-y"
        :class="prefixCls + '-nav-area-wrap'">
        <li
          v-for="indicatType in listData"
          :key="indicatType.key"
          :class="prefixCls + '-nav-area-list'">
          <div :class="prefixCls + '-nav-area-list-label'">{{ indicatType.title }}</div>
          <div
            v-for="indicatClassify in indicatType.children"
            :key="indicatClassify.key"
            :class="[
              [prefixCls + '-nav-area-list-item'],
              { [prefixCls + '-nav-area-list-item-checked']: currentNav === indicatClassify.key }
            ]"
            :title="indicatClassify.title"
            @click="handleNavJump(indicatClassify.key)">
            {{ indicatClassify.title }}
          </div>
        </li>
      </ul>
      <div
        class="small-scroll-y"
        :class="prefixCls + '-view'">
        <template v-if="hasSearchResult">
          <div
            v-for="indicatType in listData"
            :key="indicatType.key">
            <div
              v-for="indicatClassify in indicatType.children"
              :id="indicatClassify.key"
              :key="indicatClassify.key"
              :class="[
                [prefixCls + '-view-list'],
                { [prefixCls + '-hide']: indicatClassify.hide }
              ]">
              <div :class="prefixCls + '-view-list-checked-all'">
                <Checkbox
                  :key="indicatClassify.key"
                  v-model="indicatClassify.check"
                  @on-change="handleCheckAll($event, indicatClassify)">
                  {{ indicatClassify.title }}
                </Checkbox>
              </div>
              <div :class="prefixCls + '-view-list-content'">
                <Checkbox
                  v-for="item in indicatClassify.children"
                  :key="item.key"
                  v-model="item.check"
                  :disabled="item.disabled"
                  :class="[
                    [prefixCls + '-view-list-content-item'],
                    { [prefixCls + '-hide']: item.hide }
                  ]"
                  @on-change="handleCheck(item)">
                  <!-- 前缀 -->
                  <template v-if="item.prefix">
                    <Tooltip
                      v-if="item.prefix.content"
                      theme="light"
                      placement="top"
                      :max-width="200"
                      :content="item.prefix.content">
                      <!-- ali-icon 暂时不能上传，先使用图片 -->
                      <ry-icon
                        v-if="item.disabled"
                        :type="item.prefix.icon"
                        size="10"></ry-icon>
                    </Tooltip>
                    <ry-icon
                      v-else
                      :type="item.prefix.icon"
                      size="10"></ry-icon>
                  </template>
                  <!-- 名称 -->
                  <Tooltip
                    v-if="item.tooltip"
                    theme="light"
                    placement="top"
                    :max-width="200"
                    :content="item.tooltip">
                    <span :class="prefixCls + '-view-list-content-item-title'">
                      {{ item.title }}
                    </span>
                  </Tooltip>
                  <span
                    v-else
                    :class="prefixCls + '-view-list-content-item-title'">
                    {{ item.title }}
                  </span>
                  <!-- 后缀 -->
                  <template v-if="item.suffix">
                    <Tooltip
                      v-if="item.suffix.content"
                      theme="light"
                      placement="top"
                      :max-width="200"
                      :content="item.suffix.content">
                      <ry-icon
                        :type="item.suffix.icon"
                        size="10"></ry-icon>
                    </Tooltip>
                    <ry-icon
                      v-else
                      :type="item.suffix.icon"
                      size="10"></ry-icon>
                  </template>
                  <!-- 编辑 -->
                  <template v-if="item.edit">
                    <edit-title
                      :item-data="item"
                      :edit-call-back="editCallBack"
                      @success="onEditTitleSuccess($event, item)"></edit-title>
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
import ryIcon from '../icon/icon.vue'
import _isEqual from 'lodash/isEqual'
import _cloneDeep from 'lodash/cloneDeep'

let dataflat = []
export default {
  name: prefixCls,
  components: {
    editTitle,
    ryIcon
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
    },
    showAddCustom: {
      type: Boolean,
      default: false
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
      hookValue: [],
      timer: null,
      listData: []
    }
  },
  computed: {
    // 类名class集合
    classes() {
      const classList = [`${prefixCls}`, 'small-scroll-y']
      return classList
    },
    // 包含搜索数据
    hasSearchResult() {
      return !this.flatArray(this.listData).every(e => e.hide)
    }
  },
  watch: {
    value(n, o) {
      if (!_isEqual(n, o)) {
        this.hookValue = n
        this.setItemCheck()
        this.emitData()
      }
    },
    data: {
      handler(val) {
        this.listData = _cloneDeep(val)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      dataflat = this.flatArray(this.data)
      this.hookValue = this.value
      this.setItemCheck()
      this.emitData()
    },
    handlerAddCustom() {
      this.$emit('add-custom')
    },
    // #用户交互
    keywordChange() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {}, 500)
      this.hookMap(this.listData, item => {
        if (item.children && item.children.length) {
          item['hide'] = item.children.filter(f => f.hide).length === item.children.length
        } else {
          item['hide'] = !item.title.includes(this.keyword)
        }
      })
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
    handleCheckAll(check, list) {
      let keys = []
      list.check = check
      list.children.forEach(item => {
        if (!item.disabled) {
          this.$set(item, 'check', check)
          keys.push(item.key)
        }
      })
      let value = this.hookValue
      if (check) {
        // 全选：先过滤已选中包含本次的key(保留没有出现的key)
        keys = keys.filter(e => !this.hookValue.includes(e))
      } else {
        // 反选：过滤掉本次选中的所有key(删除本次)
        value = this.hookValue.filter(e => !keys.includes(e))
        keys = []
      }
      value = value.concat(keys)
      this.hookValue = value
      this.emitData()
    },
    // 单选
    handleCheck(item) {
      let index = this.hookValue.findIndex(e => item.key === e)
      if (index === -1) {
        this.hookValue.push(item.key)
      } else {
        this.hookValue.splice(index, 1)
      }
      this.emitData()
    },
    // #监听
    onEditTitleSuccess(e, item) {
      this.$set(item, 'title', e)
      this.emitData()
    },
    // #实例方法
    emitData() {
      let checkList = this.getColumnsList()
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
      // 将带锁的数据排在最前面(如果数据保证正确，那么则不需要两次filter)
      let result = [].concat(
        checkList.filter(item => item.unlock),
        checkList.filter(item => !item.unlock)
      )
      let value = result.map(e => e.key)
      this.$emit('input', value)
      this.$emit('on-change', value)
      this.$emit('on-change-data', {
        value,
        list: result
      })
    },
    // 设置选中状态
    setItemCheck() {
      this.hookMap(this.listData, item => {
        item['check'] = item.unlock || this.hookValue.includes(item.key)
        if (item.children && item.children.length) {
          item['check'] = item.children.every(({ check }) => check)
          /**
           * 注：
           * 父级需要三个状态(未选、已选、全选)的话
           * let result =  parent.children.filter(e => e.check)
           * result.length > 1 已选
           * result.length <= 0 未选
           * result.length === parent.children 全选
           * */
        }
      })
    },
    // 根据value 获取指标item
    getColumnsList() {
      let arr = []
      this.hookValue.forEach(e => {
        let item = dataflat.find(f => f.key === e)
        if (item) {
          arr.push(item)
        }
      })
      return arr
    },
    // #utils
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
    // 递归到底
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
