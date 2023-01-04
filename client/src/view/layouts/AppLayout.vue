<template>
  <div class="bg-gray-100 w-screan min-h-screen">
    <AppHeaderContainer />

    <div class="container py-12">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Router, useRouter } from 'vue-router';
import type { AssetsController } from 'shared/types';
import { Controller, PageRoute } from 'shared/constants';
import { useController } from 'view/hooks';

import AppHeaderContainer from 'view/containers/AppHeaderContainer.vue';

// Properties
const router: Router = useRouter();
const assetsController: AssetsController = useController(Controller.ASSETS);

// Hooks
onMounted(async () => {
  const isLoadedSuccess: boolean = await assetsController.loadAssets();

  if (isLoadedSuccess) {
    // @TODO: remove
    if (router.currentRoute.value.path === '/') {
      router.push(PageRoute.PROJECTS);
    }
  }
});

// Methods
</script>

<style scoped lang="scss"></style>
