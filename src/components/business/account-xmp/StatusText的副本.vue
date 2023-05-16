<template>
    <span :class="['status-text', type]">
        <span :class="['dot', type]"></span>
        <slot></slot>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StatusText extends Vue {
    @Prop({
        type: String,
        required: true,
        validator(val: string) {
            return ['primary', 'success', 'warning', 'error', 'info'].includes(val);
        },
    })
    type!: string;
}
</script>
<style lang="less">
.status-text {
    .dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        transform: translateY(-1px);
    }
    .dot.success {
        background-color: @success-color;
    }
    .dot.primary {
        background-color: @primary-color;
    }
    .dot.warning {
        background-color: @warning-color;
    }
    .dot.error {
        background-color: @error-color;
    }
    .dot.info {
        background-color: @input-placeholder-color;
    }
}
</style>
