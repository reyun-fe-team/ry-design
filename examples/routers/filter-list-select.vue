<template>
  <div>
    <h2>filter-list-select事例</h2>
    <div style="display: inline-block">
      多选-宽度自适应
      <rd-filter-list-select
        v-model="selectMultiple"
        :data="data"
        multiple
        label="多选"></rd-filter-list-select>
    </div>

    <div style="display: inline-block; margin-left: 380px">
      多选组
      <rd-filter-list-select
        v-model="selectMultiple"
        :input-width="400"
        :width="200"
        :data="data"
        :group-name-list="groupNameList"
        multiple
        label="多选"></rd-filter-list-select>
    </div>

    <div style="display: inline-block; margin-left: 380px">
      单选{{ select }}
      <rd-filter-list-select
        v-model="select"
        :width="200"
        :data="data"
        label="单选"></rd-filter-list-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMultiple: ['1104'],
      select: ['1104'],
      groupList: [
        {
          label: '热云数据热云数据热云数据热云数据热云数据热云数据',
          disabled: false,
          children: [
            {
              label: '汕头市添翼01汕头市添翼01汕头市添翼01汕头市添翼01汕头市添翼01',
              value: '1104'
            }
          ]
        },
        {
          label: '热云数据13',
          disabled: false,
          children: [
            {
              label: '球球-A1',
              value: '1157'
            }
          ]
        },
        {
          label: '热云数据14',
          disabled: false,
          children: [
            {
              label: '预约测试账号',
              value: '204814'
            },
            {
              label: '预约测试账号2',
              value: '19783809'
            }
          ]
        },
        {
          label: '热云数据15',
          disabled: false,
          children: [
            {
              label: '精灵02',
              value: '19858972'
            },
            {
              label: '精灵03',
              value: '19858222'
            },
            {
              label: '精灵04',
              value: '19858970'
            }
          ]
        },
        {
          label: '热云数据16',
          disabled: false,
          children: [
            {
              label: '欣网01',
              value: '204822'
            }
          ]
        },
        {
          label: '热云数据17',
          disabled: false,
          children: [
            {
              label: '热云06',
              value: '9946'
            },
            {
              label: '热云07',
              value: '99461'
            },
            {
              label: '热云08',
              value: '99462'
            },
            {
              label: '热云09',
              value: '99463'
            },
            {
              label: '热云100',
              value: '99464'
            }
          ]
        }
      ]
    }
  },
  computed: {
    groupNameList() {
      let params = {}
      this.groupList.forEach(item => {
        const key = item.children[0].value
        params[key] = item.label
      })
      return params
    },
    data() {
      let list = []
      this.groupList.forEach(item => {
        list = [...list, ...item.children]
      })
      return list
    }
  },
  mounted() {},
  methods: {}
}
</script>