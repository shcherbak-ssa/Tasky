<template>
  <header class="border-b-2 border-gray-200 w-full py-4">
    <div class="container flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseIcon :icon="IconName.MENU" />
        <h1>
          <span>Tasky</span>
        </h1>
      </div>
      <div class="">
        <BaseIcon :icon="IconName.SEARCH" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { IconName } from 'shared/constants';
import BaseIcon from 'view/components/base/BaseIcon.vue';

// Properties

// Methods
</script>

<style scoped lang="scss"></style>
