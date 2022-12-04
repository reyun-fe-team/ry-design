<template>
  <div>
    <br />
    <p class="group-text">1|页面表格分页：</p>
    <rd-page :total="1500"></rd-page>
    <br />
    <p class="group-text">2、弹框分页(m-large)：</p>
    <rd-page
      type="m-large"
      :total="500"></rd-page>
    <br />
    <p class="group-text">3、弹框分页(m-middle)：</p>
    <rd-page
      type="m-middle"
      :total="500"></rd-page>
    <br />
    <p class="group-text">4、弹框分页(m-small)：</p>
    <rd-page
      type="m-small"
      :total="500"></rd-page>
    <br />
    <p class="group-text">5、可设置localStorageSizeKey可缓存size数据：</p>
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
}
</style>
