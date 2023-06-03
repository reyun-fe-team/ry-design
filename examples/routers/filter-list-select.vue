<template>
  <div>
    <h2>filter-list-select事例</h2>
    <section>
      <div style="display: inline-block">
        多选-宽度自适应 {{ selectMultiple }} 事例：{{ selectMultiple }}
        <rd-filter-list-select
          v-model="selectMultiple"
          clearable
          filterable
          :height="200"
          is-select-option
          :data="data"
          multiple>
          <div
            slot="select-item"
            style="line-height: 40px">
            自定义item
          </div>
        </rd-filter-list-select>
      </div>

      <div style="display: inline-block; margin-left: 380px">
        多选组 事例：{{ selectMultiple }}
        <rd-filter-list-select
          v-model="selectMultiple"
          :input-width="400"
          :width="200"
          filterable
          is-select-option
          :data="data"
          :group-name-list="groupNameList"
          multiple
          label="多选">
          <div slot="search-operate">
            <span style="color: #3989faff">刷新</span>
            <span style="margin-right: 10px; color: #3989faff">应用管理</span>
          </div>
        </rd-filter-list-select>
      </div>
    </section>

    <section style="margin-top: 400px">
      <div style="display: inline-block">
        单选{{ selectRadio }}
        <rd-filter-list-select
          v-model="selectRadio"
          :width="400"
          :data="data"
          filterable
          label="单选">
          <div slot="search-operate">
            <span style="color: #3989faff">刷新</span>
            <span style="margin-right: 10px; color: #3989faff">应用管理</span>
          </div>
        </rd-filter-list-select>
      </div>
      <div style="display: inline-block; margin-left: 380px">
        单选{{ selectRadio }}
        <rd-filter-list-select
          v-model="selectRadio"
          :width="400"
          :data="data"
          label="单选"></rd-filter-list-select>
      </div>

      <div style="display: inline-block; margin-left: 380px">
        单选组 selectRadio:{{ selectRadio }}
        <rd-filter-list-select
          v-model="selectRadio"
          :group-name-list="groupNameList"
          :width="400"
          :data="data"
          label="单选"></rd-filter-list-select>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMultiple: ['1104'],
      selectRadio: '',
      groupList: [
        {
          label: '热云数据热云数据热云数据热云数据热云数据热云数据',
          disabled: false,
          children: [
            {
              label: '汕头市添翼01汕头市添翼01汕头市添翼01汕头市添翼01汕头市添翼01',
              value: '1104',
              src: 'https://p3.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_1a800195d0c386c281c4886b50f12536.jpeg?from=4010531038',
              description: 'com.cisbdc.os.con'
            }
          ]
        },
        {
          label: '热云数据13',
          disabled: false,
          children: [
            {
              label: '球球-A1',
              value: '1157',
              description: 'com.cisbdc.os.con',
              src: 'https://p3.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_1a800195d0c386c281c4886b50f12536.jpeg?from=4010531038'
            }
          ]
        },
        {
          label: '热云数据14',
          disabled: false,
          children: [
            {
              label: '预约测试账号',
              value: '204814',
              src: 'https://p3.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_1a800195d0c386c281c4886b50f12536.jpeg?from=4010531038'
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
      ],
      title: {
        title: '三分钟工作室',
        subTitle: '1087677119',
        thumbnailInfo: {
          style: {
            'border-radius': '50%'
          },
          src: 'https://p3.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_1a800195d0c386c281c4886b50f12536.jpeg?from=4010531038'
        }
      }
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