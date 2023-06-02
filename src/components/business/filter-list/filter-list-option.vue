<template>
  <div :class="prefixCls">option</div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-option'
export default {
  name: prefixCls,
  components: {},
  props: {},
  data() {
    return {
      prefixCls
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
