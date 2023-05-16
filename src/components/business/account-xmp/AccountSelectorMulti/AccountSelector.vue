<template>
    <FilterList
        ref="filterList"
        v-model="accountId"
        label=""
        :header-text="$tc('global.terminology.xmp.account', 2)"
        :placeholder="$t('AdsCreate.accountSelector.placeholder')"
        :filterPlaceholder="$t('AdsCreate.accountSelector.filterPlaceholder')"
        :multiple="true"
        :filterable="true"
        :page-size="10"
        :fetchListMethod="fetchAccountListFromApi"
        :groupMethod="groupAccount"
        :transfer-class="[$style.accountList]"
        :max="allowSelectNum"
        :disableItem="disableItem"
        :disabled="disabledComplete"
        @input="handleInput"
    >
        <template #select-item="{data: option, checkedItems: checkedItems}">
            <Tooltip
                :disabled="!showMaxTips(option, checkedItems)"
                :max-width="300"
                placement="top"
                transfer
                :class="$style.tooltip"
                :content="$t('AdsCreate.accountSelector.numLimit', { max: allowSelectNum })"
            >
                <div
                    :class="[$style.optionItem]"
                    @click.native="beforeOptionClick($event, option)"
                >
                    <Icon
                        @click.prevent.stop="toggleCollect(option)"
                        :class="[$style.star, collectAccountList.includes(option.value) ? $style.starYellow : $style.hoverIcon, $style.mr]"
                        :type="collectAccountList.includes(option.value) ? 'md-star' : 'md-star-outline'"
                        size="16"
                    />
                    <div :class="$style.accountLabels">
                        <div :class="{[$style.accountNameLine]: 1, [$style.accountChecked]: checkedItems.some(x=>x.account_id === option.value)}">
                            <div
                                :class="$style.accountName"
                                :title="option.label"
                            >{{option.label}}</div>
<!--                            <Icon-->
<!--                                type="ios-checkmark"-->
<!--                                :class="$style.accountCheckbox"-->
<!--                            />-->
                            <Icon custom="custom-font i-icon-gou"
                                  :class="$style.accountCheckbox"
                            />
                            <Tooltip
                                transfer
                                :content="option.reason || $t(`AdsCreate.accountSelector.validAccountTips.${option.auth_status}`)"
                            >
                                <Icon
                                    v-if="option.auth_status !== AUTH_STATUS_KEY.AUTHORIZED"
                                    type="ios-information-circle-outline"
                                    size="14"
                                    :class="[$style.waringIcon]"
                                />
                            </Tooltip>

                        </div>
                        <div
                            :class="[$style.subLabel]"
                            :title="option.subLabel"
                        >
                            <span :class="$style.subLabelText">{{option.subLabel}}</span>
                            <Icon
                                type="ios-copy-outline"
                                @click.prevent.stop="handleCopyId(option.value)"
                                size="16"
                                :class="$style.hoverIcon"
                            />
                            <StatusText
                                v-if="showAccountStatus"
                                :class="$style.status" :type="getAccountStatusDetailsStatusTextType(option.account_status_original)">{{option.account_status_details}}</StatusText>
                        </div>
                    </div>
                </div>
            </Tooltip>
        </template>
        <template #selected-item="{data: option}">
            <slot
                name="selected-account"
                :data="option"
            >
                <p :title="option.label">{{ option.label }}</p>
            </slot>
        </template>
    </FilterList>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue,
    Watch,
} from 'vue-property-decorator';
import {
    cloneDeep,
    get,
    isEqual,
} from 'lodash-es';
import { filterList as apiFilterList } from '@/api/adManage';
import {
    AUTH_STATUS_KEY,
    CHANNEL,
    SEARCH_OP,
} from '@/constants/COMMON';
import TooltipIcon from '../TooltipIcon.vue';
import { collect } from '@/api/sys/account';
import { MATCH_TYPE } from '../FilterList';
import FilterList from '../FilterList/FilterList.vue';
import {
    IFetchResponse,
    IFilterListValue,
    IFilterValue,
    IListItem,
} from '../FilterList/type';
import { IAccountItem } from './types';
import StatusText from '../StatusText.vue';
import { getAccountStatusDetailsStatusTextType } from '@/constants/FACEBOOK';

@Component({
    components: {
        StatusText,
        TooltipIcon,
        FilterList,
    },
})
export default class AccountSelector extends Vue {
    /**
     * 渠道
     */
    @Prop({ type: Object })
    value!: IFilterListValue;

    /**
     * 允许同时选中的账户个数
     */
    @Prop({ type: Number })
    allowSelectNum!: number;

    /** *
     * 自定义 apiFilterList 的search方法
     */
    @Prop({ type: Function, default: null })
    fetchFilter!: (params: any) => Promise<IFetchResponse>;

    /**
     * 渠道
     */
    @Prop({ type: String, required: true })
    channel!: string;

    /**
     * 禁用
     */
    @Prop({ type: Boolean, default: false })
    disabledComplete!: boolean

    @Prop({type: Boolean, default: false})
    showAccountStatus!: boolean;

    @Prop({ type: Function })
    customDisableItem?: (item: IAccountItem, resultList: IAccountItem[]) => boolean;

    private accountId: IFilterListValue = {
        type: MATCH_TYPE.EXACT,
        data: [],
    };

    AUTH_STATUS_KEY = AUTH_STATUS_KEY;

    private collectAccountList: string[] = [];

    @Watch('value')
    watchValue() {
        this.accountId = cloneDeep(this.value);
    }

    getAccountStatusDetailsStatusTextType = getAccountStatusDetailsStatusTextType;

