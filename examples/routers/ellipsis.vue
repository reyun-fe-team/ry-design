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
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      text: '史蒂夫·乔布斯（英语：Steve Jobs），是一名美国企业家、营销家和发明家，苹果公司的联合创始人之一，曾任董事长及首席执行官职位，NeXT创办人及首席执行官，也是皮克斯动画的创办人并曾任首席执行官，2006年为华特迪士尼公司的董事会成员。2017年9月苹果发布会举行的地方，以他命名为 Steve Jobs Theater 。'
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
  margin: 50px;
  background-color: #7bbfea;
}
</style>
