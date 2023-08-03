<template>
  <div>
    <div :class="prefixCls + '-template'">
      <section :class="prefixCls + '-template-list'">
        <div :class="prefixCls + '-template-list-left'">
          <!-- 维度 -->
          <slot name="dimension"></slot>
          <div :class="prefixCls + '-template-list-left-select-content'">
            <!-- 所有筛选 -->
            <template-list
              :class="prefixCls + '-template-list-left-select-content-left'"
              :data="templateOptions"
              @on-all-filter="templateAllFilter"
              @on-change="templateCheck"
              @on-update="templateUpdate"
              @on-delete="templateDelete"></template-list>
            <div :class="prefixCls + '-template-list-left-select-content-center'">
              <!-- 筛选项 -->
              <div class="center-box">
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
import templateList from './template-list'
export default {
  name: prefixCls,
  components: {
    templateList
  },
  props: {
    // 模版数据集合
    templateOptions: {
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
      this.$emit('template-update', val)
    }
  }
}
</script>
