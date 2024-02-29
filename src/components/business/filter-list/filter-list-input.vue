<template>
  <div
    :class="classes"
    :style="styles">
    <div
      v-if="showInputSlot"
      :class="prefixCls + '-label'">
      <slot name="input-label">
        <template>
          {{ label }}
        </template>
      </slot>
    </div>

    <div :class="prefixCls + '-body'">
      <div
        v-if="isPlaceholder"
        :class="prefixCls + '-body-placeholder'">
        {{ placeholder }}
      </div>
      <!-- 有数据 -->
      <template v-else>
        <!-- 多选 -->
        <template v-if="current.length === 1">
          <rd-filter-list-describe
            :key="uuid"
            style="width: 100%; padding: 0"
            :src="current[0].src"
            :text="current[0].label"
            :show-image="showImage"
            :show-description="showDescription"
            :show-subtitle="showSubtitle"
            :subtitle="current[0].subtitle"
            :description="current[0].description"></rd-filter-list-describe>
        </template>
        <div
          v-else
          :class="prefixCls + '-body-echo'">
          已选 {{ current.length }} 个
        </div>
      </template>
    </div>
    <div
      :class="[
        prefixCls + '-operate',
        { [prefixCls + '-operate-clearable']: clearable && current.length }
      ]">
      <rd-icon
        :class="prefixCls + '-operate-arrow'"
        :type="`ios-arrow-${iconState ? 'up' : 'down'}`" />

      <rd-icon
        v-if="clearable && current.length"
        :class="prefixCls + '-operate-clear'"
        type="ry-icon-guanbi"
        @click.native.stop="handleClear"></rd-icon>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-input'
import rdFilterListDescribe from './filter-list-describe'
import { getKey } from '@src/util/assist'
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: prefixCls,
  components: { rdFilterListDescribe },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    iconState: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showImage: Boolean,
    showDescription: Boolean,
    showSubtitle: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      current: this.value
    }
  },
  computed: {
    classes() {
      return [
        `${this.prefixCls}`,
        {
          [this.prefixCls + '-hover']: !this.disabled,
          [this.prefixCls + '-disabled']: this.disabled
        }
      ]
    },
    // 是否有已选数据
    isPlaceholder() {
      return this.value && this.value.length === 0
    },
    uuid() {
      let uuid = getKey()
      if (this.current.length) {
        const { labe = '', description = '' } = this.current[0]
        uuid = uuid + labe + description
      }
      return uuid
    },
    showInputSlot() {
      return (this.label && this.label.trim()) || this.$scopedSlots['input-label']
    }
  },
  watch: {
    value: {
      handler() {
        this.current = this.value
      },
      deep: true
    }
  },
  methods: {
    handleClear() {
      const oldValues = _cloneDeep(this.current).map(val => val.value)
      this.current = []
      this.$emit('on-change', this.current)
      this.$emit('on-clear', this.current, oldValues)
    }
  }
}
</script>
