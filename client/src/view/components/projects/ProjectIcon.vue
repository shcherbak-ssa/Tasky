<template>
  <div>
    <IconifyIcon :icon="`${props.icon.family}:${props.icon.name}`" />
  </div>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue';
import type { AssetsProjectIcon } from 'shared/types';

type Props = {
  icon: AssetsProjectIcon;
  handleClick?: boolean;
}

// Properties
const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
