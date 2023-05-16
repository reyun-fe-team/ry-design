<template>
    <Tooltip
        v-if="showTooltips"
        :max-width="300"
        :placement="placement"
        :disabled="disabledTip"
        transfer
        class="component-link_wrapper"
    >
        <a :class="{ disabled }" :href="href" :target="href && target" @click="handleClick">
            <slot>{{ label }}</slot>
            <SpinLoading v-if="loading" class="loading"></SpinLoading>
        </a>
        <template #content>
            <slot name="tooltip">
                <span v-if="!tooltipsIsArray">{{ tooltips }}</span>
                <div v-for="item in tooltips" v-else :key="item">{{ item }}</div>
            </slot>
        </template>
    </Tooltip>
    <a
        v-else
        :class="['component-link_wrapper', { disabled }]"
        @click="handleClick"
        :href="href"
        :target="href && target"
    >
        <slot>{{ label }}</slot><SpinLoading v-if="loading" class="loading"></SpinLoading>
    </a>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Link extends Vue {
    @Prop({ type: String })
    label?: string;

    @Prop({ type: Boolean, default: false })
    disabled!: boolean;

    @Prop({ type: [String, Array] })
    tooltips?: string | string[];

    @Prop({ type: Boolean, default: false })
    disabledTip!: boolean;

    @Prop({ type: String })
    href?: string;

    @Prop({ type: String, default: '_blank' })
    target?: string;

    @Prop({ type: Boolean })
    loading?: boolean;

    @Prop({ type: String, default: 'top' })
    placement!: string;

    get _href() {
        return this.href ? this.href : 'javascript:;';
    }

    get tooltipsIsArray() {
        return Array.isArray(this.tooltips);
    }

    get showTooltips() {
        return this.tooltipsIsArray ? !!this.tooltips?.length : !!this.tooltips;
    }

    handleClick(e: MouseEvent) {
        if (!this.disabled && !this.loading) {
            this.$emit('click', e);
        } else {
            e.preventDefault();
        }
    }
}
</script>
<style lang="less">
@prefix: component-link;
.@{prefix}_wrapper {
    & + .@{prefix}_wrapper {
        margin-left: 10px;
    }
    &.disabled, & .disabled {
        color: @text-info-color;
        cursor: default;
    }
    .loading {
        display: inline-block;
    }
}
</style>
