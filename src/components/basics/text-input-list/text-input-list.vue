<template>
  <div>
    <div
      v-click-outside="onClickEditorOutSide"
      :class="prefixCls">
      <!-- 行号 -->
      <div
        v-for="(_, index) in maxLine"
        :key="index"
        style="display: flex">
        <div :class="[prefixCls + '-left-list', errors.includes(index) && prefixCls + '-is-error']">
          <span :class="[errors.includes(index) && prefixCls + '-error-left']">
            {{ index + 1 }}
          </span>
        </div>

        <div
          v-click-outside="() => onClickEditorLineOutSide(index)"
          :class="prefixCls + '-right-list'">
          <rd-text-emoj-input
            :ref="`emojInput-${index}`"
            :value="value[index] || ''"
            :is-edit="middle.activeClass === index"
            :class="[
              { 'middle-style-li-active': middle.activeClass === index },
              errors.includes(index) && prefixCls + '-is-error'
            ]"
            :transform-html2-text="transformHtml2Text"
            :transform-text2-html="transformText2Html"
            :calc-text-fn="calcTextFn"
            :valid-fn="validFn"
            :max-length="maxLength"
            :min-length="minLength"
            @on-keydown="handlerKeydown($event, index)"
            @on-blur="(e, value) => handlerBlur(e, value, index)"
            @input="val => handleEmitInput(val, index)"
            @click.native="onClickEditorLine(index)"
            @error="status => onError(status, index)" />
          <div
            v-if="(useEmoj || useEnter) && middle.activeClass === index"
            :class="prefixCls + '-btn-wrap'">
            <Poptip
              v-if="useEmoj"
              v-model="showEmojPan"
              transfer
              :transfer-class-name="prefixCls + '-poptip'"
              placement="bottom-end">
              <img src="../../../images/text-input-list/add-emoji.png" />
              <div
                slot="content"
                :class="prefixCls + '-panel-wrap'">
                <img
                  v-for="(item, index) in emojiList"
                  :key="index"
                  :class="prefixCls + '-item-common'"
                  :src="item.url"
                  @click="insertFace(item)" />
              </div>
            </Poptip>

            <img
              v-if="useEnter"
              src="../../../images/text-input-list/add-line-feed.png"
              @click="enter(index)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'text-input-list'

import rdTextEmojInput from '../text-emoj-input/text-emoj-input'

