<template>
  <div>
    <p>同步的</p>
    <rd-multi-cascader
      v-model="allListModel"
      :max-tag-placeholder="num => `+${num}`"
      style="width: 400px"
      :echo-label="allListLabels"
      :data="allDataList"
      clearable
      @getLables="getLables"></rd-multi-cascader>

    <p>异步的</p>
    <rd-multi-cascader
      v-model="syncListModel"
      :max-tag-placeholder="num => `+${num}`"
      style="width: 300px"
      :echo-label="syncListLabels"
      :max-request="3"
      sync
      :sync-call-back="syncCallBack"
      :data="syncDataList"
      :max-tag-count="1"
      @getLables="getLables"></rd-multi-cascader>

    <p>大数据量</p>
    <rd-multi-cascader
      v-model="selectReviewUser"
      :max-request="2"
      label-lv="last"
      label-key="name"
      style="width: 320px"
      :data="reviewUserList"></rd-multi-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 同步的
      allListLabels: ['资源-组件交互文档', '指南-设计原则', '指南-导航'],
      allListModel: ['ziyuan-jiaohu', 'zhinan-shejiyuanze', 'zhinan-daohang'],
      allDataList: [
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
                },
                {
                  value: 'xiaolv1',
                  label: '效率1'
                },
                {
                  value: 'kekong1',
                  label: '可控1'
                },
                {
                  value: 'xiaolv2',
                  label: '效率2'
                },
                {
                  value: 'kekong2',
                  label: '可控2'
                },
                {
                  value: 'xiaolv3',
                  label: '效率3'
                },
                {
                  value: 'kekong3',
                  label: '可控3'
                },
                {
                  value: 'xiaolv4',
                  label: '效率4'
                },
                {
                  value: 'kekong4',
                  label: '可控4'
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
      // 异步的
      syncListLabels: ['指南-设计原则', '指南-导航'],
      syncListModel: ['zhinan-shejiyuanze', 'zhinan-daohang'],
      syncDataList: [
        {
          showCheck: true,
          value: 'zhinan',
          label: '指南'
        },
        {
          value: 'ziyuan',
          label: '资源'
        }
      ],

      // 大数据量
      selectReviewUser: [],
      reviewUserList: [
        {
          children: [
            { name: '测试-1', value: 2398 },
            { name: '测试', value: 2265 },
            { name: '测试', value: 2516 }
          ],
          role: 'ADMIN',
          roleName: '管理员',
          name: '管理员',
          value: 'ADMIN'
        },
        {
          children: [
            { name: '球球', value: 2548 },
            { name: '球球', value: 2547 },
            { name: '球球', value: 2546 },
            { name: '神一样的男人', value: 2528 },
            { name: 'zyj', value: 30041 },
            { name: '测试0422', value: 30032 },
            { name: '毕扬', value: 30042 },
            { name: '刘柏良', value: 30082 },
            { name: '1111111', value: 2507 },
            { name: '测试新增员工', value: 2296 },
            { name: '测试新建2', value: 2297 },
            { name: '陈航', value: 30076 },
            { name: '陈琬昱', value: 2271 },
            { name: 'csm1', value: 2413 },
            { name: 'csm2', value: 2414 },
            { name: 'csm3', value: 2415 },
            { name: 'demo', value: 2405 },
            { name: 'demo', value: 2406 },
            { name: 'demo', value: 2407 },
            { name: 'zhangmeng', value: 2459 },
            { name: '傅文', value: 2571 },
            { name: '共享文件夹', value: 2474 },
            { name: '郭亚男', value: 2561 },
            { name: '宇宙1', value: 2286 },
            { name: '宇宙', value: 2472 },
            { name: '郭宇宙5', value: 2287 },
            { name: '宇宙', value: 2270 },
            { name: '和老板', value: 2404 },
            { name: '日本JK', value: 2399 },
            { name: '姜同帅', value: 2554 },
            { name: '吴剑宇', value: 2609 },
            { name: '吉喆', value: 2591 },
            { name: '康文静', value: 2277 },
            { name: 'KIKI', value: 2608 },
            { name: 'zhangmeng', value: 2458 },
            { name: '李大鹏', value: 2422 },
            { name: '李简', value: 2518 },
            { name: '林泽良', value: 2597 },
            { name: 'js-刘鹏飞', value: 2576 },
            { name: '飞帅', value: 2272 },
            { name: '刘伟', value: 2401 },
            { name: '刘雪', value: 2452 },
            { name: '刘旭阳', value: 2601 },
            { name: '李一凡', value: 2552 },
            { name: '鹏帅', value: 2273 },
            { name: '李云召', value: 2550 },
            { name: 'ads123', value: 2492 },
            { name: '马春福', value: 2556 },
            { name: '小米', value: 2276 },
            { name: '堂岛遥香', value: 2448 },
            { name: '南忠锋', value: 2423 },
            { name: '彭芳', value: 30075 },
            { name: '任丽娟', value: 2512 },
            { name: 'sandto', value: 2402 },
            { name: '单通', value: 2275 },
            { name: '石丛林', value: 2283 },
            { name: '审核专用', value: 2555 },
            { name: '史雷', value: 2543 },
            { name: 'siyu.song', value: 30064 },
            { name: '宋小帅', value: 2527 },
            { name: '宋涛哥', value: 2285 },
            { name: '宋小帅', value: 2562 },
            { name: '孙鑫', value: 2279 },
            { name: '宋小帅', value: 2409 },
            { name: 'KDA', value: 2454 },
            { name: '田晓川', value: 2583 },
            { name: '王辰', value: 2580 },
            { name: '王海涛', value: 2278 },
            { name: '宋帅帅', value: 2403 },
            { name: '吴丽萍', value: 2557 },
            { name: '邢保振1', value: 2294 },
            { name: 'Xing2', value: 2569 },
            { name: 'xbz3', value: 2596 },
            { name: '夏经理', value: 2553 },
            { name: '张孝伟', value: 2605 },
            { name: '旭阳', value: 2549 },
            { name: '曹亚楠', value: 2606 },
            { name: '杨玉峰', value: 2520 },
            { name: '张拥杰', value: 2604 },
            { name: 'java-苑志强', value: 2575 },
            { name: '苑志强', value: 2412 },
            { name: '俞大老板', value: 2266 },
            { name: '于桐', value: 2564 },
            { name: '秀', value: 2567 },
            { name: '张波', value: 30065 },
            { name: '春鹏', value: 30079 },
            { name: '张静', value: 2451 },
            { name: '111111', value: 2446 },
            { name: '张猛', value: 2268 },
            { name: '张圣林', value: 2456 },
            { name: '1', value: 2594 },
            { name: '张雨', value: 2559 },
            { name: '赵鹏超', value: 2513 },
            { name: '赵庆伟2', value: 30080 },
            { name: '赵庆伟', value: 2558 },
            { name: '赵涛', value: 2566 },
            { name: '郑高峰', value: 2455 },
            { name: 'js-周博', value: 2574 },
            { name: '周博', value: 2450 },
            { name: '周珊珊', value: 2517 },
            { name: '周天阳', value: 2420 },
            { name: '周文政', value: 2453 },
            { name: 'zuohaitao', value: 2529 },
            { name: '左海涛', value: 30061 },
            { name: 'zht123', value: 2602 },
            { name: 'zuo优化经理', value: 2590 },
            { name: '海涛', value: 2473 },
            { name: '左海涛', value: 2267 }
          ],
          role: 'MANAGER',
          roleName: '优化经理',
          name: '优化经理',
          value: 'MANAGER'
        }
      ]
    }
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
          if (data.value === 'shejiyuanze') {
            list = [
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
          }

          if (data.value === 'daohang') {
            list = [
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

          resolve(list)
        }, 1000)
      })
    }
  }
}
</script>