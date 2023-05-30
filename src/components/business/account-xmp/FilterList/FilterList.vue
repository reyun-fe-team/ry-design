<template>
  <Dropdown
    ref="dropdown"
    :trigger="trigger"
    :class="[
      style.filterList,
      !transfer ? style.noTransfer : '',
      itemsLessTenAndMultiple ? style.noTransferTenClass : '',
      itemsLessTenOver ? style.noTransferTenOverClass : ''
    ]"
    :transfer="transfer"
    :transfer-class-name="
      [style.transfer, optionUnequalFuzzy ? style.transferClassExact : ''].concat(transferClass)
    "
    :capture="true"
    :placement="placement"
    @on-visible-change="handleVisibleChange">
    <Input
      ref="input"
      :class="[style.input, dropdownVisible ? style.inputFocus : '']"
      readonly
      :disabled="disabled">
      <template #prefix>
        <div :class="style.prefix">
          <span
            v-if="label && label.trim()"
            ref="prefixRef"
            :class="{ [style.inputLabel]: true }">
            {{ `${label}${LABEL_COLON}` }}
          </span>
          <span
            v-if="!inputShowItem"
            :class="style.placeholderText">
            {{ inputPlaceholder }}
          </span>
          <EllipsisText
            v-if="inputShowItem"
            :line="1"
            :show-tips="false">
            <template v-if="multiple">
              <Tag v-if="option === SEARCH_OP.NOT_IN">
                <span
                  v-if="showOptionList"
                  :class="style.optionType">
                  {{ optionTypeLabel }}
                </span>
              </Tag>
              <template v-if="finallySelectLength === 1">
                <!-- 产品需要显示平台图标 -->
                <slot
                  name="selected-item-content"
                  :data="inputShowItem">
                  {{ inputShowItem.label }}
                </slot>
              </template>
              <template v-else-if="isCheckboxAll && finallySelectLength === showList.length">
                >{{ $t('component.FilterNumber.all') }}
              </template>
              <template v-else>
                {{
                  $t('component.FilterList.selectedWord', {
                    result: finallySelectLength
                  })
                }}
              </template>
            </template>
            <template v-else>{{ inputShowItem.label }}</template>
          </EllipsisText>
        </div>
      </template>
      <div
        slot="suffix"
        :class="style.suffix">
        <Icon
          :type="`ios-arrow-${dropdownVisible ? 'up' : 'down'}`"
          :color="disabled ? '#ccc' : '#818181'" />
      </div>
    </Input>
    <template #list>
      <div
        ref="listbody"
        :class="style.body">
        <div
          :class="style.showListPanel"
          :style="{ width: `${singlePanelWidth}px` }">
          <div
            v-if="showListPanelHeader"
            :class="[style.header]">
            <slot name="header">{{ headerText || label }}</slot>
            <a
              v-if="multiple"
              href="javascript:"
              :disabled="disabled"
              @click.prevent="allCheckClick">
              {{ $t('component.FilterList.selectAll') }}
            </a>
          </div>
          <div
            v-if="showOptionList"
            :class="style.optionList">
            <span
              v-for="opt in optionList"
              :key="opt.value"
              :class="{
                [style.optionItem]: 1,
                [style.selectedOpt]: opt.value === option
              }"
              @click="handleOptionClick(opt)">
              {{ opt.label }}
            </span>
          </div>
          <div
            v-if="$scopedSlots['content-header']"
            :class="[style.contentHeaderWrap]">
            <slot
              name="content-header"
              :option="option"></slot>
          </div>
          <!-- 搜索框 -->
          <template v-if="filterable || $slots['header-search-right'] || syncListMethod">
            <Form
              v-if="optionUnequalFuzzy"
              @submit.native.prevent
              @keydown.native.stop>
              <div :class="{ [style.headerSearchBar]: true }">
                <Input
                  ref="filterInputRef"
                  v-model="filterStr"
                  :placeholder="filterPlaceholder"
                  :class="{
                    [style.filterInput]: 1,
                    [style.filterInputTop]: !showOptionList && !showListPanelHeader
                  }"
                  @on-change="doFilterDebounce">
                  <Icon
                    slot="prefix"
                    type="ios-search"
                    :class="style.filterInputSearchIcon" />
                  <Icon
                    v-show="!!filterStr"
                    slot="suffix"
                    type="ios-close"
                    :class="style.filterStrClear"
                    size="20"
                    @click="handleFilterStrClear(filterStr)" />
                </Input>
                <slot
                  name="header-right-other"
                  :class="style.headerSearchBarRight" />
                <div
                  v-if="$slots['header-search-right'] || syncListMethod"
                  :class="style.headerSearchBarRight">
                  <slot name="header-right">
                    <Link
                      :disabled="isSync"
                      :class="style.sync"
                      @click="syncClick">
                      >{{ $t('global.sync') }}
                    </Link>
                  </slot>
                </div>
              </div>
            </Form>
            <Form
              v-if="!optionUnequalFuzzy"
              @submit.native.prevent="handleFuzzyBtn"
              @keydown.native.stop>
              <Input
                ref="filterInputRef"
                v-model="filterStr"
                :placeholder="filterPlaceholder"
                :class="{
                  [style.filterInput]: 1
                }">
                <Icon
                  slot="prefix"
                  type="ios-search"
                  :class="style.filterInputSearchIcon" />
                <Icon
                  v-show="!!filterStr"
                  slot="suffix"
                  type="ios-close"
                  :class="style.filterStrClear"
                  size="20"
                  @click="handleFilterStrClear(filterStr)" />
              </Input>
            </Form>
          </template>

          <!-- 模糊匹配不需要 -->
          <template v-if="optionUnequalFuzzy">
            <component
              :is="wrapper"
              v-if="showList && showList.length"
              ref="scrollRef"
              :on-reach-bottom="loadMore"
              :loading-text="scrollLoadingText"
              :class="[style.listContainer]"
              :show-loader="false">
              <Checkbox
                v-show="isCheckboxAll && multiple"
                :class="[style.checkboxItem]"
                :value="searchCheckAll"
                :disabled="disabled"
                @on-change="handleSearchCheckAll">
                >{{ $t('component.SearchableCascade.checkboxAll') }}
              </Checkbox>
              <slot name="search-list-header-after"></slot>
              <CheckboxGroup
                v-if="multiple"
                v-model="selectedList"
                @on-change="handleCheckboxChange">
                <template v-for="(item, index) in showList">
                  <EllipsisText
                    v-if="showListGroup[index]"
                    :key="`group${item.value}`"
                    :class="style.showListGroup"
                    :content="showListGroup[index]"></EllipsisText>
                  <Checkbox
                    :key="item.value"
                    :label="item.value"
                    :disabled="
                      disabled ||
                      (max > 0 &&
                        resultList.length >= max &&
                        !resultList.some(x => x.value === item.value)) ||
                      (disableItem && disableItem(item, resultList)) ||
                      item.disable
                    "
                    :class="[style.checkboxItem]">
                    <slot
                      name="select-item"
                      :data="item"
                      :checkedItems="resultList">
                      <span :title="item.label">{{ item.label }}</span>
                    </slot>
                  </Checkbox>
                </template>
              </CheckboxGroup>
              <RadioGroup
                v-else
                v-model="selectedList[0]"
                size="small"
                @on-change="handleRadioChange">
                <Radio
                  v-for="item in showList"
                  :key="item.value"
                  :disabled="disabled"
                  :label="item.value"
                  :class="[style.checkboxItem]">
                  >{{ item.label }}
                </Radio>
              </RadioGroup>
              <SpinLoading
                v-if="isLoading || isSync"
                fix />
            </component>
            <slot
              v-else
              name="no-data">
              <div :class="style.emptyList">
                {{ noListText }}
                <SpinLoading
                  v-if="isLoading || isSync"
                  fix />
              </div>
            </slot>
          </template>
        </div>
        <div
          v-if="optionUnequalFuzzy && multiple && showResListPanel"
          :class="style.resListPanel">
          <div
            :class="{
              [style.header]: 1,
              [style.onlySearchResList]: !showOptionList && !showListPanelHeader
            }">
            <span>
              {{
                $t('component.FilterList.selectedWord', {
                  result: (resultList && resultList.length) || 0
                })
              }}
              <span v-if="totalCount">
                >({{ $t('component.FilterList.total', { total: totalCount }) }})
              </span>
            </span>
            <a
              v-if="!disabled"
              href="javascript:"
              @click.prevent="clearClick">
              {{ $t('component.FilterList.clear') }}
            </a>
          </div>
          <div :class="style.resList">
            <div
              v-for="item in resultList"
              :key="item.value"
              :class="style.resListItem">
              <slot
                name="selected-item"
                :data="item">
                <p :title="item.label">{{ item.label }}</p>
              </slot>
              <Icon
                v-if="!disabled"
                type="ios-close"
                @click.prevent.capture="handleDelClick(item, $event)" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import EllipsisText from '../EllipsisText.vue'
