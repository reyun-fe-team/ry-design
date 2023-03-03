<template>
  <div :class="[prefixCls]">
    <DatePicker
      ref="rd-date-picker-inner"
      v-model="selDate"
`      type="daterange"
      :transfer="transfer"
      :confirm="confirm"
      :clearable="clearable"
      :options="getDateOptions"
      :format="format"
      :placement="placement"
      :placeholder="placeholder"
      :size="size"
      @click.native="nativeClick"
      @on-open-change="handleOpenChange"
      @on-change="handleChange"
      @on-ok="handleOk"
      @on-clear="handleClear"
      @on-clickoutside="handleClickoutside"></DatePicker>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'date-picker'
import { getShortcutsOptionsList, shortcutsList } from './data'
export default {
  name: prefixCls,
  props: {
    value: {
      default: () => []
    },
    transfer: {
      type: Boolean,
      default: false
    },
    clearable: {
      default: true
    },
    confirm: {
      type: Boolean,
      default: true
    },
    // 左侧快捷方式
    shortcuts: {
      type: Array,
      default: () => []
    },
    // 禁止选择日期
    disabledDate: {
      type: Function,
      default: () => {}
    },
    // 格式化日期展现形式
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    // 弹窗出现位置
    placement: {
      type: String,
      default: 'bottom-end'
    },
    // 提示文案
    placeholder: {
      type: String,
      default: '选择日期'
    },
    size: {
      type: String
    },
    start: {
      type: String
    },
    end: {
      type: String
    },
    limit: {
      type: String
    },
    // 是否显示快捷操作项
    showShortcuts: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => {}
    },
    // 前置范围
    startRange: {
      type: Number,
      default: null
    },
    endRange: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      selDate: this.$props.value
    }
  },
  computed: {
    // 获取基础配置
    getDateOptions({ options }) {
      let self = this
      let { selStart } = self

      let shortcuts = []

      // 是否开启快捷操作
      if (this.showShortcuts) {
        const optionsList = getShortcutsOptionsList(selStart, self)

        // 左侧快速选择功能，传入参数优先级高于默认操作列
        let _shortcuts = this.shortcuts && this.shortcuts.length ? this.shortcuts : shortcutsList

        optionsList.forEach(item => {
          let { id } = item
          if (_shortcuts.indexOf(id) !== -1) {
            shortcuts.push(item)
          }
        })
      }

      // 禁选按钮
      let disabledDate = date => {
        var config = false
        if (this.limit) {
          config = config || date < new Date(this.limit)
        }
        if (this.selStart) {
          config = new Date(this.selStart) > date
        }
        if (this.selEnd) {
          config = config || date > new Date(this.selEnd)
        }
        return config
      }
      return {
        disabledDate,
        shortcuts,
        ...options
      }
    }
  },
  watch: {
    value: function (value) {
      this.selDate = value
    }
  },
  mounted() {
    this.injection()
  },
  methods: {
    injection() {
      if (this.$refs['ry-date-picker-com']) {
        this.$refs['ry-date-picker-com'].$refs.pickerPanel.$on('on-pick-click', this.onPick)
      }
    },
    // 设置日期跨度
    onPick() {
      if (this.startRange || this.endRange) {
        const rangeState = this.$refs['ry-date-picker-com'].$refs.pickerPanel.rangeState
        if (rangeState.from && rangeState.selecting) {
          let star = new Date(rangeState.from)
          let starRange = 0
          if (this.startRange) {
            starRange = this.startRange
          } else {
            starRange = Math.floor((star.getTime() - new Date(this.start).getTime()) / 86400000)
          }
          star.setDate(star.getDate() - (starRange + 1))
          let end = new Date(rangeState.from)
          let endRange = 0
          if (this.endRange) {
            endRange = this.endRange
          } else {
            endRange = Math.floor((new Date(this.end).getTime() - end.getTime()) / 86400000)
          }
          end.setDate(end.getDate() + endRange)
          this.selStart = $_moment(star)
          this.selEnd =
            new Date(end).getTime() > new Date().getTime() ? $_moment(new Date()) : $_moment(end)
        } else {
          this.selStart = this.start
          this.selEnd = this.end
        }
      }
    },
    // 返回上一个月的第一天Date类型
    getPriorMonthFirstDay(year, month) {
      // 年份为0代表,是本年的第一月,所以不能减
      if (month === 0) {
        month = 11 // 月份为上年的最后月份
        year-- // 年份减1
        return new Date(year, month, 1)
      }
      // 否则,只减去月份
      month--
      return new Date(year, month, 1)
    },
    // 获得该月的天数
    getMonthDays(year, month) {
      // 本月第一天 1-31
      var relativeDate = new Date(year, month, 1)
      // 获得当前月份0-11
      var relativeMonth = relativeDate.getMonth()
      // 获得当前年份4位年
      var relativeYear = relativeDate.getFullYear()
      // 当为12月的时候年份需要加1
      // 月份需要更新为0 也就是下一年的第一个月
      if (relativeMonth === 11) {
        relativeYear++
        relativeMonth = 0
      } else {
        // 否则只是月份增加,以便求的下一月的第一天
        relativeMonth++
      }
      // 一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24
      // 下月的第一天
      var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1)
      // 返回得到上月的最后一天,也就是本月总天数
      return new Date(nextMonthDayOne.getTime() - millisecond).getDate()
    },
    // 得到上季度的起始日期
    getPriorSeasonFirstDay(year, month) {
      // 春
      var spring = 0
      // 夏
      var summer = 3
      // 秋
      var fall = 6
      // 冬
      var winter = 9
      // 月份从0-11
      // 季度的其实月份
      switch (month) {
        case spring:
          // 如果是第一季度则应该到去年的冬季
          year--
          month = winter
          break
        case summer:
          month = spring
          break
        case fall:
          month = summer
          break
        case winter:
          month = fall
          break
      }
      return new Date(year, month, 1)
    },
    // 得到本季度开始的月份
    getQuarterSeasonStartMonth(month) {
      // 春
      var spring = 0
      // 夏
      var summer = 3
      // 秋
      var fall = 6
      // 冬
      var winter = 9
      // 月份从0-11
      if (month < 3) {
        return spring
      }
      if (month < 6) {
        return summer
      }
      if (month < 9) {
        return fall
      }
      return winter
    },
    // 弹出日历和关闭日历时触发
    handleOpenChange() {},
    // 日期发生变化时触发
    handleChange(date) {
      if (new Date(this.start) > new Date(date[0]) || new Date(this.end) < new Date(date[1])) {
        this.$Message.info('时间范围超出，请确认')
        return false
      }
      this.selDate = date
      if (!this.confirm) {
        this.$emit('input', this.selDate)
        this.$emit('on-ok', this.selDate)
      }
    },
    // 在 confirm 模式下有效，点击确定按钮时触发
    handleOk() {
      let isLength = !this.selDate.length
      let isInvalid = this.selDate[0] === 'Invalid date' || this.selDate[1] === 'Invalid date'
      let isEmpty = this.selDate[0] === '' || this.selDate[1] === ''

      if (isLength || isInvalid || isEmpty) {
        this.$Message.info('时间筛选不能为空')
        return false
      }
      if (
        new Date(this.start) > new Date(this.selDate[0]) ||
        new Date(this.end) < new Date(this.selDate[1])
      ) {
        this.$Message.info('时间范围超出，请确认')
        return false
      }
      if (this.format === 'yyyy-MM-dd') {
        this.selDate = [$_moment(this.selDate[0]), $_moment(this.selDate[1])]
      }
      this.$emit('input', this.selDate)
      this.$emit('on-ok', this.selDate)
    },
    // 在 confirm 模式或 clearable = true 时有效，在清空日期时触发
    handleClear() {
      const date = ['', '']
      this.$emit('input', date)
      this.$emit('on-clear', date)
    },
    // 点击外部关闭下拉菜单时触发
    handleClickoutside() {
      this.ids = new Date().getTime()
      this.selStart = this.start
      this.selEnd = this.end
      this.$nextTick(() => {
        this.injection()
      })
      this.$emit('on-clickoutside')
    },
    // 点击
    nativeClick() {
      const target = this.$refs['rd-date-picker-inner'].$refs['pickerPanel']
      this.$emit('on-click', target)
    }
  }
}
</script>
