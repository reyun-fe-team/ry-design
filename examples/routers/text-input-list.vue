<template>
  <div style="margin: 20px">
    {{ list }}
    <rd-text-input-list
      v-model="list"
      :last-max="10" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  }
}
</script>