import SpinLoading from '../SpinLoading.vue'
import Link from '../Link.vue'
import { Scroll } from 'view-design'
import _cloneDeep from 'lodash/cloneDeep'
const FilterList = {
  all: '全部',
  selectAll: '全选',
  selected: '已选',
  selectedWord: '已选 {result} 个',
  total: '共 {total} 项',
  clear: '清除',
  include: '包含',
  exclude: '不含',
  noneOption: '没有数据',
  placeholder: '搜索...',
  fuzzy: '模糊匹配',
  exact: '精确匹配'
}
const DEFAULT_TYPE = {
  IN: 'IN',
  NOT_IN: 'NOT_IN'
}
/* 模糊匹配/精确匹配 */
const MATCH_TYPE = {
  FUZZY: 'LIKE',
  EXACT: 'IN'
}
const getDefaultCategory = [
  { value: DEFAULT_TYPE.IN, label: FilterList.include },
  { value: DEFAULT_TYPE.NOT_IN, label: FilterList.exclude }
]
const VALUE_TYPE = {
  LIST_ITEM: 'ListItemArray',
  FILTER_VALUE: 'FilterValue'
}

export default {
  components: { EllipsisText, SpinLoading, Link },
  props: {
    //展示 input 框的 label
    label: { type: String, default: '' },
    // dropdown 下拉框的标题
    headerText: { type: String },
    // 列表为空的文案
    noListText: {
      type: String,
      default: FilterList.noneOption
    },
    // 展示 input 框的 placeholder
    placeholder: {
      type: String
    },
    // 搜索 input 的 placeholder
    filterPlaceholder: {
      type: String,
      default: FilterList.placeholder
    },
    // dropdown 的展开方式
    trigger: {
      type: String,
      default: 'click'
    },
    // dropdown 的展开方向
    placement: {
      type: String,
      default: 'bottom-start'
    },
    // 是否支持搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: true
    },
    // 多选时，是否展示 包含 、不包含 选项
    showOptions: {
      type: Boolean,
      default: false
    },
    // 自定义分类选项
    optionList: {
      type: Array,
      default: getDefaultCategory
    },
    /**
     * v-model绑定值，该值必须初始化为IFilterListValue所允许的结构
     * value 增加IListItem[]类型，主要针对不需要filterList关注type的
     */
    value: {
      type: [Object, Array],
      required: true,
      validator(value) {
        return Array.isArray(value) || ('data' in value && Array.isArray(value.data) && value.type)
      },
      default: () => {
        return {
          type: '',
          data: []
        }
      }
    },
    emitValueType: {
      type: String,
      validator(value) {
        return Object.values(VALUE_TYPE).includes(value)
      }
    },
    max: {
      type: Number,
      default: 0
    },
    // return boolean
    disableItem: {
      type: Function
    },
    // 外部传入的初始列表数据
    list: {
      type: Array,
      default: () => []
    },
    // 外部处理list doFilter方法
    customSearch: {
      type: Function,
      default: null
    },
    // 接口加载数据时，每页的数据量
    pageSize: {
      type: Number,
      default: 20
    },
    // 获取列表数据的方法 TODU
    fetchListMethod: {
      type: Function,
      default: null
    },
    // 下拉加载时的 loading 文案
    scrollLoadingText: {
      type: String,
      default: ''
    },
    // 传入的总数(区别于list接口返回的total，这个是list总数，不会随着搜索变化而变化)
    totalCount: {
      type: [Number, String]
    },
    // ListPanel header 是否显示
    showListPanelHeader: {
      type: Boolean,
      default: false
    },
    // resListPanel 是否显示
    showResListPanel: {
      type: Boolean,
      default: true
    },
    // transfer
    transfer: {
      type: Boolean,
      default: true
    },
    // return string
    groupMethod: {
      type: Function,
      required: false
    },
    transferClass: {
      type: Array,
      default: () => []
    },
    // 是否显示全选，只针对全量不分页
    isCheckboxAll: {
      type: Boolean,
      default: false
    },
    singlePanelWidth: {
      type: Number,
      default: 250
    },
    // 是否 disable
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否展开时自动 focus 到搜索input
    autoFocusSearch: {
      type: Boolean,
      default: false
    },
    // 同步/刷新列表数据的方法
    syncListMethod: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      FilterList,
      LABEL_COLON: ':',
      SEARCH_OP: {
        LIKE: 'LIKE',
        EQ: 'EQ',
        IN: 'IN',
        GTE: 'GTE', // 大于等于
        LTE: 'LTE', // 小于等于
        BETWEEN: 'BETWEEN',
        GT: 'GT',
        LT: 'LT',
        NOT_BETWEEN: 'NOT_BETWEEN',
        NOT_IN: 'NOT_IN',
        VS: 'VS'
      },
      dropdownVisible: false,
      isLoading: false,
      page: 1,
      showList: [],
      searchCheckAll: false,
      selectedList: [],
      resultList: [],
      // 选择的最终结果
      filterListValue: {
        type: '',
        data: []
      },
      filterStr: '',
      option: '',
      total: 0,
      isNoData: false,
      MATCH_TYPE: MATCH_TYPE,
      prevFetchPromise: null,
      backupFilterStr: {}
    }
  },
  computed: {
    style() {
      const prefix = 'filter-list'
      return {
        filterList: prefix,
        noTransfer: `${prefix}-no-transfer`,
        noTransferTenClass: `${prefix}-no-transfer-ten-class`,
        noTransferTenOverClass: `${prefix}-no-transfer-ten-over-class`,
        transfer: `${prefix}-transfer`,
        transferClassExact: `${prefix}-transfer-class-exact`,
        input: `${prefix}-input`,
        prefix: `${prefix}-prefix`,
        inputLabel: `${prefix}-input-label`,
        placeholderText: `${prefix}-placeholder-text`,
        optionType: `${prefix}-option-type`,
        suffix: `${prefix}-suffix`,
        body: `${prefix}-body`,
        showListPanel: `${prefix}-show-list-panel`,
        header: `${prefix}-header`,
        headerSearchBar: `${prefix}-header-search-bar`,
        headerSearchBarRight: `${prefix}-header-search-bar-right`,
        optionList: `${prefix}-option-list`,
        optionItem: `${prefix}-option-item`,
        selectedOpt: `${prefix}-selected-opt`,
        filterInput: `${prefix}-filter-input`,
        filterInputTop: `${prefix}-filter-input-top`,
        filterStrClear: `${prefix}-filter-str-clear`,
        filterInputSearchIcon: `${prefix}-filter-input-search-icon`,
        listContainer: `${prefix}-list-container`,
        showListGroup: `${prefix}-show-list-group`,
        checkboxItem: `${prefix}-checkbox-item`,
        contentHeaderWrap: `${prefix}-content-header-wrap`,
        emptyList: `${prefix}-empty-list`,
        fuzzyBtn: `${prefix}-fuzzy-btn`,
        resListPanel: `${prefix}-res-list-panel`,
        onlySearchResList: `${prefix}-only-search-res-list`,
        resList: `${prefix}-res-list`,
        resultList: `${prefix}-result-list`,
        resListItem: `${prefix}-res-list-item`,
        outerResultPane: `${prefix}-outer-result-pane`,
        sync: `${prefix}-sync`,
        disabledColor: `${prefix}-disabled-color`,
        inputFocus: `${prefix}-input-focus`
      }
    },
    showListGroup() {
      if (!this.groupMethod) {
        return {}
      }
      // TODO
      return this.showList.reduce((list, item, index, context) => {
        const newGroupName = this.groupMethod(item, index, context)
        if (
          index === 0 ||
          this.groupMethod(context[index - 1], index - 1, context) !== newGroupName
        ) {
          list[index] = newGroupName
        }
        return list
      }, {})
    },
    filter() {
      return {
        search: this.filterable ? this.filterStr : '',
        page: this.page,
        pageSize: this.pageSize
      }
    },
    showOptionList() {
      return this.showOptions && this.optionList.length
    },
    inputShowItem() {
      return get(this.filterListValue, 'dataWithLabel.0', null)
    },
    finallySelectLength() {
      return get(this.filterListValue, 'data', []).length
    },
    wrapper() {
      return this.list.length ? 'div' : Scroll
    },
    inputPlaceholder() {
      if (this.placeholder) {
        return this.placeholder
      }
      return '选择自定义列'
    },
    optionTypeLabel() {
      const option = this.optionList.find(item => item.value === this.option)
      if (option) {
        return option.label
      }
      return ''
    },
    itemsLessTenAndMultiple() {
      return this.multiple && !this.filterable && !this.showOptions && !this.showResListPanel
    },
    itemsLessTenOver() {
      return this.itemsLessTenAndMultiple && this.list.length > 9
    },
    optionUnequalFuzzy() {
      return this.option !== this.MATCH_TYPE.FUZZY
    }
  },
  watch: {
    value() {
      this.filterListValue = this.buildValue()
      this.selectedList = _.cloneDeep(get(this.filterListValue, 'data', []))
      const resList = get(this.filterListValue, 'dataWithLabel', [])
      if (resList.length) {
        this.resultList = resList
      } else if (this.selectedList.length && this.showList.length) {
        this.resultList = this.showList.filter(item => this.selectedList.includes(item.value))
        set(this.filterListValue, 'dataWithLabel', _.cloneDeep(this.resultList))
      } else {
        this.resultList = []
      }
      this.initOptions()
      if (this.showList.length) {
        this.searchCheckAll = this.resultList.length === this.showList.length
      }
    },
    list(newList, old) {
      if (JSON.stringify(newList) !== JSON.stringify(old)) {
        this.showList = _.cloneDeep(newList)
        if (this.list?.length) {
          // 当列表数据来源于外部的 list 时，list 变化重新设置已选项，解决 list 比 value 后变更已选项渲染出错的问题
          this.resultList = this.showList.filter(item => {
            return this.selectedList.includes(item.value)
          })
          this.$set(this.filterListValue, 'dataWithLabel', _.cloneDeep(this.resultList))
          this.searchCheckAll = this.resultList.length === this.showList.length
        }
      }
    }
  },
  mounted() {
    this.initOptions()
    this.initList()
    this.watchValue()
  },
  methods: {
    buildValue() {
      if (this.checkValueType(this.value) === VALUE_TYPE.LIST_ITEM) {
        return {
          data: this.value.map(valItem => valItem.value),
          dataWithLabel: _cloneDeep(this.value),
          type: ''
        }
      }
      const data = _cloneDeep(this.value) || {
        data: [],
        type: ''
      }
      return data
    },
    checkValueType(value) {
      if (value && Array.isArray(value)) {
        return VALUE_TYPE.LIST_ITEM
      }
      return VALUE_TYPE.FILTER_VALUE
    },
    initList() {
      if (this.list && this.list.length) {
        this.watchList(this.list)
      } else if (this.fetchListMethod) {
        this.watchList(this.fetchList())
      }
    },
    watchList(newList, old) {
      if (JSON.stringify(newList) !== JSON.stringify(old)) {
        this.showList = _.cloneDeep(newList)
        if (this.list?.length) {
          // 当列表数据来源于外部的 list 时，list 变化重新设置已选项，解决 list 比 value 后变更已选项渲染出错的问题
          this.resultList = this.showList.filter(item => {
            return this.selectedList.includes(item.value)
          })
          this.$set(this.filterListValue, 'dataWithLabel', _.cloneDeep(this.resultList))
          this.searchCheckAll = this.resultList.length === this.showList.length
        }
      }
    },
    initOptions() {
      if (this.showOptionList) {
        this.option =
          this.optionList.find(x => x.value === this.filterListValue?.type)?.value ||
          this.optionList[0].value
      } else {
        this.option = DEFAULT_TYPE.IN
      }
    },
    fetchList() {
      // TODO
      // cancel掉上一次请求
      // if (this.prevFetchPromise?.cancel) {
      //     this.prevFetchPromise.cancel();
      //     try {
      //         await this.prevFetchPromise;
      //     } catch (ex: unknown) {
      //         if (!axios.isCancel(ex)) {
      //             console.error(ex);
      //         }
      //     }
      // }
      // let promiseFetchList: IApiPromise<IFetchResponse>|Promise<IFetchResponse>;
      // if (this.fetchListMethod) {
      //     promiseFetchList = this.fetchListMethod(this.filter);
      // } else {
      //     promiseFetchList = Promise.resolve({ list: [], total: 0 } as IFetchResponse);
      // }
      // this.isLoading = true;
      // const promise = promiseFetchList.then((res: IFetchResponse) => {
      //     this.isLoading = false;
      //     this.total = res.total;
      //     return res.list || [];
      // });
      // promise.catch((ex: any) => {
      //     this.isLoading = false;
      // });
      // if ((promiseFetchList as any)?.cancel) {
      //     (promise as any).cancel = (promiseFetchList as IApiPromise<IFetchResponse>).cancel;
      // }
      // this.prevFetchPromise = promise;
      // return promise;
    },
    loadMore() {
      if (this.total > this.pageSize * this.page || (!this.total && !this.isNoData)) {
        this.page++
        return this.fetchList().then(list => {
          this.isNoData = !list.length // 滚动加载是否 无数据 若无数据则阻止滚动加载事件
          this.showList = this.showList.concat(list)
        })
      }
    },
    allCheckClick() {
      this.showList.forEach(item => {
        if (!this.selectedList.includes(item.value)) {
          this.selectedList.push(item.value)
        }
        if (!this.resultList.find(resItem => resItem.value === item.value)) {
          this.resultList.push(item)
        }
      })
    },
    doFilterDebounce() {
      this.doFilter()
    },
    doFilter(updateList) {
      // todo: 这个判断this.optionUnequalFuzzy的逻辑本来不应该存在，但去掉就是会失效。。。
      if (!this.optionUnequalFuzzy && !updateList) {
        return
      }
      const filter = this.filterStr.trim()
      if (this.list && this.list.length) {
        if (this.customSearch) {
          this.showList = this.customSearch(filter)
        } else {
          this.showList = this.list.filter(
            item => item.label.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1
          )
        }
      } else if (this.fetchListMethod) {
        this.page = 1
        this.watchList(this.fetchList())
      }
    },
    emitResultList() {
      this.$emit('selected-list-change', this.resultList)
    },
    handleCheckboxChange(list) {
      let addItem
      if (this.resultList.some(item => !item)) {
        console.log(JSON.stringify(this.resultList))
      }
      list.forEach(value => {
        if (!this.resultList.find(item => item.value === value)) {
          addItem = this.showList.find(item => item.value === value)
          if (addItem) {
            this.resultList.push(addItem)
          }
        }
      })
      this.resultList = this.resultList.filter(item => list.includes(item.value))
      this.searchCheckAll = this.resultList.length === this.showList.length
      this.emitResultList()
    },
    handleRadioChange(value) {
      this.resultList = this.showList.filter(item => item.value === value)
      this.emitResultList()
    },
    handleOptionClick(opt) {
      if (!this.disabled) {
        this.$set(this.backupFilterStr, this.option, this.filterStr)
        this.filterStr = this.backupFilterStr?.[opt.value] || ''
        this.option = opt.value
        this.$refs.dropdown.$refs.drop.update()
        this.clearClick()
        this.$emit('option-change', this.option)
      }
    },
    clearClick() {
      this.selectedList = []
      this.resultList = []
      this.searchCheckAll = false
      this.emitResultList()
    }
  }
}
</script>

