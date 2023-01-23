<template>
  <div>
    <BaseIcon v-if="props.severity === ToastSeverity.SUCCESS" icon="pi-check-circle" />
  </div>
</template>

<script setup lang="ts">
import { ToastSeverity } from 'primevue/api';

type Props = {
  severity: string;
}

// Properties
const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
