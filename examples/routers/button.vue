<template>
  <div>
    <div class="example">
      <h4>类型: </h4>
      <ry-button>Default</ry-button>
      <ry-button type="primary">Primary</ry-button>
      <ry-button type="dashed">Dashed</ry-button>
      <ry-button type="text">Text</ry-button>
      <ry-button disabled>Disabled</ry-button>
    </div>
    <div class="example">
      <h4>幽灵: </h4>
      <div style="padding: 20px; background: rgb(190, 200, 200);">
        <ry-button ghost>Default</ry-button>
        <ry-button type="primary"
                   ghost>Primary</ry-button>
        <ry-button type="dashed"
                   ghost>Dashed</ry-button>
        <ry-button type="text"
                   ghost>Text</ry-button>
      </div>
    </div>
    <div class="example">
      <h4>尺寸: </h4>
      <div>
        <ry-button size="large">large</ry-button>
        <ry-button>default</ry-button>
        <ry-button size="small">small</ry-button>
        <ry-button size="small"
                   type="text">small</ry-button>
      </div>
    </div>
    <div class="example">
      <h4>长按钮: </h4>
      <div>
        <ry-button long>small</ry-button>
      </div>
    </div>
    <div class="example">
      <!-- <h4>跳转: </h4>
      <div>
        <ry-button to="www.baidu.com"
                   target="_blank">small</ry-button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>