    private fetchAccountListFromApi(filter: IFilterValue) {
        let params: any = {
            page: filter.page || 1,
            page_size: filter.pageSize || 20,
        };
        if (this.fetchFilter) {
            params = this.fetchFilter(filter);
        } else {
            params = {
                level: 'account',
                channel: this.channel,
                page: filter.page || 1,
                page_size: filter.pageSize || 20,
                type: 'ad_create',
                search: '',
            };
            const searchList: any = [];
            if (this.channel === CHANNEL.GOOGLE) {
                searchList.push({ item: 'manager', op: SEARCH_OP.EQ, val: 0 });
            }
            const search = get(filter, 'search', '').trim();
            if (search) {
                searchList.push({ item: 'account', op: 'LIKE', val: search });
            }
            if (searchList.length) {
                params.search = JSON.stringify(searchList);
            }
        }

        const promise = apiFilterList(params);
        const finalPromise = promise.then((res: any) => {
            const currentCompanyName = get((this.$refs.filterList as any), 'resultList[0].company_name', '');
            return {
                list: get(res, 'list', []).map((account: any) => {
                    if (account.is_collect === '1') {
                        this.collectAccountList.push(account.account_id);
                    }
                    let alis = '';
                    if (account.alias_name) {
                        alis = `[${account.alias_name}]`;
                    }
                    return {
                        value: account.account_id,
                        label: `${alis}${account.name}`,
                        subLabel: `ID: ${account.account_id}`,
                        disabled: account.auth_status !== AUTH_STATUS_KEY.AUTHORIZED || !!(currentCompanyName && currentCompanyName !== account.company_name),
                        ...account,
                    };
                }),
                total: get(res, 'total', 0),
            };
        });
        (finalPromise as any).cancel = promise.cancel;
        return finalPromise;
    }

    handleInput() {
        if (!isEqual(this.accountId.data, this.value.data)) {
            this.$emit('input', this.accountId);
        }
    }

    beforeOptionClick(e: MouseEvent, option: IAccountItem) {
        this.$emit('before-account-change', { e, option });
    }

    disableItem(item: IAccountItem, resultList: IAccountItem[]) {
        return item.auth_status !== AUTH_STATUS_KEY.AUTHORIZED
        || (resultList && resultList[0] && resultList[0][this.groupKey] !== item[this.groupKey])
        || (this.customDisableItem && this.customDisableItem(item, resultList));
    }

    toggleCollect(option: IAccountItem) {
        collect({
            module: this.channel,
            account_id: option.value,
            operate_type: option.is_collect === '0' ? 1 : 2,
        }).then(() => {
            // 更新星标状态的账户列表
            const accountId = option.value;
            if (this.collectAccountList.includes(accountId)) {
                this.collectAccountList = this.collectAccountList.filter((id: string) => id !== accountId);
            } else {
                this.collectAccountList.push(accountId);
            }
        }).catch((err: any) => {
            console.log(err);
        });
    }

    private handleCopyId(id: string) {
        const copyText = document.createElement('textarea');
        copyText.value = id;
        document.body.appendChild(copyText);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(copyText);
        this.$Message.success(this.$t('AdsCreate.accountSelector.copy', { id }));
    }

    beforeMount() {
        this.watchValue();
    }

    get groupKey() {
        if ([CHANNEL.GOOGLE, CHANNEL.FACEBOOK].includes(this.channel)) {
            return 'currency';
        }
        return 'company_name';
    }

    groupAccount(item: IAccountItem) {
        return item[this.groupKey];
    }

    showMaxTips(option: IListItem, checkedItems: IListItem) {
        // 当选择的账户大于允许数量，出现tips提示
        return !!checkedItems.length && checkedItems.length >= this.allowSelectNum && !checkedItems.map((item: IListItem) => item.value).includes(option.value);
    }
}
</script>

<style module lang="less">
.mr {
  margin-right: 10px;
}

.optionItem {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;

  .star {
    line-height: 1.5;
  }

  .starYellow {
    color: @rate-star-color;
  }
}

.hoverIcon {
  color: @subsidiary-color;
  visibility: hidden;
}

.optionItem:hover {
  .hoverIcon {
    visibility: visible;
  }
}

.waringIcon {
  position: relative;
  color: @error-color;
  // top: -3px;
}

.accountNameLine {
  display: flex;
  align-items: center;
  overflow: hidden;
  line-height: 26px;
}

.accountName {
  overflow: hidden;
  line-height: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1 1 auto;
}

.accountList {
  .tooltip {
    display: block;
    flex: 1 1 auto;
    width: 0;

    :global(.@{css-prefix}tooltip-rel) {
      display: block;
      width: 100%;
    }
  }

  :global(.filter-list-list-container) {
    :global(.@{css-prefix}checkbox) {
      display: none;
    }

    :global(.filter-list-checkbox-item.@{css-prefix}checkbox-wrapper-disabled) {
      .subLabel {
        color: @subsidiary-color;
      }

      .accountName {
        color: @subsidiary-color;
      }
    }
  }

  .accountLabels {
    overflow: hidden;
    line-height: 14px;
    text-align: left;
    flex: 1 1 auto;
  }

  .accountChecked {
    color: @primary-color;

    .accountCheckbox {
      display: block;
      overflow: hidden;
      line-height: 1;
      flex: 0 0 auto;

      &::before {
        font-size: 16px;
        vertical-align: top;
      }
    }
  }

  .accountCheckbox {
    display: none;
  }

  .subLabel {
    display: flex;
    overflow: hidden;
    line-height: 1.5;
    color: #818181;
    text-align: left;
    flex: auto;
  }

  .subLabelText {
    flex: 0 1 auto;
  }

  .status {
    flex: 0 0 auto;
    margin-left: auto;
  }
}
</style>
