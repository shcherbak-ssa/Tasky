<template>
  <BasePopup
    v-model:visible="state.isPopupOpen"
    appendTo="#popup"
    :closable="false"
    @hide="closePopup"
  >
    <template #header>
      <div class="relative w-full">
        <div class="flex items-center justify-between">
          <h2>{{ state.isNewProject ? 'Create project' : 'Update project' }}</h2>

          <BaseButton
            class="p-button-rounded"
            icon="pi pi-save"
            :disabled="!hasUpdates"
            :loading="state.isSaveProcessing"
            @click="saveProject"
          />
        </div>
      </div>
    </template>

    <div class="">
      <div class="flex gap-2 h-12 mb-8">
        <ProjectAssets
          mode="edit"
          size="normal"
          :project="activeProject"
          @color-selected="updateProjectColor"
          @icon-selected="updateProjectIcon"
        />

        <div class="name w-full">
          <BaseInputText
            placeholder="Project name"
            :class="{ 'p-invalid': state.projectError.name }"
            :value="activeProject.name"
            :autofocus="true"
            @input="updateProjectName"
          />

          <div v-if="state.projectError.name" class="p-error text-sm">
            Project {{ state.projectError.name }}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <BaseLabel>Due date</BaseLabel>
        <BaseDatePicker
          placeholder="No due date"
          :value="activeProject.dueDate"
          @date-select="updateProjectDueDate"
        />
      </div>

      <div>
        <BaseLabel class="mb-2">Description</BaseLabel>
        <!-- @TODO: replace with text editor -->
        <PrimevueTextarea
          placeholder="Add meeting details, communication channels, and other important information."
          :autoResize="true"
          :model-value="activeProject.description"
          @input="updateProjectDescription"
        />
      </div>
    </div>
  </BasePopup>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import PrimevueTextarea from 'primevue/textarea';

import type { AppController, ErrorObject, ProjectsController, ProjectUpdates } from 'shared/types';
import { Controller } from 'shared/constants';
import { getProjectDueDate } from 'shared/utils';
import { ActiveProject, useActiveProject, useController, useProjectPage } from 'view/hooks';
import { type Store, useStore } from 'view/store';

import BaseDatePicker from 'view/components/base/BaseDatePicker.vue';
import ProjectAssets from 'view/containers/projects/ProjectAssetsContainer.vue';

type State = {
  isPopupOpen: boolean;
  isSaveProcessing: boolean;
  isNewProject: boolean;
  projectError: ErrorObject<ProjectUpdates>;
}

// Properties
const state = reactive<State>({
  isPopupOpen: true,
  isSaveProcessing: false,
  isNewProject: false,
  projectError: {},
});

const store: Store = useStore();

const activeProject: ActiveProject = useActiveProject();
const openProjectPage = useProjectPage();
const appController: AppController = useController(Controller.APP);
const projectsController: ProjectsController = useController(Controller.PROJECTS);

const hasUpdates = computed<boolean>(() => {
  return activeProject.value.hasUpdates();
});

// Hooks
onMounted(() => {
  state.isNewProject = activeProject.value.isNewProject();
});

// Methods
async function saveProject(): Promise<void> {
  state.isSaveProcessing = true;

  const errors: ErrorObject<ProjectUpdates> | null = await projectsController.saveProject(activeProject.value);

  if (errors) {
    state.projectError = errors;
  } else {
    closePopup();

    if (state.isNewProject) {
      openProjectPage(activeProject.value.id);
    }
  }

  state.isSaveProcessing = false;
}

function updateProjectName(e: FocusEvent): void {
  // @ts-ignore
  activeProject.value.name = e.target.value;
  updateActiveProject();
}

function updateProjectDescription(e: Event): void {
  // @ts-ignore
  activeProject.value.description = e.target.value;
  updateActiveProject();
}

function updateProjectDueDate(value: Date | undefined): void {
  let newDueDate: Date | null = null;

  if (value) {
    newDueDate = getProjectDueDate(value);
  }

  activeProject.value.dueDate = newDueDate;
  updateActiveProject();
}

function updateProjectColor(colorId: number): void {
  activeProject.value.color = store.getters.getAssetsColor(colorId);
  updateActiveProject();
}

function updateProjectIcon(iconId: number): void {
  activeProject.value.icon = store.getters.getAssetsProjectIcon(iconId);
  updateActiveProject();
}

function updateActiveProject(): void {
  projectsController.updateActiveProject(activeProject.value);
}

function closePopup(): void {
  appController.closePopup();
}
</script>

<style scoped lang="scss">
.name .p-inputtext {
  @apply font-semibold text-2xl h-full;
}
</style>
