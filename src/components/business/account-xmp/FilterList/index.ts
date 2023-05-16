import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { cloneDeep, get, invoke, isArray, isObject, set } from 'lodash-es';
import { Scroll } from 'tm-iview';
import axios, { Cancel } from 'axios';
import i18n from '@/i18n';
import {
    ICategoryItem,
    IFetchResponse,
    IFilterListValue,
    IFilterValue,
    IListItem,
} from './FilterList/type';
import Debounce from '@/decorator/debounce';
import EllipsisText from '../EllipsisText.vue';
import SpinLoading from '../SpinLoading.vue';
import Link from '../Link.vue';
import { LABEL_COLON, SEARCH_OP } from '@/constants/COMMON';
import { IApiPromise } from '@/types/commonTypes';

export const DEFAULT_TYPE = {
    IN: 'IN',
    NOT_IN: 'NOT_IN',
};
export const DEFAULT_CATEGORY = [
    { value: DEFAULT_TYPE.IN, label: i18n.t('component.FilterList.include') },
    { value: DEFAULT_TYPE.NOT_IN, label: i18n.t('component.FilterList.exclude') },
];

export function getDefaultCategory() {
    return [
        { value: DEFAULT_TYPE.IN, label: i18n.t('component.FilterList.include') },
        { value: DEFAULT_TYPE.NOT_IN, label: i18n.t('component.FilterList.exclude') },
    ];
}

export const VALUE_TYPE = {
    LIST_ITEM: 'ListItemArray',
    FILTER_VALUE: 'FilterValue',
};

/* 模糊匹配/精确匹配 */
export const MATCH_TYPE = {
    FUZZY: 'LIKE',
    EXACT: 'IN',
};
export const MATCH_CATEGORY = [
    { value: MATCH_TYPE.FUZZY, label: i18n.t('component.FilterList.fuzzy') as string },
    { value: MATCH_TYPE.EXACT, label: i18n.t('component.FilterList.exact') as string },
];

export function getMatchCategory() {
    return [
        { value: MATCH_TYPE.FUZZY, label: i18n.t('component.FilterList.fuzzy') as string },
        { value: MATCH_TYPE.EXACT, label: i18n.t('component.FilterList.exact') as string },
    ];
}

export const toSearchArr = (filter: IFilterListValue, key: string) => {
    if (get(filter, 'data.length')) {
        const { type, data } = filter;
        return [
            {
                item: key,
                op: type,
                val: type === MATCH_TYPE.FUZZY ? data[0] : data,
            },
        ];
    }
    return [];
};

@Component({
    components: {
        EllipsisText,
        SpinLoading,
        Link,
    },
})
export default class FilterList extends Vue {
    /**
     * 展示 input 框的 label
     * @private
     */
    @Prop({ type: String, default: '' })
    private label!: string;

    /**
     * 展示 input 框 没有值时的提示内容
     * @private
     */
    // @Prop({ type: String, default: i18n.t('component.FilterList.all') })
    // private noSelectText!: string;

    /**
     * dropdown 下拉框的标题
     * @private
     */
    @Prop({ type: String })
    private headerText!: string;

    /**
     * 列表为空的文案
     * @private
     */
    @Prop({ type: String, default: () => i18n.t('component.FilterList.noneOption') })
    private noListText!: string;

    /**
     * 展示 input 框的 placeholder
     * @private
     */
    @Prop({ type: String })
    private placeholder!: string;

    /**
     * 搜索 input 的 placeholder
     * @private
     */
    @Prop({ type: String, default: () => i18n.t('component.FilterList.placeholder') })
    private filterPlaceholder!: string;

    /**
     * dropdown 的展开方式
     * @private
     */
    @Prop({ type: String, default: 'click' })
    private trigger!: string;

    /**
     * dropdown 的展开方向
     * @private
     */
    @Prop({ type: String, default: 'bottom-start' })
    private placement!: string;

    /**
     * 是否支持搜索
     * @private
     */
    @Prop({ type: Boolean, default: true })
    private filterable!: boolean;

    /**
     * 是否支持多选
     * @private
     */
    @Prop({ type: Boolean, default: true })
    private multiple!: boolean;

    /**
     * 多选时，是否展示 包含 、不包含 选项
     * @private
     */
    @Prop({ type: Boolean, default: false })
    private showOptions!: boolean;

