<template>
  <div>@TODO</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Router, useRouter } from 'vue-router';
import type { ProjectsController } from 'shared/types';
import type { Project } from 'models/project';
import { Controller } from 'shared/constants';
import { useController } from 'view/hooks';
import { Store, useStore } from 'view/store';

// Properties
const store: Store = useStore();
const router: Router = useRouter();
const projectsController: ProjectsController = useController(Controller.PROJECTS);

// Hooks
onMounted(async() => {
  if (projectsController) {
    const success: boolean = await projectsController.loadProject();

    if (success) {
      console.log('success');
    }
  }
});

// Methods
async function addProject(): Promise<void> {
  // router.push(PageRoute.PROJECTS_CREATE);
}

async function updateProject(project: Project): Promise<void> {}

async function deleteProject(project: Project): Promise<void> {}
</script>

<style scoped lang="scss"></style>
