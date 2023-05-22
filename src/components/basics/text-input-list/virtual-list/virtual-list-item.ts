// wrapping for item
import Wrapper from './wrapper'
import { ItemProps } from './props'
export default {
  name: 'VirtualListItem',
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
    const props = {
      ...extraProps,
      source,
      index
    }

    return h(
      tag,
      {
        key: uniqueKey,
        attrs: {
          role: 'listitem'
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
