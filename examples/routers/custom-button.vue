<template>
  <div>
    <div style="margin-bottom: 25px">
      <h3 style="margin-bottom: 15px">常规按钮</h3>
      <div style="margin-bottom: 10px; padding-left: 10px">
        <span style="display: inline-block; width: 100px">主要按钮</span>
        <span>
          <rd-button
            type="primary"
            icon="ios-search">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
