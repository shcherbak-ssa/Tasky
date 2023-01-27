<template>
  <ContentWrapper type="simple">
    <ContentSection
      :tabs="sectionTabs"
      :active-tab-key="state.activeTabKey"
      @select-tab="selectSectionTab"
    >
      <template #rightSide>
        <BaseButton
          class="p-button-sm p-button-text p-button-rounded"
          :icon="`pi ${activeProjectsViewIcon}`"
          @click="toggleProjectsViewMenu"
        />

        <BaseMenu
          ref="projectsViewMenu"
          :model="projectsViewMenuItems"
          :popup="true"
        />
      </template>
    </ContentSection>

    <ProjectListWrapper v-if="state.isProjectsLoaded" :view="settings.projectsView">
      <TransitionGroup name="list">
        <ProjectItemAdd
          v-if="state.activeTabKey === TabKey.PROJECT"
          :isListView="isListProjectsView"
          @item-click="createProject"
        />

        <template v-for="project in projects" :key="project.id">
          <ProjectItem
            v-if="project.id !== state.deletingProjectId"
            :project="project"
            :is-list-view="isListProjectsView"
            @update-project="updateProject(project.id)"
            @archive-project="archiveProject(project)"
            @restore-project="restoreProject(project)"
            @delete-project="deleteProject(project)"
          />
        </template>
      </TransitionGroup>
    </ProjectListWrapper>

    <ProjectListWrapper v-else :view="settings.projectsView">
      <ProjectItemSkeleton
        v-for="item in 4"
        :key="item"
        :is-list-view="isListProjectsView"
      />
    </ProjectListWrapper>
  </ContentWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import { useConfirm } from 'primevue/useconfirm';

import type { ProjectsController, SettingsController } from 'shared/types';
import type { Project } from 'models/project';
import type { Settings } from 'models/settings';
import { Controller, ProjectsView, ZERO } from 'shared/constants';
import { useController, useEditProjectPopup } from 'view/hooks';
import { type Store, useStore } from 'view/store';

import ProjectItem from 'view/components/projects/ProjectItem.vue';
import ProjectListWrapper from 'view/components/projects/ProjectListWrapper.vue';
import ContentWrapper from 'view/components/ContentWrapper.vue';
import ProjectItemAdd from 'view/components/projects/ProjectItemAdd.vue';
import ProjectItemSkeleton from 'view/components/projects/ProjectItemSkeleton.vue';
import ContentSection from 'view/components/ContentSection.vue';

enum TabKey {
  PROJECT = 'project',
  ARCHIVE = 'archive',
}

type State = {
  activeTabKey: TabKey;
  isProjectsLoaded: boolean;
  deletingProjectId: number;
}

// Properties
const state = reactive<State>({
  activeTabKey: TabKey.PROJECT,
  isProjectsLoaded: false,
  deletingProjectId: ZERO,
});

const projectsViewMenu = ref(null);

const store: Store = useStore();
const confirm = useConfirm();
const openEditProjectPopup = useEditProjectPopup();

const projectsController: ProjectsController = useController(Controller.PROJECTS);
const settingsController: SettingsController = useController(Controller.SETTINGS);

const projects = computed<Project[]>(() => {
  return store.state.projects.list
    .filter(({ isArchived }) => {
      return state.activeTabKey === TabKey.PROJECT
        ? !isArchived
        : isArchived;
    });
});

const settings = computed<Settings>(() => {
  return store.getters.getSettings();
});

const isListProjectsView = computed<boolean>(() => {
  return settings.value.projectsView === ProjectsView.LIST;
});

const activeProjectsViewIcon = computed<string>(() => {
  return isListProjectsView.value ? 'pi-list' : 'pi-th-large';
});

const projectsViewMenuItems = computed<MenuItem[]>(() => {
  return [
    {
      label: 'View as tiles',
      icon: 'pi pi-th-large',
      visible: settings.value.projectsView === ProjectsView.LIST,
      command: () => {
        updateProjectsViewSettings(ProjectsView.TILES);
      },
    },
    {
      label: 'View as list',
      icon: 'pi pi-list',
      visible: settings.value.projectsView === ProjectsView.TILES,
      command: () => {
        updateProjectsViewSettings(ProjectsView.LIST);
      },
    },
  ];
});

const sectionTabs = computed<{ label: string; key: string; }[]>(() => {
  return [
    {
      label: 'Projects',
      key: TabKey.PROJECT,
    },
    {
      label: 'Archive',
      key: TabKey.ARCHIVE,
    },
  ];
});

// Hooks
onMounted(async () => {
  const success: boolean = await projectsController.loadProjects();

  if (success) {
    state.isProjectsLoaded = true;
  }
});

// Methods
function selectSectionTab(tabKey: TabKey): void {
  state.activeTabKey = tabKey;
}

async function updateProjectsViewSettings(newView: ProjectsView): Promise<void> {
  settings.value.projectsView = newView;
  await settingsController.saveSettings(settings.value);
}

function toggleProjectsViewMenu(e: Event): void {
  if (projectsViewMenu && state.isProjectsLoaded) {
    // @ts-ignore
    projectsViewMenu.value.toggle(e);
  }
}

function createProject(): void {
  openEditProjectPopup();
}

function updateProject(projectId: number): void {
  openEditProjectPopup(projectId);
}

function archiveProject(project: Project): void {
  confirm.require({
    header: 'Archive project',
    message: 'Are you sure?',
    acceptClass: 'p-button-danger',
    defaultFocus: 'reject',
    accept: () => {
      projectsController.archiveProject(project);
    },
  });
}

function restoreProject(project: Project): void {
  projectsController.restoreProject(project);
}

function deleteProject(project: Project): void {
  confirm.require({
    header: 'Delete project',
    message: 'This action will delete all related data. Are you sure?',
    acceptClass: 'p-button-danger',
    defaultFocus: 'reject',
    accept: () => {
      state.deletingProjectId = project.id;

      projectsController.deleteProject(project)
        .then(() => {
          state.deletingProjectId = ZERO;
        });
    },
  });
}
</script>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  opacity: 0;
  transition: .4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
