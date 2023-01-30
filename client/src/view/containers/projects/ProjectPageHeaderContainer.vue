<template>
  <div class="flex items-center gap-4">
    <ProjectAssetsContainer
      mode="show"
      size="normal"
      :project="activeProject"
    />

    <div class="flex flex-col" style="margin-bottom: -8px;">
      <div class="flex items-center gap-2">
        <h1>{{ activeProject.name }}</h1>

        <BaseButton
          class="p-button-sm p-button-text p-button-rounded"
          icon="pi pi-chevron-down"
          @click="toggleProjectPageMenu"
        />

        <BaseMenu
          ref="projectPageMenu"
          :model="getProjectMuteItems(activeProject)"
          :popup="true"
        />
      </div>

      <PrimevueTabMenu
        class="header-tabs"
        :model="tabs"
        @tab-change="changeTab"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PrimevueTabMenu, { TabMenuChangeEvent } from 'primevue/tabmenu';
import type { MenuItem } from 'primevue/menuitem';
import { ProjectPageTabKey } from 'shared/constants';
import { updateDocumentTitle } from 'shared/utils';
import { type ActiveProject, useActiveProject, useProjectMenu } from 'view/hooks';

import ProjectAssetsContainer from 'view/containers/projects/ProjectAssetsContainer.vue';

// Properties
const emits = defineEmits(['tab-change']);

const projectPageMenu = ref(null);

const activeProject: ActiveProject = useActiveProject();
const getProjectMuteItems = useProjectMenu();

const tabs: MenuItem[] = [
  {
    label: 'Overview',
    key: ProjectPageTabKey.OVERVIEW,
  },
  {
    label: 'List',
    key: ProjectPageTabKey.LIST,
  },
  {
    label: 'Board',
    key: ProjectPageTabKey.BOARD,
  },
];

// Hooks
onMounted(() => {
  updateDocumentTitle(activeProject.value.name);
});

// Methods
function changeTab({ index }: TabMenuChangeEvent): void {
  emits('tab-change', tabs[index].key);
}

function toggleProjectPageMenu(e: Event): void {
  if (projectPageMenu) {
    // @ts-ignore
    projectPageMenu.value.toggle(e);
  }
}
</script>

<style scoped lang="scss"></style>
