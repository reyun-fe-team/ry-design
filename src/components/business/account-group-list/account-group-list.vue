<template>
  <div :class="[prefixCls]">
    <div
      :class="prefixCls + '-body'"
      :style="`width: ${width};height: ${height};`">
      <div :class="prefixCls + '-body-left-box'">
        <div :class="prefixCls + '-body-left-box-title'">
          {{ leftTitle }}
        </div>
        <div
          v-for="item in list"
          :key="item[groupName]"
          :class="prefixCls + '-body-left-box-content'">
          <Tooltip
            :max-width="maxWidth"
            transfer
            :delay="delay"
            placement="right"
            theme="light">
            <div :class="prefixCls + '-body-left-box-content-title'">
              账户：{{ item[groupName] }}
            </div>
            <div slot="content">
              <p>账户：{{ item[groupName] }}</p>
            </div>
          </Tooltip>
          <ul>
            <li
              v-for="el in item.children"
              :key="el[itemId]"
              :class="itemClasses(el)"
              @click="choose(el, false)">
              <Tooltip
                :max-width="maxWidth"
                transfer
                :delay="delay"
                placement="right"
                theme="light">
                <div
                  :class="prefixCls + '-body-left-box-content-item-name'"
                  class="sign">
                  {{ el[itemName] }}
                </div>
                <div
                  slot="content"
                  class="display-flex flex-direction-column">
                  <p>{{ el[itemName] }}</p>
                  <p v-if="id && el[id]">ID:{{ el[id] }}</p>
                </div>
              </Tooltip>
              <span
                v-if="el[itemNum] && !el[itemIconCustom] && !el[itemIconIview]"
                :class="prefixCls + '-body-left-box-content-item-num'">
                {{ el[itemNum] }}
              </span>

              <Icon
                v-if="itemIconCustom && el[itemIconCustom] && !el[itemIconIview] && !el[itemNum]"
                :class="prefixCls + '-body-left-box-content-item-icon'"
                :color="iconColor"
                :custom="`${el[itemIconCustom]} icon iconfont`"
                :size="iconSize"></Icon>
              <Icon
                v-if="itemIconIview && el[itemIconIview] && !el[itemIconCustom] && !el[itemNum]"
                :class="prefixCls + '-body-left-box-content-item-icon'"
                :color="iconColor"
                :size="iconSize"
                :type="el[itemIconIview]"></Icon>
            </li>
          </ul>
        </div>
      </div>
      <div
        :class="prefixCls + '-body-right-box'"
        :style="rightBoxStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'account-group-list'
export default {
  name: prefixCls,
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '520px'
    },
    leftTitle: {
      type: [String, Boolean],
      default: '账户'
    },
    data: {
      type: Array,
      default: () => [],
      require: true
    },
    groupName: {
      type: String,
      default: 'groupName'
    },
    groupId: {
      type: String,
      default: 'groupId'
    },
    id: {
      type: [String, Number],
      default: ''
    },
    itemName: {
      type: String,
      default: 'mediaAccountName'
    },
    itemId: {
      type: String,
      default: 'mediaAccountId'
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
    maxWidth: {
      type: [Number, String],
      default: 320
    },
    delay: {
      type: Number,
      default: 1000
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
      prefixCls,
      active: ''
    }
  },
  computed: {
    list() {
      return this.data.map(p => {
        let children = p.children.map(c => {
          return {
            ...c,
            [this.groupId]: p[this.groupId]
          }
        })
        return { ...p, children }
      })
    }
  },
  created() {
    this.init()
  },
  methods: {
    itemClasses(item) {
      let { prefixCls, itemId, active } = this
      return [
        `${prefixCls}-body-left-box-content-item`,
        { [`${prefixCls}-body-left-box-content-item-active`]: item[itemId] === active }
      ]
    },
    init() {
      if (!this.data.length) {
        return
      }
      this.$nextTick(() => {
        let { list, itemId, defaultActive } = this
        let newList = []
        this.active = defaultActive || list[0].children[0][itemId]
        list.map(m => {
          newList = [...m.children, ...newList]
        })
        let activeData = newList.find(f => f[this.itemId] === this.active)
        this.choose(activeData, true)
      })
    },
    choose(item, isFirst = true) {
      const { itemId, groupId } = this
      // 当前已经选中的 不在返回
      if (item[itemId] === this.active && !isFirst) {
        return
      }
      const active = item[itemId]
      this.active = active
      this.$emit('on-change', active, item[groupId])
    }
  }
}
</script>

