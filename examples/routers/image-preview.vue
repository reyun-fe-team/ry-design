<template>
  <div>
    <Button v-tooltip="tooltipOptions">测试v-tooltip</Button>
    <Button @click="show = true">预览视频</Button>
    <Button @click="showImg = true">预览图片</Button>
    <rd-image-preview
      v-model="show"
      type="VIDEO"
      :src="src"></rd-image-preview>
    <rd-image-preview
      v-model="showImg"
      type="IMAGE"
      :src="imgSrc"></rd-image-preview>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tooltipOptions: {
        content:
          'Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.',
        maxWidth: '200',
        contentRender: (h, opt) => {
          return h('span', { style: 'color: red' }, opt.content)
        }
      },
      show: false,
      showImg: false,
      imgSrc:
        'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/handle/video/2022/12/20/92b2bf3716e7cb976e94962cdc81eb4f.jpg',
      src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/handle/video/2022/12/20/92b2bf3716e7cb976e94962cdc81eb4f.mp4'
    }
  }
}
</script>
