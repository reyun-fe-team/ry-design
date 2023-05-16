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

<script lang="ts" src="./index.ts"></script>

<style lang="less">
@prefix: filter-list;

.@{prefix} {
  width: 100%;
  cursor: pointer;

  .@{css-prefix}select-dropdown {
    padding: 0;
  }

  &-transfer {
    padding: 0;

    .ivu-radio-group {
      width: 100%;
    }
  }

  &-transfer-class-exact {
    // min-height: 300px;
    // height: 300px;
    max-height: @transfer-body-height;
    overflow: hidden;
  }

  &-input-focus .@{css-prefix}input {
    border-color: @input-focus-border-color;
  }

  &-input {
    .@{css-prefix}input {
      cursor: pointer;
    }

    .@{css-prefix}input-prefix {
      display: block;
      width: 100%;
      text-align: left;
      .@{prefix}-prefix {
        display: flex;
        height: 100%;
        margin: 0 24px 0 10px;
        align-items: center;
      }

      .ellipsis-text {
        max-width: 100%;
        margin-right: 15px;
      }

      // .@{css-prefix}tag {
      //     border: 0;
      //     background: @layout-body-background;
      //     display: inline-flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     vertical-align: baseline;

      //     .@{css-prefix}tag-text {
      //         display: block;
      //         white-space: nowrap;
      //         word-break: keep-all;
      //         text-overflow: ellipsis;
      //         overflow: hidden;
      //     }

      //     .@{css-prefix}icon {
      //         line-height: inherit;
      //         vertical-align: baseline;
      //         top: 0;
      //         right: -4px;
      //     }

      //     .@{prefix}-finally-select-length {
      //         flex: 0 0 auto;
      //     }
      // }

      .@{prefix}-input-label,
      .@{prefix}-option-type {
        padding: 0 2px;
        flex: 0 0 auto;
        color: @input-color;
        &.@{prefix}-disabled-color {
          color: @slider-disabled-color;
        }
      }

      .@{prefix}-option-type {
        color: @input-placeholder-color;
      }

      .@{prefix}-placeholder-text {
        overflow: hidden;
        color: @input-placeholder-color;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .@{css-prefix}input-suffix {
      .@{css-prefix}icon {
        font-size: 12px;
      }
    }
  }

  .@{prefix}-input:hover .@{css-prefix}input {
    border-color: @input-hover-border-color;
  }

  @list-padding: 10px;

  &-header {
    display: flex;
    padding: @list-padding;
    background-color: @panel-header-background-color;
    border-bottom: @border-width-base @border-style-base @border-color-base;
    justify-content: space-between;
    align-items: center;
  }

  &-header-search-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: @border-width-base @border-style-base @border-color-base;
    padding: 0;

    &-right {
      padding-right: 14px;
      margin-left: 10px;
      flex: 0 0 auto;
    }
  }

  &-body {
    display: flex;
    height: 100%;

    & > * {
      width: 250px;
    }
  }

  &-show-list-panel {
    display: flex;
    // height: 100%;
    max-height: @transfer-body-height;
    flex: 1;
    flex-direction: column;
  }

  &-show-list-group {
    padding: @list-padding;
    background-color: @panel-header-background-color;
  }

  &-filter-input {
    padding: 0 @list-padding 0;
    margin-top: @list-padding;
    margin-bottom: 8px;

    .@{css-prefix}input-suffix {
      right: 10px;
    }

    .@{css-prefix}input-prefix {
      left: 10px;
    }

    .@{css-prefix}icon-ios-close {
      cursor: pointer;
    }
  }

  &-filter-input-top {
    display: flex;
    width: auto;
    padding: 0;
    margin: 0;
    flex: 1 1 auto;

    .@{css-prefix}input {
      height: auto;
      padding: 10px 0;
      border-radius: 0;
      border-width: 0;
      order: 2;
      flex: 1 1 auto;

      &:focus {
        border-color: @border-color-base;
      }
    }

    .@{css-prefix}input-prefix {
      position: static;
      width: auto;
      padding-top: 2px;
      padding-left: 10px;
      margin-right: 4px;
      font-size: 17px;
      flex: 0 0 auto;
      order: 1;
    }

    .@{css-prefix}input-suffix {
      order: 3;
      flex: 0 0 auto;
      position: static;
      width: auto;
      padding-top: 2px;
    }
  }

  &-option-list {
    display: flex;
    margin: 8px @list-padding 0;
  }

  &-content-header-wrap {
    margin: 8px @list-padding 0;
  }

  &-option-item {
    height: 32px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border: @border-width-base @border-style-base @border-color-base;
    flex: 1 1 auto;
  }

  &-option-item:not(:last-child) {
    border-right: @border-width-base @border-style-base @primary-color;
    border-radius: 2px 0 0 2px;
  }

  &-option-item:last-child {
    border-left: none;
    border-radius: 0 2px 2px 0;
  }

  &-list-container {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    overflow: auto;
    overscroll-behavior: contain;

    .@{css-prefix}scroll-container {
      height: 100% !important;
      overflow: auto;
    }
  }

  &-checkbox-item {
    display: flex;
    padding: 7px @list-padding;
    margin-right: 0;
    overflow: hidden;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-items: center;

    &:hover {
      background-color: @background-color-select-hover;
    }
  }

  &-selected-opt {
    color: @primary-color;
    background-color: @info-bg;
    border: @border-width-base @border-style-base @primary-color;
  }

  &-empty-list {
    position: relative;
    padding: 5px @list-padding;
  }

  &-res-list-panel {
    display: flex;
    // height: 100%;
    max-height: @transfer-body-height;
    flex: 1;
    border-left: @border-width-base @border-style-base @border-color-base;
    flex-direction: column;
  }

  &-res-list {
    flex: 1 1 auto;
    overflow: auto;
  }

  &-res-list-item {
    display: flex;
    align-items: center;
    cursor: default;

    > p {
      padding: 7px 0 7px @list-padding;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1 1 auto;
    }

    > i {
      margin-right: 7px;
      font-size: 18px;
      cursor: pointer;
      flex: 0 0 auto;
    }
  }

  &-res-list-item:hover {
    background-color: @layout-body-background;
  }

  &-fuzzy-btn {
    margin: 0 10px 5px 0;
    text-align: right;
  }

  &-no-transfer {
    position: relative;

    .@{css-prefix}select-dropdown {
      height: 300px;
      padding: 0;
      overflow: hidden;
    }
  }

  &-no-transfer-ten-class {
    position: relative;

    .@{css-prefix}select-dropdown {
      height: auto;
      max-height: 300px;
      padding: 0;
      overflow: hidden;
    }
  }

  &-no-transfer-ten-over-class {
    .@{css-prefix}select-dropdown {
      height: 300px;
    }
  }
}
</style>
