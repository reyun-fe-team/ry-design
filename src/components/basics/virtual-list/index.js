// 虚拟列表
import { prefix } from '@src/config.js'
import Virtual from './Virtual'
import Item from './components/item'
import Slot from './components/solt'
import { VirtualProps } from './props'

const prefixCls = prefix + 'virtual-list'

// 事件类型
const EVENT_TYPE = {
  ITEM: 'item_resize',
  SLOT: 'slot_resize'
}

// slot 名称
const SLOT_TYPE = {
  // 字符串值也用于aria角色属性
  HEADER: 'thead',
  FOOTER: 'tfoot'
}

const VirtualList = {
  name: prefixCls,
  props: VirtualProps,
  data() {
    return {
      range: null
    }
  },
  watch: {
    'dataSources.length'() {
      this.virtual.updateParam('uniqueIds', this.getUniqueIdFromDataSources())
      this.virtual.handleDataSourcesChange()
    },
    keeps(newValue) {
      this.virtual.updateParam('keeps', newValue)
      this.virtual.handleSlotSizeChange()
    },
    start(newValue) {
      this.scrollToIndex(newValue)
    },
    offset(newValue) {
      this.scrollToOffset(newValue)
    }
  },
  created() {
    this.isHorizontal = this.direction === 'horizontal'
    this.directionKey = this.isHorizontal ? 'scrollLeft' : 'scrollTop'

    this.installVirtual()

    // listen item size change
    this.$on(EVENT_TYPE.ITEM, this.onItemResized)

    // listen slot size change
    if (this.$slots.header || this.$slots.footer) {
      this.$on(EVENT_TYPE.SLOT, this.onSlotResized)
    }
  },
  activated() {
    // set back offset when awake from keep-alive
    this.scrollToOffset(this.virtual.offset)

    if (this.pageMode) {
      document.addEventListener('scroll', this.onScroll, {
        passive: false
      })
    }
  },
  deactivated() {
    if (this.pageMode) {
      document.removeEventListener('scroll', this.onScroll)
    }
  },
  mounted() {
    // set position
    if (this.start) {
      this.scrollToIndex(this.start)
    } else if (this.offset) {
      this.scrollToOffset(this.offset)
    }

    // in page mode we bind scroll event to document
    if (this.pageMode) {
      this.updatePageModeFront()

      document.addEventListener('scroll', this.onScroll, {
        passive: false
      })
    }
  },
  beforeDestroy() {
    this.virtual.destroy()
    if (this.pageMode) {
      document.removeEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    // ----------- public method start -----------
    // 按id获取项目大小
    getSize(id) {
      return this.virtual.sizes.get(id)
    },
    // 获取存储（渲染）项目的总数
    getSizes() {
      return this.virtual.sizes.size
    },
    // 返回当前滚动偏移t
    getOffset() {
      if (this.pageMode) {
        return document.documentElement[this.directionKey] || document.body[this.directionKey]
      } else {
        const { root } = this.$refs
        return root ? Math.ceil(root[this.directionKey]) : 0
      }
    },
    // 返回客户端视口大小
    getClientSize() {
      const key = this.isHorizontal ? 'clientWidth' : 'clientHeight'
      if (this.pageMode) {
        return document.documentElement[key] || document.body[key]
      } else {
        const { root } = this.$refs
        return root ? Math.ceil(root[key]) : 0
      }
    },
    // 返回所有滚动大小
    getScrollSize() {
      const key = this.isHorizontal ? 'scrollWidth' : 'scrollHeight'
      if (this.pageMode) {
        return document.documentElement[key] || document.body[key]
      } else {
        const { root } = this.$refs
        return root ? Math.ceil(root[key]) : 0
      }
    },
    // 将当前滚动位置设置为预期偏移
    scrollToOffset(offset) {
      if (this.pageMode) {
        document.body[this.directionKey] = offset
        document.documentElement[this.directionKey] = offset
      } else {
        const { root } = this.$refs
        if (root) {
          root[this.directionKey] = offset
        }
      }
    },
    // 将当前滚动位置设置为预期索引
    scrollToIndex(index) {
      // 滚动到底部
      if (index >= this.dataSources.length - 1) {
        this.scrollToBottom()
      } else {
        const offset = this.virtual.getOffset(index)
        this.scrollToOffset(offset)
      }
    },
    // 将当前滚动位置设置为底部
    scrollToBottom() {
      const { shepherd } = this.$refs
      if (shepherd) {
        const offset = shepherd[this.isHorizontal ? 'offsetLeft' : 'offsetTop']
        this.scrollToOffset(offset)

        // 检查它是否真的滚动到了底部
        // 可能列表没有渲染并计算到最后一个范围
        // 所以我们需要在下一个事件循环中重试，直到它真正到达底部
        setTimeout(() => {
          if (this.getOffset() + this.getClientSize() + 1 < this.getScrollSize()) {
            this.scrollToBottom()
          }
        }, 16.7)
      }
    },
    // 使用页面模式时，我们需要手动更新槽头大小
    // 将相对于浏览器的根偏移量作为槽头大小
    updatePageModeFront() {
      const { root } = this.$refs
      if (root) {
        const rect = root.getBoundingClientRect()
        const { defaultView } = root.ownerDocument
        const offsetFront = this.isHorizontal
          ? rect.left + defaultView.pageXOffset
          : rect.top + defaultView.pageYOffset
        this.virtual.updateParam('slotHeaderSize', offsetFront)
      }
    },
    // 将所有状态重置回初始状态
    reset() {
      this.virtual.destroy()
      this.scrollToOffset(0)
      this.installVirtual()
    },
    // ----------- public method end -----------
    // 初始化 Virtual
    installVirtual() {
      const params = {
        slotHeaderSize: 0,
        slotFooterSize: 0,
        keeps: this.keeps,
        estimateSize: this.estimateSize,
        // 建议保留三分之一
        buffer: Math.round(this.keeps / 3),
        uniqueIds: this.getUniqueIdFromDataSources()
      }
      this.virtual = new Virtual(params, this.onRangeChanged)

      // 同步初始范围
      this.range = this.virtual.getRange()
    },
    getUniqueIdFromDataSources() {
      const { dataKey } = this
      return this.dataSources.map(dataSource =>
        typeof dataKey === 'function' ? dataKey(dataSource) : dataSource[dataKey]
      )
    },
    // 当每个项目安装或大小更改时调用的事件
    onItemResized(id, size) {
      this.virtual.saveSize(id, size)
      this.$emit('resized', id, size)
    },
    // 插槽装入或大小更改时调用的事件
    onSlotResized(type, size, hasInit) {
      if (type === SLOT_TYPE.HEADER) {
        this.virtual.updateParam('slotHeaderSize', size)
      } else if (type === SLOT_TYPE.FOOTER) {
        this.virtual.updateParam('slotFooterSize', size)
      }

      if (hasInit) {
        this.virtual.handleSlotSizeChange()
      }
    },
    // 这是重新招标的条目
    onRangeChanged(range) {
      this.range = range
    },
    // 滚动监听
    onScroll(evt) {
      const offset = this.getOffset()
      const clientSize = this.getClientSize()
      const scrollSize = this.getScrollSize()

      // iOS滚动回弹行为会导致方向错误
      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return
      }

      this.virtual.handleScroll(offset)
      this.emitEvent(offset, clientSize, scrollSize, evt)
    },
    // 特殊位置的发射事件
    emitEvent(offset, clientSize, scrollSize, evt) {
      this.$emit('scroll', evt, this.virtual.getRange())

      if (this.virtual.isFront() && !!this.dataSources.length && offset - this.topThreshold <= 0) {
        this.$emit('totop')
      } else if (
        this.virtual.isBehind() &&
        offset + clientSize + this.bottomThreshold >= scrollSize
      ) {
        this.$emit('tobottom')
      }
    },
    // 基于范围数据获取真实的渲染槽
    // 就地补丁策略将尽量重用组件
    // 所以那些被重用的组件不会触发生命周期挂载
    getRenderSlots(h) {
      const slots = []
      const { start, end } = this.range
      const {
        dataSources,
        dataKey,
        itemClass,
        itemTag,
        itemStyle,
        isHorizontal,
        extraProps,
        dataComponent,
        itemScopedSlots
      } = this
      const slotComponent = this.$scopedSlots && this.$scopedSlots.item
      for (let index = start; index <= end; index++) {
        const dataSource = dataSources[index]
        if (dataSource) {
          const uniqueKey =
            typeof dataKey === 'function' ? dataKey(dataSource) : dataSource[dataKey]
          if (typeof uniqueKey === 'string' || typeof uniqueKey === 'number') {
            slots.push(
              h(Item, {
                props: {
                  index,
                  tag: itemTag,
                  event: EVENT_TYPE.ITEM,
                  horizontal: isHorizontal,
                  uniqueKey: uniqueKey,
                  source: dataSource,
                  extraProps: extraProps,
                  component: dataComponent,
                  slotComponent: slotComponent,
                  scopedSlots: itemScopedSlots
                },
                style: itemStyle,
                class: `${itemClass}${this.itemClassAdd ? ' ' + this.itemClassAdd(index) : ''}`
              })
            )
          } else {
            console.warn(`Cannot get the data-key '${dataKey}' from data-sources.`)
          }
        } else {
          console.warn(`Cannot get the index '${index}' from data-sources.`)
        }
      }
      return slots
    }
  },
  // render函数，一种更接近编译器的模板替代方法
  // https://cn.vuejs.org/guide/extras/render-function
  render(h) {
    const { header, footer } = this.$slots
    const { padFront, padBehind } = this.range
    const {
      isHorizontal,
      pageMode,
      rootTag,
      wrapTag,
      wrapClass,
      wrapStyle,
      headerTag,
      headerClass,
      headerStyle,
      footerTag,
      footerClass,
      footerStyle
    } = this
    const paddingStyle = {
      padding: isHorizontal
        ? `0px ${padBehind}px 0px ${padFront}px`
        : `${padFront}px 0px ${padBehind}px`
    }
    const wrapperStyle = wrapStyle ? Object.assign({}, wrapStyle, paddingStyle) : paddingStyle

    return h(
      rootTag,
      {
        ref: 'root',
        on: {
          '&scroll': !pageMode && this.onScroll
        }
      },
      [
        // header slot
        header
          ? h(
              Slot,
              {
                class: headerClass,
                style: headerStyle,
                props: {
                  tag: headerTag,
                  event: EVENT_TYPE.SLOT,
                  uniqueKey: SLOT_TYPE.HEADER
                }
              },
              header
            )
          : null,

        // main list
        h(
          wrapTag,
          {
            class: wrapClass,
            attrs: {
              role: `${prefix}virtual-list-group`
            },
            style: wrapperStyle
          },
          this.getRenderSlots(h)
        ),

        // footer slot
        footer
          ? h(
              Slot,
              {
                class: footerClass,
                style: footerStyle,
                props: {
                  tag: footerTag,
                  event: EVENT_TYPE.SLOT,
                  uniqueKey: SLOT_TYPE.FOOTER
                }
              },
              footer
            )
          : null,

        // an empty element use to scroll to bottom
        h('div', {
          ref: 'shepherd',
          style: {
            width: isHorizontal ? '0px' : '100%',
            height: isHorizontal ? '100%' : '0px'
          }
        })
      ]
    )
  }
}

VirtualList.install = function (Vue) {
  Vue.component(VirtualList.name, VirtualList)
}

export default VirtualList
