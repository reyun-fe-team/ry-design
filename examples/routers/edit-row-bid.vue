<!--
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-14 14:30:52
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-15 18:24:05
 * @FilePath: /ry-design/examples/routers/edit-row-bid.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <main class="edit-row-bid">
    <div>
      <span>输入文本</span>
      <rd-edit-row-bid :value="value"
                       showTextLimit
                       :maxTextNum="10"
                       :calcTextNumFunc="calcTextNumFunc"
                       title="输入文本"
                       :rules="rules"
                       :confirmFunc="confirmText"></rd-edit-row-bid>
    </div>
    <br>
    <div>
      <span>输入数字</span>
      <rd-edit-row-bid type="number"
                       :precision="2"
                       :numberMin="5"
                       :numberMax="90"
                       :numberStep="1"
                       :value="num"
                       title="输入数字"
                       :rules="rulesNum"
                       :confirmFunc="confirmNum"></rd-edit-row-bid>
    </div>
    <br>
    <div>
      <span>单选</span>
      <rd-edit-row-bid type="radio"
                       iconType="md-build"
                       :poptipDisabled="false"
                       :poptipWidth="500"
                       :poptipShowFunc="poptipShowFunc"
                       :poptipHideFunc="poptipHideFunc"
                       :beforeShowFunc="beforeShowFunc"
                       :radioList="radioList"
                       :value="radio"
                       title="单选"
                       :rules="rulesRadio"
                       :confirmFunc="confirmRadio"></rd-edit-row-bid>
    </div>
    <br>
    <div>
      <span>自定义</span>
      <rd-edit-row-bid type="custom"
                       :showFooter="false"
                       placement="right"
                       title="自定义">
        <template #iconType>
          <a>+</a>
        </template>
        <template #title>
          自定义插槽标题
        </template>
        <template #custom>
          <span>自定义内容</span>
          <input type="text"
                 v-model="customText">
        </template>
      </rd-edit-row-bid>
    </div>

  </main>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      customText: '自定义内容',
      value: '测试文本',
      rules: [
        {
          validator: (rule, value, callback) => {
            return new Promise((resolve, reject) => {
              if (value.length > 10) {
                reject(new Error('不能大于10个字符'))
              } else {
                resolve()
              }
            })
          }
        }
      ],
      num: 123,
      rulesNum: [
        {
          validator: (rule, value, callback) => {
            return new Promise((resolve, reject) => {
              if (value > 100) {
                reject(new Error('不能大于100'))
                return
              }
              if (value < 1) {
                reject(new Error('不能小于1'))
                return
              }
              resolve()
            })
          }
        }
      ],
      radio: '1',
      radioList: [
        {
          value: '1',
          name: '第一个',
          disabled: false
        },
        {
          value: '2',
          name: '第二个',
          disabled: false
        },
        {
          value: '3',
          name: h => {
            const tips = h(
              'Tooltip',
              {
                props: {
                  transfer: true,
                  content: '被禁用了!'
                }
              },
              [h('Icon', { props: { type: 'ios-help-circle', size: 16 } })]
            )
            return h('span', ['第三个', tips])
          },
          disabled: true
        }
      ],
      rulesRadio: [
        {
          validator: (rule, value, callback) => {
            return new Promise((resolve, reject) => {
              const find = this.radioList.find(val => val.value === value)
              if (find) {
                resolve()
                return
              }
              reject(new Error('选择的数据不对'))
            })
          }
        }
      ]
    }
  },
  methods: {
    beforeShowFunc() {
      console.log('您点击了显示')
    },
    // 打开了
    poptipShowFunc() {
      console.log('打开了')
    },
    // 关闭了
    poptipHideFunc() {
      console.log('关闭了')
    },
    confirmRadio(value) {
      this.radio = value
      return Promise.resolve()
    },
    confirmText(value) {
      this.value = value
      return Promise.resolve()
    },
    confirmNum(num) {
      return new Promise((resolve, reject) => {
        if (typeof num === 'number') {
          this.num = num
          resolve()
          return
        }
        reject()
      })
    },
    calcTextNumFunc(val) {
      return val.length
    }
  }
}
</script>
