<template>
  <div>
    <br />
    <p>
      type:default
      <rd-sort
        v-model="sortValue"
        :data="list"></rd-sort>
    </p>
    <br />
    <p>
      type:label
      <rd-sort
        v-model="sortValue"
        type="text"
        :data="list"></rd-sort>
    </p>
     <br />
    <p>
      renderFormat
      <rd-sort
        v-model="sortValue"
        :renderFormat="formatterText"
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
          subtitle: '近>远',
          sort: 'desc'
        },
        {
          value: '2',
          label: '创建时间',
          subtitle: '远>近',
          sort: 'asc'
        },
        {
          value: '3',
          label: '修改时间',
          subtitle: '近>远',
          sort: 'desc'
        },
        {
          value: '4',
          label: '修改时间',
          subtitle: '远>近',
          sort: 'asc'
        },
        {
          value: '18',
          label: '名称',
          subtitle: 'A-Z',
          sort: 'desc'
        },
        {
          value: '19',
          label: '名称',
          subtitle: 'Z-A',
          sort: 'asc'
        }
      ]
    }
  },
  methods:{
    formatterText(item){
      return `render-${item.subtitle}`
    }
  }
}
</script>
 
