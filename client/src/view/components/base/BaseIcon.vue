<template>
  <div
    class="base-icon duration-200"
    @click.stop="iconClick"
  >
    <Icon
      class="w-5 h-5"
      :icon="props.icon"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { IconName } from 'shared/constants';

type ComponentProps = {
  icon: IconName;
}

// Properties
const props = defineProps<ComponentProps>();
const emits = defineEmits(['icon-click']);

// Methods
function iconClick(): void {
  emits('icon-click');
}
</script>

<style scoped lang="scss">
.base-icon {
  color: var(--primary-color);
}
</style>
