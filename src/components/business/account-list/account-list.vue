<template>
  <div :class="[prefixCls]">
    <div
      :class="prefixCls + '-body'"
      :style="`width: ${width};height: ${height};`">
      <div
        v-show="showLeft"
        :class="prefixCls + '-body-left-box'">
        <div
          v-if="leftTitle"
          :class="prefixCls + '-body-left-box-title'">
          {{ leftTitle }}
        </div>
        <ul :class="prefixCls + '-body-left-box-content'">
          <li
            v-for="(item, index) in dataList"
            :key="item + index"
            :class="itemClasses(item)"
            @click="choose(item, false)">
            <template v-if="!id">
              <Tooltip
                :content="item[itemName]"
                :delay="1000"
                max-width="200"
                style="padding-top: 4px"
                theme="light"
                transfer>
                <span
                  :class="prefixCls + '-body-left-box-content-item-name'"
                  v-text="item[itemName]"></span>
              </Tooltip>
            </template>
            <template v-else>
              <Tooltip
                :delay="1000"
                max-width="200"
                style="padding-top: 4px"
                theme="light"
                transfer>
                <span
                  :class="prefixCls + '-body-left-box-content-item-name'"
                  class="sign"
                  v-text="item[itemName]"></span>
                <span
                  :class="prefixCls + '-body-left-box-content-item-name'"
                  class="sign id">
                  ID: {{ item[id] }}
                </span>

                <div
                  slot="content"
                  class="display-flex flex-direction-column">
                  <p>{{ item[itemName] }}</p>
                  <p>ID:{{ item[id] }}</p>
                </div>
              </Tooltip>
            </template>
            <span
              v-if="item[itemNum] && !item[itemIconCustom] && !item[itemIconIview]"
              :class="prefixCls + '-body-left-box-content-item-num'">
              {{ item[itemNum] }}
            </span>
            <Icon
              v-if="
                itemIconCustom && item[itemIconCustom] && !item[itemIconIview] && !item[itemNum]
              "
              :class="prefixCls + '-body-left-box-content-item-icon'"
              :color="iconColor"
              :custom="`${item[itemIconCustom]} icon iconfont`"
              :size="iconSize"></Icon>
            <Icon
              v-if="itemIconIview && item[itemIconIview] && !item[itemIconCustom] && !item[itemNum]"
              :class="prefixCls + '-body-left-box-content-item-icon'"
              :color="iconColor"
              :size="iconSize"
              :type="item[itemIconIview]"></Icon>
          </li>
        </ul>
      </div>
      <div
        v-if="isRenderRight"
        :class="prefixCls + '-body-right-box'"
        :style="rightBoxStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
const { prefix } = require('../../../config.js')
const prefixCls = prefix + 'account-list'
export default {
  name: prefixCls,
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '438px'
    },
    dataList: {
      type: Array,
      default: () => [],
      require: true
    },
    id: {
      type: [String, Number],
      default: ''
    },
    itemName: {
      type: String,
      default: 'adsMediaAccountName'
    },
    itemId: {
      type: String,
      default: 'adsMediaAccountId'
    },
    itemNum: {
      type: String,
      default: 'num'
    },
    itemIconCustom: {
      type: String,
      default: 'iconCustom'
    },
    itemIconIview: {
      type: String,
      default: 'iconIview'
    },
    iconSize: {
      type: Number,
      default: 12
    },
    iconColor: {
      type: String,
      default: '#277ff3'
    },
    isEvent: {
      type: Boolean,
      default: true
    },
    leftTitle: {
      type: [String, Boolean],
      default: '账户'
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    defaultActive: {
      type: [String, Number],
      default: ''
    },
    rightBoxStyle: {
      type: [Object, String],
      default: null
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      active: '',
      isRenderRight: true
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted() {
    this.isRenderRight = this.$slots.default !== undefined
  },
  methods: {
    itemClasses(item) {
      let { itemId, active } = this
      return [
        `${this.prefixCls}-body-left-box-content-item`,
        {
          [`${this.prefixCls}-body-left-box-content-item-active`]: item[itemId] === active
        }
      ]
    },
    init() {
      this.$nextTick(() => {
        if (!this.dataList.length) {
          return
        }
        this.active = this.defaultActive ? this.defaultActive : this.dataList[0][this.itemId]
        const defaultActiveData = this.dataList.find(
          item => item[this.itemId] === this.defaultActive
        )
        const item = this.defaultActive ? defaultActiveData : this.dataList[0]
        this.choose(item, true)
      })
    },
    choose(item, isFirst = true) {
      if (!this.showLeft) {
        return
      }
      const { itemId } = this
      if (item[itemId] === this.active && !isFirst) {
        return
      }
      const active = this.isEvent ? item[itemId] : this.active
      this.active = active
      this.$emit('on-change', active, isFirst)
    },
    reset() {
      this.init()
    }
  }
}
</script>

<style>

</style>
