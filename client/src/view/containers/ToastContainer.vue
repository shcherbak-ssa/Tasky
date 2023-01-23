<template>
  <PrimevueToast position="bottom-left" :group="ToastGroup.DELETE_PROCESSING">
    <template #message="slotProps">
      <div class="mr-4">
        <BaseIcon icon="pi-spin pi-spinner" style="font-size: 2rem" />
      </div>

      <div class="mr-auto">
        <div v-html="`${slotProps.message.summary}...`" class="mb-4" />

        <BaseButton
          label="Undone"
          class="p-button-sm"
          :class="{ [`p-button-${slotProps.message.severity}`]: true }"
        />
      </div>
    </template>
  </PrimevueToast>
  
  <PrimevueToast position="bottom-left" :group="ToastGroup.MESSAGE">
    <template #message="slotProps">
      <ToastIcon
        class="mr-4"
        style="font-size: 2rem"
        :severity="slotProps.message.severity"
      />

      <div class="mr-auto">
        <h4>{{slotProps.message.summary}}</h4>
        <p v-html="slotProps.message.detail" />
      </div>
    </template>
  </PrimevueToast>
</template>

<script setup lang="ts">
import PrimevueToast from 'primevue/toast';
import { Controller, ToastGroup } from 'shared/constants';

import ToastIcon from 'view/components/ToastIcon.vue';

</script>

<style scoped lang="scss"></style>
