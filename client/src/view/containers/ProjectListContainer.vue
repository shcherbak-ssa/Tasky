<template>
  <div v-if="store.state.projects.length === 0">
    <div>You have no projects yet</div>
    <button @click="addProject">
      Add project
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Controller, PageRoute } from 'shared/constants';
import { ProjectsController } from 'shared/types';
import { useController } from 'view/hooks';
import { Store, useStore } from 'view/store';
import { Router, useRouter } from 'vue-router';

// Properties
const store: Store = useStore();
const router: Router = useRouter();
const projectsController: ProjectsController = useController(Controller.PROJECTS);

// Hooks
onMounted(async() => {
  if (projectsController) {
    const success: boolean = await projectsController.loadProjects();

    if (success) {
      console.log('success');
    }
  }
});

// Methods
function addProject(): void {
  router.push(PageRoute.PROJECTS_CREATE);
}
</script>

<style scoped lang="scss"></style>
