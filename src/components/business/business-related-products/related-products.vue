<!--
 * @Author: 杨玉峰 yangyufeng@mobvista.com
 * @Date: 2023-11-30 17:48:07
 * @Description: 标准业务类组件-关联投产品
-->
<template>
  <div :class="classes">标准业务类组件-关联投产品</div>
</template>
<script>
import { prefix } from '../../../config.js'
const prefixCls = prefix + 'related-products'
import Emitter from '@src/mixins/emitter'
export default {
  name: prefixCls,
  mixins: [Emitter],
  props: {},
  data() {
    return {
      classes: {}
    }
  },
  computed: {},
  methods: {}
}
</script>
