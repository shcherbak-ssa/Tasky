<template>
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

  <PrimevueToast
    position="bottom-left"
    :group="NotificationGroup.PROCESS"
    :closeButtonProps="{ style: 'display: none' }"
  >
    <template #message="slotProps">
      <div class="mr-4">
        <BaseIcon icon="pi-spin pi-spinner" style="font-size: 2rem" />
      </div>

      <div class="mr-auto">
        <div v-html="`${slotProps.message.detail}`" class="mb-4" />
      </div>
    </template>
  </PrimevueToast>

  <PrimevueToast position="bottom-left" :group="NotificationGroup.UNDO">
    <template #message="slotProps">
      <NotificationIcon
        class="mr-4"
        style="font-size: 2rem"
        :severity="slotProps.message.severity"
      />

      <div class="mr-auto">
        <h4>{{slotProps.message.summary}}</h4>
        <p v-html="slotProps.message.detail" class="mb-4" />

        <BaseButton
          label="Undo"
          class="p-button-secondary p-button-outlined"
          @click.stop="processUndoButtonClick"
        />
      </div>
    </template>
  </PrimevueToast>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import PrimevueToast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import type { AppNotification } from 'shared/types';
import { NotificationGroup } from 'shared/constants';
import { type Store, useStore } from 'view/store';

import NotificationIcon from 'view/components/NotificationIcon.vue';

type State = {
  undo: () => void;
}

// Properties
const state = reactive<State>({
  undo: () => {},
});

const store: Store = useStore();
const toast = useToast();

// Hooks
watch(
  () => store.state.app.notification,
  (newNotificatoin, oldNotification) => {
    if (newNotificatoin) {
      const { type, heading, message, group, life, undo } = newNotificatoin;

      toast.add({
        severity: type,
        summary: heading,
        detail: message,
        group,
        life,
      });

      if (undo) {
        state.undo = undo;
      }
    } else {
      closeNotification(oldNotification);

      if (oldNotification?.group === NotificationGroup.UNDO) {
        state.undo = () => {};
      }
    }
  },
);

// Methods
function processUndoButtonClick(): void {
  state.undo();

  closeNotification(store.state.app.notification);
}

function closeNotification(notification: AppNotification | null): void {
  toast.removeGroup(notification?.group || NotificationGroup.MESSAGE);
}
</script>

<style scoped lang="scss"></style>
