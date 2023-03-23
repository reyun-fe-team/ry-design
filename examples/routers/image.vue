<template>
  <div>
    <h2>横版视频</h2>
    <section style="display: flex">
      <rd-material-group
        :padding="16"
        style="margin: 24px 24px 0 0"
        :size="1"
        :data="urlList"
        :width="216"
        :height="120"></rd-material-group>
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="2"
        :data="urlList"
        :width="216"
        :height="120"></rd-material-group>
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="3"
        :data="urlList"
        :width="216"
        :height="120"></rd-material-group>
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="4"
        :data="urlList"
        :width="216"
        :height="120"></rd-material-group>
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="6"
        :data="urlList"
        :width="256"
        :height="120"></rd-material-group>
    </section>
    <h2>竖版视频</h2>
    <section style="display: flex">
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="1"
        :data="shuList"
        :width="216"
        :height="120"></rd-material-group>
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="2"
        :data="shuList"
        :width="216"
        :height="120"></rd-material-group>
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="3"
        position-type="vertical"
        :data="shuList"
        :width="216"
        :height="120"></rd-material-group>
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="4"
        :data="shuList"
        :width="216"
        :height="120"></rd-material-group>
      <rd-material-group
        style="margin: 24px 24px 0 0"
        :size="6"
        :data="shuList"
        :width="256"
        :height="120"></rd-material-group>
    </section>

    <h2>一个视频-封面无icon</h2>
    <rd-material-group
      style="margin: 24px 24px 0 0"
      :padding="6"
      :size="2"
      :data="oneVideoUrlList"
      :width="216"
      type="video"
      preview-tip
      open-cover
      :height="120"
      @on-preview-click="onPreviewClick"></rd-material-group>
    <h2>两个视频-有icon</h2>
    <rd-material-group
      style="margin: 24px 24px 0 0"
      :size="2"
      type="video"
      :data="oneVideoUrlList"
      :width="216"
      preview-tip
      :height="120"
      @on-preview-click="onPreviewClick"></rd-material-group>

    <hr style="margin-top: 24px" />
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
  </div>
</template>

<script>
const fitList = ['fill', 'contain', 'cover', 'none', 'scale-down']
// const fitList = ['fill']
// const fitList = ['fill']
export default {
  data() {
    return {
      oneVideoUrlList: [
        {
          s3Url:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/8a1/67f/1fa/8a167f1fae164d685578b96a76130ec3.mp4',
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/1d3/06c/7af/1d306c7afd6243687172409fec4b43e5-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/8a1/67f/1fa/8a167f1fae164d685578b96a76130ec3-small.jpg'
        }
      ],
      // 横版图片
      urlList: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/282/adb/1c9/282adb1c9b89cb2ec8d7384ca0cabba4-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/1d3/06c/7af/1d306c7afd6243687172409fec4b43e5-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/8a1/67f/1fa/8a167f1fae164d685578b96a76130ec3-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cover/2022/11/9/77068a83cdc7819866842f6e197cf837_0-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cover/2022/11/4/fc86f3f7e50f7d6229469f3cfcfa99c4_0-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/10025/image/2023/01/06/202301061741498632-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/c70/72b/d8f/c7072bd8fa42104a5a9dabfb1c080649-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/1e9/389/1a8/1e93891a80c42eb5c4efe5ac1d98ca90-small.jpg'
        }
      ],
      shuList: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/730/108/76d/73010876da5dfc7870f10a5fc00fd9f6-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/730/108/76d/73010876da5dfc7870f10a5fc00fd9f6-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/730/108/76d/73010876da5dfc7870f10a5fc00fd9f6-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/730/108/76d/73010876da5dfc7870f10a5fc00fd9f6-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/730/108/76d/73010876da5dfc7870f10a5fc00fd9f6-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/730/108/76d/73010876da5dfc7870f10a5fc00fd9f6-small.jpg'
        }
      ],
      fitList,
      url: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/1d3/06c/7af/1d306c7afd6243687172409fec4b43e5-small.jpg',
      urlshuban:
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/119/636/a33/119636a330213818bf16362274d39da2-small.jpg',
      showPreview: false,
      srcList: [
        { src: 'https://dev-file.iviewui.com/ll7neXYI7fzKv1SjjOl77vpfkDbJpbDB/large' },
        { src: 'https://dev-file.iviewui.com/ASzUrSpwJHqOi2G2jWzsVJyDV1ZF6xnK/large' },
        { src: 'https://file.iviewui.com/DSCF6873.JPG' },
        { src: 'https://dev-file.iviewui.com/YSUjM5Fx7mOjsijiI3eVDuaHGqnmT7H8/large' }
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
    },
    onPreviewClick(data) {
      this.$Message.info('预览' + data.src)
    }
  }
}
</script>
<style lang="less">
.demo-image {
  &-item {
    float: left;
    width: 100px;
    height: 100px;
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
