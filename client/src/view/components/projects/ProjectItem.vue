<template>
  <ProjectItemWrapper :is-list-view="props.isListView" :is-active="state.isActive">
    <template #content>
      <ProjectAssets
        mode="show"
        :size="props.isListView ? 'normal' : 'big'"
        :project="props.project"
      />

      <div
        class="name text-sm font-semibold select-none"
        :class="{
          'list pr-1': props.isListView,
          'tiels text-center': !props.isListView,
        }"
      >
        {{ props.project.name }}
      </div>
    </template>

    <template #menu>
      <BaseButton
        class="p-button-sm p-button-text p-button-rounded"
        icon="pi pi-ellipsis-h"
        :style="{ color: 'inherit' }"
        @click="toggleMenu"
      />

      <BaseMenu
        ref="menu"
        :model="menuItems"
        :popup="true"
        @show="activateItem"
        @hide="deactivateItem"
      />
    </template>
  </ProjectItemWrapper>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import type { Project } from 'models/project';

import ProjectAssets from 'view/components/projects/ProjectAssets.vue';
import ProjectItemWrapper from 'view/components/projects/ProjectItemWrapper.vue';

type Props = {
  project: Project;
  isListView: boolean;
}

type State = {
  isActive: boolean;
}

// Properties
const props = defineProps<Props>();
const emits = defineEmits(['update-project', 'archive-project', 'restore-project', 'delete-project']);
const state = reactive<State>({
  isActive: false,
});

const menu = ref(null);

const menuItems = computed<MenuItem[]>(() => {
  return [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {
        emits('update-project');
      },
    },
    {
      label: (props.project.isArchived ? 'Restore' : 'Archive'),
      icon: (props.project.isArchived ? 'pi pi-replay' : 'pi pi-briefcase'),
      command: () => {
        if (props.project.isArchived) {
          emits('restore-project');
          return;
        }

        emits('archive-project');
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        emits('delete-project');
      },
    },
  ];
});

// Methods
function toggleMenu(e: Event): void {
  if (menu) {
    // @ts-ignore
    menu.value.toggle(e);
  }
}

function activateItem(): void {
  state.isActive = true;
}

function deactivateItem(): void {
  state.isActive = false;
}
</script>

<style scoped lang="scss">
.name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  &.list {
    -webkit-line-clamp: 1;
  }

  &.tiels {
    -webkit-line-clamp: 2;
  }
}
</style>
