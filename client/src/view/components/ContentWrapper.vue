<template>
  <div
    class="w-full md:w-3/4 lg:w-1/2 duration-200 relative"
    :class="{
      'bg-white rounded-xl shadow-md shadow-slate-300 overflow-hidden': props.type === 'section',
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  type: 'simple' | 'section';
}

// Properties
const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
