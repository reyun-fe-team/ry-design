import Wrapper from './wrapper'
import { SlotProps } from './props'
export default {
  name: 'VirtualListSlot',
  mixins: [Wrapper],

  props: SlotProps,

  render(h) {
    const { tag, uniqueKey } = this

    return h(
      tag,
      {
        key: uniqueKey,
        attrs: {
          role: uniqueKey
        }
      },
      this.$slots.default
    )
  }
}
