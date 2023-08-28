<template>
  <div>
    <div :class="prefixCls + '-template'">
      <section :class="prefixCls + '-template-list'">
        <div :class="prefixCls + '-template-list-left'">
          <!-- 维度 -->
          <slot name="dimension"></slot>
          <div :class="prefixCls + '-template-list-left-select-content'">
            <!-- 所有筛选 -->
            <filter-area-template-list
              :class="prefixCls + '-template-list-left-select-content-left'"
              :data="data"
              @on-all-filter="templateAllFilter"
              @on-change="templateCheck"
              @on-update="templateUpdate"
              @on-delete="templateDelete"></filter-area-template-list>
            <div :class="prefixCls + '-template-list-left-select-content-center'">
              <!-- 筛选项 -->
              <div :class="prefixCls + '-center-box'">
                <slot name="select-filter"></slot>
              </div>
            </div>
          </div>
        </div>
        <div :class="prefixCls + '-template-list-right'">
          <Button
            style="display: block"
            type="primary"
            @click="handlerSearch">
            查询
          </Button>
          <div
            :class="prefixCls + '-template-list-right-reset'"
            @click="handlerReset">
            重置
          </div>
        </div>
      </section>
      <div :class="prefixCls + '-template-line'">
        <div :class="prefixCls + '-template-line-border'"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-area'
import filterAreaTemplateList from './filter-area-template-list'
export default {
  name: prefixCls,
  components: {
    filterAreaTemplateList
  },
  props: {
    // 模版数据集合
    data: {
      type: Array,
      defualt: () => []
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    handlerSearch() {
      this.$emit('handler-search')
    },
    handlerReset() {
      this.$emit('handler-reset')
    },
    templateAllFilter() {
      this.$emit('template-all-filter')
    },
    templateCheck(data) {
      this.$emit('template-change', data)
    },
    templateUpdate(obj) {
      this.$emit('template-update', obj)
    },
    templateDelete(val) {
      this.$emit('template-delete', val)
    }
  }
}
</script>
