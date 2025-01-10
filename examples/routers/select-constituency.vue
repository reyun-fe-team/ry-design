<template>
  <div class="select-constituency-wrap">
    <rd-select-constituency
      ref="ref-select-constituency"
      show-context-menu
      container-class-name="select-constituency-wrap-items"
      @on-selected-change="selected = $event"
      @on-selecting-change="selecting = $event"
      @on-mouse-up="addSelectConstituency"
      @scrollChange="handleScrollChange">
      <div slot="contextMenu">
        <p
          class="demo-context-menu"
          @click="handleDelete">
          删除
        </p>
        <p class="demo-context-menu">其他</p>
      </div>
      <div class="select-constituency-wrap-body">
        <div
          v-for="(item, index) in data"
          :key="item.uuid"
          class="select-constituency-wrap-items"
          :class="getStatus(item, index)">
          <rd-image-group
            :size="1"
            :width="60"
            :height="60"
            lazy
            background="#eef0f3"
            :data="[{ src: item.src }]"
            type="image"></rd-image-group>
        </div>
      </div>
    </rd-select-constituency>
    <Button @click="handleReset">重置</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      selecting: [],
      data: [],
      selectedOptions: []
    }
  },
  mounted() {
    let data = []
    for (let i = 0; i < 50; i++) {
      data.push({
        src: 'https://file.iviewui.com/images/image-demo-1.jpg',
        uuid: i
      })
    }
    this.data = data
    this.$refs['ref-select-constituency'].init()
  },
  methods: {
    getStatus(val, index) {
      const focus = this.selectedOptions.some(v => v.uuid === val.uuid)
      const selecting = !!this.selecting[index] && !focus
      return {
        'select-constituency-focus': focus,
        'select-constituency-selecting': selecting
      }
    },
    addSelectConstituency() {
      const selectedOptions = this.selected.reduce((list, value, index) => {
        if (value) {
          list.push(this.data[index])
        }
        return list
      }, [])
      this.selectedOptions = _.uniq([...this.selectedOptions, ...selectedOptions])
    },
    handleScrollChange() {
      this.$emit('scrollChange')
    },
    handleReset() {
      this.$refs['ref-select-constituency'].clearSelected()
      this.$refs['ref-select-constituency'].setContextMenuVisible()
      this.selectedOptions = []
    },
    handleDelete() {
      this.data = this.data.filter(v => !this.selectedOptions.some(val => val.uuid === v.uuid))
      this.$refs['ref-select-constituency'].updateSelectTable()
      this.$refs['ref-select-constituency'].contextMenuVisible = false
      const message = this.selectedOptions.map(v => v.uuid).join('、')
      this.$Message.info(`删除:${message}`)
      this.selectedOptions = []
    }
  }
}
</script>
<style lang="less" scoped>
.select-constituency-wrap {
  position: relative;

  .rd-select-constituency {
    width: 814px;
    max-height: 300px;
    border: 1px solid #ccc;
  }

  .select-constituency-wrap-body {
    padding: 16px;
  }

  .select-constituency-wrap-items {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin: 8px;
    background: #ccc;
  }

  .select-constituency-focus {
    box-shadow: 0 0 0 2px #2096f5, 0 2px 5px 0 rgba(0, 26, 91, 10%);
  }

  .select-constituency-selecting {
    transform: scale(0.9);
    box-shadow: 0 0 0 2px orange, 0 2px 5px 0 orange;
    transition: all 0.1s;
  }
}

.demo-context-menu {
  padding: 7px 16px;
  line-height: normal;
  color: #515a6e;
  cursor: pointer;

  &:hover {
    color: #3989fa;
  }
}
</style>