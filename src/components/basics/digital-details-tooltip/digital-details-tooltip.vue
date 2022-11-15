<template>
  <div :class="classes">
    <!-- 数量 -->
    <span
      v-if="showCount"
      :class="[prefixCls + '-count']"
      v-html="listCount"></span>
    <Poptip v-bind="poptipPropsData">
      <!-- 图标 -->
      <div :class="[prefixCls + '-icon']">
        <ryIcon v-bind="iconProps" />
      </div>
      <!-- 内容 -->
      <div
        slot="content"
        :class="[prefixCls + '-content']">
        <!-- 显示列表 -->
        <div
          v-if="showCount"
          :class="[prefixCls + '-list']">
          <div
            v-for="(item, index) in renderData"
            :key="index"
            :class="[prefixCls + '-list-item']">
            <div
              v-for="col in columns"
              :key="col.key"
              :class="[prefixCls + '-list-item-col']">
              {{ item[col.key] }}
            </div>
          </div>
        </div>

        <!-- 显示单项 -->
        <div
          v-if="!showCount"
          :class="[prefixCls + '-single']">
          <div
            v-for="col in columns"
            :key="col.key"
            :class="[prefixCls + '-single-item']">
            <div :class="[prefixCls + '-single-item-head']">{{ col.title }}</div>
            <div :class="[prefixCls + '-single-item-text']">{{ renderData[col.key] }}</div>
          </div>
        </div>
      </div>
    </Poptip>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
import _isEmpty from 'lodash/isEmpty'
import { typeOf } from '../../../util/assist'
import ryIcon from '../icon/icon.vue'

const prefixCls = prefix + 'digital-details-tooltip'

export default {
  name: prefixCls,
  components: {
    ryIcon
  },
  props: {
    // list 列表展示 detail 详情展示
    type: {
      type: String,
      default: 'list'
    },
    // 传入的数据
    data: {
      type: [Object, Array],
      default: () => []
    },
    // 列信息  [key title]
    columns: {
      type: Array,
      default: () => []
    },
    // 气泡的属性
    poptipProps: {
      type: Object,
      default: () => {}
    },
    // 图标类型
    iconProps: {
      type: Object,
      default: () => ({ type: 'ry-icon-zhiding', size: 16, color: '#000' })
    }
  },
  data() {
    return {
      prefixCls
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`, 'mini-scroll-y']
    },
    // 展示数字
    showCount() {
      return this.type === 'list'
    },
    // 列表个数
    listCount() {
      if (!this.showCount || typeOf(this.data) !== 'array') {
        return 0
      }
      return this.data.length
    },
    // 气泡的属性
    poptipPropsData() {
      const poptipPropsList = {
        trigger: 'hover',
        disabled: false,
        transfer: true,
        'popper-class': '',
        'word-wrap': false,
        'transfer-class-name': '',
        'events-enabled': false
      }
      if (_isEmpty(this.poptipProps)) {
        return poptipPropsList
      }
      let newObj = {}
      let keys = Object.keys(poptipPropsList)
      keys.forEach(key => {
        newObj[key] = this.poptipProps[key]
      })
      newObj = Object.assign({}, poptipPropsList, newObj)
      return newObj
    },
    // 渲染的数据
    renderData() {
      return this.showCount ? this.data : [this.data]
    }
  }
}
</script>
