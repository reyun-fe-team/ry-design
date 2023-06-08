<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-input</h2>
    <form-input
      v-model="inputValue"
      label="输入框："
      :clearable="true"
      :styles="{ width: '240px' }"
      @on-blur="handlerBlur" />
  </main>
</template>

<script>
import formInput from '@src/components/business/form-input/form-input.vue'
export default {
  components: {
    formInput
  },
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
