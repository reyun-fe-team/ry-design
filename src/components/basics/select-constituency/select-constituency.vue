<template>
  <div
    ref="scrollBox"
    :class="prefixCls"
    :style="styles"
    @mousedown="contextMenuVisible = false"
    @contextmenu.prevent="handleClickContextMenuOutside">
    <div :class="prefixCls + '-content'">
      <div :class="[prefixCls + '-select-box', attribute.box]"></div>
      <div
        :class="[prefixCls + '-select-area', attribute.constraint]"
        :style="stylesOperationArea"></div>
      <div
        v-if="showContextMenu"
        style="position: fixed"
        :style="contextMenuStyles">
        <Dropdown
          trigger="custom"
          :visible="contextMenuVisible"
          transfer>
          <DropdownMenu slot="list">
            <slot name="contextMenu">
              <DropdownItem>若开启右键,请使用slot:contextMenu</DropdownItem>
            </slot>
          </DropdownMenu>
        </Dropdown>
      </div>
      <section ref="el">
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script>
import Constituency from './selectable'
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'select-constituency'
export default {
  name: prefixCls,
  props: {
    containerClassName: {
      type: String,
      default: '',
      require: true
    },
    styles: {
      type: Object,
      default() {
        return {}
      }
    },
    showContextMenu: {
      type: Boolean,
      default: false
    },
    stylesOperationArea: {
      // 设置可操作区域画布,默认width:100%,height:100%;选区效果有效区在selection-astyle
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    let storageData = {}
    return {
      prefixCls,
      selected: [],
      selecting: [],
      getStorageData: () => {
        return storageData
      },
      contextMenuStyles: {
        top: 0,
        left: 0
      },
      contextMenuVisible: false,
      //添加唯一标识
      uniqueId: `uuid-${Math.random().toString(36).substr(2, 9)}`
    }
  },
  computed: {
    selectedCount: function () {
      return this.selected.reduce((c, i) => c + (i ? 1 : 0), 0)
    },
    attribute() {
      return {
        items: `.${this.containerClassName}`,
        constraint: `${this.prefixCls}-select-area-${this.uniqueId}`,
        box: `${this.prefixCls}-select-box-${this.uniqueId}`
      }
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.onDestroy()
  },
  methods: {
    // 可供外部组件调用
    init() {
      this.$nextTick(() => {
        this.onDestroy()
        const { attribute } = this
        const constraint = `.${attribute.constraint}`
        const box = `.${attribute.box}`
        let el = this.$refs['el']
        let storageData = this.getStorageData()
        let doms = Array.prototype.slice.call(el.querySelectorAll(attribute.items))
        storageData.data = new Constituency({
          // params
          boundingBox: document.querySelector(constraint),
          selectBoxSelector: box,
          boundingBoxSelector: constraint,
          el,
          // methods
          selectedGetter: this.selectedGetter,
          selectedSetter: this.selectedSetter,
          selectingSetter: this.selectingSetter,
          scrollingFrame: this.$refs['scrollBox'],
          onMouseUp: this.onMouseUp
        })
        storageData.data.setSelectTables(doms)

        // 添加滚动条监听
        let scrollWrap = document.querySelector(`.${this.prefixCls}`)
        // rd-select-constituency
        scrollWrap.addEventListener('scroll', this.scrollLoadMore)
      })
    },
    // 滚动加载数据后需要更新dom节点
    updateSelectTable() {
      this.$nextTick(() => {
        const { attribute } = this
        let el = this.$refs['el']
        let storageData = this.getStorageData()
        let doms = Array.prototype.slice.call(el.querySelectorAll(attribute.items))
        if (!doms || !doms.length) {
          return
        }
        storageData.data.setSelectTables(doms)
      })
    },
    scrollLoadMore() {
      let scrollWrap = document.querySelector(`.${this.prefixCls}`)
      let isBottom = scrollWrap.scrollHeight - scrollWrap.clientHeight - scrollWrap.scrollTop
      // 滚动条到达底部
      if (isBottom < 1) {
        this.$emit('scrollChange')
      }
    },
    // 可供外部组件调用
    clearSelection: function () {
      this.selected = []
      this.$emit('on-selecting-change', [])
    },
    // 可供外部组件调用
    setContextMenuVisible(data = false) {
      this.contextMenuVisible = data
    },
    // 可供外部组件调用
    clearSelected: function () {
      this.selected = []
      this.$emit('on-selected-change', [])
    },
    selectedGetter: function () {
      return this.selected
    },
    selectedSetter: function (v) {
      this.selected = v
      this.$emit('on-selected-change', v)
    },
    selectingSetter: function (v) {
      this.selecting = v

      this.$emit('on-selecting-change', v)
    },
    handleClickContextMenuOutside(event) {
      event.returnValue = false
      if (!this.selectedCount) {
        return
      }
      let { clientX, clientY } = event
      const position = {
        left: `${clientX}px`,
        top: `${clientY}px`
      }
      this.contextMenuStyles = position
      this.contextMenuVisible = true
    },
    onMouseUp() {
      this.$emit('on-mouse-up', this.selected, this.selecting)
    },
    // 销毁
    onDestroy() {
      let storageData = this.getStorageData()
      if (storageData.data) {
        storageData.data.detach()
        storageData.data = null
      }
    }
  }
}
</script>