<template>
  <main>
    <rd-multi-radio-button v-model="value1"
                           :button-list="buttonList1"></rd-multi-radio-button>
    <br />
    <rd-multi-radio-button v-model="value2"
                           all-triangle
                           :button-list="buttonList2"></rd-multi-radio-button>
  </main>
</template>
<script>
export default {
  data() {
    return {
      value1: [],
      value2: [],
      buttonList1: [
        {
          label: '不限',
          value: ''
        },
        {
          label: '自定义1',
          value: 'CUSTOM'
        },
        {
          label: '自定义2',
          value: 'CUSTOM2'
        }
      ],
      buttonList2: [
        {
          label: '自定义1',
          value: 'CUSTOM'
        },
        {
          label: '自定义2',
          value: 'CUSTOM2'
        },
        {
          label: '自定义3',
          value: 'CUSTOM3'
        }
      ]
    };
  }
};
</script>