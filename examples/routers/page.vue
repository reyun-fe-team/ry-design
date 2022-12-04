<template>
  <div>
    <br />
    <p class="group-text">
      1、页面表格分页：
      <span>应用场景：适用于页面的表格底部。</span>
    </p>
    <rd-page :total="1500"></rd-page>
    <br />
    <p class="group-text">
      2、弹框分页(m-large)：
      <span>应用场景：适用于弹窗大区域的表格底部。</span>
    </p>
    <rd-page
      type="m-large"
      :total="500"></rd-page>
    <br />
    <p class="group-text">
      3、弹框分页(m-middle)：
      <span>应用场景：适用于弹窗小区域的表格底部。</span>
    </p>
    <rd-page
      type="m-middle"
      :total="500"></rd-page>
    <br />
    <p class="group-text">
      4、弹框分页(m-small)：
      <span>应用场景：适用于弹窗极小区域的表格底部。</span>
    </p>
    <rd-page
      type="m-small"
      :total="500"></rd-page>
    <br />
    <p class="group-text">
      5、分页localStorageSizeKey参数：
      <span>应用场景：适用于记录最后一次size数据。</span>
    </p>
    <rd-page
      type="m-small"
      local-storage-size-key="m-small"
      :total="500"></rd-page>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.group-text {
  font-weight: bold;
  span {
    color: gray;
    font-size: 12px !important;
  }
}
</style>
