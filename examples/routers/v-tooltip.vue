<template>
  <div>
    <h2>v-for 使用</h2>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.index"
        style="padding: 20px; list-style: none; display: flex; align-items: center">
        <span
          v-tooltip="{ content: item.text, maxWidth: 300 }"
          style="
            word-wrap: break-word;
            display: inline-block;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          ">
          {{ item.text }}
        </span>
        <Icon
          type="ios-close"
          @click="del(index)" />
        <Button @click="addProp(item)">addProp</Button>
      </li>
    </ul>
    <h2>contentRender 使用</h2>
    <div style="padding: 20px; list-style: none; display: flex; align-items: center">
      <span
        v-tooltip="{ contentRender: contentRender, maxWidth: 300 }"
        style="
          word-wrap: break-word;
          display: inline-block;
          max-width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">
        {{ content }}
      </span>
      <Button @click="addContentProp">addContentProp</Button>
    </div>
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
      ],
      content: []
    }
  },
  computed: {
    contentContainer() {
      let content = JSON.stringify(this.content)
      return JSON.parse(content)
    }
  },
  methods: {
    contentRender(h) {
      return h('div', { style: { color: 'red' } }, JSON.stringify(this.contentContainer))
    },
    addContentProp() {
      this.content.push(+new Date())
    },
    addProp(item) {
      item.text = `${item.text}-${+new Date()}`
    },
    del(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>
