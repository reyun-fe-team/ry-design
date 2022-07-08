<template>
  <div :class="[prefixCls]">
    <div
      :class="prefixCls + '-body'"
      :style="`width: ${width};height: ${height};`">
      <div class="left-box">
        <div class="title">
          {{ title }}
        </div>
        <div
          v-for="item in dataList"
          :key="item[nameValue]"
          style="width: 100%">
          <Tooltip
            style="padding-top: 4px"
            class="tooltip-overflow"
            max-width="200"
            transfer
            :delay="1000"
            theme="light">
            <div class="account-title">账户：{{ item[name] }}</div>
            <div slot="content">
              <p>账户：{{ item[name] }}</p>
            </div>
          </Tooltip>
          <ul>
            <li
              v-for="el in item.children"
              :key="el[childNameValue]"
              :class="{ 'list-item': true, 'list-item-active': el[childNameValue] === active }"
              @click="choose(el)">
              <Tooltip
                style="padding-top: 4px"
                class="tooltip-overflow"
                max-width="200"
                transfer
                :delay="1000"
                theme="light">
                <div class="name sign">{{ el[childName] }}</div>
                <div slot="content">
                  <p>{{ el[childName] }}</p>
                </div>
              </Tooltip>
              <span
                v-if="el[nameNum]"
                :class="el[childNameValue] === active ? 'num num-active' : 'num'">
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
const prefixCls = prefix + 'account-group'
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

