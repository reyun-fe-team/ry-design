<template>
  <main class="wrapper">
    123
    <TooltipIcon></TooltipIcon>
    456
    <StatusText type="primary">123123</StatusText>
    <SpinLoading></SpinLoading>
    <Link
      label="label"
      :tooltips="[1, 2]"
      href="https://kazupon.github.io/vue-i18n/zh/started.html#html"></Link>
  </main>
</template>

<script>
import TooltipIcon from '@src/components/business/account-xmp/TooltipIcon.vue'
import StatusText from '@src/components/business/account-xmp/StatusText.vue'

import SpinLoading from '@src/components/business/account-xmp/SpinLoading.vue'
import Link from '@src/components/business/account-xmp/Link.vue'

export default {
  components: { TooltipIcon, StatusText, SpinLoading, Link },
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
