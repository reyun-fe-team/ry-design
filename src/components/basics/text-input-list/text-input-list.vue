<template>
  <div :class="prefixCls">
    <rd-virtual-list
      ref="list"
      :class="prefixCls + '-virtual-list'"
      :data-key="'uid'"
      :data-sources="getLine"
      :extra-props="{ ...$attrs, middle, maxLine, errorList, value }"
      :data-component="itemComponent"
      v-on="$listeners"
      @handlerKeydown="handlerKeydown"
      @middle="middleChange"
      @on-error="onInputError"
      @itemClick="itemClick"
      @on-change="handlerChange" />
  </div>
</template>
<script>
import Item from './title-list'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'text-input-list'
export default {
  name: prefixCls,
  components: {
    Item
  },
  props: {
    // 最大行数
    maxLine: {
      type: Number,
      default: 10
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      prefixCls,
      itemChild: null,
      itemComponent: Item,
      middle: {
        preActiveClass: null,
        activeClass: null,
        middleData: [
          {
            id: 1,
            value: ''
          }
        ]
      },
      errorList: []
    }
  },
  computed: {
    getLine() {
      return Array(this.maxLine)
        .fill('')
        .map((item, idx) => ({
          uid: `key_${idx}`,
          index: idx,
          item: idx + 1,
          maxLine: this.maxLine
        }))
    }
  },
  watch: {
    'middle.activeClass'(cur, pre) {
      this.middle.preActiveClass = pre
    },
    value(cur) {
      if (cur.length === 0 && this.middle.activeClass !== null) {
        this.errorList = []
        this.itemChild = null
      }
    }
  },
  methods: {
    middleChange(middle) {
      this.middle = middle
    },
    onInputError(index, error) {
      this.$set(this.errorList, index, error)
      this.$emit('on-error', index, error)
    },
    handlerKeydown(index) {
      this.$refs.list.scrollToIndex(index - 5)
      setTimeout(() => {
        const prevIndex = this.$children[0].$children.findIndex(item => item.index === index)
        const emojInput = this.$children[0].$children[prevIndex].$children[0].$refs.emojInput
        this.itemChild = this.$children[0].$children[prevIndex].$children[0]
        emojInput.$el.click()
        emojInput.focus('end')
      })
    },
    handlerChange(val) {
      this.$emit('on-change', val)
    },
    getItem() {
      return this.itemChild || (this.$children[0] && this.$children[0].$children[0].$children[0])
    },
    getValue() {
      return this.getItem().getValue()
    },
    insertText(val) {
      this.getItem().insertText(val)
    },
    itemClick(child) {
      this.itemChild = child
    }
  }
}
</script>
