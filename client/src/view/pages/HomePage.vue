<template>
  <DefaultLayout>
    <template #header>
      <h1>{{ HOME_PAGE_TITLE }}</h1>
    </template>

    <ProjectListContainer />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { updateDocumentTitle } from 'shared/utils';

import DefaultLayout from 'view/layouts/DefaultLayout.vue';
import ProjectListContainer from 'view/containers/projects/ProjectListContainer.vue';

const HOME_PAGE_TITLE: string = 'Home';

// Hooks
onMounted(() => {
  updateDocumentTitle(HOME_PAGE_TITLE);
});
</script>

<style scoped lang="scss"></style>
