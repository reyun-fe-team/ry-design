<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-date-picker</h2>
    <formDatePicker
      v-model="datePickerValue"
      label="数据时间："
      :clearable="true"
      :styles="{ width: '240px' }" />
  </main>
</template>

<script>
import formDatePicker from '@src/components/business/form-date-picker/form-date-picker'
export default {
  components: {
    formDatePicker
  },
  data() {
    return {
      datePickerValue: []
    }
  },
  methods: {}
}
</script>
