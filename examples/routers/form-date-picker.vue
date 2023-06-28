<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-date-picker</h2>
    <rd-form-date-picker
      v-model="datePickerValue"
      label="数据时间："
      :clearable="false"
      :styles="{ width: '240px' }" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      datePickerValue: []
    }
  },
  methods: {}
}
</script>
