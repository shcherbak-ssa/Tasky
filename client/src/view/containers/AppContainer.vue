<template>
  <div v-if="state.isLoaded">
    <RouterView />

    <NotificationContainer />
  </div>

  <div v-else class="w-sreen h-screen flex-center">
    <BaseSpinner  />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import type { AppController } from 'shared/types';
import { Controller } from 'shared/constants';
import { useController } from 'view/hooks';

import NotificationContainer from 'view/containers/NotificationContainer.vue';

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
