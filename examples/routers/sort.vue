<template>
  <div>
    <br />
    <p class="group-text">
      type:button
      <rd-sort
        v-model="sortValue"
        :data="list"></rd-sort>
    </p>
    <br />
    <p class="group-text">
      type:label
      <rd-sort
        v-model="sortValue"
        type="label"
        :data="list"></rd-sort>
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      sortValue: '2',
      list: [
        {
          value: '1',
          label: '创建时间',
          text: '近>远',
          sort: 'desc'
        },
        {
          value: '2',
          label: '创建时间',
          text: '远>近',
          sort: 'asc'
        },
        {
          value: '3',
          label: '修改时间',
          text: '近>远',
          sort: 'desc'
        },
        {
          value: '4',
          label: '修改时间',
          text: '远>近',
          sort: 'asc'
        },
        {
          value: '18',
          label: '名称',
          text: 'A-Z',
          sort: 'desc'
        },
        {
          value: '19',
          label: '名称',
          text: 'Z-A',
          sort: 'asc'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.group-text {
  font-weight: bold;
  span {
    color: gray;
    font-size: 12px !important;
  }
}
</style>
