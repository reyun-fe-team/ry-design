<template>
  <div
    :class="classes"
    :style="styles">
    <div
      v-if="label && label.trim()"
      ref="prefixRef"
      :class="prefixCls + '-label'">
      {{ `${label}:` }}
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
            style="width: 100%; padding: 0"
            :height="current[0].description || current[0].src ? 56 : 32"
            :src="current[0].src"
            :text="current[0].label"
            :description="current[0].description"></rd-filter-list-describe>
        </template>
        <div
          v-else
          :class="prefixCls + '-body-echo'">
          已选 {{ current.length }} 个
        </div>
      </template>
    </div>
    <!-- </div> -->
    <div
      :class="[
        prefixCls + '-operate',
        { [prefixCls + '-operate-clearable']: clearable && current.length }
      ]">
      <rd-icon
        :class="prefixCls + '-operate-arrow'"
        :type="`ios-arrow-${iconState ? 'up' : 'down'}`"
        color="#818181" />
      <rd-icon
        v-if="clearable && current.length"
        :class="prefixCls + '-operate-clear'"
        color="#757a8a"
        type="ry-icon-guanbi"
        @click.native.stop="handleClear"></rd-icon>
    </div>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-input'
import rdFilterListDescribe from './filter-list-describe'

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
      return [`${this.prefixCls}`]
    },
    // 是否有已选数据
    isPlaceholder() {
      return this.value && this.value.length === 0
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
      this.current = []
      this.$emit('on-change', this.current)
    }
  }
}
</script>
