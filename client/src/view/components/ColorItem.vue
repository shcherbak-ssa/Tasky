<template>
  <div
    class="item w-6 h-6 rounded-full flex-center click"
    :style="{ background: color.bgColor, color: color.textColor }"
    @click.stop="emits('color-selected')"
  >
    <BaseIcon v-if="props.isSelected" icon="pi-check" />
  </div>
</template>

<script setup lang="ts">
import type { AssetsColor } from 'shared/types';

type ComponentProps = {
  color: AssetsColor;
  isSelected: boolean;
}

// Properties
const props = defineProps<ComponentProps>();
const emits = defineEmits(['color-selected']);
</script>

<style scoped lang="scss">
.item .base-icon {
  font-size: 12px;
}
</style>
