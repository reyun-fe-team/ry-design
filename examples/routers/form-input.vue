<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-input</h2>
    <rd-form-input
      v-model="inputValue"
      label="输入框："
      :clearable="true"
      :styles="{ width: '240px' }"
      @on-blur="handlerBlur" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    handlerBlur() {}
  }
}
</script>
