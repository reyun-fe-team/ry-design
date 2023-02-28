<template>
  <DropdownMenu>
    <DropdownItem
      v-for="item in data"
      :key="item.value"
      :divided="item.divided"
      :disabled="item.disabled">
      <template v-if="item.tooltip">
        <Tooltip
          transfer
          theme="light"
          placement="top"
          :content="item.tooltip"
          :max-width="300">
          {{ item.label }}
        </Tooltip>
      </template>
      <template v-else>{{ item.label }}</template>
    </DropdownItem>
  </DropdownMenu>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>