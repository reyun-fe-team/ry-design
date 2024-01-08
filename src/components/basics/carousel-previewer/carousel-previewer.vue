<template>
  <div
    v-show="value"
    v-transfer-dom
    :class="[prefixCls, { [transferClassName]: transfer }]"
    :data-transfer="transfer"
    :transfer="transfer">
    <transition name="fade">
      <div
        v-if="value"
        ref="transferBody"
        :class="[prefixCls + '-body']">
        <!-- 内容 -->
        <div :class="[prefixCls + '-body-content']">
          <!-- 关闭按钮 -->
          <Icon
            type="md-close"
            :class="[prefixCls + '-close']"
            @click="handleClose"></Icon>
          <!-- 左右按钮 -->
          <div
            v-if="data.length > 1"
            :class="[prefixCls + '-btns']">
            <Icon
              type="ios-arrow-back"
              :class="[prefixCls + '-btns-prev', prefixCls + '-btn']"
              @click="handlePrev"></Icon>
            <Icon
              type="ios-arrow-forward"
              :class="[prefixCls + '-btns-next', prefixCls + '-btn']"
              @click="handleNext"></Icon>
          </div>
          <!-- 描述 -->
          <div
            v-if="newCurrent[descKey]"
            :class="[prefixCls + '-desc']">
            {{ newCurrent[descKey] }}
          </div>
          <transition
            :key="newCurrent[idKey]"
            name="slide-left">
            <!-- 图片容器 -->
            <div :class="[prefixCls + '-image']">
              <!-- 图片 -->
              <div
                v-if="type === 'IMAGE'"
                :class="[prefixCls + '-image-wrap']">
                <img
                  :class="[prefixCls + '-image-img']"
                  :src="newCurrent[urlKey]"
                  @error="handleImageLoadError" />
                <!-- 音乐 -->
                <div
                  v-if="audioUrl"
                  :class="[prefixCls + '-image-audio']">
                  <audio
                    ref="audio"
                    :class="[prefixCls + '-audio']"
                    :src="audioUrl"
                    @ended="handleEnded"></audio>
                  <!-- 按钮 -->
                  <div
                    :style="audioBtnStyle"
                    :class="[prefixCls + '-image-audio-icon']"
                    @click.stop="handleClickPlay"></div>
                </div>
              </div>
              <!-- 视频 -->
              <CarouselVideoPreviewer
                v-if="type === 'VIDEO'"
                :poster="newCurrent[posterKey]"
                :src="newCurrent[urlKey]"
                :class="[prefixCls + '-image-video']"></CarouselVideoPreviewer>
            </div>
          </transition>
        </div>
        <!-- 底部控制条 -->
        <div
          ref="scrollview"
          :class="[prefixCls + '-ctrl-wrap', { [prefixCls + '-touch-active']: touchData.isDown }]"
          @wheel.prevent="handleScrollviewWheel"
          @mousedown="handleMousedown"
          @mouseleave="handleMouseleave"
          @mousemove="handleMousemove"
          @mouseup="handleMouseup">
          <div :class="[prefixCls + '-ctrl']">
            <div
              v-for="(item, index) in data"
              :key="index"
              :class="[
                {
                  [prefixCls + '-ctrl-active']: newCurrent[idKey] === item[idKey],
                  [prefixCls + '-touch-active']: touchData.isDown
                },
                prefixCls + '-ctrl-btn'
              ]"
              @click="handleChangeImg(item, index)">
              <img
                :src="item[thumbnailKey]"
                @error="handleImageLoadError" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
import { easeInOutQuad } from '@src/util/assist'
import _debounce from 'lodash/debounce'
import ImageError from '@src/images/image/image-error.png'
import CarouselVideoPreviewer from './carousel-video-previewer'
import videoPlay from '@src/images/image-preview/video-play.svg'
import videoPause from '@src/images/image-preview/video-pause.svg'

const prefixCls = prefix + 'carousel-previewer'
// 底部按钮的实际宽度
const scrollAmount = 110

