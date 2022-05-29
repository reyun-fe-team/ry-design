<template>
  <main :class="[prefixCls]">
    <div :class="prefixCls + '-content'">
      <Poptip
        :transfer-class-name="`${poptipClass}`"
        transfer
        placement="bottom-start">
        <div
          :class="prefixCls + '-content-input'"
          :style="{ border: borderStyle }">
          <div
            v-for="(list, i) in emojiInfoList"
            :key="i">
            <img :src="list[emojiUrl]" />
          </div>
          <input
            v-model="value"
            type="text"
            :placeholder="emojiInfoList.length ? '' : '表情'"
            @keydown.delete="changeEmoji" />
        </div>
        <div
          slot="content"
          :class="prefixCls + '-panel-wrap'">
          <img
            v-for="(item, index) in emojiList"
            :key="index"
            :class="prefixCls + '-item-common'"
            :src="item[emojiUrl]"
            @click="appendEmoji(item)" />
        </div>
      </Poptip>
      <span :class="prefixCls + '-num'">
        {{ emojiInfoList ? emojiInfoList.length : 0 }}/{{ totalNum }}
      </span>
    </div>
  </main>
</template>

<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'emoji-image-input'
export default {
  name: prefixCls,
  props: {
    poptipClass: {
      type: String,
      default: prefixCls + '-poptip'
    },
    emojiInfoList: {
      type: Array,
      default: () => []
    },
    emojiList: {
      type: Array,
      default: () => [
        {
          emojiCode: '[666]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5x8wqwxwfr6uwuq.png'
        },
        {
          emojiCode: '[奸笑]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5x8dtesmzjctdxw.png'
        },
        {
          emojiCode: '[龇牙]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xae83hqrwsvqk4.png'
        },
        {
          emojiCode: '[老铁]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xp5grbay62szi9.png'
        },
        {
          emojiCode: '[调皮]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5xf5ks2dbd7iyt9.png'
        },
        {
          emojiCode: '[星星眼]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xuqvr6h7swwqxk.png'
        },
        {
          emojiCode: '[爱心]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xsvzh8figkhnte.png'
        },
        {
          emojiCode: '[羞涩]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xhgq5iha37qar9.png'
        },
        {
          emojiCode: '[色]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xhj4kgdtvmwbfi.png'
        },
        {
          emojiCode: '[头盔]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xz4zmu9vi5c26a.png'
        },
        {
          emojiCode: '[酷]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xby23wq9rguvuu.png'
        },
        {
          emojiCode: '[愉快]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xeg4bri9nhx6j4.png'
        },
        {
          emojiCode: '[安排]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xnz9ticijnsd5q.png'
        },
        {
          emojiCode: '[点点关注]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5x72svrg4ku54ma.png'
        },
        {
          emojiCode: '[小姐姐]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xrmjgev3dex6q6.png'
        },
        {
          emojiCode: '[小哥哥]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5xd2dfwv2yea5iq.png'
        },
        {
          emojiCode: '[鼓掌]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xgyik628vigks4.png'
        },
        {
          emojiCode: '[抱抱]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5xgq2smgxhabjiq.png'
        },
        {
          emojiCode: '[红脸蛋]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5x894eb2n36rty6.png'
        },
        {
          emojiCode: '[亲亲]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xsa5ztej5fjsp2.png'
        },
        {
          emojiCode: '[火]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5x5zaa2782wehqg.png'
        },
        {
          emojiCode: '[摄像机]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1574675492000_5xgfu96mpgpebsc.png'
        },
        {
          emojiCode: '[赞]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xm48kbmya4a83u.png'
        },
        {
          emojiCode: '[玫瑰]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xuf77jtvs2tqf6.png'
        },
        {
          emojiCode: '[偷笑]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1574675492000_5xsi9kspguytgfi.png'
        },
        {
          emojiCode: '[挑逗]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1574675492000_5xi6hvxgm2yxiwi.png'
        },
        {
          emojiCode: '[流鼻血]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1576120138988_5x9jrb32xz9xfww.png'
        },
        {
          emojiCode: '[憨笑]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1576120138988_5xacynf2rjp7x4e.png'
        },
        {
          emojiCode: '[加油]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1576120138988_5x756gefzbda399.png'
        },
        {
          emojiCode: '[期待]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1576120138988_5x78bpjjb5d63ps.png'
        },
        {
          emojiCode: '[红包]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1576120138988_5x2vtpwxnm7ikbc.png'
        },
        {
          emojiCode: '[干杯]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1576120138988_5xdkf7tjqqukr82.png'
        },
        {
          emojiCode: '[福字]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xz9u2wqxdsiuiu.png'
        },
        {
          emojiCode: '[烟花]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xxk3up2khrp5hy.png'
        },
        {
          emojiCode: '[钱]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5xrjaieus9vewas.png'
        },
        {
          emojiCode: '[庆祝]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5x5a72hybr9tcjw.png'
        },
        {
          emojiCode: '[礼花]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xjhepbixcexq5e.png'
        },
        {
          emojiCode: '[爱你]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xqc5hz6ckhkkhi.png'
        },
        {
          emojiCode: '[化妆]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xsd9egcmrcwaxw.png'
        },
        {
          emojiCode: '[涂指甲]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xr5i7pm7amfipc.png'
        },
        {
          emojiCode: '[欢迎]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xkgmz2zw373ndw.png'
        },
        {
          emojiCode: '[我爱你]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xkj4mud7zixtt6.png'
        },
        {
          emojiCode: '[比心]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xzd2f2t2gaev2s.png'
        },
        {
          emojiCode: '[肌肉]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5xur7332di78a6e.png'
        },
        {
          emojiCode: '[跳舞]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5x9nakdaz8mp3dm.png'
        },
        {
          emojiCode: '[口红]',
          emojiUrl: 'https://js2.a.yximgs.com/bs2/emotion/app_1580805626075_5xirhzv6anyfyac.png'
        },
        {
          emojiCode: '[空投]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5xk4hz6xvsj7d3a.png'
        },
        {
          emojiCode: '[手柄]',
          emojiUrl: 'https://ali2.a.yximgs.com/bs2/emotion/app_1580805626075_5xcuxkawmj66trg.png'
        },
        {
          emojiCode: '[优秀]',
          emojiUrl: 'https://tx2.a.yximgs.com/bs2/emotion/app_1580805626075_5xvw3rvaqjpqmcg.png'
        }
      ]
    },
    emojiUrl: {
      type: String,
      default: 'emojiUrl'
    },
    totalNum: {
      type: Number,
      default: 3
    },
    inputValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      value: this.inputValue
    }
  },
  computed: {
    borderStyle() {
      const { emojiInfoList, totalNum } = this
      if (emojiInfoList.length !== totalNum) {
        return '1px solid #ed4014'
      }
      return ''
    }
  },
  methods: {
    appendEmoji(item) {
      this.$emit('append-emoji', item)
    },
    changeEmoji() {
      this.$emit('change-emoji')
    }
  }
}
</script>

<style scoped lang="less">
@import 'index';
</style>
<style lang="less">
.emoji-content {
  .ivu-poptip-body {
    padding: 0 !important;
  }
}
</style>
