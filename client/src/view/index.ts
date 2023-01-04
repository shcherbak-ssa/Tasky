import 'primevue/resources/themes/nova-vue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import './styles';
import './assets';

import { createApp } from 'vue';
import PrimevueConfig from 'primevue/config';
import type { ControllerList } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';
import { router } from './router';
import { store, storeKey } from './store';

import AppLayout from './layouts/AppLayout.vue';
import BaseIcon from './components/base/BaseIcon.vue';
import BaseButton from './components/base/BaseButton.vue';

export function setupView(controllers: ControllerList): void {
  const app = createApp(AppLayout);

  app.use(router);
  app.use(store, storeKey);
  app.use(PrimevueConfig, { ripple: true });
  app.use({
    install(app) {
      for (const [key, controller] of Object.entries(controllers)) {
        app.provide(key, controller);
      }
    },
  });

  app.mount('#app');
}
