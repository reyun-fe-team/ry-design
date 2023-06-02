<template>
  <div>
    <rd-filter-list
      v-model="current"
      :data="data"
      :label="label"
      :query="query"
      :not-found-text="notFoundText"
      :not-found="!filterData.length"
      :input-width="inputWidth"
      :option-width="optionWidth"
      :height="height"
      :max-height="maxHeight"
      :min-height="minHeight"
      @query-change="queryChange">
      <div
        :class="prefixCls"
        class="small-scroll-y"
        :style="styles">
        <div v-if="multiple">
          <!-- {{ current }} -->

          <CheckboxGroup
            v-model="current"
            :class="prefixCls + '-items'"
            @on-change="handleCheckboxChange">
            <div
              v-for="item in filterData"
              :key="item.value">
              <div
                v-if="groupNameList && groupNameList[item.value]"
                :class="prefixCls + '-group-name'"
                :title="groupNameList[item.value]">
                {{ groupNameList[item.value] }}
              </div>
              <Checkbox
                :key="item.value"
                :label="item.value"
                :disabled="item.disabled">
                <slot
                  name="select-item"
                  :data="item"
                  :items="item">
                  <span :title="item.label">{{ item.label }}</span>
                </slot>
              </Checkbox>
            </div>
          </CheckboxGroup>
        </div>
        <div v-else>
          <RadioGroup
            v-model="current[0]"
            size="small"
            :class="prefixCls + '-items'"
            @on-change="handleRadioChange">
            <div
              v-for="item in filterData"
              :key="item.key">
              <div
                v-if="groupNameList && groupNameList[item.value]"
                :class="prefixCls + '-group-name'"
                :title="groupNameList[item.value]">
                {{ groupNameList[item.value] }}
              </div>
              <Radio
                :key="item.value"
                :disabled="item.disabled"
                :label="item.value">
                {{ item.label }}
              </Radio>
            </div>
          </RadioGroup>
        </div>
      </div>
    </rd-filter-list>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-select'
export default {
  name: prefixCls,
  components: {},
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Array,
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
    notFoundText: String
  },
  data() {
    return {
      prefixCls,
      current: this.value,
      query: ''
    }
  },
  computed: {
    filterData() {
      return this.data.filter(item => this.filterMethod(item, this.query))
    },
    styles() {
      let style = {}
      if (this.width) {
        const width = parseInt(this.width)
        style.width = `${width}px`
      }
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
    current(val) {
      this.$emit('input', val)
    },
    value: {
      handler(val) {
        this.current = val
      },
      deep: true
    }
  },
  methods: {
    handleCheckboxChange() {},
    handleRadioChange() {
      // this.resultList = this.showList.filter((item: IListItem) => item.value === value);
      // this.emitResultList();
    },
    queryChange(val) {
      this.query = val
    }
  }
}
</script>