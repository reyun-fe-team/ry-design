<template>
  <div style="margin: 0 auto; width: 500px">
    <div>
      <b style="margin-right: 10px">列表展示-多组-组名称/序号</b>
      <rd-digital-details-tooltip
        :count="10"
        type="list"
        :data="listData"></rd-digital-details-tooltip>
      <br />
      <br />
      <b style="margin-right: 10px">列表展示-单组-无组名称-无序号</b>
      <rd-digital-details-tooltip
        type="list"
        :data="listData2"></rd-digital-details-tooltip>
      <br />
      <br />
      <b style="margin-right: 10px">表格展示</b>
      <rd-digital-details-tooltip
        type="table"
        :columns="columns"
        :table-detail-data="tableData"></rd-digital-details-tooltip>
      <br />
      <br />
      <b style="margin-right: 10px">表格展示-自定义插槽</b>
      <rd-digital-details-tooltip
        type="table"
        :columns="columns"
        :table-detail-data="tableData">
        <div>
          <span style="color: red">输入详情</span>
          <Input style="width: 80px" />
        </div>
      </rd-digital-details-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData2: [
        {
          showOrder: false,
          showTitle: false,
          title: '',
          children: [
            // 标题
            {
              title:
                'Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.'
            }
          ]
        }
      ],
      listData: [
        {
          showTitle: true,
          showOrder: true,
          title: '我是内容-显示组名称-显示序号',
          children: [
            // 标题
            {
              title:
                'Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.'
            },
            {
              title:
                'Poptip 与 Tooltip 类似，具有很多相同配置，不同点是 Poptip 以卡片的形式承载了更多的内容，比如链接、表格、按钮等。'
            },
            {
              title: 'Poptip 还 confirm 确认框，与 Modal 不同的是，它会出现在就近元素，相对轻量。'
            }
          ]
        },
        {
          showTitle: true,
          title: '我是内容-显示组名称-不显示序号',
          children: [
            // 标题
            {
              title:
                'Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.'
            },
            {
              title:
                'Poptip 与 Tooltip 类似，具有很多相同配置，不同点是 Poptip 以卡片的形式承载了更多的内容，比如链接、表格、按钮等。'
            },
            {
              title: 'Poptip 还 confirm 确认框，与 Modal 不同的是，它会出现在就近元素，相对轻量。'
            }
          ]
        }
      ],
      columns: [
        {
          key: 'word',
          title: '关键词',
          width: 160
        },
        {
          key: 'way',
          title: '匹配方式',
          width: 80
        }
      ],
      tableData: [
        {
          word: '关键词关键词关键词关',
          way: '匹配方式1'
        },
        {
          word: '关键词关键词关键词关键词关2',
          way: '匹配方式2'
        },
        {
          word: '关键词关键词关键词关键键词关键词3',
          way: '匹配方式3'
        },
        {
          word: '关键词关键词关键词关键词关键词关键词4',
          way: '匹配方式4'
        },
        {
          word: '关键词关关键词关键词关键词关键词关键词1',
          way: '匹配方式1'
        },
        {
          word: '关键词关键词关键词关键词关键键词关键词2',
          way: '匹配方式2'
        },
        {
          word: '关键词关键词关键词关键词关键词关键词3',
          way: '匹配方式3'
        },
        {
          word: '关键词关键词键词关键关键词4',
          way: '匹配方式4'
        },
        {
          word: '关键词关键词关键词关键词关键词关关键词1',
          way: '匹配方式1'
        },
        {
          word: '关键词关键词关键关键词2',
          way: '匹配方式2'
        },
        {
          word: '关键词关键词关键词关键词关键词关键词关键词关键词3',
          way: '匹配方式3'
        },
        {
          word: '关键词关键词关键词关键词关键词关键词关键词关键词4',
          way: '匹配方式4'
        }
      ]
    }
  },
  methods: {
    beforeRemove() {
      return true
      // return new Promise((resolve, reject) => {
      //   resolve(false)
      //   reject(new Error('俄'))
      // })
    },
    onChange(data) {
      this.nowData = data
    }
  }
}
</script>

<style
  lang="less"
  scoped>
.show-data {
  display: flex;
  .before,
  .now {
    width: 300px;
    height: 200px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .now {
    margin-left: 30px;
  }
}
</style>
