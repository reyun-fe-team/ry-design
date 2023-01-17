<template>
  <div class="edit-row-bid">
    <rd-submission-rule
      v-model="value"
      :rule-tips-list="ruleTipsList"></rd-submission-rule>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      value: {
        // 规则
        submitRule: 'NOW',
        // 开始时间
        startTime: null,
        // 时间间隔
        timeInterval: null,
        // 分批提交 广告数
        batchAdNum: null,
        // 重复提交 重复次数
        repeatTimes: null
      },
      ruleTipsList: {
        NOW: '全部广告立即提交创建',
        DELAY: '全部广告按下方设置时间提交创建',
        BATCH: '全部广告按下方规则分批次提交创建，第一批保存后立即创建',
        REPEAT: '全部广告按下方规则重复多次创建（为避免广告名称重复，我们将为您自动增加时间后缀）'
      }
    }
  },
  methods: {}
}
</script>
