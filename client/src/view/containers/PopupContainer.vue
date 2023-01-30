<template>
  <ProjectEditPopup v-if="activePopup === Popup.EDIT_PROJECT" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { Popup } from 'shared/constants';
import { type Store, useStore } from 'view/store';

const ProjectEditPopup = defineAsyncComponent(() => {
  return import('view/containers/popups/ProjectEditPopup.vue');
});

// Properties
const store: Store = useStore();

const activePopup = computed<Popup | null>(() => {
  return store.state.app.popup;
});
</script>

<style scoped lang="scss"></style>
