<template>
  <div :class="classes">
    <div :class="prefixCls + '-wrap'">
      <FormItem
        :prop="mergeOptions.prop"
        :label="mergeOptions.label"
        :label-width="mergeOptions.labelWidth">
        <label
          v-if="mergeOptions.tooltip"
          slot="label">
          {{ mergeOptions.label }}
          <Tooltip
            placement="top"
            max-width="410"
            theme="light"
            :content="mergeOptions.tooltip">
            <Icon
              type="ios-help-circle-outline"
              size="16"
              class="cursor-pointer icon-question tip-icon"></Icon>
          </Tooltip>
        </label>
        <div :class="prefixCls + '-keyword'">
          <Input
            v-model="keyword"
            :clearable="clearable"
            :disabled="disabled"
            type="text"
            placeholder="请输入"
            @on-keydown="onKeyDown"></Input>
          <span
            v-if="showWordLimit"
            :class="prefixCls + '-keyword-word-limit'">
            {{ wordLimit }}
          </span>
        </div>
        <div :class="prefixCls + '-list'">
          <div :class="prefixCls + '-list-name-rule'">
            <span
              :class="prefixCls + '-list-name-rule-label'"
              :style="{
                width: mergeWildcardLabelConfig.width + 'px',
                flexBasis: mergeWildcardLabelConfig.width + 'px'
              }">
              {{ mergeWildcardLabelConfig.label }}
              <Tooltip
                v-if="mergeWildcardLabelConfig.tooltip"
                :content="mergeWildcardLabelConfig.tooltip"
                max-width="250"
                theme="light"
                placement="top">
                <Icon
                  type="ios-help-circle-outline"
                  size="13" />
              </Tooltip>
            </span>
            <p
              :class="prefixCls + '-list-name-rule-item-wrap'"
              @click="handleNameItem">
              <i
                v-for="item in list"
                :key="item.title"
                :class="[
                  prefixCls + '-list-name-rule-item',
                  {
                    [prefixCls + '-list-name-rule-item-active']:
                      keyword.includes(item.title) || keyword.includes(item.alias)
                  }
                ]"
                :data-value="item.title">
                {{ prefix }}{{ item.label }}
                <Tooltip
                  v-if="item.tooltip"
                  :content="item.tooltip"
                  max-width="250"
                  theme="light"
                  placement="top">
                  <Icon
                    type="ios-help-circle-outline"
                    size="13" />
                </Tooltip>
              </i>
            </p>
          </div>
          <div
            v-if="showSaveRule"
            :class="prefixCls + '-list-name-save'">
            <Checkbox
              v-model="saveNameRule"
              @on-change="onSaveRuleChange">
              保存默认规则
            </Checkbox>
          </div>
        </div>
        <slot name="tip"></slot>
      </FormItem>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'wildcard'
const defaultOptions = {
  label: '',
  prop: '',
  labelWidth: 104
}
const defaultWildcardLabelConfig = {
  label: '通配符:',
  width: 48,
  tooltip: ''
}
let titleList = []

export default {
  name: prefixCls,
  props: {
    value: {
      type: String,
      default: ''
    },
    calculateLength: {
      type: Function,
      default: e => e.length
    },
    maxLength: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      default: ''
    },
    joinSymbol: {
      type: String,
      default: ''
    },
    saveRule: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    dataConfig: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          title: 'title',
          id: 'id'
        }
      }
    },
    option: {
      require: true,
      type: Object,
      default: () => {}
    },
    wildcardLabelConfig: {
      type: Object,
      default: () => {}
    },
    showSaveRule: {
      type: Boolean,
      default: true
    },
    showWordLimit: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      keyword: '',
      saveNameRule: false,
      mergeOptions: {},
      mergeWildcardLabelConfig: {},
      list: []
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    wordLimit() {
      let len = this.calculateLength(this.keyword)
      return len + '/' + this.maxLength
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(now) {
        this.initData(now)
      }
    },
    value() {
      this.keyword = this.value
    },
    keyword() {
      this.emitData()
    }
  },
  mounted() {},
  methods: {
    handleNameItem(e) {
      let title = e.target.getAttribute('data-value')
      let item = this.list.find(e => e.title === title)
      this.changeKeyword(item)
    },
    onKeyDown(e) {
      const elInput = e.target
      const keyCode = e.keyCode
      const startPos = elInput.selectionStart
      const startPosVal = elInput.value.slice(0, startPos)
      const endPosVal = elInput.value.slice(startPos, elInput.value.length)

      if (keyCode === 39 && endPosVal) {
        let endNum = endPosVal.indexOf('}')
        let char = endPosVal.substring(0, endNum + 1)
        if (titleList.includes(char)) {
          elInput.selectionStart = startPos + endNum
          elInput.selectionEnd = startPos + endNum
        }
      }

      if (keyCode === 37 && startPosVal) {
        let frontNum = startPosVal.lastIndexOf('{')
        let char = startPosVal.substring(frontNum)
        if (titleList.includes(char)) {
          elInput.selectionStart = frontNum + 1
          elInput.selectionEnd = frontNum + 1
        }
      }
      if (keyCode === 8) {
        // 新增判断：如果光标位置相等(没有选中文本)，那么执行删除通配符
        if (elInput.selectionStart === elInput.selectionEnd) {
          let lastChar = startPosVal.charAt(startPosVal.length - 1)
          let frontNum = startPosVal.lastIndexOf('{')
          if (lastChar === '}') {
            let delChar = startPosVal.substring(frontNum)
            if (titleList.includes(delChar)) {
              elInput.selectionStart = startPosVal.length - delChar.length
              elInput.selectionEnd = startPosVal.length
            }
          }
        }
      }
    },
    onSaveRuleChange(val) {
      this.$emit('on-save-rule', val)
    },
    // #utils
    initData(data) {
      this.keyword = this.value
      this.saveNameRule = this.saveRule
      this.list = data.map(item => {
        return {
          ...item,
          label: item[this.dataConfig.label],
          title: item[this.dataConfig.title],
          id: item[this.dataConfig.id]
        }
      })
      titleList = this.list.map(item => item.title)
      this.mergeOptions = Object.assign({}, defaultOptions, this.option)
      this.mergeWildcardLabelConfig = Object.assign(
        {},
        defaultWildcardLabelConfig,
        this.wildcardLabelConfig
      )
    },
    emitData() {
      this.$emit('input', this.keyword)
      this.$emit('on-change', this.keyword)
      let ids = this.list
        .filter(e => this.keyword.includes(e.title) || this.keyword.includes(e.alias))
        .map(e => e.id)
        .filter(Boolean)
      this.$emit('on-name-programs', ids)
    },
    changeKeyword(item) {
      let activeTitle = item.title
      let replaceName = ''
      if (this.keyword) {
        let index = this.keyword.indexOf(activeTitle)
        if (index === 0) {
          replaceName = new RegExp(`${activeTitle}([${this.joinSymbol}]+)?`)
        } else {
          replaceName = new RegExp(`([${this.joinSymbol}]+)?${activeTitle}`)
          activeTitle = `${this.joinSymbol}${activeTitle}`
        }
      }
      if (this.keyword.includes(item.title) || this.keyword.includes(item.reg)) {
        this.keyword = this.keyword.replace(replaceName, '')
      } else {
        this.keyword += activeTitle
      }
    }
  }
}
</script>