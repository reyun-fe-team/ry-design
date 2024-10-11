import { prefix } from '@src/config.js'
const prefixCls = prefix + 'batch-inputs-end-slot'

export default {
  name: prefixCls,
  functional: true,
  props: {
    source: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    },
    value: {
      type: Array,
      default: () => []
    },
    renderFunction: {
      type: Function,
      default: null
    },
    insertNode: {
      type: Function,
      default: null
    }
  },
  render: (h, ctx) => {
    const { source, value, index, insertNode, renderFunction } = ctx.props
    const childProps = { source, value, index, insertNode }
    const child = renderFunction(childProps)
    return h('div', { class: [prefixCls] }, child)
  }
}
