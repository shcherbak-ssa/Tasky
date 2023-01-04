<template>
  <PrimevueButton
    :label="props.label"
    @click.stop="handleClick"
  />
</template>

<script setup lang="ts">
import PrimevueButton from 'primevue/button';

type ComponentProps = {
  label: string;
}

// Properties
const props = defineProps<ComponentProps>();
const emits = defineEmits(['button-click']);

// Methods
function handleClick(): void {
  emits('button-click');
}
</script>

<style scoped lang="scss"></style>