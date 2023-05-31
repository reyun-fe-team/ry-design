<template>
  <main :class="prefixCls">select</main>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-select'
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
