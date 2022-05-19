<!-- 投放管理 自定义 select -->
<template>
  <div class="select-box">
    <div
      class="label"
      style="width: auto">
      {{ label }} :
    </div>
    <div
      v-if="readOnly"
      class="select-box-body container">
      <Tooltip
        :content="name"
        :max-width="400"
        theme="light"
        :placement="placement">
        <div class="select-box-name">
          {{ name }}
        </div>
      </Tooltip>
    </div>
    <Selectv-else
      class="select container"
      :value="hookValue"
      style="height: 32px"
      :multiple="multiple"
      :max-tag-placeholder="val => val"
      :max-tag-count="1"
      :filterable="filterable"
      @on-change="change">
      <Option
        v-for="(item, index) in hookList"
        :key="index"
        :value="item.value">
        {{ item.label }}
      </Option>
    </Selectv-else>
    <Icon
      type="ios-close-circle"
      class="close"
      @click="clear"></Icon>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number, Array]
    },
    list: {
      type: Array,
      default: () => []
    },
    // 只读
    readOnly: {
      type: Boolean,
      default: false
    },
    filterable: {
      default: false,
      type: Boolean
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      hookValue: this.value,
      hookList: this.list
    }
  },
  computed: {
    name() {
      let labels = this.hookList.reduce((list, cur) => {
        if (this.hookValue.includes(cur.value)) {
          list.push(cur.label)
        }
        return list
      }, [])
      if (labels.length) {
        return labels.join(',')
      }
      return '请选择'
    }
  },
  watch: {
    value(n, o) {
      if (!n || !o) {
        return
      }
      let jsn = JSON.stringify(n)
      let jso = JSON.stringify(o)
      if (jsn === jso) {
        return
      }
      this.hookValue = this.value
    },
    list(n, o) {
      if (!n || !o) {
        return
      }
      let jsn = JSON.stringify(n)
      let jso = JSON.stringify(o)
      if (jsn === jso) {
        return
      }
      this.hookList = this.list
    }
  },
  created() {
    // 数据变化触发重新计算
    this.hookValue = []
    // 数据太多的时候，需要等待子组件渲染完成，才能回显上来，加一个延迟处理
    this.$nextTick(() => {
      setTimeout(() => {
        this.hookValue = this.value
      }, 1500)
    })
  },
  methods: {
    change(v) {
      if (!v || JSON.stringify(v) === JSON.stringify(this.hookValue)) {
        return
      }
      this.hookValue = v || ''
      // 向父元素传递数据
      this.$emit('input', this.hookValue)
    },
    // 清空value
    clear() {
      this.hookValue = Array.isArray(this.value) ? [] : ''
      this.$emit('input', this.hookValue)
      this.$emit('on-clear')
    }
  }
}
</script>
<style lang='less' scoped>
@import 'index.less';
</style>