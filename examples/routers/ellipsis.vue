<template>
  <div>
    <h1>div 宽300 padding 10</h1>
    <h2>示例1-按照字符数省略 40字符</h2>
    <div class="content">
      <rd-ellipsis
        :text="text"
        :length="40"
        tooltip />
    </div>
    <h2>示例2-按照高度省略 100px 高</h2>
    <div class="content">
      <rd-ellipsis
        :text="text"
        :height="100"
        tooltip />
    </div>
    <h2>示例3-按照行数省略 2行</h2>
    <div class="content">
      <rd-ellipsis
        :text="text"
        :lines="2"
        tooltip />
    </div>
    <h2>示例4-slot 前缀 自定义省略 后缀</h2>
    <div class="content">
      <rd-ellipsis
        :text="text"
        :length="40"
        tooltip>
        <span slot="prefix">
          前缀-
          <Icon type="md-bulb" />
        </span>
        <span
          slot="more"
          style="color: red">
          ...更多
        </span>
        <Icon
          slot="suffix"
          type="md-copy" />
      </rd-ellipsis>
    </div>
    <h2>示例5-表格中使用</h2>
    <Table
      :columns="column"
      :data="body"
      border>
      <template
        slot="backup"
        slot-scope="{ row }">
        <rd-ellipsis
          :text="row.backup"
          :lines="2"
          tooltip
          transfer></rd-ellipsis>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      text: '史蒂夫·乔布斯（英语：Steve Jobs），是一名美国企业家、营销家和发明家，苹果公司的联合创始人之一，曾任董事长及首席执行官职位，NeXT创办人及首席执行官，也是皮克斯动画的创办人并曾任首席执行官，2006年为华特迪士尼公司的董事会成员。2017年9月苹果发布会举行的地方，以他命名为 Steve Jobs Theater 。',
      column: [
        {
          key: 'name',
          title: '姓名',
          width: 100
        },
        {
          key: 'backup',
          title: '备注',
          slot: 'backup',
          width: 200
        }
      ],
      body: [
        {
          name: '张胜男',
          backup:
            '史蒂夫·乔布斯（英语：Steve Jobs），是一名美国企业家、营销家和发明家，苹果公司的联合创始人之一，曾任董事长及首席执行官职位，NeXT创办人及首席执行官，也是皮克斯动画的创办人并曾任首席执行官'
        }
      ]
    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.content {
  width: 300px;
  padding: 10px;
  margin: 20px 0;
  background-color: #7bbfea;
}
</style>