export default {
  name: prefixCls,
  components: {
    rdTextEmojInput
  },
  directives: {
    clickOutside: {
      // 初始化指令
      bind(el, binding) {
        function clickHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e)
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler
        document.addEventListener('click', clickHandler)
      },
      unbind(el) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    // 文本字符最小长度
    minLength: {
      type: Number,
      default: 6
    },
    // 文本字符最大长度
    maxLength: {
      type: Number,
      default: 30
    },
    // 最大行数
    maxLine: {
      type: Number,
      default: 10
    },
    // 最大换行数
    maxEnter: {
      type: Number,
      default: 3
    },
    // 可以使用表情
    useEmoj: {
      type: Boolean,
      default: true
    },
    // 可以使用换行
    useEnter: {
      type: Boolean,
      default: true
    },
    emojiList: {
      type: Array,
      default: () => [
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
      ]
    }
  },
  data() {
    return {
      prefixCls,
      middle: {
        defaultInput: '',
        preActiveClass: null,
        activeClass: null,
        faceIcon: '',
        addLineFeedIcon: require('../../../images/text-input-list/line-feed.png'),
        middleData: [
          {
            id: 1,
            value: ''
          }
        ]
      },
      showEmojPan: false,
      isError: false,
      errors: []
    }
  },
  computed: {
    curEmojInput() {
      return this.$refs[`emojInput-${this.middle.activeClass}`][0]
    }
  },
  watch: {
    'middle.activeClass'(cur, pre) {
      this.middle.preActiveClass = pre
    }
  },
  methods: {
    handlerKeydown({ keyDownEvent, disableInputFn }, index) {
      if (keyDownEvent.keyCode === 13) {
        disableInputFn()

        const curIndex = index + 1

        if (curIndex >= this.maxLine) {
          return
        }
        // 回车换行 & 记录数据变化
        const value = this.curEmojInput.getValue()
        this.handleEmitInput(value, index)

        this.middle.activeClass = curIndex
        this.$nextTick(() => {
          this.$refs[`emojInput-${index + 1}`][0].blur()
          setTimeout(() => {
            this.$refs[`emojInput-${curIndex}`][0].focus()
          }, 0)
        })
      }
    },
    handlerBlur(e, value, index) {
      if (value === undefined) {
        return
      }
      this.handleEmitInput(value, index)
    },
    transformHtml2Text(html) {
      return html
    },
    transformText2Html(text) {
      return text
    },
    getFaceHtml(icon, type) {
      const str = `<img style="pointer-events: none; margin-left: 4px; " src="${icon}" draggable="false" width="16" height="16" data-type="${type}">`
      return str
    },
    enter() {
      // 如果输入框内不存在内容，不允许点击换行符
      if (!this.curEmojInput.getValue()) {
        this.$Message.error('请先输入文本内容')
        return
      }
      if (this.curEmojInput.getEnters() >= this.maxEnter) {
        this.$Message.error(`最多能插入${this.maxEnter}换行`)
        return
      }
      let html = `${this.getFaceHtml(this.middle.addLineFeedIcon, 'enter')}<br>&nbsp;`
      this.curEmojInput.insertHtmlMark(html)
    },
    insertFace(val) {
      this.faceIcon = val.url
      let html = this.getFaceHtml(this.faceIcon, 'emoj')
      this.curEmojInput.insertHtmlMark(html)
    },
    // 向外抛出 input 事件，改变绑定数据
    handleEmitInput(value, index) {
      if (this.value[index] === value) {
        return
      }
      const copyValue = JSON.parse(JSON.stringify(this.value))
      copyValue[index] = value || ''
      this.$emit('input', copyValue)
    },
    // 点击编辑行
    onClickEditorLine(index) {
      if (!this.$refs[`emojInput-${index}`][0].richEditRef.innerHTML) {
        const el = this.$refs[`emojInput-${index}`][0]
        this.middle.activeClass = index
        this.$nextTick(() => {
          el.focus()
        })
      }
      if (this.middle.activeClass === index) {
        return
      }
      const el = this.$refs[`emojInput-${index}`][0]
      this.middle.activeClass = index
      this.$nextTick(() => {
        el.focus()
      })
    },
    // 点击编辑行区域外
    onClickEditorLineOutSide(index) {
      if (index !== this.middle.preActiveClass) {
        return
      }

      const el = this.$refs[`emojInput-${index}`][0]
      const value = el.getValue()
      this.handleEmitInput(value, index)
    },
    // 点击整体编辑区域外
    onClickEditorOutSide() {
      if (this.showEmojPan) {
        return
      }

      const index = this.middle.activeClass
      const el = this.$refs[`emojInput-${index}`][0]
      const value = el.getValue()
      this.handleEmitInput(value, index)

      this.$nextTick(() => {
        this.middle.activeClass = null
      })
    },
    // 文本计算方法
    calcTextFn(text) {
      // 中英文长度计算

      // 正常计算
      // reutnr text.length

      // 中文占两个字符
      const copyText = text.replaceAll(/[^\x00-\xff]/g, '**')
      return copyText.length
    },
    validFn(ln) {
      if (ln && (ln > this.maxLength || ln < this.minLength)) {
        return true
      }

      return false
    },
    onError(status, index) {
      setTimeout(() => {
        const k = this.errors.indexOf(index)
        if (k > -1) {
          if (!status) {
            this.errors.splice(k, 1)
          }
          return
        }
        status && this.errors.push(index)
      }, 600)
    }
  }
}
</script>
