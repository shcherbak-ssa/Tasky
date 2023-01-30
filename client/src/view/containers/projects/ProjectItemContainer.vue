<template>
  <ProjectItemWrapper
    :is-list-view="props.isListView"
    :is-active="state.isActive"
    @item-click="emits('item-click')"
  >
    <template #content>
      <ProjectAssetsContainer
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
        @click.stop="toggleMenu"
      />

      <BaseMenu
        ref="menu"
        :model="getProjectMuteItems(props.project)"
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
import { useProjectMenu } from 'view/hooks';

import ProjectAssetsContainer from 'view/containers/projects/ProjectAssetsContainer.vue';
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
const emits = defineEmits(['item-click']);
const state = reactive<State>({
  isActive: false,
});

const menu = ref(null);

const getProjectMuteItems = useProjectMenu();

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
