<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-22 16:49:35
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @LastEditTime: 2022-12-16 19:31:32
 * @FilePath: /ry-design/examples/routers/layout-module-config.vue
 * @Description: layout-module-config 组件示例
-->
<template>
  <div style="margin: 20px">
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
      :width="width"
      :item-min-width="200"
      :height="477"
      :width-type="widthType"
      :clo-width-list="cloWidthList">
      <template #land>
        <rd-layout-module-view
          title="落地页内容名称太长了超出显示省略号落地页内容名称太长了超出显示省略号">
          <div slot="header"><a>配置</a></div>
          <div
            slot="main"
            style="background: rgb(225, 250, 232); height: 500px">
            落地页面板内容
          </div>
        </rd-layout-module-view>
      </template>
      <template #convert>
        <rd-layout-module-view title="转化">
          <div slot="header"><a>配置</a></div>
          <div
            slot="main"
            style="background: rgb(225, 250, 232); height: 500px">
            转化面板内容
          </div>
        </rd-layout-module-view>
      </template>
      <template #event>
        <rd-layout-module-view title="事件资产">
          <div slot="header"><a>配置</a></div>
          <div
            slot="main"
            style="background: rgb(225, 250, 232); height: 500px">
            事件资产面板内容
          </div>
        </rd-layout-module-view>
      </template>
      <template #creative>
        <rd-layout-module-view
          title="创意"
          show-footer>
          <div slot="header"><a>清空</a></div>
          <div
            slot="main"
            style="background: rgb(225, 250, 232); height: 500px">
            创意面板内容
          </div>
          <div
            slot="footer"
            :style="{
              height: '100%',
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
              cursor: 'pointer'
            }">
            <a>选择素材</a>
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
