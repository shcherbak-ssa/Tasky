<template>
  <BaseMenu class="app-menu" :model="props.items">
    <template #item="{ item }">
      <div
        class="project-menu-item text-inherit flex items-center select-none px-5 py-3 click"
        @click.stop="emits('item-click', item.id)"
      >
        <span class="rounded mr-2 w-4 h-4" :style="{ 'background-color': item.color.bgColor }"></span>
        <span>{{ item.name }}</span>
      </div>
    </template>
  </BaseMenu>
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';

type Props = {
  items: MenuItem[];
}

// Properties
const props = defineProps<Props>();
const emits = defineEmits(['item-click']);
</script>

<style scoped lang="scss"></style>
