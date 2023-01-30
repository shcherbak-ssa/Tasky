<template>
  <div
    v-if="state.isLoaded"
    class="bg-gray-50 w-screan min-h-screen relative overflow-hidden"
  >
    <AppHeaderContainer />

    <BaseScrollPanel style="width: 100%; height: calc(100vh - var(--app-header-height))">
      <div class="container py-12 duration-200">
        <div class="flex justify-center">
          <RouterView />
        </div>
      </div>
    </BaseScrollPanel>

    <SpeedAddContainer />
    <NotificationContainer />
    <PrimevueConfirmDialog />
    <PopupContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { RouterView } from 'vue-router';
import PrimevueConfirmDialog from 'primevue/confirmdialog';

import type { AppController } from 'shared/types';
import { Controller } from 'shared/constants';
import { useController } from 'view/hooks';

import AppHeaderContainer from 'view/containers/AppHeaderContainer.vue';
import NotificationContainer from 'view/containers/NotificationContainer.vue';
import SpeedAddContainer from 'view/containers/SpeedAddContainer.vue';
import PopupContainer from 'view/containers/PopupContainer.vue';

type State = {
  isLoaded: boolean;
}

// Properties
const state = reactive<State>({ isLoaded: false });

const appController: AppController = useController(Controller.APP);

// Hooks
onMounted(async () => {
  const success: boolean = await appController.setup();

  if (success) {
    state.isLoaded = true;
  }
});
</script>

<style scoped lang="scss"></style>
