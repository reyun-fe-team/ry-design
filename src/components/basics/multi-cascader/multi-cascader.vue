<!--
 * @Author: yangyufeng
 * @Date: 2022-04-02 11:53:02
 * @LastEditTime: 2022-12-03 18:54:32
 * @LastEditors: yangyufeng yangyufeng.web@qq.com
 * @Description: 下拉多选联动
 * @FilePath: /ry-design/src/components/basics/multi-cascader/multi-cascader.vue
-->
<template>
  <div :class="[prefixCls]">
    <Dropdown
      ref="Dropdown"
      trigger="click"
      :placement="placement"
      :transfer="transfer"
      stop-propagation
      :transfer-class-name="`${popperClass} ${unid}`"
      v-bind="$attrs"
      @on-visible-change="visibleChange">
      <div
        :class="[prefixCls + '-labels', 'small-scroll-y']"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave">
        <div
          v-if="selectedLabels.length > 0"
          :class="[prefixCls + '-labels-tags']">
          <Tag
            v-for="(tag, index) in newSelectedLabels"
            :key="index"
            :style="tagStyle"
            :fade="false"
            closable
            @on-close="removeOne(tag, value[index])">
            <span
              :class="[prefixCls + '-labels-tags-text']"
              :title="tag">
              {{ tag }}
            </span>
          </Tag>
          <!-- 多选自定义提示 -->
          <template v-if="showMaxTagPlaceholder">
            <Tag :fade="false">
              <span :class="[prefixCls + '-labels-tags-text']">
                {{ showMaxTagPlaceholder }}
              </span>
            </Tag>
          </template>
        </div>
        <p
          v-else
          :class="[prefixCls + '-labels-placeholder-text']">
          {{ placeholder }}
        </p>
        <!-- 清空 -->
        <Icon
          v-show="showClearBtn"
          :class="[prefixCls + '-labels-icon']"
          type="ios-close-circle-outline"
          @click.stop.prevent="handleClear"></Icon>
        <!-- 下拉icon -->
        <Icon
          v-show="!showClear"
          :class="[prefixCls + '-labels-icon']"
          type="ios-arrow-down"></Icon>
      </div>
      <div slot="list">
        <div
          :class="[prefixCls + '-ground']"
          @click.stop>
          <!-- 根节点面板 -->
          <div :class="[prefixCls + '-ground-pos']">
            <multi-cascader-list
              :tooltip-key="tooltipKey"
              :show-empty-wrap-by-not-synced="showEmptyWrapByNotSynced"
              :sync="sync"
              :list="root.childNodes"
              :level="1"
              :active-list="activeList"
              :not-use-able="notUseAble"
              :max-request="maxRequest"
              :use-max="useMax"
              :label-key="labelKey"
              :expand-trigger="expandTrigger"
              @handle-show-empty-wrap="handleShowEmptyWrap"
              @handle-click="handleClick"
              @handle-check="handleCheck"
              @handle-checkAll="handleCheckAll"></multi-cascader-list>
          </div>
          <!-- 子级节点面板 -->
          <template v-for="item in maxLevellist">
            <div
              v-if="item.rendered && showData[item.id].length"
              v-show="activeList.length >= item.id"
              :key="item.id"
              :class="[prefixCls + '-ground-pos']">
              <multi-cascader-list
                :tooltip-key="tooltipKey"
                :show-empty-wrap-by-not-synced="showEmptyWrapByNotSynced"
                :sync="sync"
                :list="showData[item.id]"
                :level="item.id + 1"
                :active-list="activeList"
                :not-use-able="notUseAble"
                :max-request="maxRequest"
                :use-max="useMax"
                :label-key="labelKey"
                :expand-trigger="expandTrigger"
                @handle-show-empty-wrap="handleShowEmptyWrap"
                @handle-click="handleClick"
                @handle-check="handleCheck"
                @handle-checkAll="handleCheckAll"></multi-cascader-list>
            </div>
          </template>
          <!-- 暂无数据面板 -->
          <div
            v-if="isShowEmptyData.show"
            :class="[prefixCls + '-ground-pos']">
            <div :class="[prefixCls + '-empty']">暂无数据</div>
          </div>
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'multi-cascader'
import TreeStore from './lib/Tree.js'
import multiCascaderList from './multi-cascader-list.vue'
import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import _debounce from 'lodash/debounce'

