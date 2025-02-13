<template>
  <div :class="classes">
    <div :class="prefixCls + '-wrap'">
      <FormItem
        :prop="mergeOptions.prop"
        :label="mergeOptions.label"
        :rules="rules"
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
            ref="keyword-input"
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
        <div :class="classesList">
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
              ref="resizeElement"
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
            <div
              v-if="hasMore"
              :class="prefixCls + '-list-name-rule-action'"
              @click="handleHideMore">
              {{ hideMore ? '更多' : '收起' }}
            </div>
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
    wildcardConfig: {
      type: Object,
      default: () => {
        return {
          wildcardTag: '{}'
        }
      }
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
    },
    rules: {
      type: [Object, Array]
    }
  },
  data() {
    return {
      prefixCls,
      keyword: '',
      saveNameRule: false,
      mergeOptions: {},
      mergeWildcardLabelConfig: {},
      list: [],
      hideMore: true,
      hasMore: false
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    classesList() {
      return [
        `${prefixCls}-list`,
        {
          [`${prefixCls}-show-more`]: !this.hideMore
        }
      ]
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
        this.updateMoreStatus()
      }
    },
    value() {
      this.keyword = this.value
    },
    keyword() {
      this.emitData()
    }
  },
  mounted() {
    this.updateMoreStatus()
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.$refs.resizeElement)
    }
  },
  methods: {
    handleNameItem(e) {
      let title = e.target.getAttribute('data-value')
      let item = this.list.find(e => e.title === title)
      if (item) {
        this.changeKeyword(item)
      }
    },
    onKeyDown(e) {
      const elInput = e.target
      const keyCode = e.keyCode
      const startPos = elInput.selectionStart
      const startPosVal = elInput.value.slice(0, startPos)
      const endPosVal = elInput.value.slice(startPos, elInput.value.length)

      const { wildcardTag } = this.wildcardConfig || {}
      if (!wildcardTag) {
        return false
      }
      const wildcardTagLeft = wildcardTag[0]
      const wildcardTagRight = wildcardTag[1]

      if (keyCode === 39 && endPosVal) {
        let endNum = endPosVal.indexOf(wildcardTagRight)
        let char = endPosVal.substring(0, endNum + 1)
        if (titleList.includes(char)) {
          elInput.selectionStart = startPos + endNum
          elInput.selectionEnd = startPos + endNum
        }
      }

      if (keyCode === 37 && startPosVal) {
        let frontNum = startPosVal.lastIndexOf(wildcardTagLeft)
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
          let frontNum = startPosVal.lastIndexOf(wildcardTagLeft)
          if (lastChar === wildcardTagRight) {
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
    updateMoreStatus() {
      this.$nextTick(() => {
        if (this.$refs.resizeElement) {
          if (this.$refs.resizeElement.scrollHeight > 40) {
            this.hasMore = true
          }
        }
      })
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
        const specialChars = '\\^$.|?*+()[]{}'
        const regexStr = `([${specialChars
          .split('')
          .map(c => `\\${c}`)
          .join('')}])`

        if (index === 0) {
          replaceName = new RegExp(
            `${activeTitle.replace(new RegExp(regexStr, 'g'), '\\$1')}([${this.joinSymbol}]+)?`
          )
        } else {
          replaceName = new RegExp(
            `([${this.joinSymbol}]+)?${activeTitle.replace(new RegExp(regexStr, 'g'), '\\$1')}`
          )
        }
      }
      if (this.keyword.includes(item.title) || this.keyword.includes(item.reg)) {
        this.deleteText(replaceName)
      } else {
        this.insertText(activeTitle)
      }
    },
    deleteText(text) {
      const input = this.$refs['keyword-input'].$refs.input
      const currentValue = input.value
      let startPos = currentValue.match(text).index
      input.value = currentValue.replace(text, '')
      input.selectionStart = input.selectionEnd = startPos
      input.focus()
      this.keyword = input.value
    },
    insertText(text) {
      const input = this.$refs['keyword-input'].$refs.input
      // 获取光标位置
      const startPos = input.selectionStart
      const endPos = input.selectionEnd
      // 保存当前输入框的值
      const currentValue = input.value
      // 需要插入的文本
      const textToInsert = text
      // 根据光标位置插入文本
      if (startPos !== endPos) {
        // 如果有选中文本，则替换选中的文本
        input.value =
          currentValue.substring(0, startPos) +
          textToInsert +
          currentValue.substring(endPos, currentValue.length)
      } else {
        // 没有选中文本，直接在光标位置插入文本
        input.value =
          currentValue.substring(0, startPos) +
          textToInsert +
          currentValue.substring(startPos, currentValue.length)
      }
      // 设置光标位置
      input.selectionStart = input.selectionEnd = startPos + textToInsert.length
      input.focus()
      this.keyword = input.value
    },
    handleHideMore() {
      this.hideMore = !this.hideMore
    }
  }
}
</script>
