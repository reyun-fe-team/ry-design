<template>
  <div>
    <Input
      ref="input"
      :class="classes"
      readonly
      :disabled="disabled">
      <template #prefix>
        <div :class="prefixCls + '-body'">
          <div
            v-if="label && label.trim()"
            ref="prefixRef"
            :class="prefixCls + '-label'">
            {{ `${label}:` }}
          </div>
          <div :class="prefixCls + '-contain'">
            <!-- placeholder -->
            <span
              v-if="isPlaceholder"
              :class="prefixCls + '-placeholder'">
              {{ placeholder }}
            </span>
            <!-- 有数据 -->
            <template v-else>
              <!-- 多选 -->
              <template v-if="current.length === 1">
                <!-- 兼容图标等展示 -->
                <slot
                  name="select-contain"
                  :data="{ label, current }">
                  {{ current[0] }}
                </slot>
              </template>
              <template v-else>已选 {{ current.length }} 个</template>
            </template>
          </div>
        </div>
      </template>
      <div
        slot="suffix"
        :class="prefixCls + '-suffix'">
        <Icon
          :type="`ios-arrow-${iconState ? 'up' : 'down'}`"
          :color="disabled ? '#ccc' : '#818181'" />
      </div>
    </Input>
  </div>
</template>

<script>
import { prefix } from '@src/config.js'
const prefixCls = prefix + 'filter-list-input'
import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: prefixCls,
  components: {},
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
    disabled: {
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
    }
  },
  data() {
    return {
      prefixCls,
      current: _cloneDeep(this.value)
    }
  },
  computed: {
    classes() {
      return [
        `${this.prefixCls}`
        // {
        //   [prefixCls + '-focus']: this.iconState
        // }
      ]
    },
    // 是否有已选数据
    isPlaceholder() {
      return this.value && this.value.length === 0
    }
  },
  watch: {
    value: {
      handler() {
        this.current = _cloneDeep(this.value)
      },
      deep: true
    }
  },
  mounted() {},
  methods: {}
}
</script>
