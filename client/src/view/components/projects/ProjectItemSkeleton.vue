<template>
  <ProjectItemWrapper class="hover:!bg-transparent" :is-list-view="props.isListView">
    <template #content>
      <BaseSkeleton
        borderRadius="12px"
        :width="props.isListView ? '3rem' : '6rem'"
        :height="props.isListView ? '3rem' : '6rem'"
      />

      <BaseSkeleton width="100px" />
    </template>
  </ProjectItemWrapper>
</template>

<script setup lang="ts">
import ProjectItemWrapper from 'view/components/projects/ProjectItemWrapper.vue';

type Props = {
  isListView: boolean;
}

// Properties
const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
