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
      type: Boolean
    },
    fill: {
      type: Boolean
    }
  },
  computed: {
    mergedAlign({ align, direction }) {
      let _a
      return (_a = align) != null ? _a : direction === 'horizontal' ? 'center' : ''
    },
    cls(direction, mergedAlign, wrap, fill) {
      return [
        prefixCls,
        {
          [`${prefixCls}-${direction}`]: direction,
          [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
          [`${prefixCls}-wrap`]: wrap,
          [`${prefixCls}-fill`]: fill
        }
      ]
    }
  },
  render: function render(h, content) {
    // 获取子元素数组
    const children = content.children
    const items = filterEmpty(children)
    const _$slots = content.slots()
    const _contentProps = content.props

    // 样式逻辑处理
    const itemClassName = prefixCls + '-item'
    const mergedAlign = () => {
      const { align, direction } = _contentProps
      let _a
      return (_a = align) != null ? _a : direction === 'horizontal' ? 'center' : ''
    }
    const _mergedAlign = mergedAlign()
    const cls = () => {
      const { direction, wrap, fill } = _contentProps
      return [
        prefixCls,
        {
          [`${prefixCls}-${direction}`]: direction,
          [`${prefixCls}-align-${_mergedAlign}`]: _mergedAlign,
          [`${prefixCls}-wrap`]: wrap,
          [`${prefixCls}-fill`]: fill
        }
      ]
    }
    const _cls = cls()
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
      const marginRight = `${getMargin(
        isArray(_contentProps.size) ? _contentProps[0] : _contentProps.size
      )}px`
      const marginBottom = `${getMargin(
        isArray(_contentProps.size) ? _contentProps[1] : _contentProps.size
      )}px`
      if (isLast) {
        return _contentProps.wrap
          ? {
              marginBottom
            }
          : {}
      }
      if (_contentProps.direction === 'horizontal') {
        style.marginRight = marginRight
      }
      if (_contentProps.direction === 'vertical' || _contentProps.wrap) {
        style.marginBottom = marginBottom
      }
      return style
    }
    // 构造容器节点
    const container = h(
      'div',
      {
        class: _cls
      },
      [
        items.map((child, i) => {
          const shouldRenderSplit = _$slots.split && i > 0
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
                  [_$slots.split]
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
