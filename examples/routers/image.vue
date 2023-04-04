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
    <h2 style="margin-top: 24px">占位\自定义加载时的占位内容。</h2>
    <div class="demo-image-bg display-flex">
      <rd-image
        width="216px"
        height="120px"
        fit="contain"
        style="margin-right: 24px"
        src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg" />
      <button
        style="margin-right: 24px"
        @click="placeholderChange">
        点击
      </button>
      <rd-image
        :key="showLoading"
        width="216px"
        height="120px"
        fit="contain"
        style="margin-right: 24px"
        src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg"></rd-image>
      <rd-image
        :key="showLoading + 1"
        width="216px"
        height="120px"
        fit="contain"
        src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg">
        <template #placeholder>加载中-自定义</template>
      </rd-image>
    </div>
    <h2 style="margin-top: 24px">图片加载失败</h2>
    <div class="demo-image-bg display-flex">
      默认
      <rd-image
        width="200px"
        fit="contain"
        height="100px" />
      自定义
      <rd-image
        width="200px"
        fit="contain"
        height="100px"
        src="">
        <template #error>失败 slot</template>
      </rd-image>
    </div>
    <h2 style="margin-top: 24px">图片预览</h2>
    <rd-image
      width="216px"
      preview
      fit="contain"
      preview-tip
      height="120px"
      src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg"></rd-image>
    <h2 style="margin-top: 24px">懒加载-横向</h2>
    <div class="demo-image-lazy-vertical">
      <rd-image
        v-for="(url, index) in verticalUrlList"
        :key="index"
        fit="contain"
        :src="url"
        lazy />
    </div>
    <h2 style="margin-top: 24px">懒加载-竖向</h2>
    <div class="demo-image-lazy">
      <div class="demo-image-lazy-inner">
        <rd-image
          v-for="(url, index) in urlList"
          :key="index"
          fit="contain"
          :width="300"
          :height="200"
          :src="url"
          lazy />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fitList: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://file.iviewui.com/images/image-demo-11.jpg',
      showLoading: 0,
      verticalUrlList: [
        'https://file.iviewui.com/images/image-demo-1.jpg',
        'https://file.iviewui.com/images/image-demo-2.jpg',
        'https://file.iviewui.com/images/image-demo-3.jpg',
        'https://file.iviewui.com/images/image-demo-4.jpg',
        'https://file.iviewui.com/images/image-demo-5.jpg',
        'https://file.iviewui.com/images/image-demo-6.jpg',
        'https://file.iviewui.com/images/image-demo-7.jpg',
        'https://file.iviewui.com/images/image-demo-8.jpg',
        'https://file.iviewui.com/images/image-demo-9.jpg',
        'https://file.iviewui.com/images/image-demo-10.jpg'
      ],
      urlList: [
        'https://file.iviewui.com/images/image-demo-11.jpg',
        'https://file.iviewui.com/images/image-demo-12.jpg',
        'https://file.iviewui.com/images/image-demo-13.jpg',
        'https://file.iviewui.com/images/image-demo-14.jpg',
        'https://file.iviewui.com/images/image-demo-15.jpg',
        'https://file.iviewui.com/images/image-demo-16.jpg',
        'https://file.iviewui.com/images/image-demo-17.jpg',
        'https://file.iviewui.com/images/image-demo-18.jpg',
        'https://file.iviewui.com/images/image-demo-19.jpg',
        'https://file.iviewui.com/images/image-demo-20.jpg'
      ]
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

.demo-image-lazy-vertical {
  width: 800px;
  height: 400px;
  overflow-y: auto;
}

.demo-image-lazy-vertical .rd-image {
  display: block;
  min-height: 200px;
}

.demo-image-lazy {
  width: 400px;
  height: 200px;
  overflow: hidden;
  overflow-x: scroll;
}

.demo-image-lazy-inner {
  width: 3000px;
  height: 200px;
}

.demo-image-lazy .rd-image {
  float: left;
}
</style>
