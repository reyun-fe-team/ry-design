**Select Attributes**

| 参数                | 说明                                                         | 类型     | 可选值                                                       | 默认值   |
| ------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | -------- |
| data                | 用于渲染页面的数据(格式与element的级联选择器的数据格式一致)  | array    | -                                                            | 无       |
| value               | 默认已选择数据项                                             | array    | -                                                            | 无       |
| expand-trigger      | 次级菜单的展开方式                                           | string   | click / hover                                                | click    |
| separator           | 选项分隔符                                                   | string   | -                                                            | 横杆’-’  |
| value-key           | 指定选项的值为选项对象的某个属性值                           | string   | -                                                            | value    |
| label-key           | 指定选项标签为选项对象的某个属性值                           | string   | -                                                            | label    |
| children-key        | 指定选项的子选项为选项对象的某个属性值                       | string   | -                                                            | children |
| clearable           | 是否支持清空选项                                             | boolean  | -                                                            | false    |
| placeholder         | 占位符                                                       | string   | -                                                            | 请选择   |
| popper-class        | 下拉框的类名                                                 | string   | -                                                            | ''       |
| onlyShowChecked     | 是否只显示选中的                                             | boolean  | -                                                            | false    |
| isShowIndeterminate | 是否显示半选                                                 | boolean  | -                                                            | true     |
| selectChildren      | 是否允许父子联动                                             | boolean  | -                                                            | true     |
| maxCount            | 最大选择数 使用该属性不能使用全选功能                                                   | number   | -                                                            | 无       |
| transfer            | 是否放在body下面展示list （在body下面要自己写样式）          | boolean  | -                                                            | false    |
| placement           | 下拉菜单出现的位置 | string   | top，top-start，top-end，bottom，bottom-start，bottom-end，leftleft-start，left-end，right，right-start，right-end | bottom   |
| labelLv             | label显示的层级                                              | string   | all  全部 / 最后一层 last                                    | all      |
| sync                | 异步加载子元素 异步传入数据 sync开启时必填syncCallBack       | boolean  | -                                                            | false    |
| syncCallBack        | 请求数据的回调 sync开启                                      | function | -                                                            | -        |
| maxRequest          | 最大的请求层级 0 为不限制                                    | number  | -                                                            | 0        |
| notSelectNext       | 设置上级的全选不用选择下一级的数据 false 不用选择下一级 true 必选选择下一级 | boolean | @todo                                                        | false    |
| checkKey                     |  每一级别是否可以选择的数据字段，不填写默认显示选择框。tips: 只有在当前层级全部设置为true才会显示复选框和全选框。           | string | - | showCheck |
| echoLabel | 是否要回显labels | array | - | [] |
|                     |                                                              |          |                                                              |          |
|                     |                                                              |          |                                                              |          |
|                     |                                                              |          |                                                              |          |

**Select Events**

| 事件名称       | 说明                               | 回调参数                      |
| -------------- | ---------------------------------- | ----------------------------- |
| change         | 选中值发生变化时触发               | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发              | 出现则为 true，隐藏则为 false |
| remove-tag     | 移除tag时触发                      | 移除的tag值                   |
| clear          | 可清空模式下用户点击清空按钮时触发 | -                             |
| getLables      | 获取对应的labels                   | []                            |



**示例**

```
<template>
  <div id="app">
    <!-- <router-view /> -->
    <IvuMutil style="width: 200px;"
              v-model="list"
              :echoLabel="labels"
              :data="data2"
              sync
              @getLables="getLables"
              :syncCallBack="syncCallBack"></IvuMutil>
  </div>
</template>

<script>
import IvuMutil from '@/components/ivu-multi-cascader'
export default {
  name: 'App',
  data() {
    return {
      list: ['zhinan-shejiyuanze', 'zhinan-daohang'],
      labels: ['指南-设计原则', '指南-导航'],
      data: [
        {
          showCheck: true,
          value: 'zhinan',
          label: '指南',
          children: [
            {
              showCheck: true,
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      data2: [
        {
          showCheck: true,
          value: 'zhinan',
          label: '指南'
        },
        {
          value: 'ziyuan',
          label: '资源'
        }
      ]
    }
  },
  components: {
    IvuMutil
  },
  methods: {
    getLables(lbs) {
      this.labels = lbs
    },
    syncCallBack(data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let list = []
          if (data.value === 'zhinan') {
            list = [
              {
                value: 'shejiyuanze',
                label: '设计原则'
              },
              {
                value: 'daohang',
                label: '导航'
              }
            ]
          }
          if (data.value === 'ziyuan') {
            list = [
              {
                value: 'a',
                label: 'A'
              },
              {
                value: 'b',
                label: 'B'
              }
            ]
          }

          resolve(list)
        }, 1000)
      })
    }
  }
}
</script>
```

