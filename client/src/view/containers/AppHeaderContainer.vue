<template>
  <header class="header bg-gray-50 border-b-2 border-gray-200 flex items-center w-full">
    <div class="container flex items-center justify-between duration-200">
      <div class="flex items-center gap-4 relative">
        <BaseButton
          class="p-button-sm p-button-text p-button-rounded"
          icon="pi pi-bars"
          @click="showAppMenu"
        />

        <slot />
      </div>

      <div>
        <BaseButton
          class="p-button-sm p-button-text p-button-rounded"
          icon="pi pi-search"
        />
      </div>
    </div>

    <PrimevueSidebar position="left" v-model:visible="state.isAppMenuVisible">
      <template #header>
        <h1>Tasky</h1>
      </template>

      <div>
        <BaseMenu class="app-menu" :model="menuItems" />

        <BaseDivider />

        <ProjectMenuItems
          :items="activeProjectMenuItems"
          @item-click="handleProjectMenuItemClick"
        />

        <div v-if="archivedProjectMenuItems.length">
          <BaseLabel class="px-5 py-3 click" @click.stop="toggleArchivedProjects">
            {{ state.isArchivedProjectItemsShowed ? 'Hide archived' : 'Show archived' }}
          </BaseLabel>

          <ProjectMenuItems
            v-if="state.isArchivedProjectItemsShowed"
            :items="archivedProjectMenuItems"
            @item-click="handleProjectMenuItemClick"
          />
        </div>
      </div>
    </PrimevueSidebar>
  </header>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { type Router, useRouter } from 'vue-router';
import PrimevueSidebar from 'primevue/sidebar';
import type { MenuItem } from 'primevue/menuitem';
import type { ProjectMenuItem } from 'shared/types';
import { PagePath } from 'shared/constants';
import { type Store, useStore } from 'view/store';
import { useProjectPage } from 'view/hooks';

import ProjectMenuItems from 'view/components/projects/ProjectMenuItems.vue';

type State = {
  isAppMenuVisible: boolean;
  isArchivedProjectItemsShowed: boolean;
}

// Properties
const state = reactive<State>({
  isAppMenuVisible: false,
  isArchivedProjectItemsShowed: false,
});

const store: Store = useStore();
const router: Router = useRouter();

const openProjectPage = useProjectPage();

const menuItems: MenuItem[] = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push({ path: PagePath.HOME });

      closeAppMenu();
    },
  }
];

const activeProjectMenuItems = computed<ProjectMenuItem[]>(() => {
  return store.state.projects.menuItems.filter(({ isArchived }) => !isArchived);
});

const archivedProjectMenuItems = computed<ProjectMenuItem[]>(() => {
  return store.state.projects.menuItems.filter(({ isArchived }) => isArchived);
});

// Methods
function showAppMenu(): void {
  state.isAppMenuVisible = true;
}

function closeAppMenu(): void {
  state.isAppMenuVisible = false;
}

function toggleArchivedProjects(): void {
  state.isArchivedProjectItemsShowed = !state.isArchivedProjectItemsShowed;
}

function handleProjectMenuItemClick(id: number): void {
  openProjectPage(id);
  closeAppMenu();
}
</script>

<style scoped lang="scss"></style>
