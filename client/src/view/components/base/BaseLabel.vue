<template>
  <div class="base-label text-sm">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.base-label {
  color: var(--text-color-secondary);
}
</style>
