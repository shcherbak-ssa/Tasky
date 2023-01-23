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

    <SpeedAddButton
      @create-project="createProject"
    />

    <ToastContainer />
    <PrimevueConfirmDialog />

    <template>
      <ProjectEditPopup v-if="activePopup === Popup.EDIT_PROJECT" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { RouterView } from 'vue-router';
import PrimevueConfirmDialog from 'primevue/confirmdialog';

import type { AppController } from 'shared/types';
import { Controller, Popup } from 'shared/constants';
import { useController, useEditProjectPopup } from 'view/hooks';
import { type Store, useStore } from 'view/store';

import AppHeaderContainer from 'view/containers/AppHeaderContainer.vue';
import ToastContainer from 'view/containers/ToastContainer.vue';
import SpeedAddButton from 'view/components/SpeedAddButton.vue';
import ProjectEditPopup from './popups/ProjectEditPopup.vue';

type State = {
  isLoaded: boolean;
}

// Properties
const state = reactive<State>({
  isLoaded: false,
});

const store: Store = useStore();
const openEditProjectPopup = useEditProjectPopup();
const appController: AppController = useController(Controller.APP);

const activePopup = computed<Popup | null>(() => {
  return store.state.app.activePopup;
});

// Hooks
onMounted(async () => {
  const success: boolean = await appController.setup();

  if (success) {
    state.isLoaded = true;
  }
});

// Methods
function createProject(): void {
  openEditProjectPopup();
}
</script>

<style scoped lang="scss"></style>
