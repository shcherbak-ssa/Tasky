<template>
  <DefaultLayout>
    <template #header>
      <h1>{{ PageTitle.BASE }}</h1>
    </template>

    <BaseMessage
      class="w-full"
      severity="error"
      @close="redirectToHome"
    >
      <slot />
    </BaseMessage>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Router, useRouter } from 'vue-router';
import { PagePath, PageTitle } from 'shared/constants';
import { updateDocumentTitle } from 'shared/utils';

import DefaultLayout from 'view/layouts/DefaultLayout.vue';

// Properties
const router: Router = useRouter();

// Hooks
onMounted(() => {
  updateDocumentTitle();
});

// Methods
function redirectToHome(): void {
  router.push({
    path: PagePath.HOME,
  });
}
</script>

<style scoped lang="scss"></style>