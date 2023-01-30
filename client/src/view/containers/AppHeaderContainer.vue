<template>
  <header class="app-header border-b-2 border-gray-200 flex items-center w-full">
    <div class="container flex items-center justify-between duration-200">
      <div class="flex items-center gap-3">
        <BaseIcon icon="pi-bars" />
        <h1>
          <span>{{ currentRoute.meta.pageHeading }}</span>
        </h1>
      </div>
      <div class="">
        <BaseIcon icon="pi-search" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

// Properties
const currentRoute = useRoute();

// Methods
</script>

<style scoped lang="scss">
.app-header {
  height: var(--app-header-height);
}
</style>
