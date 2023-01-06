<template>
  <div class="grid grid-cols-8 gap-1">
    <ColorItem
      v-for="color in props.colors"
      :key="color.id"
      :color="color"
      :is-selected="props.selectedColorId === color.id"
      @color-selected="emits('color-selected', color.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { AssetsColor } from 'shared/types';

import ColorItem from 'view/components/ColorItem.vue';

type ComponentProps = {
  colors: AssetsColor[];
  selectedColorId: number;
}

// Properties
const props = defineProps<ComponentProps>();
const emits = defineEmits(['color-selected']);
</script>

<style scoped lang="scss"></style>