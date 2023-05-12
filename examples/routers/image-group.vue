<template>
  <div>
    <rd-image-group
      style="margin: 0 24px 0 0"
      :size="4"
      :data="baseData"
      :width="76"
      :height="44"
      is-cursor
      @on-click="onClick"></rd-image-group>
    <rd-image-group
      style="margin: 0 24px 0 0"
      :size="2"
      :data="baseVideoData"
      type="video"
      :width="76"
      :height="44"
      is-cursor
      :preview-tip-width="16"
      @on-click="onClick"></rd-image-group>

    <h2>横版图片</h2>
    <section style="display: flex">
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="1"
        :data="hengImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="2"
        :data="hengImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="3"
        :data="hengImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="4"
        :data="hengImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="6"
        :data="hengImage"
        :width="256"
        :height="120"></rd-image-group>
    </section>
    <h2 style="margin-top: 24px">竖版图片</h2>
    <section style="display: flex">
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="1"
        :data="shuImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="2"
        :data="shuImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="3"
        position-type="vertical"
        :data="shuImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="4"
        :data="shuImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="6"
        :data="shuImage"
        :width="256"
        :height="120"></rd-image-group>
    </section>
    <h2 style="margin-top: 24px">方形大图</h2>

    <section style="display: flex">
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="1"
        :data="largeSquareImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="2"
        :data="largeSquareImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="3"
        :data="largeSquareImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="4"
        :data="largeSquareImage"
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="6"
        :data="largeSquareImage"
        :width="256"
        :height="120"></rd-image-group>
    </section>

    <h2 style="margin-top: 24px">横版视频</h2>
    <section style="display: flex">
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="1"
        :data="hengVideo"
        type="video"
        preview-tip
        preview
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="2"
        :data="hengVideo"
        type="video"
        preview-tip
        preview
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="3"
        :data="hengVideo"
        type="video"
        preview-tip
        preview
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="4"
        :data="hengVideo"
        type="video"
        preview-tip
        preview
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="6"
        :data="hengVideo"
        type="video"
        preview-tip
        preview
        :width="256"
        :height="120"></rd-image-group>
    </section>
    <h2 style="margin-top: 24px">竖版视频</h2>
    <section style="display: flex">
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="1"
        :data="shuVideo"
        type="video"
        preview-tip
        preview
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="2"
        :data="shuVideo"
        type="video"
        preview-tip
        preview
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="3"
        position-type="vertical"
        :data="shuVideo"
        type="video"
        preview-tip
        preview
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="4"
        :data="shuVideo"
        type="video"
        preview-tip
        preview
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="6"
        :data="shuVideo"
        type="video"
        preview-tip
        preview
        :width="256"
        :height="120"></rd-image-group>
    </section>

    <h2 style="margin-top: 24px">一个视频配一个封面</h2>
    <rd-image-group
      style="margin: 0 0 24px"
      :size="2"
      :data="hengVideoCover"
      :width="216"
      type="video"
      preview-tip
      preview
      open-cover
      :height="120"
      @on-preview-click="onPreviewClick"></rd-image-group>

    <h2 style="margin-top: 24px">整体一个预览ICON</h2>
    <rd-image-group
      style="margin: 0 24px 0 0"
      :size="6"
      preview-group-tip
      type="video"
      :data="hengVideo"
      show-delete
      :width="256"
      :height="120"
      @on-preview-group-click="onPreviewGroupClick"
      @on-delete="onDelete"></rd-image-group>

    <h2 style="margin-top: 24px">修改padding:8px, 自定义padding</h2>
    <rd-image-group
      :styles="{ padding: '8px' }"
      style="margin: 0 24px 0 0"
      :size="1"
      :data="hengImage"
      :width="216"
      :height="120"></rd-image-group>

    <h2 style="margin-top: 24px">background 设置#fff</h2>
    <rd-image-group
      style="margin: 0 0 24px"
      :size="2"
      background="#fff"
      :data="hengVideo"
      :width="216"
      type="video"
      preview-tip
      preview
      open-cover
      :height="120"
      @on-preview-click="onPreviewClick"></rd-image-group>

    <h2 style="margin-top: 24px">角标</h2>
    <section style="display: flex">
      <rd-image-group
        style="margin: 0 24px 0 0"
        :size="1"
        :data="hengVideo"
        type="video"
        video-sign
        :width="216"
        :height="120"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px"
        :size="2"
        :data="hengVideo"
        :width="216"
        type="video"
        video-sign
        open-cover
        :height="120"
        @on-preview-click="onPreviewClick"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px"
        :size="6"
        :data="hengVideo"
        :width="216"
        type="video"
        video-sign
        :height="120"
        @on-preview-click="onPreviewClick"></rd-image-group>
      <rd-image-group
        style="margin: 0 24px"
        :size="6"
        :data="shuVideo"
        :width="216"
        type="video"
        video-sign
        :height="120"
        @on-preview-click="onPreviewClick"></rd-image-group>
    </section>
    <h2 style="margin-top: 24px">选中</h2>
    <Button
      type="primary"
      @click="selectValueChange">
      Primary
    </Button>
    <rd-image-group
      style="margin: 0 24px 0 0"
      :size="1"
      border-hover
      :selected="selectValue === 'open'"
      :data="hengVideo"
      type="video"
      video-sign
      :width="216"
      :height="120"></rd-image-group>

    <Row class="text-center">
      <Col flex="1">
        <rd-image-group
          :size="4"
          :data="hengVideo"
          :width="216"
          :height="120"></rd-image-group>
        <div>有背景色，无圆角，无padding 尺寸</div>
      </Col>
      <Col flex="1">
        <rd-image-group
          :size="1"
          :data="hengVideo"
          background="#fff"
          :width="216"
          :height="120"
          border-hover
          :styles="borderStyles"></rd-image-group>
        <div>无背景色，有圆角，padding：2px</div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borderStyles: {
        borderRadius: '8px',
        borderWidth: '1px',
        borderColor: '#e0e0e8',
        padding: '2px'
      },
      selectValue: 'open',
      baseData: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cee/e93/537/ceee93537cdb0a1836b5acc2a5d9ed49.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cee/e93/537/ceee93537cdb0a1836b5acc2a5d9ed491.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cee/e93/537/ceee93537cdb0a1836b5acc2a5d9ed491.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cee/e93/537/ceee93537cdb0a1836b5acc2a5d9ed491.jpg'
        }
      ],
      baseVideoData: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cee/e93/537/ceee93537cdb0a1836b5acc2a5d9ed49.jpg',
          previewTip: true
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/cee/e93/537/ceee93537cdb0a1836b5acc2a5d9ed491.jpg'
        }
      ],
      // 横版图片
      hengImage: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/096/efc/40a/096efc40a46ae644b3ce89d501fae555-small.jpg'
        }
      ],
      shuImage: [
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
      hengVideo: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129.mp4'
        }
      ],
      hengVideoCover: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9a5/121/52a/9a512152a0991180d3783c7bc14c8129-small.jpg'
        }
      ],
      shuVideo: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/02f/cae/1c0/02fcae1c0dd123cb3273bfef8b5ae514-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/53a/644/fd653a644c0eaa919e6058cd347b17e8.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/02f/cae/1c0/02fcae1c0dd123cb3273bfef8b5ae514-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/53a/644/fd653a644c0eaa919e6058cd347b17e8.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/02f/cae/1c0/02fcae1c0dd123cb3273bfef8b5ae514-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/53a/644/fd653a644c0eaa919e6058cd347b17e8.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/02f/cae/1c0/02fcae1c0dd123cb3273bfef8b5ae514-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/53a/644/fd653a644c0eaa919e6058cd347b17e8.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/02f/cae/1c0/02fcae1c0dd123cb3273bfef8b5ae514-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/53a/644/fd653a644c0eaa919e6058cd347b17e8.mp4'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/02f/cae/1c0/02fcae1c0dd123cb3273bfef8b5ae514-small.jpg',
          previewSrc:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/53a/644/fd653a644c0eaa919e6058cd347b17e8.mp4'
        }
      ],
      largeSquareImage: [
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/f7a/f5d/fd6f7af5dd140f355d40aa8f87ebb3f1-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/f7a/f5d/fd6f7af5dd140f355d40aa8f87ebb3f1-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/f7a/f5d/fd6f7af5dd140f355d40aa8f87ebb3f1-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/f7a/f5d/fd6f7af5dd140f355d40aa8f87ebb3f1-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/f7a/f5d/fd6f7af5dd140f355d40aa8f87ebb3f1-small.jpg'
        },
        {
          src: 'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/fd6/f7a/f5d/fd6f7af5dd140f355d40aa8f87ebb3f1-small.jpg'
        }
      ]
    }
  },
  methods: {
    onPreviewClick(data) {
      this.$Message.info('预览' + data.src)
    },
    onClick(data) {
      this.$Message.info('预览' + data.src)
    },
    onPreviewGroupClick(data) {
      this.$Message.info('预览-group' + data)
    },
    onDelete() {
      this.$Message.info('delete')
    },
    selectValueChange() {
      this.selectValue = this.selectValue === 'open' ? 'close' : 'open'
    }
  }
}
</script>
