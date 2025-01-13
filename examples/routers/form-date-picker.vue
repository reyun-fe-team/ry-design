<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-date-picker</h2>
    <rd-form-date-picker
      v-model="datePickerValue"
      label="数据时间："
      :clearable="false"
      :styles="{ width: '240px' }">
      <div
        slot="label"
        class="display-flex align-items-center">
        <span>输入框：</span>
        <Icon
          v-tooltip="`测试测试测试测试测试测试测试测试测试`"
          size="16"
          type="ios-help-circle-outline"></Icon>
      </div>
    </rd-form-date-picker>
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
