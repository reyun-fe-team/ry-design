<template>
    <Spin v-bind="$attrs">
        <Icon type="ios-loading" :size="iconSize" :class="style.icon"></Icon>
        <slot></slot>
    </Spin>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpinLoading extends Vue {
    @Prop({ default: '18', type: String })
    iconSize!: string;

    stylePrefix = 'spin-loading';

    get style() {
        return {
            icon: `${this.stylePrefix}-icon`,
        };
    }
}
</script>

<style lang="less">
@prefix: spin-loading;

.@{prefix}-icon {
  animation: rotation 1s linear infinite;
  color: @primary-color;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
</style>
