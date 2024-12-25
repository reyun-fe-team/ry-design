<template>
  <div>
    <div style="margin-bottom: 25px">
      <h3 style="margin-bottom: 15px">常规按钮</h3>
      <div style="padding-left: 10px; margin-bottom: 10px">
        <span style="display: inline-block; width: 100px">主要按钮</span>
        <span>
          <rd-button type="dark">type:dark</rd-button>
          <rd-button icon="ry-icon-xinjian">自定义图标</rd-button>
          <rd-button
            type="primary"
            icon="ios-search"
            :corner-marker="{
              offset: [14, -8],
              placement: 'right-top',
              src: createRecommend
            }">
            正常状态
          </rd-button>
          <rd-button
            type="primary"
            loading>
            加载中状态
          </rd-button>
          <rd-button
            type="primary"
            disabled
            icon="ios-search">
            禁用状态
          </rd-button>
        </span>
      </div>
      <div style="padding-left: 10px; margin-bottom: 10px">
        <span style="display: inline-block; width: 100px">默认纯白按钮</span>
        <span>
          <rd-button
            type="default"
            icon="ios-search">
            正常状态
          </rd-button>
          <rd-button
            type="default"
            loading>
            加载中状态
          </rd-button>
          <rd-button
            type="default"
            disabled
            icon="ios-search">
            禁用状态
          </rd-button>
        </span>
      </div>
      <div style="padding-left: 10px; margin-bottom: 10px">
        <span style="display: inline-block; width: 100px">灰框按钮</span>
        <span>
          <rd-button
            type="dashed"
            icon="ios-search">
            正常状态
          </rd-button>
          <rd-button
            :corner-marker="{
              offset: [14, -8],
              placement: 'right-top',
              src: createRecommend
            }"
            type="dashed"
            loading>
            加载中状态
          </rd-button>
          <rd-button
            type="dashed"
            disabled
            icon="ios-search">
            禁用状态
          </rd-button>
        </span>
      </div>
      <div style="padding-left: 10px; margin-bottom: 10px">
        <span style="display: inline-block; width: 100px">文字按钮</span>
        <span>
          <rd-button
            type="text"
            icon="ios-search">
            正常状态
          </rd-button>
          <rd-button
            type="text"
            loading>
            加载中状态
          </rd-button>
          <rd-button
            type="text"
            disabled
            icon="ios-search">
            禁用状态
          </rd-button>
        </span>
      </div>
    </div>
    <div style="margin-bottom: 25px">
      <h3 style="margin-bottom: 15px">插画按钮</h3>
      <div style="padding-left: 10px; margin-bottom: 10px">
        <span style="display: inline-block; width: 100px">主要按钮</span>
        <span>
          <rd-button
            :corner-marker="{
              offset: [14, -8],
              placement: 'right-top',
              src: createRecommend
            }"
            type="illustration"
            is-drop-down
            :drop-down-fns="{ onDropdownItemClick, onDropdownPrimaryClick }"
            :drop-down-menu-style="{ maxWidth: '500px', width: '300px' }"
            :drop-down-props="{ trigger: 'click' }"
            :drop-down-items="dropDownItems"
            :illustration-url="piliangchuangjian"
            illustration-grade="primary">
            主要按钮
          </rd-button>

          <rd-button
            type="illustration"
            :illustration-url="piliangchuangjian"
            illustration-grade="veryImportant">
            非常重要按钮
          </rd-button>

          <rd-button
            type="illustration"
            :illustration-url="piliangchuangjian"
            illustration-grade="secondary">
            次要按钮
          </rd-button>
        </span>
      </div>
    </div>
    <div style="margin-bottom: 25px">
      <h3 style="margin-bottom: 15px">纯图标按钮</h3>
      <div style="padding-left: 10px; margin-bottom: 10px">
        <span style="display: inline-block; width: 100px">主要按钮</span>
        <span>
          <rd-button
            type="icon"
            is-selected
            icon="ios-apps-outline"></rd-button>
          <rd-button
            type="icon"
            is-selected
            icon="md-barcode"></rd-button>
          <rd-button
            type="icon"
            icon="ios-chatbubbles"
            icon-size="small"></rd-button>
          <rd-button
            type="icon"
            icon="md-chatboxes"
            icon-size="small"></rd-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import piliangchuangjian from '@exp/routers/imgs/piliangchuangjian.svg'
import createRecommend from '@exp/routers/imgs/create-recommend.svg'
export default {
  data() {
    return {
      createRecommend,
      piliangchuangjian,
      dropDownItems: [
        {
          name: '1',
          label: 'A'
        },
        {
          name: '2',
          label: 'B'
        }
      ]
    }
  },
  methods: {
    onDropdownItemClick(e) {
      alert('您点击了' + e.label + '，对应的值为' + e.name)
    },
    onDropdownPrimaryClick() {
      alert('您点击了主按钮')
    }
  }
}
</script>
