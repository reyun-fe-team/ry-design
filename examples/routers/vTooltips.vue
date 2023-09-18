<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.index"
        style="padding: 20px; list-style: none">
        <span v-tooltip="{ content: item.text, maxWidth: 300 }">{{ item.text }}</span>
        <Icon
          type="ios-close"
          @click="del(index)" />
        <Button @click="addProp(item)">addProp</Button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          text: '1111'
        },
        {
          text: '2222'
        },
        {
          text: '3333'
        },
        {
          text: '4444'
        },
        {
          text: '5555'
        },
        {
          text: '6666'
        },
        {
          text: '7777'
        }
      ]
    }
  },
  methods: {
    addProp(item) {
      item.text = '最新的text---' + item.text + '---' + +new Date()
    },
    del(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>