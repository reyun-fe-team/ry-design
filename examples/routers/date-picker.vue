<template>
  <div>
    <rd-date-picker
      v-model="time"
      :start-range="3"
      :end-range="8"></rd-date-picker>
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
