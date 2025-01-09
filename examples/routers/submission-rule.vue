<template>
  <div class="edit-row-bid">
    <rd-submission-rule
      has-submit-type
      media-code="toutiao"
      :select-form="selectForm"
      :has-delay-submit-time="false"
      @on-change="handleChange"></rd-submission-rule>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectForm: {
        adsSubmitRule: 'NOW',
        adsDelaySubmitTime: '2024-11-18 17:43',
        adsBatchStartTime: '2024-11-18 17:43',
        adsSubmitInterval1: 'FIVE_MINUTE',
        adsSubmitDimension: 'PLAN',
        adsMoreAccount: 'OFF',
        adsSubmitNum1: 1,
        adsRepeatSubmitTime: '2024-11-18 17:43',
        adsSubmitInterval2: 'FIVE_MINUTE',
        adsSubmitNum2: 2
      }
    }
  },
  methods: {
    handleChange(data) {
      console.log('data', data)
      this.selectForm = data.formData
    },
    submitRuleDisabledItemFun(arr) {
      return arr.map(e => {
        let disabled = false
        let tooltip = e.tooltip
        if (e.value === 'DELAY') {
          disabled = true
          tooltip = 'asd'
        }
        return {
          ...e,
          disabled,
          tooltip
        }
      })
    }
  }
}
</script>
