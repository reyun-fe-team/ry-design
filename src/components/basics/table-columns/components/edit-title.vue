<!-- 修改指标名称 -->
<template>
  <div>
    <Poptip
      v-model="show"
      transfer>
      <Icon
        type="md-create"
        :style="{ visibility: show ? 'visible' : '' }"
        @click.stop.prevent="clickIcon"></Icon>
      <div slot="content">
        <Input
          v-model="locData.title"
          style="width: 150px"></Input>
        <Button
          class="m-l-5"
          @click="cancel">
          取消
        </Button>
        <Button
          type="primary"
          class="m-l-5"
          :loading="loading"
          @click="submit">
          确定
        </Button>
      </div>
    </Poptip>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    itemData: {
      type: Object,
      default: () => {}
    },
    editCallBack: {
      type: Function
    }
  },
  data() {
    return {
      show: false,
      locData: {},
      loading: false
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.locData = JSON.parse(JSON.stringify(this.itemData))
      }
    }
  },
  methods: {
    cancel() {
      this.show = false
      this.loading = false
    },
    submit() {
      if (!this.validator()) {
        return false
      }
      this.loading = true
      this.editCallBack(this.locData)
        .then(res => {
          this.cancel()
          this.$emit('success', res)
        })
        .catch(() => {
          this.loading = false
        })
    },
    validator() {
      let title = this.locData.title
      let message = ''
      if (!title) {
        message = '请输入内容'
      } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(title)) {
        message = '支持输入汉字、大小写字母、数字'
      } else {
        let len = title.split('').reduce((t, c) => {
          return t + (/[\u4e00-\u9fa5]/.test(c) ? 2 : 1)
        }, 0)
        message = len > 20 ? '最多20个字符' : ''
      }
      if (message) {
        this.$Message.warning(message)
        return false
      } else {
        return true
      }
    },
    clickIcon() {
      let refs = this.$parent.$parent.$parent.$refs
      for (let re in refs) {
        if (re.indexOf('modifyTitle_') === 0) {
          refs[re][0].cancel()
        }
      }
      this.show = !this.show
    }
  }
}
</script>
