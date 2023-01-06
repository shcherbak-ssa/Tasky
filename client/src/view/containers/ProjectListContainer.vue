<template>
  <ContentWrapper type="simple">
    <div class="border-b-2 flex items-center justify-between py-2">
      <h3>Projects</h3>

      <div>
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
      </div>
    </div>

    <ProjectListWrapper v-if="state.isProjectsLoaded" :view="settings.projectsView">
      <ProjectItemAdd
        :isListView="isListProjectsView"
        @item-click="createProject"
      />

      <template v-if="projects.length">
        <template v-for="project in projects" :key="project.id">
          <ProjectItem
            v-if="project.id !== state.deletingProjectId"
            :project="project"
            :is-list-view="isListProjectsView"
            @update-project="updateProject(project.id)"
            @delete-project="deleteProject(project)"
          />
        </template>
      </template>
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
import { type Router, useRouter } from 'vue-router';
import type { MenuItem } from 'primevue/menuitem';
import { ToastSeverity } from 'primevue/api';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

import type { ProjectsController, SettingsController } from 'shared/types';
import type { Project } from 'models/project';
import type { Settings } from 'models/settings';
import { Controller, ProjectsView, ToastGroup, TOAST_LIFE, ZERO } from 'shared/constants';
import { useController, useEditProjectPopup } from 'view/hooks';
import { type Store, useStore } from 'view/store';

import ProjectItem from 'view/components/projects/ProjectItem.vue';
import ProjectListWrapper from 'view/components/projects/ProjectListWrapper.vue';
import ContentWrapper from 'view/components/ContentWrapper.vue';
import ProjectItemAdd from 'view/components/projects/ProjectItemAdd.vue';
import ProjectItemSkeleton from 'view/components/projects/ProjectItemSkeleton.vue';

type State = {
  isProjectsLoaded: boolean;
  deletingProjectId: number;
}

// Properties
const state = reactive<State>({
  isProjectsLoaded: false,
  deletingProjectId: ZERO,
});

const projectsViewMenu = ref(null);

const store: Store = useStore();
const toast = useToast();
const confirm = useConfirm();
const openEditProjectPopup = useEditProjectPopup();

const projectsController: ProjectsController = useController(Controller.PROJECTS);
const settingsController: SettingsController = useController(Controller.SETTINGS);

const projects = computed<Project[]>(() => {
  return store.state.projects.list;
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

// Hooks
onMounted(async () => {
  const success: boolean = await projectsController.loadProjects();

  if (success) {
    state.isProjectsLoaded = true;
  }
});

// Methods
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

function deleteProject(project: Project): void {
  confirm.require({
    header: 'Delete project',
    message: 'This action will delete all related data. Are you sure?',
    acceptClass: 'p-button-danger',
    defaultFocus: 'reject',
    accept: () => {
      state.deletingProjectId = project.id;

      toast.add({
        severity: ToastSeverity.INFO,
        summary: `Deleting <strong>${project.name}</strong> project`,
        group: ToastGroup.DELETE_PROCESSING,
      });

      projectsController.deleteProject(project)
        .then((success: boolean) => {
          if (success) {
            toast.removeGroup(ToastGroup.DELETE_PROCESSING);

            toast.add({
              severity: ToastSeverity.SUCCESS,
              summary: `Deleted`,
              detail: `Project <strong>${project.name}</strong> deleted successfully`,
              group: ToastGroup.MESSAGE,
              life: TOAST_LIFE,
            });
          }

          state.deletingProjectId = 0;
        });
    },
  });
}
</script>

<style scoped lang="scss"></style>
