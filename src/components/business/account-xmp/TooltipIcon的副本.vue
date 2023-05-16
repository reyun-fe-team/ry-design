<template>
    <Tooltip
        :transfer="transfer"
        :placement="placement"
        :max-width="maxWidth"
        :offset="offset"
        :theme="theme"
        :disabled="disabledTip || (!tooltip && !$slots.tooltip)"
        :class="$style.tooltip"
    >
        <template #content>
            <slot name="tooltip">{{tooltip}}</slot>
        </template>
        <Icon :type="iconType" :custom="customIconType" :class="iconClasses" :style="{'vertical-align': verticalAlign}"/>
    </Tooltip>
</template>

<script lang="ts">
import {
Component, Prop, Vue
} from 'vue-property-decorator';

@Component
export default class TooltipIcon extends Vue {
    @Prop({ type: String })
    tooltip?: string;

    @Prop({ type: Boolean, default: false })
    transfer!: boolean;

    @Prop({ type: String, default: 'ios-help-circle-outline' })
    iconType!: string;

    @Prop({ type: String })
    customIconType?: string;

    @Prop({ type: String, default: 'top' })
    placement!: string;

    @Prop({ type: Boolean, default: false })
    disabledTip!: boolean;

    @Prop({ type: Number, default: 200 })
    maxWidth!: number;

    @Prop({ type: [Array, String], default: () => [] })
    iconClass!: any[]|string;

    @Prop({ type: String, default: 'middle' })
    verticalAlign!: string;

    @Prop({ type: Number })
    offset!: number;

    @Prop({ type: String, default: 'dark' })
    theme!: string;

    $style!: any;

    get iconClasses() {
        return [this.$style.icon].concat(this.iconClass);
    }
}
</script>

<style module lang="less">
    .tooltip{

    }
    .icon{
        font-size: 14px;
        -webkit-text-stroke-width: 0.2px; // 加粗icon修正锯齿
    }
</style>