    /**
     * 自定义分类选项
     * @private
     */
    @Prop({ type: Array, default: getDefaultCategory })
    private optionList!: ICategoryItem[];

    /**
     * v-model绑定值，该值必须初始化为IFilterListValue所允许的结构
     * value 增加IListItem[]类型，主要针对不需要filterList关注type的
     * @private
     */
    @Prop({
        type: [Object, Array],
        required: true,
        validator(value: any): boolean {
            return Array.isArray(value) || ('data' in value && Array.isArray(value.data) && value.type);
        },
    })
    private value!: IFilterListValue | IListItem[];

    @Prop({
        type: String,
        validator(value: any): boolean {
            return Object.values(VALUE_TYPE).includes(value);
        },
    })
    emitValueType?: string;

    @Prop({ type: Number, default: 0 })
    private max!: number;

    @Prop({ type: Function })
    disableItem!: (item: IListItem, resultItems: IListItem[]) => boolean;

    /**
     * 外部传入的初始列表数据
     * @private
     */
    @Prop({ type: Array, default: () => [] })
    private list!: IListItem[];

    /**
     * 外部处理list doFilter方法
     */
    @Prop({ type: Function, default: null })
    customSearch?: (searchWord?: string) => IListItem[];

    /**
     * 接口加载数据时，每页的数据量
     * @private
     */
    @Prop({ type: Number, default: 20 })
    private pageSize!: number;

    /**
     * 获取列表数据的方法
     */
    @Prop({ type: Function, default: null })
    fetchListMethod?: (search?: IFilterValue) => IApiPromise<IFetchResponse>|Promise<IFetchResponse>;

    /**
     * 下拉加载时的 loading 文案
     * @private
     */
    @Prop({ type: String, default: '' })
    private scrollLoadingText!: string;

    /**
     * 传入的总数(区别于list接口返回的total，这个是list总数，不会随着搜索变化而变化)
     * @private
     */
    @Prop({ type: [Number, String] })
    private totalCount?: string | number;

    /**
     * ListPanel header 是否显示
     * @private
     */
    @Prop({ type: Boolean, default: false })
    private showListPanelHeader!: boolean;

    /**
     * resListPanel 是否显示
     * @private
     */
    @Prop({ type: Boolean, default: true })
    private showResListPanel!: boolean;

    /**
     * transfer
     * @private
     */
    @Prop({ type: Boolean, default: true })
    private transfer!: boolean;

    @Prop({ type: Function, required: false })
    private groupMethod!: (item: IListItem, index: number, showList: IListItem[]) => string;

    @Prop({ type: Array, default: () => [] })
    private transferClass!: string[];

    /**
     * 是否显示全选，只针对全量不分页
     */
    @Prop({ type: Boolean, default: false })
    private isCheckboxAll!: boolean;

    @Prop({ type: Number, default: 250 })
    singlePanelWidth!: number;

    /**
     * 是否 disable
     */
    @Prop({ type: Boolean, default: false })
    private disabled!: boolean;


    /**
     * 是否展开时自动 focus 到搜索input
     */
    @Prop({ type: Boolean, default: false })
    private autoFocusSearch!: boolean;

     /**
     * 同步/刷新列表数据的方法
     */
    @Prop({ type: Function, default: null })
    syncListMethod!: () => Promise<any>;

    LABEL_COLON = LABEL_COLON;

    SEARCH_OP = SEARCH_OP;

