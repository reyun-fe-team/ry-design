<template>
  <main>

    {{selectedKeys}}
    <hr>
    {{selectedData}}

    <ry-transfer
      :data="data"
      filterable
      @on-keys-change="selectedKeys=$event"
      @on-data-change="selectedData=$event"
    ></ry-transfer>
  </main>
</template>

<script>
export default {
  data() {
    return {
      selectedKeys: [],
      selectedData: [],
      data: [
        {
          title: "我是a",
          data: [
            {
              key: "1",
              label: "a" + 1,
              description: "a的描述a的描述a的描述a的描述  " + 1,
              disabled: false
            },
            {
              key: "2",
              label: "a" + 2,
              description: "a的描述  " + 2,
              disabled: true
            },
            {
              key: "3",
              label: "a" + 3,
              description: "a的描述  " + 3,
              disabled: false
            },
            {
              key: "4",
              label: "a" + 4,
              description: "a的描述  " + 4,
              disabled: true
            },
            {
              key: "5",
              label: "a" + 5,
              description: "a的描述  " + 5,
              disabled: false
            },
            {
              key: "6",
              label: "a" + 6,
              description: "a的描述  " + 6,
              disabled: false
            }
          ]
          // selected: [],
          // renderFormat(item) { // 自定义内容 默认渲染label
          //   return item.label + ' - ' + item.description
          // }
        },
        {
          title: "我是b",
          data: [
            {
              key: "7",
              label: "b" + 7,
              description: "b的描述  " + 7,
              disabled: false,
              noMove: "left"
            },
            {
              key: "8",
              label: "b" + 8,
              description: "b的描述  " + 8,
              disabled: false,
              noMove: "right"
            },
            {
              key: "100",
              label: "b" + 100,
              description: "b的描述  " + 100,
              disabled: false,
              noMove: ""
            },
            {
              key: "200",
              label: "b" + 200,
              description: "b的描述  " + 200,
              disabled: false
            }
          ]
          // selected: ['7'],
          // renderFormat(item) {
          //   return item.label + ' - ' + item.description
          // }
        },
        {
          title: "我是c",
          data: [
            {
              key: "9",
              label: "c" + 9,
              description: "c的描述  " + 9,
              disabled: false,
              noMove: "left"
            },
            {
              key: "10",
              label: "c" + 10,
              description: "c的描述  " + 10,
              disabled: false
            }
          ]
          // selected: []
          // renderFormat(item) {
          //   return item.label + " - " + item.description;
          // }
        }
        //  {
        //     title: '我是d',
        //     data: [
        //         {
        //             key: '11',
        //             label: 'd' + 11,
        //             description: 'd的描述  ' + 11,
        //             disabled: false
        //         },
        //         {
        //             key: '12',
        //             label: 'd' + 12,
        //             description: 'd的描述  ' + 12,
        //             disabled: false
        //         }
        //     ]
        //     // selected: []
        //     // renderFormat(item) {
        //     //   return item.label + " - " + item.description;
        //     // }
        //  },
        //  {
        //     title: '我是e',
        //     data: [
        //         {
        //             key: '13',
        //             label: 'e' + 13,
        //             description: 'e的描述  ' + 13,
        //             disabled: false
        //         },
        //         {
        //             key: '14',
        //             label: 'e' + 14,
        //             description: 'e的描述  ' + 14,
        //             disabled: false
        //         }
        //     ]
        //     // selected: []
        //     // renderFormat(item) {
        //     //   return item.label + " - " + item.description;
        //     // }
        //  }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
