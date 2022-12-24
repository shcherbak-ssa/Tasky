<template>
  <div class="bg-gray-100 w-screan min-h-screen">
    <AppHeaderContainer />

    <div class="container py-12">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageRoute } from 'shared/constants';
import AppHeaderContainer from 'view/containers/AppHeaderContainer.vue';
import { onMounted } from 'vue';
import { Router, useRouter } from 'vue-router';

// Properties
const router: Router = useRouter();

// Hooks
// @TODO: remove
onMounted(() => {
  if (router.currentRoute.value.path === '/') {
    router.push(PageRoute.PROJECTS);
  }
});

// Methods
</script>

<style scoped lang="scss"></style>
