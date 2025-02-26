import { prefix } from '@src/config.js'
import _isBoolean from 'lodash/isBoolean'
import _isFunction from 'lodash/isFunction'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import _isArray from 'lodash/isArray'
import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
const prefixCls = prefix + 'dynamic-render'

const defaultConfig = {
  // 表单项的名称
  key: '',
  // 是否隐藏
  hidden: false,
  // 隐藏时的值
  hiddenDefaultValue: null,
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
  // 触发事件 UPDATED 更新了 | HIDDEN 隐藏了 | DISPLAYED 显示了
  trigger: 'UPDATED',
  // 被联动的字段
  key: '',
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
      const { hidden, model = {} } = this.config
      return _isBoolean(hidden) ? hidden : _isFunction(hidden) ? hidden(model) : !_isNil(hidden)
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
    elementHiddenValue() {
      const { hiddenDefaultValue, model = {} } = this.config
      return _isFunction(hiddenDefaultValue) ? hiddenDefaultValue(model) : hiddenDefaultValue
    },
    // 元素当前的值
    elementCurrentValue() {
      const { model = {}, key: elementKey } = this.config
      let currentValue = _get(model, elementKey, null)
      return _isNil(currentValue) ? null : currentValue
    }
  },
  data() {
    return {
      elementWatchers: []
    }
  },
  created() {
    this.config.immediate && this.setFormData()
    this.initWatcher()
    this.initLinkage()
  },
  methods: {
    // 更新联动字段
    setLinkageFiled({ key, value }) {
      const { model = {}, emitUpdate } = this.config
      const defaultValue = _isFunction(value) ? value(model) : value
      const params = { key, value: defaultValue }
      if (key && emitUpdate) {
        emitUpdate(params)
      }
    },
    // 设置表单数据
    setFormData() {
      const { key = '', emitUpdate = null } = this.config
      const value = !this.elementHidden ? this.elementDefaultValue : this.elementHiddenValue
      const params = { key, value }
      emitUpdate && emitUpdate(params)
    },
    // 初始化 watcher
    initWatcher() {
      const watcher = [
        { prop: 'elementResetDeps', handle: this.setFormData },
        { prop: 'elementHidden', handle: this.setFormData }
      ]
      watcher.forEach(o => {
        const { prop, handle } = o
        const cb = (nv, ov) => !_isEqual(nv, ov) && handle()
        const unwatch = this.$watch(prop, cb, { deep: true })
        this.elementWatchers.push(unwatch)
      })
    },
    // 初始化 联动
    initLinkage() {
      const { linkage = [] } = this.config
      if (!_isArray(linkage) || _isEmpty(linkage)) {
        return
      }

      for (let index = 0; index < linkage.length; index++) {
        const { key, value, trigger } = Object.assign({}, linkageConfig, linkage[index])
        const params = { key, value }

        // 更新了
        if (trigger === 'UPDATED') {
          const cb = (nv, ov) => !_isEqual(nv, ov) && this.setLinkageFiled(params)
          const unwatch = this.$watch('elementCurrentValue', cb, { deep: true })
          this.elementWatchers.push(unwatch)
        }

        // 隐藏了
        if (trigger === 'HIDDEN') {
          const cb = (nv, ov) => {
            // true - false 隐藏
            const toHidden = ov && !nv
            !_isEqual(nv, ov) && toHidden && this.setLinkageFiled(params)
          }
          const unwatch = this.$watch('elementHidden', cb, { deep: true })
          this.elementWatchers.push(unwatch)
        }

        // 显示了
        if (trigger === 'DISPLAYED') {
          const cb = (nv, ov) => {
            // false - true 显示
            const toDisplayed = !ov && nv
            !_isEqual(nv, ov) && toDisplayed && this.setLinkageFiled(params)
          }
          const unwatch = this.$watch('elementHidden', cb, { deep: true })
          this.elementWatchers.push(unwatch)
        }
      }
    }
  },
  beforeDestroy() {
    this.elementWatchers.forEach(unwatch => unwatch())
  },
  render(h) {
    const props = { class: prefixCls }
    return this.elementHidden ? null : h('rd-fragment', props, this.$slots.default)
  }
}

componentOptions.install = function (Vue) {
  Vue.component(componentOptions.name, componentOptions)
}

export default componentOptions
