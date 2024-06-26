<template>
  <div class="edit-row-bid">
    <rd-submission-rule
      media-code="toutiao"
      @on-change="handleChange"></rd-submission-rule>
  </div>
</template>

<script>
export default {
  methods: {
    handleChange(data) {
      console.log('data', data)
    }
  }
}
</script>
