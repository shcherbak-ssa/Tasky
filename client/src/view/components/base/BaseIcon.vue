<template>
  <i class="base-icon pi" :class="props.icon" />
</template>

<script setup lang="ts">
type Props = {
  icon: string;
}

// Properties
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.base-icon {
  font-size: inherit;
}
</style>
