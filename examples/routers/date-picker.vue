<template>
  <div>
    <div>
      开始时间包含今天
      <rd-date-picker
        v-model="time"
        width="200px"
        start="2024-12-13"
        end="2024-12-18"></rd-date-picker>
    </div>

    <div>
      结束时间包含今天
      <rd-date-picker
        v-model="time"
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
      time: []
    }
  },
  methods: {}
}
</script>
