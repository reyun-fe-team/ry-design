<template>
  <main>
    <rd-cascader-transfer
      v-model="region"
      title="区域"
      :datas="cityList"></rd-cascader-transfer>
  </main>
</template>
<script>
export default {
  data() {
    return {
      region: [],
      cityList: [
        {
          label: '北京',
          value: 11,
          children: [
            {
              label: '东城区',
              value: 110101
            },
            {
              label: '西城区',
              value: 110102,
              children: [
                {
                  label: '什刹海街道',
                  value: 1101021
                },
                {
                  label: '广安门外街道',
                  value: 1101022
                }
              ]
            },
            {
              label: '朝阳区',
              value: 110105
            }
          ]
        },
        {
          label: '天津',
          value: 12,
          children: [
            {
              label: '和平区',
              value: 120101
            },
            {
              label: '河东区',
              value: 120102
            }
          ]
        }
      ]
    }
  }
}
</script>