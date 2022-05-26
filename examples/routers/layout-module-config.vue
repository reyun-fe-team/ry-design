<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-22 16:49:35
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-26 18:23:07
 * @FilePath: /ry-design/examples/routers/layout-module-config.vue
 * @Description: layout-module-config 组件示例
-->
<template>
  <div>
    <Button
      style="margin: 20px"
      @click="toggleSort">
      交换组件位置
    </Button>
    <Button
      style="margin: 20px"
      @click="toggleWidth">
      改变容器宽度
    </Button>
    <Button
      style="margin: 20px"
      @click="toggleType">
      改变使用类型
    </Button>

    <rd-layout-module-config
      :slot-list="slotList"
      :slot-renders="slotRenders"
      :width="width"
      :item-min-width="200"
      :height="477"
      :width-type="widthType"
      :clo-width-list="cloWidthList">
      <template #land>
        <rd-layout-module-view title="落地页">
          <div slot="header"><a>配置</a></div>
          <div
            slot="main"
            style="background: #f90">
            落地页面板内容
          </div>
        </rd-layout-module-view>
      </template>
      <template #convert>
        <rd-layout-module-view title="转化">
          <div slot="header"><a>配置</a></div>
          <div
            slot="main"
            style="background: #a88">
            转化面板内容
          </div>
        </rd-layout-module-view>
      </template>
      <template #event>
        <rd-layout-module-view title="事件资产">
          <div slot="header"><a>配置</a></div>
          <div
            slot="main"
            style="background: #f00">
            事件资产面板内容
          </div>
        </rd-layout-module-view>
      </template>
    </rd-layout-module-config>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slotList: [['land'], ['convert', 'event'], ['creative']],
      isToggle: false,
      width: 1000,
      widthType: 'equalDivision',
      cloWidthList: []
    }
  },
  computed: {
    slotRenders() {
      return {
        creative: h => {
          const header = h('div', { slot: 'header' }, [h('a', '配置')])
          const main = h('div', { slot: 'main', style: 'background: #ccc;' }, '创意面板内容')
          const footerStyle =
            'height:100%;display:flex;align-items:center;justify-content:center;cursor:pointer;'
          const footer = h(
            'div',
            {
              slot: 'footer',
              style: footerStyle
            },
            [h('a', '选择素材')]
          )
          return h('rd-layout-module-view', { props: { title: '创意', showFooter: true } }, [
            header,
            main,
            footer
          ])
        }
      }
    }
  },
  methods: {
    toggleSort() {
      if (this.isToggle) {
        this.slotList = [['land'], ['convert', 'event'], ['creative']]
      } else {
        this.slotList = [['event'], ['creative', 'land'], ['convert']]
      }
      this.isToggle = !this.isToggle
    },
    toggleWidth() {
      if (!this.width) {
        this.width = 1000
      } else {
        this.width = 0
      }
    },
    toggleType() {
      if (this.widthType === 'equalDivision') {
        this.widthType = 'customScale'
        this.cloWidthList = [40, 20, 40]
      } else {
        this.widthType = 'equalDivision'
        this.cloWidthList = []
      }
    }
  }
}
</script>
