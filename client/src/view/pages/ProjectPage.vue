<template>
  <DefaultLayout v-if="state.isLoaded && state.isPageProjectSetted">
    <template #header>
      <ProjectPageHeaderContainer @tab-change="changeTab" />
    </template>

    <Transition appear name="content" mode="out-in">
      <component :is="activeTabComponent" />
    </Transition>
  </DefaultLayout>

  <ErrorLayout v-else-if="state.isLoaded && !state.isPageProjectSetted">
    Project not found.
  </ErrorLayout>

  <ProjectPageSkeleton v-else />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, reactive } from 'vue';

import type { ProjectsController } from 'shared/types';
import { Controller, ProjectPageTabKey } from 'shared/constants';
import { useController } from 'view/hooks';

import DefaultLayout from 'view/layouts/DefaultLayout.vue';
import ErrorLayout from 'view/layouts/ErrorLayout.vue';
import ProjectPageHeaderContainer from 'view/containers/projects/ProjectPageHeaderContainer.vue';
import ProjectPageSkeleton from 'view/components/projects/ProjectPageSkeleton.vue';

const ProjectPageOverviewContainer = defineAsyncComponent(() => {
  return import('view/containers/projects/ProjectPageOverviewContainer.vue');
});

const ProjectPageListContainer = defineAsyncComponent(() => {
  return import('view/containers/projects/ProjectPageListContainer.vue');
});

const ProjectPageBoardContainer = defineAsyncComponent(() => {
  return import('view/containers/projects/ProjectPageBoardContainer.vue');
});

type Props = {
  id: string;
}

type State = {
  isLoaded: boolean;
  isPageProjectSetted: boolean;
  activeTabKey: ProjectPageTabKey;
}

// Properties
const props = defineProps<Props>();
const state = reactive<State>({
  isLoaded: false,
  isPageProjectSetted: false,
  activeTabKey: ProjectPageTabKey.OVERVIEW,
});

const projectsController: ProjectsController = useController(Controller.PROJECTS);

const activeTabComponent = computed(() => {
  switch (state.activeTabKey) {
    case ProjectPageTabKey.OVERVIEW:
      return ProjectPageOverviewContainer;
    case ProjectPageTabKey.LIST:
      return ProjectPageListContainer;
    case ProjectPageTabKey.BOARD:
      return ProjectPageBoardContainer;
  }
});

// Hooks
onMounted(async () => {
  const projectId: number = Number(props.id);
  const isProjectLoaded: boolean = await projectsController.loadProject(projectId);

  if (isProjectLoaded) {
    const isPageProjectSetted: boolean = projectsController.setPageProject(projectId);

    if (isPageProjectSetted) {
      state.isPageProjectSetted = true;
    }
  }

  state.isLoaded = true;
});

onUnmounted(() => {
  projectsController.removePageProject();
});

// Methods
function changeTab(tabKey: ProjectPageTabKey): void {
  state.activeTabKey = tabKey;
}
</script>

<style scoped lang="scss">
.content-enter-active,
.content-leave-active {
  opacity: 0;
  transition: .2s ease;
}

.content-enter-from,
.content-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
