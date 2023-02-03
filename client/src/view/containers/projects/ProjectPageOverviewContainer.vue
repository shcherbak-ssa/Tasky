<template>
  <ContentWrapper type="simple">
    <ProjectOverviewAbout :project="pageProject" />
  </ContentWrapper>
</template>

<script setup lang="ts">
import { type UseProject, useProject } from 'view/hooks';

import ContentWrapper from 'view/components/ContentWrapper.vue';
import ProjectOverviewAbout from 'view/components/projects/ProjectOverviewAbout.vue';

// Properties
const pageProject: UseProject = useProject({ type: 'page' });

</script>

<style scoped lang="scss"></style>
