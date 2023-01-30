<template>
  <div class="bg-gray-50 w-screan min-h-screen relative overflow-hidden">
    <AppHeaderContainer>
      <slot name="header" />
    </AppHeaderContainer>

    <PrimevueScrollPanel style="width: 100%; height: calc(100vh - var(--app-header-height));">
      <div class="container py-12 duration-200">
        <div class="flex justify-center">
          <slot />
        </div>
      </div>
    </PrimevueScrollPanel>

    <SpeedAddContainer />
    <PrimevueConfirmDialog />
    <PopupContainer />
  </div>
</template>

<script setup lang="ts">
import PrimevueScrollPanel from 'primevue/scrollpanel';
import PrimevueConfirmDialog from 'primevue/confirmdialog';

import AppHeaderContainer from 'view/containers/AppHeaderContainer.vue';
import SpeedAddContainer from 'view/containers/SpeedAddContainer.vue';
import PopupContainer from 'view/containers/PopupContainer.vue';
</script>

<style scoped lang="scss"></style>
