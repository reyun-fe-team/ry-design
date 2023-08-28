<template>
  <div>
    <h2 style="margin: 24px 0">rd-filter-area</h2>
    <rd-filter-area
      :data="data"
      @handler-search="handlerSearch"
      @handler-reset="handlerReset"
      @template-all-filter="templateAllFilter"
      @template-change="templateChange"
      @template-update="templateUpdate"
      @template-delete="templateDelete">
      <template slot="select-filter">
        <div class="rd-filter-common-styles">
          <div class="rd-filter-common-styles-margin">
            <rd-form-date-picker
              v-model="formData.selectDate"
              transfer
              :clearable="false" />
          </div>
        </div>
        <div class="rd-filter-common-styles">
          <div class="rd-filter-common-styles-margin">
            <rd-filter-list-select
              v-model="formData.groupIds"
              label="部门 :"
              :filterable="true"
              :input-width="240"
              :height="200"
              :multiple="true"
              :data="[]" />
          </div>
        </div>
        <div class="rd-filter-common-styles">
          <div class="rd-filter-common-styles-margin">
            <rd-filter-list-select
              v-model="formData.productIds"
              label="ADS产品 :"
              :width="200"
              :filterable="true"
              :input-width="240"
              :height="200"
              :multiple="true"
              :data="[]"
              :option-width="200"
              :show-select-option="true" />
          </div>
        </div>
        <div class="rd-filter-common-styles">
          <div class="rd-filter-common-styles-margin">
            <rd-filter-list-select
              v-model="formData.appCodes"
              label="ADS项目 :"
              :width="200"
              :filterable="true"
              :input-width="240"
              :height="200"
              :multiple="true"
              :data="[]"
              :option-width="200"
              :show-select-option="true" />
          </div>
        </div>
        <div class="rd-filter-common-styles">
          <div class="rd-filter-common-styles-margin">
            <rd-form-input
              v-model="formData.keywords"
              label="广告计划 :" />
          </div>
        </div>
      </template>
    </rd-filter-area>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { label: '1111111', value: 11111111 },
        { label: '2222222', value: 11111112 },
        { label: '3333333', value: 11111113 },
        { label: '1111114', value: 11111114 },
        { label: '1111115', value: 11111115 },
        { label: '1111111', value: 11111116 },
        { label: '2222222', value: 11111117 },
        { label: '3333333', value: 11111118 },
        { label: '1111114', value: 11111119 },
        { label: '1111115', value: 11111110 }
      ],
      formData: {
        selectDate: [],
        groupIds: [],
        productIds: [],
        appCodes: [],
        keywords: ''
      }
    }
  },
  methods: {
    // 查询
    handlerSearch() {},
    // 重置
    handlerReset() {},
    // 没有模版的场景
    templateAllFilter() {},
    // 有模版触发对应模版的方法
    templateChange(val) {},
    // 更新模版
    templateUpdate(val) {},
    // 删除模版
    templateDelete(val) {}
  }
}
</script>
