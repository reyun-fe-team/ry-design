<template>
    <div class="ellipsis-text">
        <!-- 如果页面有太多Tooltip， 比如列表， 导致页面卡死, 所以做成只有需要hover提示的才用tooltip -->
        <div v-if="isUseDiv" class="limit-line-text-content" ref="content">
            <slot>
                {{ content }}
            </slot>
        </div>
        <Tooltip
            v-else
            ref="tooltip"
            :max-width="tipsMaxWidth"
            :placement="tipsPlacement"
            :content="content"
            :disabled="tipsDisabled"
            transfer
            :transfer-class-name="transferClassName"
        >
            <template #content>
                <slot name="content"></slot>
            </template>
            <div class="limit-line-text-content" ref="content">
                <slot>
                    {{ content }}
                </slot>
            </div>
        </Tooltip>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get } from 'lodash-es';
import { addResizeListener, removeResizeListener } from '@/utils/resizeEvent';

@Component
export default class EllipsisText extends Vue {
    @Prop({ type: [String, Number] })
    content!: string|number;

    @Prop({ type: String })
    transferClassName!: string;

    @Prop({ type: [String, Number], default: 300 })
    tipsMaxWidth!: number | string;

    @Prop({ type: String, default: 'top' })
    tipsPlacement!: string;

    @Prop({ type: Boolean, default: false })
    tipsDisabled!: boolean;

    @Prop({ type: [String, Number], default: 2 })
    line!: number;

    @Prop({ type: Boolean, default: true })
    showTips!: boolean;

    /**
     * *是否hover显示tooltip，逻辑判断优先级showTips > alwaysShowTips，即showTips = true时alwaysShowTips才生效
    */
    @Prop({ type: Boolean, default: false })
    alwaysShowTips!: boolean;

    showTooltip: boolean = false;

    @Watch('content')
    watchContent() {
        this.checkTooltipEnable();
    }

    @Watch('line')
    watchLine() {
        this.setLineNum();
    }

    @Watch('isUseDiv')
    watchOsUseDiv() {
        this.setLineNum();
    }

    get isUseDiv() {
       return !this.showTooltip || !this.showTips;
    }

    checkTooltipEnable() {
        if (!this.showTips) {
            return;
        }
        if (this.alwaysShowTips) {
            this.showTooltip = true;
            return;
        }
        const contentEl = this.$refs.content as HTMLElement;
        this.showTooltip = contentEl.offsetHeight < contentEl.scrollHeight;
    }

    setLineNum() {
        this.$nextTick(() => {
            const contentEl = this.$refs.content as HTMLElement;
            if (contentEl) {
                (contentEl.style as any).webkitLineClamp = this.line.toString();
            }
        });
    }

    mounted() {
        this.setLineNum();
        this.checkTooltipEnable();
        addResizeListener(this.$el, () => {
            this.checkTooltipEnable();
        });
    }

    beforeDestroy() {
        removeResizeListener(this.$el);
    }

    handleClosePopper() {
        if (this.isUseDiv) {
            return;
        }
        const el = get(this.$refs, 'tooltip') as any;
        if (el) {
            el.handleClosePopper();
        }
    }
}
</script>
<style lang="less">
.ellipsis-text {
    white-space: normal;
    .limit-line-text-content {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }

    .@{css-prefix}tooltip {
        display: block;
        .@{css-prefix}tooltip-rel {
            display: block;
        }
    }
}
</style>
