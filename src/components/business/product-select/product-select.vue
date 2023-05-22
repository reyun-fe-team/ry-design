<template>
  <main :class="prefixCls">
    <div :class="[prefixCls + '-wrapper', 'small-scroll-y']">
      <!-- 第一级表格 -->
      <div
        :class="prefixCls + '-wrapper-first-box'"
        :style="`width: ${firstWidth}px;`">
        <div :class="prefixCls + '-wrapper-title'">
          <span>{{ firstTitle }}</span>
          <slot name="firstTitle"></slot>
        </div>
        <div :class="prefixCls + '-wrapper-table'">
          <!-- 一级表格搜索 -->
          <div style="padding: 10px">
            <Input
              v-model.trim="firstSearch"
              :placeholder="firstSearchPlaceholder"
              search
              @on-change="handleFirstSearch" />
          </div>
          <u-table
            ref="firstTableRef"
            :row-key="firstRowId"
            big-data-checkbox
            :height="firstTableHeight"
            :border="false"
            use-virtual
            :show-header="isFirst"
            :row-height="firstTableRowHeight"
            :data="firstTableData"
            inverse-current-row
            show-body-overflow="tooltip"
            tooltip-effect="light"
            tooltip-placement="top"
            @select-all="selectAll"
            @select="select"
            @current-change="getCurrentRecord">
            <u-table-column
              v-if="level === 'first' && firstTableData.length"
              type="selection"
              width="33"></u-table-column>
            <u-table-column
              v-if="firstTableData.length"
              :key="firstTableTitleField"
              label="全选">
              <template #default="{ row }">
                <slot
                  name="firstColumn"
                  :row="row">
                  <p :class="[prefixCls + '-row-first-title', 'text-overflow']">
                    {{ row[firstTableTitleField] }}
                  </p>
                  <p :class="[prefixCls + '-row-second-title', 'text-overflow']">
                    ID:{{ row.advertiserId }}
                  </p>
                </slot>
              </template>
            </u-table-column>
            <!-- 一级表格为空时展示内容 -->
            <div
              slot="empty"
              :class="prefixCls + '-table-empty-box'">
              <img
                :src="svg"
                alt />
              <p :class="prefixCls + '-table-empty-text'">暂无数据</p>
            </div>
          </u-table>
        </div>
      </div>
      <!-- 第二级表格 -->
      <div
        v-if="level === 'second'"
        :class="prefixCls + '-wrapper-second-box'"
        :style="`width: ${secondWidth}px;`">
        <div :class="[prefixCls + '-wrapper-title', prefixCls + '-wrapper-title-border-left-none']">
          <span>{{ secondTitle }}</span>
          <slot name="secondTitle"></slot>
        </div>
        <div :class="[prefixCls + '-wrapper-table', prefixCls + '-wrapper-table-border-left-none']">
          <!-- 二级表格搜索框 -->
          <div style="padding: 10px">
            <Input
              v-model.trim="secondSearch"
              :placeholder="secondSearchPlaceholder"
              search
              @on-change="handleSecondSearch" />
          </div>
          <!-- 二级表格 -->
          <u-table
            ref="secondTableRef"
            :row-key="secondRowId"
            big-data-checkbox
            :height="secondTableHeight"
            :border="false"
            use-virtual
            :row-height="secondTableRowHeight"
            :data="secondTableData"
            show-body-overflow="tooltip"
            tooltip-effect="light"
            tooltip-placement="top"
            @select-all="selectAll"
            @select="select">
            <u-table-column
              v-if="secondTableData.length"
              type="selection"
              width="33"></u-table-column>
            <u-table-column
              v-if="secondTableData.length"
              :key="secondTableTitleField"
              label="全选"
              show-overflow-tooltip>
              <template #default="{ row }">
                <slot
                  name="secondColumn"
                  :row="row">
                  <p :class="[prefixCls + '-row-first-title', 'text-overflow']">
                    {{ row[secondTableTitleField] }}
                  </p>
                </slot>
              </template>
            </u-table-column>
            <!-- 二级表格为空时展示内容 -->
            <div
              slot="empty"
              :class="prefixCls + '-table-empty-box'">
              <img
                :src="svg"
                alt />
              <p :class="prefixCls + '-table-empty-text'">{{ secondTableEmptyText }}</p>
            </div>
          </u-table>
          <div
            v-if="secondLoading"
            :class="prefixCls + '-spin-container'">
            <Spin fix></Spin>
          </div>
        </div>
      </div>
      <!-- 已选表格 -->
      <div
        :class="prefixCls + '-wrapper-selected-box'"
        :style="`width: ${selectedWidth}px;`">
        <div :class="prefixCls + '-wrapper-title'">
          <span>已选（{{ selectedNum }}）</span>
          <a
            href="javascript:void(0);"
            @click="handleClear">
            清空
          </a>
        </div>
        <div :class="prefixCls + '-wrapper-selected-box-panel-content'">
          <div v-if="selectedNum">
            <!-- 一级已选 -->
            <template v-if="level === 'first'">
              <u-table
                :row-key="firstRowId"
                big-data-checkbox
                :height="selectedTableHeight"
                :border="false"
                :data-changes-scroll-top="false"
                use-virtual
                :show-header="false"
                :row-height="firstSelectedRowHeight"
                :data="firstSelectedData">
                <u-table-column :key="firstTableTitleField">
                  <template #default="{ row }">
                    <slot
                      name="firstSelectedColumn"
                      :row="row">
                      <rd-text-item-show
                        one-line-display
                        :tooltip="row[firstTableTitleField]"
                        :data="{ text: row[firstTableTitleField] }">
                        <template #btnGroup>
                          <Icon
                            :class="prefixCls + '-cursor-pointer'"
                            size="24"
                            type="ios-close"
                            @click="handleCancelRow(row)" />
                        </template>
                      </rd-text-item-show>
                    </slot>
                  </template>
                </u-table-column>
              </u-table>
            </template>
            <!-- 二级已选 -->
            <template v-if="level === 'second'">
              <u-table
                :row-key="secondRowId"
                big-data-checkbox
                :height="selectedTableHeight"
                :border="false"
                :data-changes-scroll-top="false"
                use-virtual
                :show-header="false"
                :row-height="secondSelectedRowHeight"
                :data="secondSelectedTable">
                <u-table-column :key="secondTableTitleField">
                  <template #default="{ row }">
                    <slot
                      name="secondSelectedColumn"
                      :row="row">
                      <div
                        v-if="row.isShowParent"
                        :class="[
                          prefixCls + '-row-second-title',
                          'text-overflow',
                          prefixCls + '-m-t-10'
                        ]">
                        {{ row.parent[firstTableTitleField] }}
                      </div>
                      <rd-text-item-show
                        one-line-display
                        :tooltip="row.children[secondTableTitleField]"
                        :data="{ text: row.children[secondTableTitleField] }">
                        <template #btnGroup>
                          <Icon
                            :class="prefixCls + '-cursor-pointer'"
                            size="24"
                            type="ios-close"
                            @click="handleCancelRow(row.children, row.parent)" />
                        </template>
                      </rd-text-item-show>
                    </slot>
                  </template>
                </u-table-column>
              </u-table>
            </template>
          </div>
          <!-- 暂未选择 -->
          <div
            v-else
            :class="prefixCls + '-wrapper-selected-empty-box'">
            <img
              :src="svg"
              alt />
            <span>暂未选择</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { prefix } from '@src/config'
