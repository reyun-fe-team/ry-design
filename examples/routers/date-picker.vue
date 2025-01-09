<template>
  <div>
    <div>
      开始时间包含今天
      <rd-date-picker
        v-model="time1"
        :confirm="false"
        type="datetimerange"
        width="200px"
        format="yyyy-MM-dd HH:mm:ss"
        start="2024-12-17"
        end="2024-12-30"></rd-date-picker>
    </div>

    <div>
      结束时间包含今天
      <rd-date-picker
        v-model="time2"
        width="200px"
        start="2024-12-10"
        end="2024-12-13"></rd-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time1: [],
      time2: []
    }
  },
  methods: {}
}
</script>
