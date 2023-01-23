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
      <div v-if="state.projectError" class="mb-8">
        <BaseMessage severity="error" :closable="false">
          <div>{{ state.projectError.message }}</div>
        </BaseMessage>
      </div>

      <div class="flex gap-2 h-12 mb-8">
        <ProjectAssets
          mode="edit"
          size="normal"
          :project="activeProject"
          @color-selected="updateProjectColor"
          @icon-selected="updateProjectIcon"
        />

        <div class="project-name w-full">
          <BaseInputText
            placeholder="Project name"
            :class="{ 'p-invalid': state.projectError && state.projectError.key === 'name' }"
            :value="activeProject.name"
            @input="updateProjectName"
          />
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
import { ToastSeverity } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import PrimevueTextarea from 'primevue/textarea';

import type { Project } from 'models/project';
import type { AppController, ErrorObject, ProjectsController, ProjectUpdates } from 'shared/types';
import { Controller, ToastGroup, TOAST_LIFE } from 'shared/constants';
import { getProjectDueDate } from 'shared/utils';
import { useController } from 'view/hooks';
import { type Store, useStore } from 'view/store';

import BaseDatePicker from 'view/components/base/BaseDatePicker.vue';
import ProjectAssets from 'view/components/projects/ProjectAssets.vue';

type State = {
  isPopupOpen: boolean;
  isSaveProcessing: boolean;
  isNewProject: boolean;
  projectError: ErrorObject<ProjectUpdates> | null;
}

// Properties
const state = reactive<State>({
  isPopupOpen: true,
  isSaveProcessing: false,
  isNewProject: false,
  projectError: null,
});

const store: Store = useStore();
const toast = useToast();

const appController: AppController = useController(Controller.APP);
const projectsController: ProjectsController = useController(Controller.PROJECTS);

const activeProject = computed<Project>(() => {
  return store.getters.getActiveProject();
});

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

  const error: ErrorObject<ProjectUpdates> | null = await projectsController.saveProject(activeProject.value);
  
  if (error) {
    state.projectError = error;
  } else {
    toast.add({
      severity: ToastSeverity.SUCCESS,
      summary: state.isNewProject ? 'Created' : 'Updated',
      detail: `Project <strong>${activeProject.value.name}</strong> ${state.isNewProject ? 'created' : 'updated'} successfully`,
      group: ToastGroup.MESSAGE,
      life: TOAST_LIFE,
    });

    closePopup();
    projectsController.removeActiveProject();
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
.project-name .p-inputtext {
  @apply font-semibold text-2xl h-full;
}
</style>
