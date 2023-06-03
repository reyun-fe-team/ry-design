<template>
  <div>
    list-select:{{ current }}
    <rd-filter-list
      v-model="current"
      :real-data="realData"
      :data="data"
      :label="label"
      :trigger="trigger"
      :query="query"
      :not-found-text="notFoundText"
      :not-found="!filterData.length"
      :input-width="inputWidth"
      :option-width="optionWidth"
      :width="width"
      :height="height"
      :max-height="maxHeight"
      :min-height="minHeight"
      :filterable="filterable"
      :is-select-option="isSelectOption"
      :clearable="clearable"
      @query-change="queryChange"
      @on-visible-change="handleVisibleChange">
      <div
        :class="prefixCls"
        class="small-scroll-y"
        :style="mainStyles">
        <div
          v-for="item in filterData"
          :key="item.key">
          <div
            v-if="groupNameList && groupNameList[item.value]"
            :class="prefixCls + '-group-name'"
            :title="groupNameList[item.value]">
            {{ groupNameList[item.value] }}
          </div>
          <div
            :key="item.value"
            :class="[
              prefixCls + '-item',
              {
                [prefixCls + '-item-selected']: current.includes(item.value)
              }
            ]"
            :disabled="item.disabled"
            @click="handleClick(item.value)">
            <Checkbox
              v-if="multiple"
              style="margin: 0 0 0 10px"
              :value="current.includes(item.value)"
              @click="handleClick(item.value)"></Checkbox>
            <div :class="prefixCls + '-item-contain'">
              <slot
                name="select-item"
                :src="item.src"
                :item="item">
                <rd-filter-list-describe
                  style="width: 100%"
                  :height="item.description || item.src ? 48 : 32"
                  :src="item.src"
                  :text="item.label"
                  :description="item.description"></rd-filter-list-describe>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div slot="search-operate">
        <slot name="search-operate"></slot>
      </div>
    </rd-filter-list>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-select'
import rdFilterListDescribe from '../filter-list/filter-list-describe'
import _cloneDeep from 'lodash/cloneDeep'
import { oneOf, getPropsValueArrayData } from '@src/util/assist.js'
export default {
  name: prefixCls,
  components: { rdFilterListDescribe },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [Array, String, Number],
      default: () => {
        return []
      }
    },
    label: String,
    multiple: {
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: Function,
      default(data, query) {
        const type = 'label' in data ? 'label' : 'value'
        return data[type].indexOf(query) > -1
      }
    },
    saveType: {
      type: String,
      default: 'always-save',
      //default: 'leave-asve',
      // 时时保存 always-save 离开保存leave-asve
      validator(value) {
        return oneOf(value, ['always-save', 'leave-asve'])
      }
    },
    groupNameList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: [Number, String],
    maxHeight: {
      type: [Number, String],
      default: 320
    },
    minHeight: [Number, String],
    inputWidth: [String, Number],
    optionWidth: [String, Number],
    notFoundText: String,
    filterable: Boolean,
    isSelectOption: Boolean,
    clearable: Boolean,
    trigger: String
  },
  data() {
    let current = getPropsValueArrayData(this.value)
    return {
      prefixCls,
      current: _cloneDeep(current),
      query: ''
    }
  },
  computed: {
    filterData() {
      return this.data.filter(item => this.filterMethod(item, this.query))
    },
    realData() {
      let current = Array.isArray(this.value) ? this.value : [this.value]
      return _cloneDeep(current)
    },
    mainStyles() {
      let style = {}
      if (this.height) {
        const height = parseInt(this.height)
        style.height = `${height}px`
      }
      if (this.maxHeight) {
        const maxHeight = parseInt(this.maxHeight)
        style.maxHeight = `${maxHeight}px`
      }
      if (this.minHeight) {
        const minHeight = parseInt(this.minHeight)
        style.minHeight = `${minHeight}px`
      }
      return style
    }
  },
  watch: {
    // current(val) {
    //   if (this.saveType === 'always-save') {
    //     // if (Array.isArray(this.value)) {
    //     //   this.$emit('input', val)
    //     //   this.$emit('on-change', val)
    //     // } else {
    //     //   this.$emit('input', val[0])
    //     //   this.$emit('on-change', val[0])
    //     // }
    //     this.$emit('input', this.current)
    //     this.$emit('on-change', this.current)
    //   }
    // },
    value: {
      handler(val) {
        if (this.saveType === 'always-save') {
          this.current = val
        } else {
          let current = getPropsValueArrayData(val)
          this.current = _cloneDeep(current)
        }
      },
      deep: true
    }
  },
  methods: {
    getValue() {},
    queryChange(val) {
      this.query = val
    },
    handleClick(val) {
      if (this.multiple) {
        if (this.current.includes(val)) {
          this.current = this.current.filter(item => item !== val)
        } else {
          this.current.push(val)
        }
      } else {
        this.current = [val]
      }
    },
    handleVisibleChange(val) {
      if (!val && this.saveType === 'leave-asve') {
        const data = _cloneDeep(this.current)
        if (Array.isArray(this.value)) {
          this.$emit('input', data)
          this.$emit('on-change', data)
        } else {
          this.$emit('input', val[0])
          this.$emit('on-change', val[0])
        }
      }
      this.$emit('on-visible-change', val)
    }
  }
}
</script>