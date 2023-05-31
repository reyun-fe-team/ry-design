<template>
  <div>
    <!-- visible -->
    <Dropdown
      visible
      :placement="placement"
      :trigger="trigger">
      <slot></slot>
      <DropdownMenu slot="list">
        <slot name="list"></slot>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    trigger: {
      type: String,
      default: 'click'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    handleVisibleChange(val) {
      this.visible = val
      this.$emit('on-visible-change', val)
    }
  }
}
</script>
