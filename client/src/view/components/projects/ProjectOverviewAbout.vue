<template>
  <div>
    <ContentSection :tabs="sectionAboutTabs" active-tab-key="about" />

    <div class="py-4">
      <div class="mb-4">
        <BaseLabel>Description</BaseLabel>

        <p v-if="props.project.description" class="py-1">
          {{ props.project.description }}
        </p>

        <p v-else class="no-description py-1">No description</p>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <BaseLabel>Created</BaseLabel>
          <BaseDatePicker
            placeholder="Created"
            :value="props.project.createdAt"
            :readonly="true"
          />
        </div>

        <div class="flex items-center gap-2">
          <BaseLabel class="shrink-0">Due Date</BaseLabel>
          <BaseDatePicker
            placeholder="Not due date"
            :value="props.project.dueDate"
            :readonly="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from 'models/project';
import type { ViewTab } from 'shared/types';

import BaseDatePicker from 'view/components/base/BaseDatePicker.vue';
import ContentSection from 'view/components/ContentSection.vue';

type Props = {
  project: Project;
}

// Properties
const props = defineProps<Props>();

const sectionAboutTabs: ViewTab[] = [
  {
    label: 'About',
    key: 'about',
  },
];
</script>

<style scoped lang="scss">
.no-description {
  color: var(--text-color-secondary);
}
</style>
