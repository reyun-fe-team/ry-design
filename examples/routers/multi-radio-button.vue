<template>
  <div>
    <rd-multi-radio-button
      v-model="value"
      :button-list="buttonList"
      :disabled="handleDisabled"></rd-multi-radio-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      buttonList: [
        {
          label: '多选自定义1',
          value: 'CUSTOM1',
          isMulti: true,
          tip: ['1.多选tip1', '2.多选tip2']
        },
        {
          label: '多选自定义2',
          value: 'CUSTOM2',
          isMulti: true
        },
        {
          label: '单选自定义3',
          value: 'CUSTOM3',
          isMulti: false
        },
        {
          label: '单选自定义4',
          value: 'CUSTOM4',
          isMulti: false
        }
      ]
    }
  },
  methods: {
    handleDisabled(item) {
      if (item.value === 'CUSTOM4') {
        return true
      }
      return false
    }
  }
}
</script>