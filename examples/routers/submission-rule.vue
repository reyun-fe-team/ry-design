<template>
  <div class="edit-row-bid">
    <rd-submission-rule
      media-code="toutiao"
      :select-form="selectForm"
      @on-change="handleChange"></rd-submission-rule>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectForm: {
        adsSubmitRule: 'DELAY',
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
    }
  }
}
</script>
