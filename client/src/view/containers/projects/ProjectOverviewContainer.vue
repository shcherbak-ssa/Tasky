<template>
  <ContentWrapper type="simple">
    <ProjectOverviewAbout :project="activeProject" />
  </ContentWrapper>
</template>

<script setup lang="ts">
import { type ActiveProject, useActiveProject } from 'view/hooks';

import ContentWrapper from 'view/components/ContentWrapper.vue';
import ProjectOverviewAbout from 'view/components/projects/ProjectOverviewAbout.vue';

// Properties
const activeProject: ActiveProject = useActiveProject();

</script>

<style scoped lang="scss"></style>
