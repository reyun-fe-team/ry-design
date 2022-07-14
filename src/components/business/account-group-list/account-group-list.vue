<template>
  <div :class="[prefixCls]">
    <div
      :class="prefixCls + '-body'"
      :style="`width: ${width};height: ${height};`">
      <div :class="prefixCls + '-body-left-box'">
        <div :class="prefixCls + '-body-left-box-title'">
          {{ title }}
        </div>
        <div
          v-for="item in dataList"
          :key="item[nameValue]"
          :class="prefixCls + '-body-left-box-content'">
          <Tooltip
            max-width="200"
            transfer
            :delay="1000"
            theme="light">
            <div :class="prefixCls + '-body-left-box-content-title'">账户：{{ item[name] }}</div>
            <div slot="content">
              <p>账户：{{ item[name] }}</p>
            </div>
          </Tooltip>
          <ul>
            <li
              v-for="el in item.children"
              :key="el[childNameValue]"
              :class="itemClasses(el)"
              @click="choose(el)">
              <Tooltip
                class="wid100"
                style="padding-top: 4px"
                max-width="200"
                transfer
                :delay="1000"
                theme="light">
                <div
                  :class="prefixCls + '-body-left-box-content-item-name'"
                  class="sign">
                  {{ el[childName] }}
                </div>
                <div slot="content">
                  <p>{{ el[childName] }}</p>
                </div>
              </Tooltip>
              <span
                v-if="el[nameNum]"
                :class="prefixCls + '-body-left-box-content-item-num'">
                {{ el[nameNum] }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div :class="prefixCls + '-body-right-box'">
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
    title: {
      type: String,
      default: '广告组'
    },
    dataList: {
      type: Array,
      default: () => [],
      require: true
    },
    name: {
      type: String,
      default: 'accountName'
    },
    nameValue: {
      type: String,
      default: 'adsMediaAccountId'
    },
    nameNum: {
      type: String,
      default: 'num'
    },
    childName: {
      type: String,
      default: 'unitName'
    },
    childNameValue: {
      type: String,
      default: 'unitId'
    }
  },
  data() {
    return {
      prefixCls,
      active: ''
    }
  },
  created() {
    let { dataList, childNameValue } = this
    this.active = dataList[0].children[0][childNameValue]
  },
  methods: {
    itemClasses(item) {
      let { prefixCls, childNameValue, active } = this
      return [
        `${prefixCls}-body-left-box-content-item`,
        { [`${prefixCls}-body-left-box-content-item-active`]: item[childNameValue] === active }
      ]
    },
    choose(item) {
      const { childNameValue, nameValue } = this
      // 当前已经选中的 不在返回
      if (item[childNameValue] === this.active) {
        return
      }
      const active = item[childNameValue]
      this.active = active
      this.$emit('getActive', active, item[nameValue])
    }
  }
}
</script>

