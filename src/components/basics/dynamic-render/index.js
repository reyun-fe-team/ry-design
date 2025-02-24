import { prefix } from '@src/config.js'
import _isBoolean from 'lodash/isBoolean'
import _isFunction from 'lodash/isFunction'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
const prefixCls = prefix + 'dynamic-render'

const defaultConfig = {
  // 表单项的名称
  name: '',
  // 是否隐藏
  hide: false,
  // 隐藏时的值
  hideValue: null,
  // 默认值
  defaultValue: null,
  // 表单数据
  model: {},
  // 联动项
  linkage: [],
  // 立即调用
  immediate: false,
  // 重置依赖项
  resetDeps: null,
  // 更新事件
  emitUpdate: null
}

// 联动项
const linkageConfig = {
  // 被联动的字段
  name: '',
  // 触发事件 更新了 | 隐藏了 | 显示了
  // UPDATED | HIDDEN | DISPLAYED
  trigger: 'UPDATED',
  // 联动项需要设置的值
  value: null
}

const componentOptions = {
  name: prefixCls,
  props: {
    // 配置对象
    config: { type: Object, default: () => defaultConfig }
  },
  computed: {
    // 根据props计算是否显示
    elementHidden() {
      const { hide, model = {} } = this.config
      return _isBoolean(hide) ? hide : _isFunction(hide) ? hide(model) : true
    },
    // 元素重置的依赖项
    elementResetDeps() {
      const { resetDeps = null, model = {} } = this.config
      return _isFunction(resetDeps) ? resetDeps(model) : resetDeps
    },
    // 元素的默认值
    elementDefaultValue() {
      const { defaultValue, model = {} } = this.config
      return _isFunction(defaultValue) ? defaultValue(model) : defaultValue
    },
    // 元素的隐藏时的值
    elementHideValue() {
      const { hideValue, model = {} } = this.config
      return _isFunction(hideValue) ? hideValue(model) : hideValue
    }
  },
  watch: {
    // 元素是否隐藏
    elementHidden: {
      deep: true,
      handler(n, o) {
        if (!_isEqual(n, o)) {
          this.setFormData()
        }
      }
    },
    // 元素重置的依赖项
    elementResetDeps: {
      deep: true,
      handler(n, o) {
        if (!_isEqual(n, o)) {
          const { name = '', emitUpdate = null } = this.config
          const params = { name, key: name, value: this.elementDefaultValue }
          emitUpdate && emitUpdate(params)
        }
      }
    }
  },
  created() {
    this.config.immediate && this.setFormData()
  },
  methods: {
    // 设置表单数据
    setFormData() {
      const { name = '', emitUpdate = null } = this.config
      const value = !this.elementHidden ? this.elementDefaultValue : this.elementHideValue
      const params = { name, key: name, value }
      emitUpdate && emitUpdate(params)
    },
    // 联动处理
    setRelatedFormData() {
      const { relatedDefaultValue = [], emitUpdate = null } = this.config
      if (relatedDefaultValue && !_isEmpty(relatedDefaultValue)) {
        for (let index = 0; index < relatedDefaultValue.length; index++) {
          const { key, value } = relatedDefaultValue[index]
          const params = { name: key, key, value }
          emitUpdate && emitUpdate(params)
        }
      }
    }
  },
  render(h) {
    if (this.elementHidden) {
      return null
    }
    const props = { class: prefixCls }
    return h('rd-fragment', props, this.$slots.default)
  }
}

componentOptions.install = function (Vue) {
  Vue.component(componentOptions.name, componentOptions)
}

export default componentOptions
