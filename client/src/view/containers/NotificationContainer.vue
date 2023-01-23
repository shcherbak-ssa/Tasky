<template>
  <PrimevueToast position="bottom-left" :group="NotificationGroup.DELETE_PROCESSING">
    <template #message="slotProps">
      <div class="mr-4">
        <BaseIcon icon="pi-spin pi-spinner" style="font-size: 2rem" />
      </div>

      <div class="mr-auto">
        <div v-html="`${slotProps.message.summary}...`" class="mb-4" />

        <BaseButton
          label="Undo"
          class="p-button-sm"
          :class="{ [`p-button-${slotProps.message.severity}`]: true }"
        />
      </div>
    </template>
  </PrimevueToast>

  <PrimevueToast position="bottom-left" :group="NotificationGroup.MESSAGE">
    <template #message="slotProps">
      <NotificationIcon
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
import { watch } from 'vue';
import PrimevueToast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { NotificationGroup } from 'shared/constants';
import { type Store, useStore } from 'view/store';

import NotificationIcon from 'view/components/NotificationIcon.vue';

// Properties
const store: Store = useStore();
const toast = useToast();

// Hooks
watch(
  () => store.state.app.notification,
  (newNotificatoin, oldNotification) => {
    console.log(newNotificatoin, oldNotification);
    
    if (newNotificatoin) {
      const { type, heading, message, group, life } = newNotificatoin;

      toast.add({
        severity: type,
        summary: heading,
        detail: message,
        group,
        life,
      });
    } else {
      toast.removeGroup(oldNotification?.group || NotificationGroup.MESSAGE);
    }
  },
);
</script>

<style scoped lang="scss"></style>
