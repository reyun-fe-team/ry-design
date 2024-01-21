// wrapping for item
import { prefix } from '@src/config.js'
import Wrapper from '../mixins/wrapper'
import { ItemProps } from '../props'

const prefixCls = prefix + 'virtual-list-item'

export default {
  name: prefixCls,
  mixins: [Wrapper],
  props: ItemProps,
  render(h) {
    const {
      tag,
      component,
      extraProps = {},
      index,
      source,
      scopedSlots = {},
      uniqueKey,
      slotComponent
    } = this

    const props = Object.assign({}, extraProps || {}, { source, index })

    return h(
      tag,
      {
        key: uniqueKey,
        attrs: {
          role: `${prefix}virtual-list-item`
        }
      },
      [
        slotComponent
          ? h('div', slotComponent({ item: source, index: index, scope: props }))
          : h(component, {
              props,
              scopedSlots: scopedSlots
            })
      ]
    )
  }
}
