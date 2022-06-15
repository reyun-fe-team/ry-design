<template>
  <main class="delete-modals">
    <span>报错弹框使用事例</span>
    <br />
    <br />
    <Button
      type="default"
      class="ma"
      @click="openClick">
      打开弹框
    </Button>
    <br />
    <br />
    <Button
      type="default"
      class="ma"
      @click="openClickSlot">
      打开弹框slot
    </Button>
    <rd-delete-modals
      v-model="isDeleteModals"
      :content="content"
      @input="closeModals"
      @on-cancel="closeModals"
      @on-ok="okModals"></rd-delete-modals>
    <rd-delete-modals
      v-model="isDeleteModalsSlot"
      :content="content"
      :has-close="hasClose"
      @input="closeModalsSlot"
      @on-cancel="closeModalsSlot"
      @on-ok="okModalsSlot">
      <span slot="delete-modal-content">这是一段利用slot插入内容的事例</span>
      <span slot="delete-modal-img">
        <img
          :src="require('@src/images/batch-upload-xls/batch-upload-xls.png')"
          alt="" />
      </span>
    </rd-delete-modals>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isDeleteModals: false,
      isDeleteModalsSlot: false,
      content: '这是一条正常警告',
      hasClose: false
    }
  },
  mounted() {
    this.$Modal.confirm({
      render: h => {
        return h('Input', {
          props: {
            value: this.value,
            autofocus: true,
            placeholder: 'Please enter your name...'
          },
          on: {
            input: val => {
              this.value = val
            }
          }
        })
      }
    })
  },
  methods: {
    openClick() {
      this.isDeleteModals = true
    },
    okModals() {
      this.isDeleteModals = false
    },
    closeModals() {
      this.isDeleteModals = false
    },
    openClickSlot() {
      this.isDeleteModalsSlot = true
    },
    okModalsSlot() {
      this.isDeleteModalsSlot = false
    },
    closeModalsSlot() {
      this.isDeleteModals = false
    }
  }
}
</script>