export default {
  name: prefixCls,
  components: {
    multiCascaderList
  },
  props: {
    // tag的最大显示宽度，单位：px。传入 0 不限制；默认最大值为88
    tagMaxWidth: {
      type: [String, Number],
      default: 88
    },
    // 多选时最多显示多少个 tag
    // eslint-disable-next-line vue/require-default-prop
    maxTagCount: {
      type: Number
    },
    // 隐藏 tag 时显示的内容，参数是剩余项数量
    // eslint-disable-next-line vue/require-default-prop
    maxTagPlaceholder: {
      type: Function
    },
    // 是否要回显labels
    echoLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 每一级别是否可以选择的数据字段，不填写默认显示选择框。tips: 只有在当前层级全部设置为true才会显示复选框和全选框
    checkKey: {
      type: String,
      default: 'showCheck'
    },
    // @todo 设置上级的全选不用选择下一级的数据
    // false 不用选择下一级 true 必选选择下一级
    notSelectNext: {
      type: Boolean,
      default: false
    },
    // 最大的请求层级 0 为不限制
    maxRequest: {
      type: Number,
      default: 0
    },
    // 异步加载子元素 异步传入数据
    sync: {
      type: Boolean,
      default: false
    },
    // 异步请求数据的回调 必须开启异步请求开关 sync为true
    syncCallBack: {
      type: Function,
      default: () => {
        // 默认一个函数
        return () => {}
      }
    },
    // label显示的层级 all 全部 / last 最后一层
    labelLv: {
      type: String,
      default: 'all'
    },
    // 下拉菜单出现的位置，可选值为toptop-starttop-endbottombottom-startbottom-endleftleft-startleft-endrightright-startright-en
    placement: {
      type: String,
      default: 'bottom'
    },
    // 是否放在body下面展示list
    transfer: {
      type: Boolean,
      default: false
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 最大选择数 使用该属性不能使用全选功能
    // eslint-disable-next-line vue/require-default-prop
    maxCount: {
      type: Number
    },
    // 标签是否可以全部清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 列表数据
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    // 是否只显示选中的
    onlyShowChecked: {
      type: Boolean,
      default: false
    },
    isShowIndeterminate: {
      // 是否显示半选
      type: Boolean,
      default: true
    },
    // v-model值，页面刷新默认值（只需传选中的id，eg：['jiaohu', 'yizhi']）注意不要传重复，传了父节点就不要传子节点（错误案例：['zhinan', 'yizhi']）
    value: {
      type: Array,
      required: true
    },
    // 分隔符（onlyShowChecked为false时有效）
    separator: {
      type: String,
      default: '-'
    },
    // ------暂不支持搜索---------------
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: false
    },
    // 自定义搜索方法
    // eslint-disable-next-line vue/require-default-prop
    filterMethod: {
      type: Function
    },
    // Select 下拉框的类名
    popperClass: {
      type: String,
      default: prefixCls + '-select'
    },
    // 作为 value 唯一标识的键名
    valueKey: {
      type: String,
      default: 'value'
    },
    // 作为 label 唯一标识的键名
    labelKey: {
      type: String,
      default: 'label'
    },
    // 作为 children 唯一标识的键名
    childrenKey: {
      type: String,
      default: 'children'
    },
    // 作为 tooltip 唯一标识的键名
    // 面板选项的tooltip字段key
    tooltipKey: {
      type: String,
      default: 'tooltip'
    },
    // 下级展开方式
    expandTrigger: {
      type: String,
      default: 'click'
    },
    // 是否允许父子联动
    selectChildren: {
      type: Boolean,
      default: true
    },
    // 当传入全量数据时，将可主动控制是否显示"暂无数据"面板项
    // 使用该属性时，sync需要关闭
    // 默认展示
    showEmptyWrapByNotSynced: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      // 显示清空
      showClear: false,
      // 缓存传入的label和value
      storeEchoData: {
        label: [],
        value: []
      },
      // 唯一类 面板
      unid: 'uid-' + this.getKey(),
      activeClass: '',
      // 选择的label
      selectedLabels: [],
      // 选择的id
      selectedIds: [],
      // 选择的节点
      selectedNodes: [],
      // 数据存储容器
      store: {},
      // 根节点组
      root: [],
      // 最高层级的数据 @data id:1 rendered:true
      maxLevellist: [],
      // 节点后面的组
      showData: {},
      activeList: [],
      // 搜索
      searchText: '',
      searchResult: [],
      // 暂无数据显示
      isShowEmptyData: {
        show: false,
        level: 0
      }
    }
  },
  computed: {
    // 标签的样式
    tagStyle() {
      if (!this.tagMaxWidth || this.tagMaxWidth === '0') {
        return {}
      }
      return {
        maxWidth: this.tagMaxWidth + 'px'
      }
    },
    // 显示的选择的label
    newSelectedLabels() {
      const { selectedLabels, maxTagCount } = this
      if (maxTagCount === undefined) {
        return selectedLabels
      }
      return selectedLabels.slice(0, maxTagCount)
    },
    // 自定义显示
    showMaxTagPlaceholder() {
      const { selectedLabels, maxTagCount, maxTagPlaceholder } = this
      if (maxTagCount === undefined) {
        return ''
      }
      const selectedNum = selectedLabels.length
      const num = selectedNum - maxTagCount
      if (num > 0) {
        if (maxTagPlaceholder) {
          return maxTagPlaceholder(num, selectedNum)
        } else {
          return `${selectedNum}`
        }
      } else {
        return ''
      }
    },
    // 显示清空按钮
    showClearBtn() {
      return this.clearable && this.value.length > 0 && this.showClear
    },
    // 有没有传入回显
    renShow() {
      return this.sync && this.echoLabel.length > 0
    },
    // 面板宽度
    activeClassByWidth() {
      if (!this.activeClass) {
        return 160
      }
      return 160 * +this.activeClass
    },
    // 是不是在搜素
    isSearching() {
      return !(this.searchText.trim() === '')
    },
    // 超出最大选择个数 不可用
    notUseAble() {
      return this.maxCount ? this.selectedIds.length >= this.maxCount : false
    },
    // 用了最大限制
    useMax() {
      return Boolean(this.maxCount)
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.init()
      }
    },
    selectedNodes() {
      this.selectedNodesWatch()
    },
    // 传入数据变化更新store选中数据
    value: {
      deep: true,
      handler(n, o) {
        this.updateDropPosition()
        const JS = JSON.stringify
        if (!n || !o || JS(n) === JS(o)) {
          return
        }
        // 不可用时不更新数据
        if (this.notUseAble) {
          this.$emit('input', n.slice(0, this.maxCount))
        }
        // 清空选择
        this.cleatStoreSeleted()
        if (this.value.length <= 0) {
          this.showClear = false
          return
        }
        // 先清空 在选中
        this.renderData()
      }
    },
    // 返回labels
    selectedLabels: {
      deep: true,
      handler(n) {
        this.$emit('getLables', n)
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 更新位置
    updateDropPosition() {
      this.$nextTick(() => {
        const ref = this.$refs['Dropdown']
        const dropRef = ref.$refs.drop
        dropRef && dropRef.update()
      })
    },
    // watch selectedNodes handler
    selectedNodesWatch: _debounce(function () {
      const selected = this.selectedNodes.map(o => o[this.valueKey])
      this.$emit('change', selected)
    }, 250),
    handleMouseenter() {
      if (this.clearable && this.value.length > 0) {
        this.showClear = true
      }
    },
    handleMouseleave() {
      if (this.clearable && this.value.length > 0) {
        this.showClear = false
      }
    },
    // 弹出层的展示和取消
    visibleChange(v) {
      if (!v) {
        this.searchText = ''
      }
      this.$emit('visible-change', v)
    },
    // 清空内部数据存储
    cleatStoreSeleted() {
      this.store.nodeList.forEach(targetNode => {
        if (targetNode) {
          targetNode.check(false)
        }
      })
      this.selectedNodes = []
      this.selectedLabels = []
      this.selectedIds = []
    },
    // 全部清空
    handleClear() {
      this.$emit('input', [])
      this.cleatStoreSeleted()
      this.$emit('clear')
    },
    // 搜索
    innerFilterMethod(v) {
      this.searchText = v
      let tempResult = this.store.nodeList
      if (v.trim() !== '') {
        this.activeClass = ''
        if (typeof this.filterMethod === 'function') {
          this.searchResult = this.filterMethod(tempResult, v)
        } else {
          tempResult = tempResult.filter(o => o.isLeaf)
          tempResult = tempResult.filter(o => o.showLabel.includes(v))
          this.searchResult = tempResult
        }
      } else {
        this.activeClass = '1'
      }
    },
    // 唯一key v-for
    getKey() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0
        let v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    // 显示暂无数据面板
    handleShowEmptyWrap(data) {
      this.isShowEmptyData = data
    },
    // 面板一层点击
    handleClick(node, levelIndex, level) {
      const { sync, syncCallBack, maxRequest } = this
      const { childNodes = [], loading = false, showExpIcon = true } = node
      if (childNodes && childNodes.length <= 0) {
        // 是异步请求模式 有请求回调方法 不是正在请求中 有下一级数据要显示
        const canSync = sync && syncCallBack && !loading && showExpIcon
        // 有设置最大请求层级 没有超过最大请求层级数
        const canMax = maxRequest ? level < maxRequest : true
        // 最大层级了不能再点击了
        if (!canMax) {
          node.nodeSyncSetData({ showExpIcon: false })
        } else {
          // 可以异步请求
          if (canSync) {
            // loading状态
            node.nodeSyncSetData({ loading: true })
            this.syncCallBack(node)
              .then(children => {
                // 数据为一个数据并有值
                if (Array.isArray(children) && children.length > 0) {
                  node.nodeSyncClick(children)
                  children.forEach(child => {
                    node.insertChild(child)
                  })

                  this.maxLevellist = Array.from({ length: this.store.maxLevel - 1 }, (v, i) => {
                    return {
                      id: i + 1,
                      rendered: true
                    }
                  })
                  node.nodeSyncSetData({ loading: false })
                  this.showNext(node, levelIndex, level)
                  // 有了数据更新前后状态
                  this.$nextTick(() => {
                    node.checked = false
                    this.handleCheck(node)
                    // 存一下需要删除值的索引
                    let indexArr = []
                    setTimeout(() => {
                      let { value: echoVal, label: echoName } = this.storeEchoData
                      node.childNodes &&
                        node.childNodes.forEach(childNode => {
                          // 当前子节点的value
                          let nodeVal = this.getValueByNode(childNode)
                          // 子节点在回显缓存中的索引
                          let nodeIndex = _findIndex(echoVal, v => v === nodeVal)
                          // 缓存中存在该节点的值
                          if (nodeIndex !== -1) {
                            childNode.check(true)
                            // 选择完会加上该节点的id
                            // 思路：选择的节点中有回显的值，将该节点的id替换回显中的id
                            this.store.selectedIds.pop()
                            // 存索引 用于当前列的值替换完了后，更新缓存的值，已经的替换的就删除缓存的值
                            indexArr.push(nodeIndex)
                            // 替换
                            this.store.selectedIds.splice(nodeIndex, 1, childNode.id)
                          }
                        })

                      // 更新缓存的值
                      indexArr.forEach(i => {
                        echoVal.splice(i, 1, 'USED')
                        echoName.splice(i, 1, 'USED')
                      })
                      this.storeEchoData = {
                        value: echoVal.filter(v => v !== 'USED'),
                        label: echoName.filter(v => v !== 'USED')
                      }
                      this.updateSelect(this.store.selectedIds)
                    }, 16.7)
                  })
                } else {
                  // 没有数据
                  node.nodeSyncSetData({ loading: false, showExpIcon: false })
                  this.showNext(node, levelIndex, level)
                }
              })
              .catch(() => {
                // 请求失败了
                node.nodeSyncSetData({ loading: false })
                this.showNext(node, levelIndex, level)
              })
          } else {
            // 不用在请求了
            this.showNext(node, levelIndex, level)
          }
        }
      } else {
        this.showNext(node, levelIndex, level)
      }
    },
    // 显示下级
    showNext(node, levelIndex, level) {
      if (this.maxLevellist[level - 1]) {
        this.maxLevellist[level - 1].rendered = true
      }
      this.activeClass = `${node.isLeaf ? level : level + 1}`
      let tempList = _cloneDeep(this.activeList)
      if (level < tempList.length) {
        tempList.splice(level)
      }
      tempList[level - 1] = node.id
      this.showData[level] = node.childNodes
      this.activeList = tempList
    },
    // 半选状态
    isIndeterminate(level, nodeList) {
      if (level === 0) {
        return
      }
      nodeList.forEach(node => {
        let checkedlList = node.childNodes.filter(child => child.checked)
        if (node.level - level === -1) {
          node.indeterminate = false
          let indeterminatelist = node.childNodes.filter(child => child.indeterminate)
          let sumLength = checkedlList.length + indeterminatelist.length
          if (sumLength && checkedlList.length < node.childNodes.length) {
            node.indeterminate = true
            this.isIndeterminate(level - 1, this.root.childNodes)
          }
        } else if (node.level !== level) {
          this.isIndeterminate(level, node.childNodes)
        }
        if (checkedlList.length === node.childNodes.length) {
          node.indeterminate = false
        }
      })
    },
    // 获取单个节点的value
    getValueByNode(node) {
      let val = node[this.valueKey] || ''
      while (node.parent[this.valueKey]) {
        let pval = node.parent[this.valueKey]
        val = pval + this.separator + val
        node = node.parent
      }
      return val
    },
    // 获取value
    getValue() {
      let result = this.selectedNodes.map(oNode => {
        if (!this.onlyShowChecked) {
          let level = oNode.level
          let valueKey = ''
          let node = oNode
          while (level !== 0) {
            valueKey = node[this.valueKey] + (valueKey ? this.separator : '') + valueKey
            node = node.parent
            level--
          }
          return valueKey
        }
        return oNode[this.valueKey]
      })
      // 有不存在的id 小于0的
      let hasEmptyIndex = _findIndex(this.selectedIds, v => +v < 0)
      if (hasEmptyIndex !== -1) {
        result = [...this.storeEchoData.value, ...result]
      }
      return result
    },
    // 面板复选框选中
    handleCheck(node) {
      node.check(node.checked)
      this.selectedIds = this.store.selectedIds
      this.updateSelect(this.store.selectedIds)
      const result = this.getValue()
      this.$emit('input', result)
      this.$nextTick(() => {
        if (this.isShowIndeterminate && this.selectChildren) {
          this.isIndeterminate(node.level, this.root.childNodes)
        }
      })
    },
    // 面板复选框全选中
    handleCheckAll(val, list) {
      list.forEach(node => node.check(val))
      this.selectedIds = this.store.selectedIds
      this.updateSelect(this.store.selectedIds)
      const result = this.getValue()
      this.$emit('input', result)
    },
    // 标签单个删除
    removeOne(label, value) {
      // 删除传入的数据
      let { label: echoName, value: echoVal } = this.storeEchoData
      if (echoVal.includes(value)) {
        let index = _findIndex(echoVal, { value })
        echoName.splice(index, 1)
        echoVal.splice(index, 1)
        this.store.selectedIds.splice(index, 1)
        this.updateSelect(this.store.selectedIds)
        const result = this.getValue()
        this.$emit('input', result)
        this.$emit('remove-tag', label, value)
        return
      }
      let targetNode = _find(this.selectedNodes, { value: `${value}` })
      // 不是只显示选中的
      if (!this.onlyShowChecked) {
        let vArr = value.split(this.separator) || []
        // 最后一个值
        let vLast = vArr.at(-1) || ''
        if (vLast) {
          targetNode = _find(this.selectedNodes, { [this.valueKey]: `${vLast}` })
        }
      }
      targetNode && (targetNode.checked = false)
      this.handleCheck(targetNode)
      this.$emit('remove-tag', label, value)
    },
    // 选中数据更新转态
    updateSelect(data, needCheckNode = false, setValue = false) {
      const { value: echoVal, label: echoName } = this.storeEchoData

      let tempSelectedNodes = []
      // 不存在的id 设置为小于0
      let newId = 0
      const ids = echoVal.map(() => --newId)

      let tempSelectedLabels = echoName.length === 0 ? [] : _cloneDeep(echoName)
      let tempSelectedIds = ids.length === 0 ? [] : ids

      for (let index = 0; index < data.length; index++) {
        const o = data[index]

        let targetNode = null
        if (setValue) {
          targetNode = _find(this.store.nodeList, v => `${v.id}` === `${o}`)
        } else {
          targetNode = this.store.nodesMap[o]
        }

        // 有目标节点
        if (targetNode) {
          !tempSelectedIds.includes(o) && tempSelectedIds.push(o)
          needCheckNode && targetNode.check(true)

          let label = ''
          if (!this.onlyShowChecked) {
            let level = targetNode.level
            let node = targetNode
            while (level !== 0) {
              label = node.showLabel + (label ? this.separator : '') + label
              node = node.parent
              level--
            }
          } else {
            label = targetNode.showLabel
          }

          // 显示最后一层
          if (this.labelLv === 'last') {
            const labelArr = label.split(this.separator)
            label = labelArr[labelArr.length - 1]
          }

          tempSelectedNodes.push(targetNode)
          tempSelectedLabels.push(label)
        }
      }
      this.selectedNodes = tempSelectedNodes
      this.selectedLabels = tempSelectedLabels
      this.selectedIds = tempSelectedIds
    },
    // 初始化
    init() {
      if (this.renShow) {
        this.storeEchoData = {
          value: _cloneDeep(this.value),
          label: _cloneDeep(this.echoLabel)
        }
      }
      this.store = new TreeStore({
        data: this.data,
        isShowIndeterminate: this.isShowIndeterminate,
        selectChildren: this.selectChildren,
        separator: this.separator,
        valueKey: this.valueKey,
        labelKey: this.labelKey,
        childrenKey: this.childrenKey,
        checkKey: this.checkKey,
        labelLv: this.labelLv
      })
      this.root = this.store.root
      this.maxLevellist = Array.from({ length: this.store.maxLevel - 1 }, (v, i) => {
        this.showData[i + 1] = []
        return {
          id: i + 1,
          rendered: false
        }
      })
      // 根据this.value找到id组
      this.renderData()
    },
    // 回显
    renderData() {
      // 数据没有
      if (this.value.length <= 0) {
        return
      }
      // 根据this.value找到id组
      let newId = 0
      let tempSelectedIds = this.value.map(value => {
        const { valueKey, nodeList, separator } = this.store
        const vs = value.split(separator)
        const last = vs[vs.length - 1]
        const targetNode = _find(nodeList, item => `${item[valueKey]}` === `${last}`)
        return targetNode ? targetNode.id : --newId
      })
      this.updateSelect(tempSelectedIds, true, true)
      this.store.selectedIds = this.selectedIds
    }
  }
}
</script>