export default {
  name: prefixCls,
  components: {
    CarouselVideoPreviewer
  },
  props: {
    type: {
      type: String,
      // VIDEO
      default: 'IMAGE'
    },
    data: {
      type: Array,
      default: () => []
    },
    current: {
      type: Object,
      default: () => null
    },
    value: {
      type: Boolean,
      default: false
    },
    // 是否将弹层放置于 body 内
    transfer: {
      type: Boolean,
      default: true
    },
    // 开启 transfer 时，给浮层添加额外的 class 名称
    transferClassName: {
      type: String,
      default: ''
    },
    // -----字段的 key----
    // 唯一Id
    idKey: {
      type: String,
      default: 'uuid'
    },
    // 图片或视频的URL (图片展示区使用)
    urlKey: {
      type: String,
      default: 'previewUrl'
    },
    // 缩略图URL (底部控制区域使用)
    thumbnailKey: {
      type: String,
      default: 'thumbnailUrl'
    },
    // 描述 key (图片的描述)
    descKey: {
      type: String,
      default: 'fileName'
    },
    // 视频封面图
    posterKey: {
      type: String,
      default: 'poster'
    },
    // 音频地址
    audioUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls,
      newCurrent: null,
      currentIndex: null,
      isAudioPlay: false,
      touchData: {
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        longPressTimer: null,
        longPressTimes: 300
      }
    }
  },
  computed: {
    // 音频播放按钮样式
    audioBtnStyle() {
      return {
        'background-image': `url(${this.isAudioPlay ? videoPause : videoPlay})`,
        'background-repeat': 'no-repeat',
        'background-position': 'center center',
        'background-size': '100% 100%'
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: async function () {
        this.newCurrent = this.current || this.data[0]
        this.currentIndex = this.data.indexOf(this.newCurrent)
        await this.$nextTick()
        // value === true => transferBody 渲染
        if (this.value) {
          let transferBody = this.$refs.transferBody
          transferBody && (transferBody.style.zIndex = this.getMaxZIndex())
        }
      }
    }
  },
  methods: {
    // 音频播放
    playAudio() {
      this.isAudioPlay = true
      let audioRef = this.$refs.audio
      audioRef && audioRef.play()
    },
    // 音频暂停
    pauseAudio() {
      this.isAudioPlay = false
      let audioRef = this.$refs.audio
      audioRef && audioRef.pause()
    },
    // 获取最大的z-index， 记住要在页面渲染完毕执行
    getMaxZIndex() {
      let allEles = document.getElementsByTagName('*')
      let arr = [...allEles].map(e => +window.getComputedStyle(e).zIndex || 0)
      return arr.length ? Math.max(...arr) + 1 : 0
    },
    // 滚动多少距离
    scrollByDistance(distance, duration) {
      const start = 0
      const change = distance - start
      const increment = 10
      const scrollview = this.$refs.scrollview

      let currentTime = 0

      const animateScroll = () => {
        currentTime += increment
        const distanceChange = easeInOutQuad(currentTime, start, change, duration)
        // 横向滚动多少距离
        scrollview.scrollBy(distanceChange, 0)
        if (currentTime < duration) {
          window.requestAnimationFrame(animateScroll)
        }
      }
      animateScroll()
    },
    // 向左滚动
    scrollLeft(count = 1) {
      // 指定滚动n个距离
      const distance = count * scrollAmount
      // 动画持续时间，单位：毫秒
      const duration = 300
      if (distance > 0) {
        this.scrollByDistance(-distance, duration)
      }
    },
    // 向右滚动
    scrollRight(count = 1) {
      // 指定滚动n个距离
      const distance = count * scrollAmount
      // 动画持续时间，单位：毫秒
      const duration = 300
      if (distance > 0) {
        this.scrollByDistance(distance, duration)
      }
    },
    // 点击播放按钮
    handleClickPlay() {
      !this.isAudioPlay ? this.playAudio() : this.pauseAudio()
    },
    // 播放完毕,继续播放
    handleEnded() {
      this.playAudio()
    },
    // 图片加载失败
    handleImageLoadError(event) {
      event.target.src = ImageError
    },
    // 切换图片
    handleChangeImg(item, index) {
      this.newCurrent = item
      const deltaIndex = index - this.currentIndex
      this.currentIndex = index
      // 点击的是下一个
      if (deltaIndex > 0) {
        this.scrollRight(deltaIndex)
      } else {
        this.scrollLeft(-deltaIndex)
      }
    },
    // 关闭
    handleClose() {
      this.pauseAudio()
      this.$emit('input', false)
      this.$emit('on-close')
    },
    // 上一张
    handlePrev() {
      let index = this.currentIndex - 1
      if (index < 0) {
        return
      }
      this.currentIndex = index
      this.newCurrent = this.data[this.currentIndex]
      this.scrollLeft()
    },
    // 下一张
    handleNext() {
      let index = this.currentIndex + 1
      let lastIndex = this.data.length - 1
      if (index > lastIndex) {
        return
      }
      this.currentIndex = index
      this.newCurrent = this.data[this.currentIndex]
      this.scrollRight()
    },
    // 鼠标滚动
    handleScrollviewWheel: _debounce(function (event) {
      let scrollview = this.$refs.scrollview
      // 阻止默认的滚动行为
      event.preventDefault()
      // 根据滚轮事件的 deltaY 属性判断滚轮方向
      // 向左滚动
      if (event.deltaY < 0) {
        scrollview.scrollLeft -= scrollAmount
      }
      // 向右滚动
      else {
        scrollview.scrollLeft += scrollAmount
      }
    }, 167),
    // 开始拖拽
    handleMousedown(event) {
      // 设置长按的时间阈值，单位为毫秒（这里是300毫秒）
      this.touchData.longPressTimer = setTimeout(() => {
        this.touchData.isDown = true
        let scrollview = this.$refs.scrollview
        this.touchData.startX = event.pageX - scrollview.offsetLeft
        this.touchData.scrollLeft = scrollview.scrollLeft
      }, this.touchData.longPressTimes)
    },
    // 结束拖拽
    handleMouseleave() {
      clearTimeout(this.touchData.longPressTimer)
      this.touchData = {
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        longPressTimer: null,
        longPressTimes: 300
      }
    },
    // 移动
    handleMousemove(event) {
      if (!this.touchData.isDown) {
        return
      }
      event.preventDefault()
      let scrollview = this.$refs.scrollview
      const x = event.pageX - scrollview.offsetLeft
      // 控制滚动速度
      const walk = (x - this.touchData.startX) * 2
      scrollview.scrollLeft = this.touchData.scrollLeft - walk
    },
    // 取消
    handleMouseup() {
      clearTimeout(this.touchData.longPressTimer)
      this.touchData = {
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        longPressTimer: null,
        longPressTimes: 300
      }
    }
  }
}
</script>
