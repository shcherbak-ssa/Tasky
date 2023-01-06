<template>
  <div
    class="item rounded-xl hover:bg-gray-200 duration-200 click"
    :class="{ 'is-active': props.isActive }"
    @click.stop="emits('item-click')"
  >
    <div
      :class="{
        'flex items-center justify-between p-2': props.isListView,
        'p-3 pb-12 sm:p-6 sm:pb-12': !props.isListView,
      }"
    >
      <div
        :class="{
          'flex items-center gap-4': props.isListView,
          'flex-col flex-center gap-2': !props.isListView,
        }"
      >
        <slot name="content" />
      </div>
    
      <div
        class="menu duration-200 p-1 z-10"
        :class="{ 'absolute bottom-1 right-1/2 translate-x-1/2': !props.isListView }"
      >
        <slot name="menu" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type ComponentProps = {
  isListView: boolean;
  isActive?: boolean;
}

// Properties
const props = defineProps<ComponentProps>();
const emits = defineEmits(['item-click']);
</script>

<style scoped lang="scss">
.item {
  &:hover .menu {
    opacity: 1;
  }

  &.is-active {
    @apply bg-gray-200;

    .menu {
      opacity: 1;
    }
  }
}

.menu {
  opacity: 0;
}
</style>
