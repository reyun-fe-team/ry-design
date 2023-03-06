<template>
  <div>
    <rd-image-group
      style="margin: 24px 0"
      :size="2"
      :data="urlList"
      :width="216"
      :height="120"></rd-image-group>
    <!-- <rd-image-group
      style="margin: 24px 0"
      :size="3"
      :data="urlList"
      :width="216"
      :height="120"></rd-image-group> -->
    <rd-image-group
      style="margin: 24px 0"
      :size="4"
      :data="urlList"
      :width="216"
      :height="120"></rd-image-group>
    <rd-image-group
      style="margin: 24px 0"
      :size="6"
      :data="urlList"
      :width="216"
      :height="120"></rd-image-group>
    <hr />
    <!-- <rd-image
      :src="urlList[0]"
      :fit="fit"
      width="100"
      height="100"
      preview
      scroll-container=".demo-image"
      :alt="fit"></rd-image> -->
    横版
    <div class="demo-image">
      <div style="width: 72px; height: 40px">
        <div
          v-for="(fit, index) in fitList"
          :key="index"
          class="demo-image-item">
          <rd-image
            :src="url"
            :fit="fit"
            :preview-list="srcList"
            :width="100"
            :height="100"
            preview
            scroll-container=".demo-rd-image"
            :alt="fit">
            <template #placeholder>
              <Spin
                size="large"
                fix />
            </template>
            <!-- <template #error>
						<div>失败</div>
					</template> -->
          </rd-image>
          <p>{{ fit }}</p>
        </div>
      </div>
    </div>
    竖版
    <div class="demo-image">
      <div style="width: 1000px; height: 300px">
        <div
          v-for="(fit, index) in fitList"
          :key="index"
          class="demo-image-item">
          <rd-image
            :src="urlshuban"
            :fit="fit"
            :preview-list="srcList"
            :width="100"
            :height="100"
            preview
            scroll-container=".demo-rd-image"
            :alt="fit">
            <template #placeholder>
              <Spin
                size="large"
                fix />
            </template>
            <!-- <template #error>
						<div>失败</div>
					</template> -->
          </rd-image>
          <p>{{ fit }}</p>
        </div>
      </div>
    </div>
    gif
    <div class="demo-image">
      <div style="width: 1000px; height: 300px">
        <div
          v-for="(fit, index) in fitList"
          :key="index"
          class="demo-image-item">
          <rd-image
            src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/0e2/6ef/25d/0e26ef25db160b95e8e32e71f5baa759.gif"
            :fit="fit"
            :preview-list="srcList"
            :width="100"
            :height="100"
            preview
            scroll-container=".demo-rd-image"
            :alt="fit">
            <template #placeholder>
              <Spin
                size="large"
                fix />
            </template>
          </rd-image>
          <p>{{ fit }}</p>
        </div>
      </div>
    </div>
    方图
    <div class="demo-image">
      <div style="width: 1000px; height: 300px">
        <div
          v-for="(fit, index) in fitList"
          :key="index"
          class="demo-image-item">
          <rd-image
            src="https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/911/d51/ed6/911d51ed6d12b173a166635d24989df4-small.jpg"
            :fit="fit"
            :preview-list="srcList"
            :width="100"
            :height="100"
            preview
            scroll-container=".demo-rd-image"
            :alt="fit">
            <template #placeholder>
              <Spin
                size="large"
                fix />
            </template>
            <!-- <template #error>
						<div>失败</div>
					</template> -->
          </rd-image>
          <p>{{ fit }}</p>
        </div>
      </div>
    </div>
    <!-- <h2 style="margin-top: 40px">竖向LazyLoad</h2>
    <div
      class="demo-image2"
      style="width: 300px; height: 200px; overflow: hidden; overflow-y: scroll">
      <div>
        <div
          v-for="(url, index) in urlList"
          :key="index"
          class="demo-image-item"
          style="float: none">
          <rd-image
            style="width: 100px; height: 100px"
            :src="url"
            fit="fill"
            :lazy="true"
            :infinite="false"
            preview
            alt="fill">
            <template #placeholder>
              <Spin
                size="large"
                fix />
            </template>
          </rd-image>
        </div>
      </div>
    </div>
    <h2 style="margin-top: 40px">横向LazyLoad</h2>
    <div
      class="demo-image3"
      style="width: 300px; height: 200px; overflow: hidden; overflow-x: scroll">
      <div style="width: 1000px; height: 300px">
        <div
          v-for="(url, index) in urlList"
          :key="index"
          class="demo-image-item"
          style="float: left">
          <rd-image
            style="width: 100px; height: 100px"
            :src="url"
            fit="fill"
            :lazy="true"
            :infinite="true"
            :initial-index="index"
            preview
            scroll-container=".demo-image3"
            :alt="url">
            <template #placeholder>
              <Spin
                size="large"
                fix />
            </template>
          </rd-image>
        </div>
      </div>
    </div> -->

    <!-- <rd-imagePreview
    v-model="showPreview"
    :preview-list="srcList"
    :infinite="false"
    :toolbar="[
      'zoomOut',
      'original',
      'rotateRight',
      'rotateLeft',
      'zoomIn',
      'download'
    ]"></rd-imagePreview> -->

    <!-- <Button
      type="primary"
      @click="showPreview = !showPreview">
      Switch Preview
    </Button>

    <Button @click="showImagePreview1">$ImagePreview1</Button>
    <Button @click="showImagePreview2">$ImagePreview2</Button> -->
  </div>
