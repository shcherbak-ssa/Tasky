<template>
  <div>
    <PrimevueCalendar
      dateFormat="dd M, yy"
      :model-value="props.value || undefined"
      :placeholder="props.placeholder"
      :showButtonBar="true"
      :showIcon="true"
      :manualInput="false"
      @date-select="(value: Date) => emits('date-select', value)"
      @clear-click="emits('date-select', undefined)"
    />
  </div>
</template>

<script setup lang="ts">
import PrimevueCalendar from 'primevue/calendar';

type Props = {
  value: Date | null;
  placeholder: string;
}

// Properties
const props = defineProps<Props>();
const emits = defineEmits(['date-select']);

</script>

<style scoped lang="scss"></style>
