<template>
  <div :class="classes">
    <FormItem
      :prop="mergedOptions.prop"
      :label="mergedOptions.label"
      :label-width="mergedOptions.labelWidth">
      <div :class="prefixCls + '-keyword'">
        <Input
          v-model="keyword"
          :disabled="disabled"
          type="text"
          placeholder="请输入"
          @on-keydown="onKeyDown"></Input>
        <span :class="prefixCls + '-keyword-word-limit'">{{ showWordLimit }}</span>
      </div>
      <div :class="prefixCls + '-list'">
        <div :class="prefixCls + '-list-name-rule'">
          <span :class="prefixCls + '-list-name-rule-label'">通配符:</span>
          <p
            :class="prefixCls + '-list-name-rule-item-wrap'"
            @click="handleNameItem">
            <i
              v-for="item in list"
              :key="item.title"
              :class="[
                prefixCls + '-list-name-rule-item',
                { [prefixCls + '-list-name-rule-item-active']: keyword.includes(item.title) }
              ]"
              :data-value="item.title">
              {{ prefix }}{{ item.label }}
              <Tooltip
                v-if="item.tooltip"
                :content="item.tooltip"
                theme="light"
                placement="top">
                <Icon
                  type="ios-help-circle-outline"
                  size="13" />
              </Tooltip>
            </i>
          </p>
        </div>
        <div :class="prefixCls + '-list-name-save'">
          <Checkbox
            v-model="saveNameRule"
            on-change="onSaveRuleChange">
            保存默认规则
          </Checkbox>
        </div>
      </div>
    </FormItem>
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
    maxlength: {
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
    }
  },
  data() {
    return {
      prefixCls,
      keyword: '',
      saveNameRule: false,
      mergedOptions: {},
      list: []
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    showWordLimit() {
      let len = this.calculateLength(this.keyword)
      return len + '/' + this.maxlength
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
        let lastChar = startPosVal.charAt(startPosVal.length - 1)
        let frontNum = startPosVal.lastIndexOf('{')
        if (lastChar === '}') {
          let delChar = startPosVal.substring(frontNum)
          elInput.selectionStart = startPosVal.length - delChar.length
          elInput.selectionEnd = startPosVal.length
        }
      }
    },
    onSaveRuleChange(val) {
      this.$emit('on-save-rule', val)
    },
    // #utils
    initData(data) {
      this.keyword = this.value
      this.list = data.map(item => {
        return {
          ...item,
          label: item[this.dataConfig.label],
          title: item[this.dataConfig.title],
          id: item[this.dataConfig.id]
        }
      })
      titleList = this.list.map(item => item.title)
      this.mergedOptions = Object.assign({}, defaultOptions, this.option)
    },
    emitData() {
      this.$emit('input', this.keyword)
      this.$emit('on-change', this.keyword)
      let ids = this.list
        .filter(e => this.keyword.includes(e.title) || this.keyword.includes(e.reg))
        .map(e => e.id)
        .filter(Boolean)
      this.$emit('on-name-programs', ids)
    },
    changeKeyword(item) {
      if (this.keyword.includes(item.title) || this.keyword.includes(item.reg)) {
        this.keyword = this.keyword.replace(item.title, '')
      } else {
        this.keyword += item.title
      }
    }
  }
}
</script>
