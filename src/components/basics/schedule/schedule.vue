<template>
  <div
    :id="componentId"
    :class="prefixCls">
    <div
      :class="[
        prefixCls + '-cover',
        {
          [prefixCls + '-cover-notransi']: mode
        }
      ]"
      :style="styleValue"></div>
    <table
      :class="[prefixCls + '-table', { [prefixCls + '-min-table']: colspan < 2 }]"
      @mouseleave="tableMouseleave">
      <thead :class="prefixCls + '-table-head'">
        <tr>
          <th
            rowspan="8"
            :class="prefixCls + '-table-head-week-td'">
            星期/时间
          </th>
          <th :colspan="12 * colspan">00:00~12:00</th>
          <th :colspan="12 * colspan">12:00~24:00</th>
        </tr>
        <tr>
          <td
            v-for="t in theadArr"
            :key="t"
            :colspan="colspan">
            {{ t }}
          </td>
        </tr>
      </thead>
      <tbody :class="prefixCls + '-table-body'">
        <tr
          v-for="t in weekData"
          :key="t.row">
          <td>{{ t.value }}</td>
          <td
            v-for="n in t.child"
            :key="`${n.row}-${n.col}`"
            :data-week="n.row"
            :data-time="n.col"
            :data-title="n.week + n.value"
            :class="selectClasses(n)"
            @mouseenter="cellEnter(n)"
            @mousedown="cellDown(n)"
            @mouseup="cellUp(n)"></td>
        </tr>
      </tbody>
    </table>
    <div :class="prefixCls + '-preview'">
      <div
        v-if="selectState"
        :class="prefixCls + '-preview-con'">
        <span>已选择时间段</span>
        <a @click.prevent="onClear">清空</a>
      </div>
      <div
        v-else
        :class="prefixCls + '-preview-con-tip'">
        可拖动鼠标选择时间段
      </div>
      <div
        v-if="selectState"
        :class="prefixCls + '-preview-time'">
        <template v-for="item in selectValue">
          <p
            v-if="item.value"
            :key="item.id">
            <span :class="prefixCls + '-preview-time-label'">{{ item.week }}</span>
            <span :class="prefixCls + '-preview-time-value'">{{ item.value }}</span>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'schedule'
import {
  createArr,
  createWeekData,
  splicing,
  createSheetStates
} from '../../../util/rd-schedule-utils.js'
import { getKey } from '../../../util/assist.js'