    get style() {
        const prefix = 'filter-list';
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
            inputFocus: `${prefix}-input-focus`,
        };
    }

    private dropdownVisible = false;

    private isLoading = false;

    private page = 1;

    public showList: IListItem[] = [];

    private searchCheckAll = false;

    // 根据groupMethod()方法返回的分组名进行分组，showList的元素需要同分组的排列在一起，否则分组会不准确，这里需要后端返回的数据先按分组排列一下
    get showListGroup(): { [index: string]: string } {
        if (!this.groupMethod) {
            return {};
        }

        return this.showList.reduce((list: { [index: string]: string }, item, index, context) => {
            const newGroupName = this.groupMethod(item, index, context);
            if (
                index === 0 ||
                this.groupMethod(context[index - 1], index - 1, context) !== newGroupName
            ) {
                list[index] = newGroupName;
            }
            return list;
        }, {});
    }

    private selectedList: string[] = [];

    public resultList: IListItem[] = [];

    /**
     * 选择的最终结果
     * @private
     */
    private filterListValue: IFilterListValue = {
        type: '',
        data: [],
    };

    private filterStr: string = '';

    private option: string = '';

    private total: number = 0;

    private isNoData: boolean = false;

    MATCH_TYPE = MATCH_TYPE;

    get filter() {
        return {
            search: this.filterable ? this.filterStr : '',
            page: this.page,
            pageSize: this.pageSize,
        };
    }

    get showOptionList() {
        return this.showOptions && this.optionList.length;
    }

    get inputShowItem() {
        return get(this.filterListValue, 'dataWithLabel.0', null);
    }

    get finallySelectLength() {
        return get(this.filterListValue, 'data', []).length;
    }

    get wrapper() {
        return this.list.length ? 'div' : Scroll;
    }

    get inputPlaceholder() {
        if (this.placeholder) {
            return this.placeholder;
        }
        return this.$t('global.placeholder.select');
    }

    get optionTypeLabel() {
        const option = this.optionList.find((item) => item.value === this.option);
        if (option) {
            return option.label;
        }
        return '';
    }

    get itemsLessTenAndMultiple() {
        return this.multiple && !this.filterable && !this.showOptions && !this.showResListPanel;
    }

    get itemsLessTenOver() {
        return this.itemsLessTenAndMultiple && this.list.length > 9;
    }

    get optionUnequalFuzzy() {
        return this.option !== this.MATCH_TYPE.FUZZY;
    }

    buildValue(): IFilterListValue {
        if (this.checkValueType(this.value) === VALUE_TYPE.LIST_ITEM) {
            return {
                data: (this.value as IListItem[]).map((valItem: IListItem) => valItem.value),
                dataWithLabel: cloneDeep(this.value as IListItem[]),
                type: '',
            };
        }

        return cloneDeep(this.value as IFilterListValue) || {
            data: [],
            type: '',
        };
    }

    @Watch('value')
    watchValue() {
        this.filterListValue = this.buildValue();
        this.selectedList = cloneDeep(get(this.filterListValue, 'data', []));
        const resList = get(this.filterListValue, 'dataWithLabel', []);
        if (resList.length) {
            this.resultList = resList;
        } else if (this.selectedList.length && this.showList.length) {
            this.resultList = this.showList.filter((item: IListItem) =>
                this.selectedList.includes(item.value)
            );
            set(this.filterListValue, 'dataWithLabel', cloneDeep(this.resultList));
        } else {
            this.resultList = [];
        }
        this.initOptions();
        if (this.showList.length) {
            this.searchCheckAll = this.resultList.length === this.showList.length;
        }
    }

    @Watch('list')
    watchList(newList: IListItem[], old?: IListItem[] | undefined) {
        if (JSON.stringify(newList) !== JSON.stringify(old)) {
            this.showList = cloneDeep(newList);
            if (this.list?.length) {
                // 当列表数据来源于外部的 list 时，list 变化重新设置已选项，解决 list 比 value 后变更已选项渲染出错的问题
                this.resultList = this.showList.filter((item: IListItem) => {
                    return this.selectedList.includes(item.value);
                });
                this.$set(this.filterListValue, 'dataWithLabel', cloneDeep(this.resultList));
                this.searchCheckAll = this.resultList.length === this.showList.length;
            }
        }
    }

    checkValueType(value: any) {
        if (value && isArray(value)) {
            return VALUE_TYPE.LIST_ITEM;
        }
        return VALUE_TYPE.FILTER_VALUE;
    }

    async mounted() {
        this.initOptions();
        await this.initList();
        this.watchValue();
    }

    async initList() {
        if (this.list && this.list.length) {
            this.watchList(this.list);
        } else if (this.fetchListMethod) {
            this.watchList(await this.fetchList());
        }
    }

    /**
     * 初始化 包含、不包含 选项
     */
    initOptions() {
        if (this.showOptionList) {
            this.option = this.optionList.find(x => x.value === this.filterListValue?.type)?.value || this.optionList[0].value;
        } else {
            this.option = DEFAULT_TYPE.IN;
        }
    }

    prevFetchPromise: any;

    private async fetchList() {
        // cancel掉上一次请求
        if (this.prevFetchPromise?.cancel) {
            this.prevFetchPromise.cancel();
            try {
                await this.prevFetchPromise;
            } catch (ex: unknown) {
                if (!axios.isCancel(ex)) {
                    console.error(ex);
                }
            }
        }

        let promiseFetchList: IApiPromise<IFetchResponse>|Promise<IFetchResponse>;
        if (this.fetchListMethod) {
            promiseFetchList = this.fetchListMethod(this.filter);
        } else {
            promiseFetchList = Promise.resolve({ list: [], total: 0 } as IFetchResponse);
        }

        this.isLoading = true;
        const promise = promiseFetchList.then((res: IFetchResponse) => {
            this.isLoading = false;
            this.total = res.total;
            return res.list || [];
        });
        promise.catch((ex: any) => {
            this.isLoading = false;
        });
        if ((promiseFetchList as any)?.cancel) {
            (promise as any).cancel = (promiseFetchList as IApiPromise<IFetchResponse>).cancel;
        }
        this.prevFetchPromise = promise;
        return promise;
    }

    loadMore() {
        if (this.total > this.pageSize * this.page || (!this.total && !this.isNoData)) {
            this.page++;
            return this.fetchList().then((list: any) => {
                this.isNoData = !list.length; // 滚动加载是否 无数据 若无数据则阻止滚动加载事件
                this.showList = this.showList.concat(list);
            });
        }
    }

    allCheckClick() {
        this.showList.forEach((item: IListItem) => {
            if (!this.selectedList.includes(item.value)) {
                this.selectedList.push(item.value);
            }
            if (!this.resultList.find((resItem: IListItem) => resItem.value === item.value)) {
                this.resultList.push(item);
            }
        });
    }

    @Debounce(300)
    doFilterDebounce() {
        this.doFilter();
    }

    async doFilter($event?: any, updateList: boolean = false) {
        // todo: 这个判断this.optionUnequalFuzzy的逻辑本来不应该存在，但去掉就是会失效。。。
        if (!this.optionUnequalFuzzy && !updateList) {
            return;
        }
        const filter = this.filterStr.trim();
        if (this.list && this.list.length) {
            if (this.customSearch) {
                this.showList = this.customSearch(filter);
            } else {
                this.showList = this.list.filter(
                    (item: IListItem) => item.label.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1
                );
            }
        } else if (this.fetchListMethod) {
            this.page = 1;
            this.watchList(await this.fetchList());
        }
    }

    emitResultList() {
        this.$emit('selected-list-change', this.resultList);
    }

    handleCheckboxChange(list: string[]) {
        let addItem;
        if (this.resultList.some(item => !item)) {
            console.log(JSON.stringify(this.resultList));
        }
        list.forEach((value: string) => {
            if (!this.resultList.find((item: IListItem) => item.value === value)) {
                addItem = this.showList.find((item: IListItem) => item.value === value);
                if (addItem) {
                    this.resultList.push(addItem);
                }
            }
        });
        this.resultList = this.resultList.filter((item: IListItem) => list.includes(item.value));
        this.searchCheckAll = this.resultList.length === this.showList.length;
        this.emitResultList();
    }

    handleRadioChange(value: string) {
        this.resultList = this.showList.filter((item: IListItem) => item.value === value);
        this.emitResultList();
    }

    // 保留上一次的match type 对应的搜索关键词
    private backupFilterStr: { [key: string]: string } = {};

    handleOptionClick(opt: { value: string; label: string }) {
        if (!this.disabled) {
            this.$set(this.backupFilterStr, this.option, this.filterStr);
            this.filterStr = this.backupFilterStr?.[opt.value] || '';
            this.option = opt.value;
            (this.$refs.dropdown as any).$refs.drop.update();
            this.clearClick();
            this.$emit('option-change', this.option);
        }
    }

    clearClick() {
        this.selectedList = [];
        this.resultList = [];
        this.searchCheckAll = false;
        this.emitResultList();
    }

    handleInputTagDelClick(opt: IListItem) {
        this.handleAllDelClick(opt);
        this.emit();
    }

    /* 这个单删的暂时说不要了, 现在点了要全删 */
    handleDelClick(opt: IListItem, e?: any) {
        if (e) {
            e.stopPropagation();
        }
        this.selectedList = this.selectedList.filter((key: string) => key !== opt.value);
        this.resultList = this.resultList.filter((item: IListItem) => item.value !== opt.value);
        this.emitResultList();
    }

    handleAllDelClick(opt: IListItem, e?: any) {
        if (e) {
            e.stopPropagation();
        }
        this.selectedList = [];
        this.resultList = [];
        this.emitResultList();
    }

    emit() {
        const _emitValueType = this.emitValueType || this.checkValueType(this.value);
        if (_emitValueType === VALUE_TYPE.FILTER_VALUE) {
            this.filterListValue = cloneDeep({
                type: this.option,
                data: this.selectedList,
                dataWithLabel: this.resultList,
            });
            this.$emit('input', cloneDeep(this.filterListValue));
        } else if (_emitValueType === VALUE_TYPE.LIST_ITEM) {
            this.$emit('input', cloneDeep(this.resultList));
        }
    }

    /** 比较下拉收起时值是否变化了 */
    backupValue: IFilterListValue | string[] | number[] | IListItem[] | null = null;

    handleVisibleChange(visible: boolean) {
        this.$emit('visible-change', visible);
        this.dropdownVisible = visible;
        if (visible) {
            this.backupValue = cloneDeep(this.value);
            // 模糊匹配下,回填搜索值
            if (
                !this.optionUnequalFuzzy &&
                this.checkValueType(this.value) === VALUE_TYPE.FILTER_VALUE
            ) {
                this.filterStr = (this.value as IFilterListValue)?.data?.[0] || '';
            } else if (
                !this.optionUnequalFuzzy &&
                this.checkValueType(this.value) === VALUE_TYPE.LIST_ITEM
            ) {
                this.filterStr = get(this.value, '0.value', '');
            }
            // 设置下拉宽度逻辑
            const $listbody = get(this.$refs, 'listbody');
            if ($listbody) {
                const inputWidth = get(this.$refs, 'input.$el.offsetWidth', '');
                ($listbody as HTMLElement).style.minWidth = inputWidth ? `${inputWidth}px` : '';
            }
            if (this.autoFocusSearch && this.filterable) {
                this.$nextTick(() => {
                    invoke(this.$refs.filterInputRef, 'focus', { cursor: 'start', preventScroll: true });
                });
            }
        } else {
            const isChangeFilterStr = !!get(this.backupFilterStr, this.MATCH_TYPE.EXACT); // 检查精确匹配是否关键字查询过
            if (!this.optionUnequalFuzzy) {
                // 模糊匹配下, 窗口关闭相当于点击确定
                if (this.filterStr) {
                    this.resultList = [
                        {
                            label: this.filterStr,
                            value: this.filterStr,
                        },
                    ];
                    this.selectedList = [this.filterStr];
                } else {
                    this.resultList = [];
                    this.selectedList = [];
                }


                this.$emit('fuzzy-click', cloneDeep(this.filterListValue));

                this.emitResultList();
            }
            this.filterStr = '';
            this.backupFilterStr = {};
            this.doFilter('', isChangeFilterStr);
            this.emit();
        }
    }

    handleFilterStrClear(value: string) {
        // if (value) {
            this.filterStr = '';
            this.doFilter();
        // }
    }

    handleFuzzyBtn() {
        if (!this.filterStr) {
            (this.$refs.dropdown as any).handleClose();
            return;
        }
        this.selectedList = [this.filterStr];
        (this.$refs.dropdown as any).handleClose();
        this.$emit('fuzzy-click', cloneDeep(this.filterListValue));
        this.emitResultList();
    }

    private handleSearchCheckAll(val: boolean) {
        if (val) {
            let values = this.showList.map((item: IListItem) => item.value);
            if (this.max) {
                values = values.slice(0, this.max);
            }
            this.selectedList = values;
            this.handleCheckboxChange(this.selectedList);
        } else {
            this.selectedList = [];
            this.handleCheckboxChange([]);
        }
    }

    isSync = false;

    async syncClick() {
        if (this.isSync || this.disabled) {
            return;
        }
        if (this.syncListMethod) {
            this.isSync = true;
            this.syncListMethod()
                .then(() => {
                    if (this.fetchListMethod) {
                        this.clearClick();
                        return this.initList();
                    }
                })
                .finally(() => {
                    this.isSync = false;
                })
                .catch((err: any) => {
                    console.error(err);
                    this.isSync = false;
                });
        } else {
            this.$emit('sync-click');
        }
    }
}
