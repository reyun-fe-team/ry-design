<template>
  <div>
    <Button @click="handleImageClick">展示Iamge预览</Button>
    <Button @click="handleVideoClick">展示Video预览</Button>
    <rd-carousel-previewer
      v-model="visibleImage"
      type="IMAGE"
      :data="imageData"
      thumbnail-key="previewUrl"
      audio-url="https://dl.stream.qqmusic.qq.com/RS02061u18bu37wpHO.mp3?guid=6897187216&vkey=43045C29DD863381E60F8D833370717632A63FC3AC0A6D04A9F468B1A40637EEA9BDE30A18407AC86C664047FDAFAF810499486B85AA6BC9&uin=&fromtag=120052"
      :current="currentImage"
      @on-close="handleImageClose"></rd-carousel-previewer>
    <br />
    <rd-carousel-previewer
      v-model="visibleVideo"
      type="VIDEO"
      :data="videoData"
      thumbnail-key="previewUrl"
      audio-url="https://dl.stream.qqmusic.qq.com/RS02061u18bu37wpHO.mp3?guid=6897187216&vkey=43045C29DD863381E60F8D833370717632A63FC3AC0A6D04A9F468B1A40637EEA9BDE30A18407AC86C664047FDAFAF810499486B85AA6BC9&uin=&fromtag=120052"
      @on-close="handleVideoClose"></rd-carousel-previewer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visibleImage: false,
      visibleVideo: false,
      imageData: [
        {
          uuid: 'a2e0f7a7ad',
          fileName: '1280*720',
          direction: 'h',
          localId: '2554653',
          s3Url: 'tos_oss/ed2e/00b9/c692/ed2e00b9c6926da896cb5d3e07a5a775.png',
          fileWidth: 1280,
          fileHeight: 720,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/ed2e/00b9/c692/ed2e00b9c6926da896cb5d3e07a5a775.png',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: 'd5e170ecac',
          fileName: '5',
          direction: 'h',
          localId: '2554628',
          s3Url: '2d0/fa8/752/2d0fa875213fa4839106ef62f809d4e5.jpg',
          fileWidth: 1280,
          fileHeight: 815,
          previewUrl:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/2d0/fa8/752/2d0fa875213fa4839106ef62f809d4e5.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.57
        },
        {
          uuid: '4ce8c8a931',
          fileName: '4',
          direction: 'h',
          localId: '2554624',
          s3Url: '9fa/03d/088/9fa03d088bac5bad4a4d9eea638b4b91.jpg',
          fileWidth: 1280,
          fileHeight: 854,
          previewUrl:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/9fa/03d/088/9fa03d088bac5bad4a4d9eea638b4b91.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.5
        },
        {
          uuid: 'e44c4a0ee3',
          fileName: '1',
          direction: 'h',
          localId: '2554627',
          s3Url: '674/2fa/18f/6742fa18f717b52831d9ee97678b9cd9.jpg',
          fileWidth: 650,
          fileHeight: 432,
          previewUrl:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/674/2fa/18f/6742fa18f717b52831d9ee97678b9cd9.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.5
        },
        {
          uuid: 'd2f4c8f255',
          fileName: 'wallhaven-4y6lol',
          direction: 'h',
          localId: '2554625',
          s3Url: '598/c5b/d9e/598c5bd9e4b6b37ccd077e2ea3420e1d.png',
          fileWidth: 1280,
          fileHeight: 1024,
          previewUrl:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/598/c5b/d9e/598c5bd9e4b6b37ccd077e2ea3420e1d.png',
          fileThumbnailUrl: '',
          fileRange: 1.25
        },
        {
          uuid: '1cd6700225',
          fileName: 'c305593bb11cf28148fb65fe0489e747',
          direction: 'h',
          localId: '2553541',
          s3Url: 'tos_oss/a8a8/8e18/be56/a8a88e18be5663ce78528f75fc110c46.jpeg',
          fileWidth: 800,
          fileHeight: 500,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/a8a8/8e18/be56/a8a88e18be5663ce78528f75fc110c46.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: 'fda45088c0',
          fileName: 'c39fc12be439bd95a5d9172de0d4e14b-small',
          direction: 'h',
          localId: '2553546',
          s3Url: 'tos_oss/14b3/f9f3/109e/14b3f9f3109eb3f460593b49fa2f15bd.jpg',
          fileWidth: 640,
          fileHeight: 400,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/14b3/f9f3/109e/14b3f9f3109eb3f460593b49fa2f15bd.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: 'db595beafc',
          fileName: 'e225e68405a25ae2cf6be041dd5b655b-small',
          direction: 'h',
          localId: '2553547',
          s3Url: 'tos_oss/65ca/513f/f187/65ca513ff18723c139b2036b75f74a80.jpg',
          fileWidth: 640,
          fileHeight: 400,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/65ca/513f/f187/65ca513ff18723c139b2036b75f74a80.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: '23c3df895d',
          fileName: '7c0218d596cdf1d3cd8b663c9af24aa7',
          direction: 'h',
          localId: '2553538',
          s3Url: 'tos_oss/bc87/f9c2/c761/bc87f9c2c76125ce3060d670f4cd8d01.jpeg',
          fileWidth: 800,
          fileHeight: 500,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/bc87/f9c2/c761/bc87f9c2c76125ce3060d670f4cd8d01.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: '00b19ee40f',
          fileName: 'd8ccf5e940b9abe1a4025430eb56fb43',
          direction: 'h',
          localId: '2553537',
          s3Url: 'tos_oss/b54b/013f/faa8/b54b013ffaa8a8575fbbd6a823987c67.jpg',
          fileWidth: 1440,
          fileHeight: 900,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/b54b/013f/faa8/b54b013ffaa8a8575fbbd6a823987c67.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: '8b6360245c',
          fileName: '测试ADA_1',
          direction: 's',
          localId: '2553534',
          s3Url: 'a9f/06e/822/a9f06e8229e42c2d2790c8dca12ae326.jpeg',
          fileWidth: 1080,
          fileHeight: 1920,
          previewUrl:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/a9f/06e/822/a9f06e8229e42c2d2790c8dca12ae326.jpeg',
          fileThumbnailUrl: '',
          fileRange: 0.56
        },
        {
          uuid: '759b7c4c33',
          fileName: 'b55eb2bd067eed1c266d5230fc891d04',
          direction: 'h',
          localId: '2553533',
          s3Url: 'tos_oss/45bb/76d3/c5a4/45bb76d3c5a45fab4ab72641b781a68d.jpeg',
          fileWidth: 800,
          fileHeight: 500,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/45bb/76d3/c5a4/45bb76d3c5a45fab4ab72641b781a68d.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: '9a034b8baa',
          fileName: '967966fe5fa8090237d401e013a2ba34',
          direction: 'h',
          localId: '2553531',
          s3Url: 'tos_oss/1262/561e/32db/1262561e32dbc07293f01ed55d1694bb.jpeg',
          fileWidth: 1440,
          fileHeight: 900,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/1262/561e/32db/1262561e32dbc07293f01ed55d1694bb.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: 'e4775ed001',
          fileName: 'a2ae6afd746a6c56d4e49fe77ba9f0e5',
          direction: 'h',
          localId: '2553532',
          s3Url: 'tos_oss/c00f/6bd7/1d6a/c00f6bd71d6a4a40512dbbe2d3fce426.jpeg',
          fileWidth: 800,
          fileHeight: 500,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/c00f/6bd7/1d6a/c00f6bd71d6a4a40512dbbe2d3fce426.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: '230e416460',
          fileName: 'f8608bed6e67b450474efb60bc02fe72',
          direction: 'h',
          localId: '2553530',
          s3Url: 'tos_oss/3a6d/ef55/11e0/3a6def5511e0db234c5f8bce47b99114.jpg',
          fileWidth: 1440,
          fileHeight: 900,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/3a6d/ef55/11e0/3a6def5511e0db234c5f8bce47b99114.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: '6e9979910c',
          fileName: '70bc99bc568f5f9535c3baa9a5f936d0',
          direction: 'h',
          localId: '2553528',
          s3Url: 'tos_oss/a8be/d418/8bcf/a8bed4188bcfda11b0bbcac9a18423f0.jpeg',
          fileWidth: 800,
          fileHeight: 500,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/a8be/d418/8bcf/a8bed4188bcfda11b0bbcac9a18423f0.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: 'c82bd27e58',
          fileName: '45be1afeee94656fe012c91e5c4723a8',
          direction: 's',
          localId: '2553522',
          s3Url: 'tos_oss/75f9/b816/4169/75f9b8164169d1832d00cce8e23d51c4.jpeg',
          fileWidth: 1080,
          fileHeight: 1920,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/75f9/b816/4169/75f9b8164169d1832d00cce8e23d51c4.jpeg',
          fileThumbnailUrl: '',
          fileRange: 0.56
        },
        {
          uuid: 'ebd1715daa',
          fileName: '614fd72d26257424a797a67cd0c9f827',
          direction: 'h',
          localId: '2376801',
          s3Url: 'tos_oss/6604/f264/20a8/6604f26420a8c13c9df8c045754a5abd.jpeg',
          fileWidth: 500,
          fileHeight: 313,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/6604/f264/20a8/6604f26420a8c13c9df8c045754a5abd.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: 'b5a726b28b',
          fileName: '6dad9556fb8c8f37602e3a47a3cfe5c1',
          direction: 's',
          localId: '2376798',
          s3Url: 'tos_oss/e107/b778/c992/e107b778c9921657256737d69fc4dba5.jpeg',
          fileWidth: 720,
          fileHeight: 1280,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/e107/b778/c992/e107b778c9921657256737d69fc4dba5.jpeg',
          fileThumbnailUrl: '',
          fileRange: 0.56
        },
        {
          uuid: '2c498f1b7d',
          fileName: '70d4b02ef555f98d78585f73f98f53d4',
          direction: 'h',
          localId: '2376797',
          s3Url: 'tos_oss/1000/0981/1c3c/100009811c3cdcaba1ab9bca11a595c1.jpeg',
          fileWidth: 1280,
          fileHeight: 720,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/1000/0981/1c3c/100009811c3cdcaba1ab9bca11a595c1.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: '48f301df9a',
          fileName: '43e8d5f76dcd1342f41decaa41d5a308',
          direction: 'h',
          localId: '2376795',
          s3Url: 'tos_oss/c26b/aa0d/2a44/c26baa0d2a440d246280168ae043cadd.jpeg',
          fileWidth: 1280,
          fileHeight: 720,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/c26b/aa0d/2a44/c26baa0d2a440d246280168ae043cadd.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: '18072dcbc8',
          fileName: '1096b9d5718aee9c0c35f5231e68e064',
          direction: 's',
          localId: '2376777',
          s3Url: 'tos_oss/6580/15a5/9d0f/658015a59d0f98b3bbdfc08a03c42783.jpeg',
          fileWidth: 1080,
          fileHeight: 1920,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/6580/15a5/9d0f/658015a59d0f98b3bbdfc08a03c42783.jpeg',
          fileThumbnailUrl: '',
          fileRange: 0.56
        },
        {
          uuid: 'df81316e94',
          fileName: '92e00437f231dd4f2d94455ef61b2aaa',
          direction: 'h',
          localId: '2376625',
          s3Url: 'tos_oss/efe2/d9ff/c5ef/efe2d9ffc5ef437f1f5a5e46fd328de4.jpg',
          fileWidth: 370,
          fileHeight: 245,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/efe2/d9ff/c5ef/efe2d9ffc5ef437f1f5a5e46fd328de4.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.51
        },
        {
          uuid: 'cacb98e359',
          fileName: 'e4ddd80e083b4f3bf331cee00e93439c',
          direction: 'h',
          localId: '2376624',
          s3Url: 'tos_oss/750f/d842/9304/750fd84293042d58d4096fb564e49489.jpeg',
          fileWidth: 1140,
          fileHeight: 640,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/750f/d842/9304/750fd84293042d58d4096fb564e49489.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: 'd9720fad51',
          fileName: 'a3db0d9bd4d06ed1a3f283ba8dea72e1',
          direction: 'h',
          localId: '2376623',
          s3Url: 'tos_oss/f276/e896/c030/f276e896c030a1ea59cf1ddae36947ca.jpeg',
          fileWidth: 1280,
          fileHeight: 720,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/f276/e896/c030/f276e896c030a1ea59cf1ddae36947ca.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: 'ea84c2d357',
          fileName: '5ae69aa285b39ecf55b6038bdba00256',
          direction: 'h',
          localId: '2375115',
          s3Url: 'tos_oss/35c3/a303/0d36/35c3a3030d36a81a8d64d4a4d4527333.jpg',
          fileWidth: 1280,
          fileHeight: 720,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/35c3/a303/0d36/35c3a3030d36a81a8d64d4a4d4527333.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: '148ec3a409',
          fileName: 'bf5846d32f426ffbc269ec8a36f7baad',
          direction: 's',
          localId: '2375096',
          s3Url: 'tos_oss/83ec/2aaa/d4a7/83ec2aaad4a7f258ae2d1c771d44c587.jpeg',
          fileWidth: 360,
          fileHeight: 640,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/83ec/2aaa/d4a7/83ec2aaad4a7f258ae2d1c771d44c587.jpeg',
          fileThumbnailUrl: '',
          fileRange: 0.56
        },
        {
          uuid: '2c665bc0c7',
          fileName: '1600x1000',
          direction: 'h',
          localId: '2375083',
          s3Url: 'tos_oss/9df5/2858/31bb/9df5285831bbd35fb97a2097b84e39bf.jpeg',
          fileWidth: 1600,
          fileHeight: 1000,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/9df5/2858/31bb/9df5285831bbd35fb97a2097b84e39bf.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: '4e18056129',
          fileName: '1140x640',
          direction: 'h',
          localId: '2375080',
          s3Url: 'tos_oss/69c2/c6b4/6d1d/69c2c6b46d1d9cdd123f166de71daeab.jpg',
          fileWidth: 1140,
          fileHeight: 640,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/69c2/c6b4/6d1d/69c2c6b46d1d9cdd123f166de71daeab.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: '12a5779a98',
          fileName: '2de3a3a47e4bb25f033e6590b6a5feae',
          direction: 'h',
          localId: '2374659',
          s3Url: 'tos_oss/2bd1/28d9/dc86/2bd128d9dc86715f469095c6c03ca128.jpg',
          fileWidth: 1280,
          fileHeight: 720,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/2bd1/28d9/dc86/2bd128d9dc86715f469095c6c03ca128.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: 'bc2be7e248',
          fileName: 'cc948f2907510deaaae08ee02db16f1a',
          direction: 'h',
          localId: '2553529',
          s3Url: 'tos_oss/69df/8c18/038f/69df8c18038fc28643a8d1cc54e56e29.jpeg',
          fileWidth: 800,
          fileHeight: 500,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/69df/8c18/038f/69df8c18038fc28643a8d1cc54e56e29.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1.6,
          thumbnail:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/4edd/8e50/74ee/4edd8e5074ee37cadbe814ab6e9e4e91.png'
        },
        {
          uuid: '86df78b4bd',
          fileName: 'dbaa1f947c4b4b222cc7363647bab9a3',
          direction: 'h',
          localId: '2554619',
          s3Url: 'tos_oss/1b36/e414/5998/1b36e41459983c5c5f17782488ff25fe.jpeg',
          fileWidth: 800,
          fileHeight: 800,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/1b36/e414/5998/1b36e41459983c5c5f17782488ff25fe.jpeg',
          fileThumbnailUrl: '',
          fileRange: 1
        },
        {
          uuid: '73364943a4',
          fileName: 'acb7e27e-8f3f-452c-a261-caafafddfab0',
          direction: 'h',
          localId: '2559601',
          s3Url: 'tos_oss/4edd/8e50/74ee/4edd8e5074ee37cadbe814ab6e9e4e91.png',
          fileWidth: 1280,
          fileHeight: 720,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/4edd/8e50/74ee/4edd8e5074ee37cadbe814ab6e9e4e91.png',
          fileThumbnailUrl: '',
          fileRange: 1.78
        },
        {
          uuid: 'fe4f3f3194',
          fileName: '62adbf3fecf6344e558a71d084b4bee3',
          direction: 'h',
          localId: '2553540',
          s3Url: 'tos_oss/28e2/383a/9767/28e2383a97679422b8db97480b318778.jpg',
          fileWidth: 1440,
          fileHeight: 900,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/28e2/383a/9767/28e2383a97679422b8db97480b318778.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.6
        },
        {
          uuid: '9b037ef386',
          fileName: '1140*640',
          direction: 'h',
          localId: '2554654',
          s3Url: 'tos_oss/8dfb/f011/6156/8dfbf0116156046237732c64035bf8dd.jpg',
          fileWidth: 1140,
          fileHeight: 640,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/8dfb/f011/6156/8dfbf0116156046237732c64035bf8dd.jpg',
          fileThumbnailUrl: '',
          fileRange: 1.78
        }
      ],
      videoData: [
        {
          uuid: 'bc2be7e248',
          fileName: 'cc948f2907510deaaae08ee02db16f1a',
          direction: 'h',
          localId: '2553529',
          s3Url: 'tos_oss/69df/8c18/038f/69df8c18038fc28643a8d1cc54e56e29.jpeg',
          fileWidth: 800,
          fileHeight: 500,
          previewUrl:
            'https://xmp-material.mobvista.com/video/5e/5e3a5cedbc17de856bdd0b1e4500fa4e.mp4',
          fileThumbnailUrl: '',
          fileRange: 1.6,
          thumbnail:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/4edd/8e50/74ee/4edd8e5074ee37cadbe814ab6e9e4e91.png',
          poster:
            'https://xmp-material.mobvista.com/video_cover_multi/5e3a5cedbc17de856bdd0b1e4500fa4e/96e92e26d5a0970ed52e0fe05222444e.jpg'
        },
        {
          uuid: 'bc2be7e24338',
          fileName: 'cc948f2907510deaaae08ee02db16f1a',
          direction: 'h',
          localId: '2553529',
          s3Url: 'tos_oss/69df/8c18/038f/69df8c18038fc28643a8d1cc54e56e29.jpeg',
          fileWidth: 800,
          fileHeight: 500,
          previewUrl:
            'https://ads-material.tos-cn-beijing.volces.com/tos_oss/eeff/1cc4/5353/eeff1cc453538227a91a5cf9c9b41de7.mp4',
          fileThumbnailUrl: '',
          fileRange: 1.6,
          thumbnail:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/2d0/fa8/752/2d0fa875213fa4839106ef62f809d4e5.jpg',
          poster:
            'https://adsdesk-test.s3.cn-north-1.amazonaws.com.cn/2d0/fa8/752/2d0fa875213fa4839106ef62f809d4e5.jpg'
        }
      ],
      currentImage: null
    }
  },
  methods: {
    handleImageClick() {
      this.visibleImage = true
      this.currentImage = this.imageData[4]
    },
    handleImageClose() {
      alert('展示Iamge预览 close')
      this.visibleImage = false
      this.currentImage = null
    },
    handleVideoClose() {
      alert('展示Video预览 close')
      this.visibleVideo = false
    },
    handleVideoClick() {
      this.visibleVideo = true
    }
  }
}
</script>
