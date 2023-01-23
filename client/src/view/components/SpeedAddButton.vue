<template>
  <PrimevueSpeedDial
    direction="up"
    :model="items"
    :tooltip-options="{
      event: 'hover',
      position: 'left'
    }"
  />
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import PrimevueSpeedDial from 'primevue/speeddial';

// Properties
const emits = defineEmits(['create-project']);

const items: MenuItem[] = [
  {
    label: 'Create Project',
    icon: 'pi pi-box',
    command: () => {
      emits('create-project');
    },
  },
  {
    label: 'Create Task',
    icon: 'pi pi-check-square',
    command: () => {},
  },
  {
    label: 'Create Note',
    icon: 'pi pi-file-edit',
    command: () => {},
  },
];
</script>

<style scoped lang="scss"></style>
