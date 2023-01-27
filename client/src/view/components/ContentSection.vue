<template>
  <section class="section border-b-2 flex items-center justify-between py-2">
    <div class="flex items-center gap-6">
      <h3
        v-for="(item, index) in props.tabs"
        :key="index"
        :class="{
          'opacity-25 select-none click': item.key !== activeTabKey,
        }"
        @click.stop="emits('select-tab', item.key)"
      >
        {{ item.label }}
      </h3>
    </div>

    <div>
      <slot name="rightSide" />
    </div>
  </section>
</template>

<script setup lang="ts">
type Props = {
  tabs: { label: string; key: string }[];
  activeTabKey: string;
}

// Properties
const props = defineProps<Props>();
const emits = defineEmits(['select-tab']);
</script>

<style scoped lang="scss">

</style>
