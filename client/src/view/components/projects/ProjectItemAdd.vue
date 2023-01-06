<template>
  <ProjectItemWrapper
    :is-list-view="props.isListView"
    @item-click="emits('item-click')"
  >
    <template #content>
      <div
        class="border-2 border-dashed border-gray-400 rounded-xl flex-center"
        :class="{
          'w-12 h-12': props.isListView,
          'w-24 h-24': !props.isListView,
        }"
      >
        <BaseIcon class="text-gray-400" icon="pi-plus" />
      </div>

      <div class="text-sm text-gray-400 text-center select-none">
        New project
      </div>
    </template>
  </ProjectItemWrapper>
</template>

<script setup lang="ts">
import ProjectItemWrapper from 'view/components/projects/ProjectItemWrapper.vue';

type ComponentProps = {
  isListView: boolean;
}

// Properties
const props = defineProps<ComponentProps>();
const emits = defineEmits(['item-click']);
</script>

<style scoped lang="scss"></style>
