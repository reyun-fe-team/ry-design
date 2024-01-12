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
    insertText: {
      type: Function,
      default: null
    }
  },
  render: (h, ctx) => {
    const { source, value, index, insertText, renderFunction } = ctx.props
    return h(
      'div',
      {
        class: [prefixCls]
      },
      renderFunction({
        source,
        value,
        index,
        insertText,
        renderFunction
      })
    )
  }
}