const prefixCls = prefix + 'product-select'
import svg from '@src/images/common/no-data.svg'
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: prefixCls,
  props: {
    // 一级整体宽度
    firstWidth: {
      type: Number,
      default: 260
    },
    // 一级表格高度
    firstTableHeight: {
      type: Number,
      default: 260
    },
    // 二级整体宽度
    secondWidth: {
      type: Number,
      default: 260
    },
    // 二级表格高度
    secondTableHeight: {
      type: Number,
      default: 260
    },
    // 已选整体宽度
    selectedWidth: {
      type: Number,
      default: 260
    },
    // 已选表格高度
    selectedTableHeight: {
      type: Number,
      default: 312
    },
    // 整体高度
    height: {
      type: Number,
      default: 400
    },
    // 一级标题
    firstTitle: {
      type: String,
      default: '账户'
    },
    // 二级标题
    secondTitle: {
      type: String,
      default: '定向包'
    },
    // 一级表格搜索框placeholder
    firstSearchPlaceholder: {
      type: String,
      default: '请输入账户名称或ID'
    },
    // 二级表格搜索框placeholder
    secondSearchPlaceholder: {
      type: String,
      default: '请输入定向包名称'
    },
    // 一级表格数据
    firstTableData: {
      type: Array,
      default: () => []
    },
    // 二级表格数据
    secondTableData: {
      type: Array,
      default: () => []
    },
    // 一级表格唯一id
    firstRowId: {
      type: String,
      default: 'id'
    },
    // 二级表格唯一id
    secondRowId: {
      type: String,
      default: 'id'
    },
    // 几级表格
    level: {
      type: String,
      default: 'first'
    },
    // 二级表格loading
    secondLoading: {
      type: Boolean,
      default: false
    },
    // 一级选中的数据
    firstSelectedData: {
      type: Array,
      default: () => []
    },
    // 二级选中的数据
    secondSelectedData: {
      type: Array,
      default: () => []
    },
    // 一级表格展示的字段名
    firstTableTitleField: {
      type: String,
      default: 'nameWithAdverId'
    },
    // 二级表格展示的字段名
    secondTableTitleField: {
      type: String,
      default: 'retargetName'
    },
    // 第一级表格每行的宽度
    firstTableRowHeight: {
      type: Number,
      default: 48
    },
    // 第二级表格每行的宽度
    secondTableRowHeight: {
      type: Number,
      default: 32
    },
    // 已选表格一级表格每行的宽度
    firstSelectedRowHeight: {
      type: Number,
      default: 24
    },
    // 已选表格二级表格每行的宽度
    secondSelectedRowHeight: {
      type: Number,
      default: 24
    },
    // 如果已选的样式采用slot写，则父组件传过来要删除行的信息
    deleteRow: {
      type: Object,
      default: () => {}
    },
    // 二级数据为空时，提示文字
    secondTableEmptyText: {
      type: String,
      default: '请先选择账户'
    },
    // 已选是否展示父级数据
    isShowSelectedParent: {
      type: Boolean,
      default: true
    },
    // 清空一级搜索框内容
    clearFirstKeyword: {
      type: Boolean,
      default: false
    },
    // 清空二级搜索框内容
    clearSecondKeyword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      svg,
      activeFirstId: '',
      activeFirstName: '',
      firstSearch: '',
      secondSearch: ''
    }
  },
  computed: {
    selectedNum({ level, firstSelectedData = [], secondSelectedData = [] }) {
      if (level === 'second') {
        let num = 0
        secondSelectedData.map(item => {
          num += item.data.length || 0
        })
        return num
      } else {
        return firstSelectedData.length
      }
    },
    isFirst() {
      return this.level === 'first'
    },
    isSecond() {
      return this.level === 'second'
    },
    // 二级已选拍平
    secondSelectedTable() {
      const arr = []
      this.secondSelectedData.forEach(item => {
        item.data.forEach((list, index) => {
          let obj = {
            parent: {
              [this.firstTableTitleField]: item[this.firstTableTitleField],
              [this.firstRowId]: item[this.firstRowId]
            },
            children: list,
            isShowParent: false
          }
          if (index === 0 && this.isShowSelectedParent) {
            obj.isShowParent = true
          }
          arr.push(obj)
        })
      })

      return arr
    }
  },
  watch: {
    level: {
      handler() {
        this.$refs.secondTableRef && this.$refs.secondTableRef.clearCheckboxRow()
        this.$refs.firstTableRef && this.$refs.firstTableRef.clearCheckboxRow()
      }
    },
    secondTableData: {
      handler() {
        this.$nextTick(() => {
          this.setCheckbox()
        })
      }
    },
    firstSelectedData: {
      handler() {
        this.$nextTick(() => {
          this.setCheckbox()
        })
      }
    },
    firstTableData: {
      handler() {
        this.$nextTick(() => {
          this.setCheckbox()
        })
      }
    },
    deleteRow: {
      handler(val) {
        this.handleCancelRow(val)
      }
    },
    clearFirstKeyword: {
      handler() {
        this.firstSearch = ''
      }
    },
    clearSecondKeyword: {
      handler() {
        this.secondSearch = ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setCheckbox()
    })
  },
  methods: {
    // —————————————————————— 事件相关 ——————————————————————
    // 账户模糊查询 前端模糊搜索
    handleFirstSearch() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('on-first-search', this.firstSearch)
      }, 500)
    },
    // 定向包模糊查询
    handleSecondSearch() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('on-second-search', this.secondSearch)
      }, 500)
    },
    // 取消行
    handleCancelRow(row, parent) {
      if (this.level === 'first') {
        let data = _cloneDeep(this.firstSelectedData)
        data = data.filter(o => o[this.firstRowId] !== row[this.firstRowId])
        this.$refs.firstTableRef && this.$refs.firstTableRef.partRowSelections([row], false)
        this.$emit('on-selected', data)
      } else if (this.level === 'second') {
        const secondSelectedData = _cloneDeep(this.secondSelectedData)
        const result = secondSelectedData.map(item => {
          if (item[this.firstRowId] === parent[this.firstRowId]) {
            const { data } = item
            item.data = data.filter(o => o[this.secondRowId] !== row[this.secondRowId])
          }
          return item
        })
        this.$refs.firstTableRef && this.$refs.secondTableRef.partRowSelections([row], false)
        this.$emit('on-selected', result)
      }
    },
    // 全选
    selectAll(selection) {
      this.select(selection)
    },
    select(selection) {
      if (this.level === 'first') {
        // 当前左侧表格数据所有id集合
        const firstTableDataKeys = this.firstTableData.map(item => item[this.firstRowId])
        // 当前左侧表格数据选中的id集合
        const selectionKeys = selection.map(item => item[this.firstRowId])
        // 已选表格数据id集合
        const firstSelectedKeys = this.firstSelectedData.map(item => item[this.firstRowId])
        // 已选数据在当前左侧表格显示的id集合（搜索之后有部分已选数据在左侧表格不展示）
        const showTableKeys = firstSelectedKeys.filter(item => firstTableDataKeys.includes(item))
        // 当前左侧表格删除的已选数据 (当前左侧表格数据没有选中&&已选表格数据有)
        const deleteFirstSelectedKeys = firstTableDataKeys.filter(
          item => !selectionKeys.includes(item) && firstSelectedKeys.includes(item)
        )
        // 当前左侧选中数据去掉右侧已选数据
        const NewArr = selection.filter(item => !showTableKeys.includes(item[this.firstRowId]))
        // 右侧已选数据去掉删除后的数据
        const oldArr = this.firstSelectedData.filter(
          item => !deleteFirstSelectedKeys.includes(item[this.firstRowId])
        )
        const res = oldArr.concat(NewArr)
        this.$emit('on-selected', res)
      } else if (this.level === 'second') {
        // 当前激活左侧二级表格数据所有id集合
        const secondTableDataKeys = this.secondTableData.map(item => item[this.secondRowId])
        // 当前激活左侧二级表格数据选中的id集合
        const selectionKeys = selection.map(item => item[this.secondRowId])
        // 当前激活已选二级表格数据id集合
        let secondSelectedData = _cloneDeep(this.secondSelectedData) || []
        const oldVal = secondSelectedData.find(item => item[this.firstRowId] === this.activeFirstId)
        let secondSelectedKeys = []
        if (oldVal) {
          secondSelectedKeys = oldVal.data.map(item => item[this.secondRowId])
        }
        // 已选数据在当前左侧二级表格显示的id集合（搜索之后有部分已选数据在左侧表格不展示）
        const showTableKeys = secondSelectedKeys.filter(item => secondTableDataKeys.includes(item))
        // 当前左侧二级表格删除的已选数据 (当前左侧二级表格数据没有选中&&已选二级表格数据有)
        const deleteSecondSelectedKeys = secondTableDataKeys.filter(
          item => !selectionKeys.includes(item) && secondSelectedKeys.includes(item)
        )
        // 当前左侧选中数据去掉右侧已选数据
        const NewArr = selection.filter(item => !showTableKeys.includes(item[this.secondRowId]))
        // 右侧已选数据去掉删除后的数据
        const oldArr =
          (oldVal &&
            oldVal.data.filter(
              item => !deleteSecondSelectedKeys.includes(item[this.secondRowId])
            )) ||
          []
        const res = oldArr.concat(NewArr)

        const obj = {
          [this.firstRowId]: this.activeFirstId,
          [this.firstTableTitleField]: this.activeFirstName,
          data: res
        }
        if (oldVal) {
          secondSelectedData = secondSelectedData.map(item => {
            if (item[this.firstRowId] === this.activeFirstId) {
              return (item = obj)
            }
            return item
          })
        } else {
          secondSelectedData.push(obj)
        }
        this.$emit('on-selected', secondSelectedData)
      }
    },
    // 清空
    handleClear() {
      if (this.level === 'second') {
        this.$refs.secondTableRef.clearSelection()
      } else {
        this.$refs.firstTableRef.clearSelection()
      }
      this.$emit('on-clear')
    },
    // 获取选中行
    getCurrentRecord(row) {
      this.activeFirstId = row && row[this.firstRowId]
      this.activeFirstName = row && row[this.firstTableTitleField]
      this.$emit('on-change-row', row)
    },
    // 设置复选
    setCheckbox() {
      if (this.level === 'second') {
        const secondSelectedData = _cloneDeep(this.secondSelectedData)
        const currentArr = secondSelectedData.filter(
          item => item[this.firstRowId] === this.activeFirstId
        )
        if (currentArr[0] && currentArr[0].data && currentArr[0].data.length) {
          const arr = currentArr[0].data.map(item => item[this.secondRowId])
          const data = this.secondTableData.filter(item => arr.includes(item[this.secondRowId]))
          this.$refs.secondTableRef && this.$refs.secondTableRef.partRowSelections(data, true)
        }
      } else if (this.level === 'first') {
        const arr = this.firstSelectedData.map(item => item[this.firstRowId])
        const data = this.firstTableData.filter(item => arr.includes(item[this.firstRowId]))
        this.$refs.firstTableRef && this.$refs.firstTableRef.partRowSelections(data, true)
      }
    }
  }
}
</script>
