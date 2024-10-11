<template>
  <main>
    <rd-cascader-transfer
      v-model="region"
      title="区域"
      :datas="cityList"
      select-bottom-value></rd-cascader-transfer>
    <br />
    <rd-cascader-transfer
      v-model="region2"
      title="区域2"
      :datas="cityList2"
      is-selected-search
      is-export
      selected-label-name="labelAll"></rd-cascader-transfer>
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
      ],
      region2: [],
      cityList2: [
        {
          label: '北京',
          value: '11',
          valueAll: '11',
          labelAll: '北京',
          children: [
            {
              label: '东城区',
              value: '110101',
              valueAll: '11-110101',
              labelAll: '北京-东城区'
            },
            {
              label: '西城区',
              value: '110102',
              valueAll: '11-110102',
              labelAll: '北京-西城区',
              children: [
                {
                  label: '什刹海街道',
                  value: '1101021',
                  valueAll: '11-110102-1101021',
                  labelAll: '北京-西城区-什刹海街道'
                },
                {
                  label: '广安门外街道',
                  value: '1101022',
                  valueAll: '11-110102-1101022',
                  labelAll: '北京-西城区-广安门外街道'
                }
              ]
            },
            {
              label: '朝阳区',
              value: '110105',
              valueAll: '11-110105',
              labelAll: '北京-朝阳区'
            }
          ]
        },
        {
          label: '天津',
          value: '12',
          valueAll: '12',
          labelAll: '天津',
          children: [
            {
              label: '和平区',
              value: '120101',
              valueAll: '12-120101',
              labelAll: '天津-和平区'
            },
            {
              label: '河东区',
              value: '120102',
              valueAll: '12-120102',
              labelAll: '天津-河东区'
            }
          ]
        }
      ]
    }
  }
}
</script>