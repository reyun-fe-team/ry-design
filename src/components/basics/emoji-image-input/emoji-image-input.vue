<template>
  <main :class="[prefixCls]">
    <div :class="prefixCls + '-content'">
      <Poptip
        :transfer-class-name="`${poptipClass}`"
        transfer
        placement="bottom-start">
        <slot name="input-content"></slot>
        <div
          slot="content"
          :class="prefixCls + '-panel'"
          style="white-space: normal;">
          <slot name="emoji-panel"></slot>
        </div>
      </Poptip>
      <slot name="emoji-input-num"></slot>
    </div>
  </main>
</template>

<script>
const {prefix} = require('../../../config.js')
const prefixCls = prefix + 'emoji-image-input'
export default {
  name: prefixCls,
  props: {
    poptipClass: {
      type: String,
      default: prefixCls + '-poptip'
    }
  },
  data() {
    return {
      prefixCls
    }
  }
}
</script>

<style scoped>

</style>
