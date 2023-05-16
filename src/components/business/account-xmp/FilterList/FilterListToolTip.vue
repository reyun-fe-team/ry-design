<template>
    <Tooltip
        :disabled="!tipContent"
        transfer
        :max-width="tipMaxWidth"
        :placement="tipPlacement"
        class="filterListToolTip"
    >
        <FilterList v-bind="$props" v-on="$listeners">
            <template v-for="slot in Object.keys($slots)" v-slot:[slot]>
                <slot :name="slot"/>
            </template>
        </FilterList>
        <template #content>
            {{ tipContent }}
        </template>
    </Tooltip>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import FilterList from './FilterList.vue';

@Component({
    components: {
        FilterList,
    },
})

/**
 * FilterListToolTip 给FilterList包多一层Tooltip
 * @param { tipContent } string tooltips内容，如果不传则不出现toolTip
 * @param { tipPlacement } string tooltips浮动位置
 * @param { tipMaxWidth } Number tooltips最大宽度
 */

export default class FilterListToolTip extends FilterList {
    @Prop({ type: String, default: '' })
    tipContent!: string;

    @Prop({ type: String, default: 'top' })
    tipPlacement?: string;

    @Prop({ type: Number, default: 200 })
    tipMaxWidth?: number;
}
</script>
<style lang="less" scoped>
.filterListToolTip {
    width: 100%;
}
</style>
