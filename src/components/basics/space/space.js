import { prefix } from '@src/config.js'
import { filterEmpty } from '../../../util/assist'
import isNumber from 'lodash/isNumber'
import isArray from 'lodash/isArray'
const prefixCls = prefix + 'space'
const Space = {
  name: prefixCls,
  functional: true,
  props: {
    align: {
      type: String
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    size: {
      type: [Number, String, Array],
      default: 'small'
    },
    wrap: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h, content) {
    // 获取子元素数组
    const children = content.children
    const items = filterEmpty(children)
    const contentSlots = content.slots()
    const contentProps = content.props

    // 样式逻辑处理
    const itemClassName = prefixCls + '-item'
    const mergedAlign = () => {
      const { align, direction } = contentProps
      return align != null ? align : direction === 'horizontal' ? 'center' : ''
    }
    const mergedAlignFn = mergedAlign()
    const cls = () => {
      const { direction, wrap, fill } = contentProps
      return [
        prefixCls,
        {
          [`${prefixCls}-${direction}`]: direction,
          [`${prefixCls}-align-${mergedAlignFn}`]: mergedAlignFn,
          [`${prefixCls}-wrap`]: wrap,
          [`${prefixCls}-fill`]: fill
        }
      ]
    }
    const clsFn = cls()
    const getMargin = size => {
      if (isNumber(size)) {
        return size
      }
      switch (size) {
        case 'mini':
          return 4
        case 'small':
          return 8
        case 'medium':
          return 16
        case 'large':
          return 24
        default:
          return 8
      }
    }
    const getMarginStyle = isLast => {
      const style = {}
      const { size, wrap, direction } = contentProps
      const marginRight = `${getMargin(isArray(size) ? size[0] : size)}px`
      const marginBottom = `${getMargin(isArray(size) ? size[1] : size)}px`
      if (isLast) {
        return wrap
          ? {
              marginBottom
            }
          : {}
      }
      if (direction === 'horizontal') {
        style.marginRight = marginRight
      }
      if (direction === 'vertical' || wrap) {
        style.marginBottom = marginBottom
      }
      return style
    }
    // 构造容器节点
    const container = h(
      'div',
      {
        class: clsFn
      },
      [
        items.map((child, i) => {
          const shouldRenderSplit = contentSlots.split && i > 0
          return h(
            'div',
            {
              class: itemClassName,
              key: itemClassName + '-' + i
            },
            [
              shouldRenderSplit &&
                h(
                  'div',
                  {
                    class: `${prefixCls}-item-split`,
                    style: getMarginStyle(false)
                  },
                  [contentSlots.split]
                ),
              h(
                'div',
                {
                  class: `${prefixCls}-item`,
                  style: getMarginStyle(i === items.length - 1)
                },
                [child]
              )
            ]
          )
        })
      ]
    )
    return container
  }
}
export default Space
