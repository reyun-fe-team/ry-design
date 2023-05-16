<template>
  <Tooltip
    v-if="showTooltips"
    :max-width="300"
    :placement="placement"
    :disabled="disabledTip"
    transfer
    class="component-link_wrapper">
    <a
      :class="{ disabled }"
      :href="href"
      :target="href && target"
      @click="handleClick">
      <slot>{{ label }}</slot>
      <SpinLoading
        v-if="loading"
        class="loading"></SpinLoading>
    </a>
    <template #content>
      <slot name="tooltip">
        <span v-if="!tooltipsIsArray">{{ tooltips }}</span>
        <div
          v-for="item in tooltips"
          v-else
          :key="item">
          {{ item }}
        </div>
      </slot>
    </template>
  </Tooltip>
  <a
    v-else
    :class="['component-link_wrapper', { disabled }]"
    :href="href"
    :target="href && target"
    @click="handleClick">
    <slot>{{ label }}</slot>
    <SpinLoading
      v-if="loading"
      class="loading"></SpinLoading>
  </a>
</template>

<script>
export default {
  components: {},
  props: {
    label: { type: String },
    disabled: { type: Boolean, default: false },
    tooltips: { type: [String, Array], default: () => [] },
    disabledTip: { type: Boolean, default: false },
    href: { type: String },
    target: { type: String, default: '_blank' },
    loading: { type: Boolean },
    placement: { type: String, default: 'top' }
  },
  computed: {
    tooltipsIsArray() {
      return Array.isArray(this.tooltips)
    },
    showTooltips() {
      return this.tooltipsIsArray ? !!this.tooltips.length : !!this.tooltips
    }
  },
  methods: {
    handleClick(e) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', e)
      } else {
        e.preventDefault()
      }
    }
  }
}
</script>