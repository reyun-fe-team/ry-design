<template>
  <div>
    <h2 style="margin-top: 24px">GIF</h2>
    <rd-image
      src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/0e2/6ef/25d/0e26ef25db160b95e8e32e71f5baa759.gif"
      fit="contain"
      width="216px"
      height="120px"
      preview
      preview-tip></rd-image>
    <h2 style="margin-top: 24px">方图</h2>
    <rd-image
      src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/f7a/f5d/fd6f7af5dd140f355d40aa8f87ebb3f1-small.jpg"
      fit="contain"
      :width="100"
      :height="100"></rd-image>
    <h2 style="margin-top: 24px">横版图片</h2>
    <rd-image
      src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg"
      fit="contain"
      :width="216"
      :height="120"></rd-image>
    <h2 style="margin-top: 24px">竖版图片</h2>
    <rd-image
      src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/730/108/76d/73010876da5dfc7870f10a5fc00fd9f6-small.jpg"
      fit="contain"
      :width="216"
      :height="120"></rd-image>
    <h2 style="margin-top: 24px">可通过 fit 来设置图片在容器的样式</h2>
    <div class="display-flex">
      <div
        v-for="fit in fitList"
        :key="fit"
        style="margin-right: 24px"
        class="text-center">
        <rd-image
          :src="url"
          :fit="fit"
          width="100px"
          height="100px"
          :alt="fit" />
        <div>{{ fit }}</div>
      </div>
    </div>
    preview-tip preview
    <h2 style="margin-top: 24px">可通过 slot: placeholder 自定义加载时的占位内容。</h2>
    <Row
      :gutter="24"
      class="demo-image-bg">
      <Col flex="1">
        <rd-image
          width="216px"
          height="120px"
          src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg" />
      </Col>
      <Col flex="1">
        <button @click="placeholderChange">点击</button>
        <rd-image
          :key="showLoading"
          width="216px"
          height="120px"
          src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg"></rd-image>
      </Col>
      <Col flex="1">
        <rd-image
          :key="showLoading"
          width="216px"
          height="120px"
          src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg">
          <template #placeholder>加载中-自定义</template>
        </rd-image>
      </Col>
    </Row>
    <h2 style="margin-top: 24px">可通过 slot: placeholder 自定义加载时的占位内容。</h2>
    <Row
      class="demo-image-bg"
      :gutter="24">
      <Col flex="1">
        <rd-image
          width="200px"
          height="100px" />
        默认
      </Col>
      <Col flex="1">
        <rd-image
          width="200px"
          height="100px">
          <template #error>
            <Icon
              type="ios-image-outline"
              size="24"
              color="#ccc" />
          </template>
        </rd-image>
        自定义
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fitList: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://file.iviewui.com/images/image-demo-11.jpg',
      showLoading: 0
    }
  },
  methods: {
    showImagePreview1() {
      this.$ImagePreview.show({
        previewList: this.gifImage
      })
    },
    showImagePreview2() {
      this.$ImagePreview.show({
        previewList: this.srcList2,
        initialIndex: 2
      })
    },
    onPreviewClick(data) {
      this.$Message.info('预览' + data.src)
    },
    onPreviewGroupClick(data) {
      this.$Message.info('预览-group' + data)
    },
    onDelete() {
      this.$Message.info('delete')
    },
    placeholderChange() {
      this.showLoading = Math.random() * 100
    }
  }
}
</script>
<style lang="less">
.demo-image-bg .rd-image {
  background: #f8f8f9;
}
</style>
