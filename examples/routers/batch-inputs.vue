<template>
  <div style="margin: 20px">
    <div
      v-for="(t, i) in list"
      :key="i"
      style="margin: 5px 0">
      <p v-html="t"></p>
    </div>

    <div style="margin: 10px 0">
      <p>插入动态词包</p>
      <a
        v-for="t in dynamicWordList"
        :key="t.value"
        style="margin-right: 5px"
        @click="addDynamicWord(t)">
        {{ t.label }}
      </a>
    </div>
    <div style="margin: 10px 0">
      <Button @click="getPlainTextValues">获取纯文本</Button>
      <p>{{ plainTextValues }}</p>
    </div>
    <rd-batch-inputs
      ref="BatchInputs"
      v-model="list"
      use-emoj
      show-limit
      :max-line="1000">
      <template #end="{ insertNode }">
        <div style="display: flex; align-items: center">
          <Button @click="insertWord(insertNode)">插入动态词包</Button>
          <Poptip
            transfer
            placement="bottom-end">
            <img
              :src="AddEmoji"
              style="width: 20px" />
            <div
              slot="content"
              style="max-width: 200px; display: flex; flex-wrap: wrap; max-height: 80px">
              <img
                v-for="(item, index) in emojiList"
                :key="index"
                style="width: 20px; margin: 10px"
                :src="item.url"
                @click="insertFace(insertNode, item)" />
            </div>
          </Poptip>
          <img
            style="width: 20px"
            :src="AddLineFeed"
            @click="insertEnter(insertNode)" />
        </div>
      </template>
    </rd-batch-inputs>
  </div>
</template>

