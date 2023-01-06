<template>
  <div
    class="rounded-xl shrink-0 flex-center"
    :class="{
      'w-8 h-8': props.size === 'small',
      'w-12 h-12': props.size === 'normal',
      'w-24 h-24': props.size === 'big',
      'click': props.mode === 'edit',
    }"
    :style="{
      background: props.project.color.bgColor,
      color: props.project.color.textColor,
    }"
    @click.stop="togglePanel"
  >
    <ProjectIcon
      :class="{
        'text-2xl': props.size === 'normal',
        'text-5xl': props.size === 'big',
      }"
      :icon="props.project.icon"
    />
  </div>

  <PrimevueOverlayPanel
    v-if="props.mode === 'edit'"
    ref="assetsPanel"
    :dismissable="true"
  >
    <ColorList
      :colors="assetsColors"
      :selected-color-id="props.project.color.id"
      @color-selected="(colorId: number) => emits('color-selected', colorId)"
    />

    <BaseDivider />

    <div class="grid grid-cols-4 gap-1 place-items-center">
      <div
        class="rounded-xl shrink-0 flex-center w-12 h-12 click"
        v-for="icon in assetsProjectIcons"
        :key="icon.id"
        :style="{
          ...(
            icon.id === props.project.icon.id ? {
              background: props.project.color.bgColor,
              color: props.project.color.textColor,
            } : {}
          ),
        }"
        @click.stop="emits('icon-selected', icon.id)"
        @mouseover.stop="(e) => updateProjectIconBgColor(e, icon.id)"
        @mouseout.stop="(e) => updateProjectIconBgColor(e, icon.id)"
      >
        <ProjectIcon class="text-2xl" :icon="icon" />
      </div>
    </div>
  </PrimevueOverlayPanel>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PrimevueOverlayPanel from 'primevue/overlaypanel';
import type { AssetsColor, AssetsProjectIcon } from 'shared/types';
import type { Project } from 'models/project';
import { type Store, useStore } from 'view/store';

import ProjectIcon from 'view/components/projects/ProjectIcon.vue';
import ColorList from 'view/components/ColorList.vue';
import { HEXColorOpacity } from 'shared/constants';

type ComponentProps = {
  project: Project;
  mode: 'show' | 'edit';
  size: 'small' | 'normal' | 'big';
}

// Properties
const props = defineProps<ComponentProps>();
const emits = defineEmits(['color-selected', 'icon-selected']);

const assetsPanel = ref(null);

const store: Store = useStore();

const assetsColors = computed<AssetsColor[]>(() => {
  return store.state.assets.colors;
});

const assetsProjectIcons = computed<AssetsProjectIcon[]>(() => {
  return store.state.assets.projectIcons;
});

// Methods
function togglePanel(e: Event): void {
  if (assetsPanel.value) {
    // @ts-ignore
    assetsPanel.value.toggle(e);
  }
}

function updateProjectIconBgColor(e: Event, iconId: number): void {
  if (iconId === props.project.icon.id) {
    return;
  }

  const { style } = e.target as HTMLElement;

  if (e.type === 'mouseover') {
    const { bgColor, textColor } = props.project.color;
    
    style.background = bgColor + HEXColorOpacity.OPACITY_30;
    // style.color = textColor;
  } else {
    style.background = 'transparent';
    // style.color = 'inherit';
  }
}
</script>

<style scoped lang="scss"></style>
