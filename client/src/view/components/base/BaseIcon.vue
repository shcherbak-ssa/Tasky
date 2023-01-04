<template>
  <div class="base-icon duration-200" @click.stop="handleClick">
    <i class="text-base pi" :class="props.icon" />
  </div>
</template>

<script setup lang="ts">
import type { IconName } from 'shared/constants';

type ComponentProps = {
  icon: IconName;
}

// Properties
const props = defineProps<ComponentProps>();
const emits = defineEmits(['icon-click']);

// Methods
function handleClick(): void {
  emits('icon-click');
}
</script>

<style scoped lang="scss">
.base-icon {
  color: var(--primary-color);
}
</style>
