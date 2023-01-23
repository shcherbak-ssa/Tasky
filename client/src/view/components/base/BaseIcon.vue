<template>
  <i class="base-icon pi" :class="props.icon" />
</template>

<script setup lang="ts">
type ComponentProps = {
  icon: string;
}

// Properties
const props = defineProps<ComponentProps>();
</script>

<style scoped lang="scss">
.base-icon {
  font-size: inherit;
}
</style>