<script>
import AddEmoji from '@src/images/text-input-list/add-emoji.png'
import AddLineFeed from '@src/images/text-input-list//add-line-feed.png'
export default {
  data() {
    return {
      AddEmoji,
      AddLineFeed,
      plainTextValues: '',
      list: [
        '一步登顶修仙路，一斧砍尽千年树',
        '模拟经营小游戏，穿越回古代，轻松种田，逆袭人生！',
        '一斧光阴一斧梦，梦醒时分已是王。',
        '1月26日起，轻松解压的益智小游戏，随时随地玩，休闲又有趣',
        '梦幻西游网页版，手机也能玩西游了，无级别武器登录送！',
        '无需下载不占内存，点开即玩的微信小游戏！十分钟就上头！',
        '是兄弟，就来一把紧张刺激的抓大鹅！',
        '脚踏阴阳定乾坤，风云再起，挑战你的极限！',
        '全新修仙碰撞，小猪妖登场，让你的眼睛发光！',
        '1月26日全新武侠《无名江湖》公测！10倍爆率，装备靠打！'
      ],
      emojiList: [
        {
          value: '[666]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5x8wqwxwfr6uwuq.png'
        },
        {
          value: '[奸笑]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5x8dtesmzjctdxw.png'
        },
        {
          value: '[龇牙]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xae83hqrwsvqk4.png'
        },
        {
          value: '[老铁]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xp5grbay62szi9.png'
        },
        {
          value: '[调皮]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5xf5ks2dbd7iyt9.png'
        },
        {
          value: '[星星眼]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xuqvr6h7swwqxk.png'
        },
        {
          value: '[爱心]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xsvzh8figkhnte.png'
        },
        {
          value: '[羞涩]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xhgq5iha37qar9.png'
        },
        {
          value: '[色]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xhj4kgdtvmwbfi.png'
        },
        {
          value: '[头盔]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xz4zmu9vi5c26a.png'
        },
        {
          value: '[酷]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xby23wq9rguvuu.png'
        },
        {
          value: '[愉快]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xeg4bri9nhx6j4.png'
        },
        {
          value: '[安排]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xnz9ticijnsd5q.png'
        },
        {
          value: '[点点关注]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5x72svrg4ku54ma.png'
        },
        {
          value: '[小姐姐]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xrmjgev3dex6q6.png'
        },
        {
          value: '[小哥哥]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5xd2dfwv2yea5iq.png'
        },
        {
          value: '[鼓掌]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xgyik628vigks4.png'
        },
        {
          value: '[抱抱]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5xgq2smgxhabjiq.png'
        },
        {
          value: '[红脸蛋]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5x894eb2n36rty6.png'
        },
        {
          value: '[亲亲]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xsa5ztej5fjsp2.png'
        },
        {
          value: '[火]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5x5zaa2782wehqg.png'
        },
        {
          value: '[摄像机]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5xgfu96mpgpebsc.png'
        },
        {
          value: '[赞]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xm48kbmya4a83u.png'
        },
        {
          value: '[玫瑰]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xuf77jtvs2tqf6.png'
        },
        {
          value: '[偷笑]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xsi9kspguytgfi.png'
        },
        {
          value: '[挑逗]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xi6hvxgm2yxiwi.png'
        },
        {
          value: '[流鼻血]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1576120138988_5x9jrb32xz9xfww.png'
        },
        {
          value: '[憨笑]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1576120138988_5xacynf2rjp7x4e.png'
        },
        {
          value: '[加油]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1576120138988_5x756gefzbda399.png'
        },
        {
          value: '[期待]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1576120138988_5x78bpjjb5d63ps.png'
        },
        {
          value: '[红包]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1576120138988_5x2vtpwxnm7ikbc.png'
        },
        {
          value: '[干杯]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1576120138988_5xdkf7tjqqukr82.png'
        },
        {
          value: '[福字]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xz9u2wqxdsiuiu.png'
        },
        {
          value: '[烟花]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xxk3up2khrp5hy.png'
        },
        {
          value: '[钱]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5xrjaieus9vewas.png'
        },
        {
          value: '[庆祝]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5x5a72hybr9tcjw.png'
        },
        {
          value: '[礼花]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xjhepbixcexq5e.png'
        },
        {
          value: '[爱你]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xqc5hz6ckhkkhi.png'
        },
        {
          value: '[化妆]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xsd9egcmrcwaxw.png'
        },
        {
          value: '[涂指甲]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xr5i7pm7amfipc.png'
        },
        {
          value: '[欢迎]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xkgmz2zw373ndw.png'
        },
        {
          value: '[我爱你]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xkj4mud7zixtt6.png'
        },
        {
          value: '[比心]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xzd2f2t2gaev2s.png'
        },
        {
          value: '[肌肉]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5xur7332di78a6e.png'
        },
        {
          value: '[跳舞]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5x9nakdaz8mp3dm.png'
        },
        {
          value: '[口红]',
          url: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xirhzv6anyfyac.png'
        },
        {
          value: '[空投]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5xk4hz6xvsj7d3a.png'
        },
        {
          value: '[手柄]',
          url: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xcuxkawmj66trg.png'
        },
        {
          value: '[优秀]',
          url: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5xvw3rvaqjpqmcg.png'
        }
      ],
      dynamicWordList: [
        {
          label: '城市',
          value: '{{城市}}'
        },
        {
          label: '年龄',
          value: '{{年龄}}'
        },
        {
          label: '姓名',
          value: '{{姓名}}'
        },
        {
          label: '性别',
          value: '{{性别}}'
        },
        {
          label: '设备型号',
          value: '{{设备型号}}'
        }
      ]
    }
  },
  methods: {
    insertWord(insertNode) {
      const randomNumber = Math.floor(Math.random() * 5)
      insertNode('text', { value: this.dynamicWordList[randomNumber].value })
    },
    insertFace(insertNode, item) {
      insertNode('image', item)
    },
    insertEnter(insertNode) {
      insertNode('enterIcon', { url: AddLineFeed, value: '[回车]' })
    },
    getPlainTextValues() {
      let ref = this.$refs.BatchInputs
      this.plainTextValues = ref.getPlainTextValues()
    },
    addDynamicWord(t) {
      let ref = this.$refs.BatchInputs
      ref.insertNode('text', { value: t.value })
    }
  }
}
</script>
