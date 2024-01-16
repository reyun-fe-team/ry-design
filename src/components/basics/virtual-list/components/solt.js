import { prefix } from '@src/config.js'
import Wrapper from '../mixins/wrapper'
import { SlotProps } from '../props'

const prefixCls = prefix + 'virtual-list-slot'

export default {
  name: prefixCls,
  mixins: [Wrapper],
  props: SlotProps,
  render(h) {
    const { tag, uniqueKey } = this

    return h(
      tag,
      {
        key: uniqueKey,
        attrs: {
          role: `${prefix}virtual-list-item-${uniqueKey}`
        }
      },
      this.$slots.default
    )
  }
}