</template>

<script>
const fitList = ['fill', 'contain', 'cover', 'none', 'scale-down']
// const fitList = ['fill']
// const fitList = ['fill']
export default {
  data() {
    return {
      // 横版图片
      urlList: [
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/b26/620/bc4/b26620bc4875aa139ede4421a109707e-small.jpg',
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/1d3/06c/7af/1d306c7afd6243687172409fec4b43e5-small.jpg',
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/8a1/67f/1fa/8a167f1fae164d685578b96a76130ec3-small.jpg',
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cover/2022/11/9/77068a83cdc7819866842f6e197cf837_0-small.jpg',
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cover/2022/11/4/fc86f3f7e50f7d6229469f3cfcfa99c4_0-small.jpg',
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/10025/image/2023/01/06/202301061741498632-small.jpg',
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/c70/72b/d8f/c7072bd8fa42104a5a9dabfb1c080649-small.jpg',
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/1e9/389/1a8/1e93891a80c42eb5c4efe5ac1d98ca90-small.jpg'
      ],
      fitList,
      url: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/1d3/06c/7af/1d306c7afd6243687172409fec4b43e5-small.jpg',
      urlshuban:
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/119/636/a33/119636a330213818bf16362274d39da2-small.jpg',
      showPreview: false,
      srcList: [
        'https://dev-file.iviewui.com/ll7neXYI7fzKv1SjjOl77vpfkDbJpbDB/large',
        'https://dev-file.iviewui.com/ASzUrSpwJHqOi2G2jWzsVJyDV1ZF6xnK/large',
        'https://file.iviewui.com/DSCF6873.JPG',
        'https://dev-file.iviewui.com/YSUjM5Fx7mOjsijiI3eVDuaHGqnmT7H8/large'
      ],
      srcList2: [
        'https://file.iviewui.com/DSCF6873.JPG',
        'https://dev-file.iviewui.com/ll7neXYI7fzKv1SjjOl77vpfkDbJpbDB/large',
        'https://dev-file.iviewui.com/ASzUrSpwJHqOi2G2jWzsVJyDV1ZF6xnK/large',
        'https://dev-file.iviewui.com/YSUjM5Fx7mOjsijiI3eVDuaHGqnmT7H8/large'
      ]
    }
  },
  methods: {
    showImagePreview1() {
      this.$ImagePreview.show({
        previewList: this.srcList
      })
    },
    showImagePreview2() {
      this.$ImagePreview.show({
        previewList: this.srcList2,
        initialIndex: 2
      })
    }
  }
}
</script>
<style lang="less">
.demo-image {
  &-item {
    width: 100px;
    height: 100px;
    float: left;
    margin: 10px;
    text-align: center;

    .ivu-image {
      background: #ccc;
    }

    p {
      margin-top: 5px;
      text-align: center;
    }
  }
}
</style>
