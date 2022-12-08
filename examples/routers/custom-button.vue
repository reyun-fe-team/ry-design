<template>
  <div>
    <div style="margin-bottom: 25px">
      <h3 style="margin-bottom: 15px">常规按钮</h3>
      <div style="margin-bottom: 10px; padding-left: 10px">
        <span style="display: inline-block; width: 100px">主要按钮</span>
        <span>
          <rd-button
            type="primary"
            icon="ios-search"
            :corner-marker="{
              offset: [14, -8],
              placement: 'right-top',
              src: 'http://test2.adsdesk.cn/toutiao-app/static/img/create-recommend.f55345e8.svg'
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
      <div style="margin-bottom: 10px; padding-left: 10px">
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
      <div style="margin-bottom: 10px; padding-left: 10px">
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
              src: 'http://test2.adsdesk.cn/toutiao-app/static/img/create-recommend.f55345e8.svg'
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
      <div style="margin-bottom: 10px; padding-left: 10px">
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
      <div style="margin-bottom: 10px; padding-left: 10px">
        <span style="display: inline-block; width: 100px">主要按钮</span>
        <span>
          <rd-button
            :corner-marker="{
              offset: [14, -8],
              placement: 'right-top',
              src: 'http://test2.adsdesk.cn/toutiao-app/static/img/create-recommend.f55345e8.svg'
            }"
            type="illustration"
            is-drop-down
            :drop-down-items="dropDownItems"
            illustration-url="data:image/png;base64,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">
            正常状态，正常状态
          </rd-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
}
</script>