export default {
  name: prefixCls,
  props: {
    value: {
      type: String,
      default: ''
    },
    weekList: {
      type: Array,
      default: () => ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    },
    colspan: {
      type: Number,
      default: 1
    },
    // 是否获取白色的块数据-百度独有
    whiteData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      componentId: '',
      theadArr: [],
      weekData: [],
      sheetStates: '',
      remarkHTML: [],
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      mode: 0,
      row: 0,
      col: 0,
      last: null,
      isLeave: false
    }
  },
  computed: {
    styleValue() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        left: `${this.left}px`,
        top: `${this.top}px`
      }
    },
    selectValue() {
      return this.remarkHTML
    },
    selectState() {
      return this.remarkHTML.some(ret => ret.value)
    },
    selectClasses() {
      return n => (n.check ? `${prefixCls}-table-body-td-selected` : '')
    }
  },
  created() {
    this.init()
    this.componentId = `rd-schedule-${getKey()}`
    window.addEventListener('mouseup', this.windowMouseup)
    window.addEventListener('mousedown', this.windowMousedown)
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.windowMouseup)
    window.removeEventListener('mousedown', this.windowMousedown)
  },
  methods: {
    init() {
      this.theadArr = createArr(24)
      this.weekData = createWeekData(this.weekList, this.colspan)
      this.sheetStates = createSheetStates(this.value, this.colspan)
      this.updateSheetStates()
      this.updateRemarks()
      this.getSheetStates()
    },
    cellEnter(item) {
      const ele = document.querySelector(
        `#${this.componentId} td[data-week='${item.row}'][data-time='${item.col}']`
      )
      if (ele && !this.mode) {
        this.left = ele.offsetLeft
        this.top = ele.offsetTop
      } else if (item.col <= this.col && item.row <= this.row) {
        this.width = (this.col - item.col + 1) * ele.offsetWidth
        this.height = (this.row - item.row + 1) * ele.offsetHeight
        this.left = ele.offsetLeft
        this.top = ele.offsetTop
      } else if (item.col >= this.col && item.row >= this.row) {
        this.width = (item.col - this.col + 1) * ele.offsetWidth
        this.height = (item.row - this.row + 1) * ele.offsetHeight
        if (item.col > this.col && item.row === this.row) {
          this.top = ele.offsetTop
        }
        if (item.col === this.col && item.row > this.row) {
          this.left = ele.offsetLeft
        }
      } else if (item.col > this.col && item.row < this.row) {
        this.width = (item.col - this.col + 1) * ele.offsetWidth
        this.height = (this.row - item.row + 1) * ele.offsetHeight
        this.top = ele.offsetTop
      } else if (item.col < this.col && item.row > this.row) {
        this.width = (this.col - item.col + 1) * ele.offsetWidth
        this.height = (item.row - this.row + 1) * ele.offsetHeight
        this.left = ele.offsetLeft
      }
      this.last = item
    },
    cellDown(item) {
      const ele = document.querySelector(
        `#${this.componentId} td[data-week='${item.row}'][data-time='${item.col}']`
      )
      this.check = Boolean(item.check)
      this.mode = 1
      if (ele) {
        this.width = ele.offsetWidth
        this.height = ele.offsetHeight
      }

      this.row = item.row
      this.col = item.col
      this.isLeave = false
    },
    cellUp(item) {
      if (item.col <= this.col && item.row <= this.row) {
        this.selectWeek([item.row, this.row], [item.col, this.col], !this.check)
      } else if (item.col >= this.col && item.row >= this.row) {
        this.selectWeek([this.row, item.row], [this.col, item.col], !this.check)
      } else if (item.col > this.col && item.row < this.row) {
        this.selectWeek([item.row, this.row], [this.col, item.col], !this.check)
      } else if (item.col < this.col && item.row > this.row) {
        this.selectWeek([this.row, item.row], [item.col, this.col], !this.check)
      }

      this.width = 0
      this.height = 0
      this.mode = 0
      this.last = null
    },
    tableMouseleave() {
      this.isLeave = true
    },
    selectWeek(row, col) {
      const [minRow, maxRow] = row
      const [minCol, maxCol] = col
      let selected = []
      this.weekData.forEach(item => {
        let arr = item.child.filter(
          t => t.row >= minRow && t.row <= maxRow && t.col >= minCol && t.col <= maxCol
        )
        // 查找符合范围的
        selected = selected.concat(arr)
      })
      // 只要有一项未选中，那么本次勾选，否则取消勾选
      let isCheck = selected.every(e => e.check)
      selected.forEach(e => {
        this.$set(e, 'check', !isCheck)
      })

      this.handleCallback()
    },
    onClear() {
      this.weekData.forEach(item => {
        item.child.forEach(e => {
          this.$set(e, 'check', false)
        })
      })
      this.handleCallback()
    },

    // utils
    handleCallback() {
      this.getSheetStates()
      this.updateRemarks()
    },
    // 获取表格选择状态
    getSheetStates() {
      let sheetStates = []
      this.weekData.forEach(item => sheetStates.push(item.child.map(e => Number(e.check))))
      // sheetStates = [7 * [24]]
      this.sheetStates = sheetStates.flat().join('')
      this.$emit('input', this.sheetStates)
      this.$emit('on-change', this.sheetStates)
      if (this.whiteData) {
        let whiteBlock = this.getWhiteBlockData(sheetStates)
        this.$emit('on-white-block', whiteBlock)
      }
    },
    // 刷新表格选择状态
    updateSheetStates(value) {
      let data = value || this.sheetStates
      this.weekData.forEach((item, index) => {
        item.child.forEach((e, i) => {
          let active = index * item.child.length + i
          let check = data[active] === '1'
          this.$set(e, 'check', check)
        })
      })
    },
    // 设置备注栏
    updateRemarks() {
      this.remarkHTML = this.weekData.map(item => {
        return {
          id: item.row,
          week: item.value,
          value: splicing(item.child)
        }
      })
    },
    // 获取白色块数据
    getWhiteBlockData(sheetStates) {
      const defaultEndHour = 24
      let result = []

      sheetStates.forEach((weekList, weekIndex) => {
        let selectDays = weekList.filter(e => e === 1)
        let weekDay = weekIndex + 1

        // 全不选
        if (selectDays.length === 0) {
          result.push({ weekDay, startHour: 0, endHour: defaultEndHour })
        }
        // 已选，非全选
        let isHas = selectDays.length && selectDays.length !== weekList.length
        if (isHas) {
          let startHourIndex = 0
          weekList.forEach(() => {
            let startHour = weekList.indexOf(0, startHourIndex)
            let endHour = weekList.indexOf(1, startHour + 1)
            endHour = endHour !== -1 ? endHour : defaultEndHour
            if (startHour !== -1) {
              result.push({
                weekDay,
                startHour,
                endHour
              })
              startHourIndex = endHour
            }
          })
        }
        // 全选什么都不做
      })
      return result
    },

    // 监听事件
    windowMouseup() {
      if (this.isLeave && this.last) {
        this.cellUp(this.last)
      }
    },
    windowMousedown() {
      this.last = null
    }
  }
}
</script>