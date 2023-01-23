<template>
  <div
    class="py-2 w-full"
    :class="{
      'grid auto-rows-fr grid-cols-2 xs:grid-cols-3 xl:grid-cols-4 gap-6 px-4 xs:px-0': props.view === ProjectsView.TILES,
      'flex flex-col gap-1': props.view === ProjectsView.LIST,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ProjectsView } from 'shared/constants';

type ComponentProps = {
  view: ProjectsView;
}

// Properties
const props = defineProps<ComponentProps>();
</script>

<style scoped lang="scss"></style>
