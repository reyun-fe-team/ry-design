<template>
  <div>
    <h3>基本</h3>
    <rd-empty></rd-empty>
    <br />
    <div class="border"></div>
    <br />
    <br />

    <h3>选择图片</h3>
    <rd-empty
      not-found-image="simpleImage"
      not-found-content="自定义提示内容"></rd-empty>
    <br />
    <div class="border"></div>
    <br />
    <br />

    <h3>自定义 图片、描述、附属内容</h3>
    <rd-empty
      not-found-content="自定义提示内容"
      not-found-image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      :not-found-image-style="{ width: '100px' }">
      <template #notFoundContent>
        使用插槽
        <a href="/empty">跳转</a>
      </template>
      <template #notFoundFooter><Button type="primary">自定义附属内容</Button></template>
    </rd-empty>
    <br />
    <div class="border"></div>
    <br />
    <br />

    <h3>无描述展示</h3>
    <rd-empty :not-found-content="null"></rd-empty>
    <br />
    <div class="border"></div>
    <br />
    <br />

    <h3>迷你型</h3>
    <rd-empty
      type="small"
      not-found-image="simpleImage"></rd-empty>
    <br />
    <div class="border"></div>
    <br />
    <br />
  </div>
</template>
<style scoped>
.border {
  border: 1px solid red;
}
</style>
