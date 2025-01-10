<template>
  <main>
    <h2 style="margin: 24px 0">rd-form-input</h2>
    <rd-form-input
      v-model="inputValue"
      label="输入框："
      :clearable="true"
      :styles="{ width: '240px' }"
      @on-blur="handlerBlur">
      <div
        slot="label"
        class="display-flex align-items-center">
        <span>输入框：</span>
        <Icon
          v-tooltip="`测试测试测试测试测试测试测试测试测试`"
          size="16"
          type="ios-help-circle-outline"></Icon>
      </div>
    </rd-form-input>
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
