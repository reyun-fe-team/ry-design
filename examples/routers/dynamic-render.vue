<template>
  <Form class="dynamic-render">
    表单数据 {{ form }}
    <rd-dynamic-render :config="filedsConfigs.promotedObjectType">
      <FormItem label="营销目标">
        <rd-radio-group
          v-model="form.promotedObjectType"
          :default-list="promotedObjectTypeList"></rd-radio-group>
      </FormItem>
    </rd-dynamic-render>

    <rd-dynamic-render :config="filedsConfigs.adType">
      <FormItem label="广告类型">
        <rd-radio-group
          v-model="form.adType"
          :default-list="adTypeList"></rd-radio-group>
      </FormItem>
    </rd-dynamic-render>

    <rd-dynamic-render :config="filedsConfigs.promotionScene">
      <FormItem label="推广场景">
        <rd-radio-group
          v-model="form.promotionScene"
          :default-list="promotionSceneList"></rd-radio-group>
      </FormItem>
    </rd-dynamic-render>

    <rd-dynamic-render :config="filedsConfigs.deliveryMode">
      <FormItem label="投放方式">
        <rd-radio-group
          v-model="form.deliveryMode"
          :default-list="deliveryModeList"></rd-radio-group>
      </FormItem>
    </rd-dynamic-render>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      promotedObjectTypeList: [
        { label: '应用推广-应用下载', value: '2' },
        { label: '应用推广-应用唤起', value: '7' },
        { label: '收集销售线索', value: '5' },
        { label: '品牌活动推广', value: '4' },
        { label: '小程序推广', value: '19' },
        { label: '粉丝/直播推广', value: '16' },
        { label: '快手号推广', value: '30' },
        { label: '电商下单推广', value: '35' }
      ],
      adTypeList: [
        { label: '展示广告', value: '0' },
        { label: '搜索广告', value: '1' }
      ],
      deliveryModeList: [
        { label: '成本优先', value: '0', tooltip: '控制成本，尽可能消耗预算，元常规投放' },
        { label: '最大转化', value: '1', tooltip: '消耗更多预算，尽可能获取更多的转化次数' }
      ],
      promotionSceneList: [{ label: '短剧推广', value: '1' }],
      form: {
        promotedObjectType: '2',
        adType: '0',
        deliveryMode: '0',
        promotionScene: '1'
      }
    }
  },
  computed: {
    filedsConfigs() {
      return {
        promotedObjectType: {
          name: 'promotedObjectType',
          hide: false,
          hideValue: null,
          defaultValue: '2',
          model: this.form,
          emitUpdate: this.emitUpdate
        },
        adType: {
          name: 'adType',
          hide: model => model.promotedObjectType === '7',
          hideValue: null,
          defaultValue: '0',
          model: this.form,

          emitUpdate: this.emitUpdate
        },
        deliveryMode: {
          name: 'deliveryMode',
          hide: false,
          // 重置依赖项
          resetDeps: model => [model.promotedObjectType],
          hideValue: null,
          defaultValue: '0',
          model: this.form,
          emitUpdate: this.emitUpdate
        },
        promotionScene: {
          name: 'promotionScene',
          hide: false,
          hideValue: null,
          defaultValue: '1',
          model: this.form,
          emitUpdate: this.emitUpdate
        }
      }
    }
  },
  methods: {
    emitUpdate({ key, value }) {
      console.log(key, value)
      this.form[key] = value
    }
  }
}
</script>