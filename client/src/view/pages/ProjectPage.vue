<template>
  <DefaultLayout v-if="state.isLoaded && state.isProjectActivated">
    <template #header>
      <ProjectPageHeaderContainer @tab-change="changeTab" />
    </template>

    <Transition appear name="content" mode="out-in">
      <component :is="activeTabComponent" />
    </Transition>
  </DefaultLayout>

  <ErrorLayout v-else-if="state.isLoaded && !state.isProjectActivated">
    Project not found.
  </ErrorLayout>

  <ProjectPageSkeleton v-else />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, reactive } from 'vue';

import type { ProjectsController } from 'shared/types';
import { Controller, ProjectPageTabKey, ZERO } from 'shared/constants';
import { useController } from 'view/hooks';

import DefaultLayout from 'view/layouts/DefaultLayout.vue';
import ErrorLayout from 'view/layouts/ErrorLayout.vue';
import ProjectPageHeaderContainer from 'view/containers/projects/ProjectPageHeaderContainer.vue';
import ProjectPageSkeleton from 'view/components/projects/ProjectPageSkeleton.vue';

const ProjectOverviewContainer = defineAsyncComponent(() => {
  return import('view/containers/projects/ProjectOverviewContainer.vue');
});

const ProjectTaskListContainer = defineAsyncComponent(() => {
  return import('view/containers/projects/ProjectTaskListContainer.vue');
});

const ProjectTaskBoardContainer = defineAsyncComponent(() => {
  return import('view/containers/projects/ProjectTaskBoardContainer.vue');
});

type Props = {
  id: string;
}

type State = {
  isLoaded: boolean;
  isProjectActivated: boolean;
  activeTabKey: ProjectPageTabKey;
}

// Properties
const props = defineProps<Props>();
const state = reactive<State>({
  isLoaded: false,
  isProjectActivated: false,
  activeTabKey: ProjectPageTabKey.OVERVIEW,
});

const projectsController: ProjectsController = useController(Controller.PROJECTS);

const activeTabComponent = computed(() => {
  switch (state.activeTabKey) {
    case ProjectPageTabKey.OVERVIEW:
      return ProjectOverviewContainer;
    case ProjectPageTabKey.LIST:
      return ProjectTaskListContainer;
    case ProjectPageTabKey.BOARD:
      return ProjectTaskBoardContainer;
  }
});

// Hooks
onMounted(async () => {
  const projectId: number = Number(props.id);
  const isProjectLoaded: boolean = await projectsController.loadProject(projectId);

  if (isProjectLoaded) {
    const isProjectActivated: boolean = projectsController.activateProject(projectId);

    if (isProjectActivated) {
      state.isProjectActivated = true;
    }
  }

  state.isLoaded = true;
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
